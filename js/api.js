import { SPORT_CONFIG } from '../data/sport-config.js';
import {
  fetchLiveScores as fetchTheSportsDbLiveScores,
  fetchSportsBundle,
  fetchMatchDetails as fetchTheSportsDbMatchDetails,
  getTheSportsDbWarning
} from './thesportsdb-api.js';

const LIVE_STATUS_RE = /(live|in[_\s-]?play|1st|2nd|first|second|half|ht|extra|pen|q[1-4]|set)/i;
const ESPN_LEAGUES = ['eng.1', 'esp.1', 'ita.1', 'ger.1', 'fra.1', 'uefa.champions'];
let lastSportApiWarning = '';

export function getSportDbApiKey() {
  try {
    return SPORT_CONFIG.sportDb.apiKey || localStorage.getItem(SPORT_CONFIG.sportDb.apiKeyStorageKey) || '';
  } catch {
    return SPORT_CONFIG.sportDb.apiKey || '';
  }
}

export function setSportDbApiKey(value) {
  try {
    localStorage.setItem(SPORT_CONFIG.sportDb.apiKeyStorageKey, value.trim());
  } catch (error) {
    console.warn('[SportDB] Cannot persist API key', error);
  }
}

export function hasSportDbApiKey() {
  return Boolean(getSportDbApiKey());
}

export async function fetchLiveScores(sport = SPORT_CONFIG.defaultSport) {
  try {
    const matches = await fetchTheSportsDbLiveScores(sport);
    lastSportApiWarning = getTheSportsDbWarning();
    return matches;
  } catch (error) {
    lastSportApiWarning = error.message || 'SportDB.dev недоступен';
    console.warn('[SportDB] live endpoint failed, using ESPN fallback', error);
    return fetchEspnScoreboards(sport);
  }
}

export async function fetchLeagueBundle(activeSport = SPORT_CONFIG.defaultSport) {
  try {
    const matches = await fetchSportsBundle(SPORT_CONFIG.defaultLeagueId);
    lastSportApiWarning = getTheSportsDbWarning();
    return matches;
  } catch (error) {
    console.warn('[TheSportsDB] bundle failed, using legacy fallback', error);
    return fetchLiveScores(activeSport === 'all' ? SPORT_CONFIG.defaultSport : activeSport);
  }
}

export async function fetchRecentScores() {
  return [];
}

export async function fetchMatchDetails(matchId, sport = SPORT_CONFIG.defaultSport) {
  if (String(matchId).startsWith('tsdb:')) {
    return fetchTheSportsDbMatchDetails(matchId);
  }

  if (String(matchId).startsWith('espn:')) {
    return fetchEspnMatchDetails(matchId, sport);
  }

  const [matchResult, statsResult] = await Promise.allSettled([
    sportDbFetch(`${SPORT_CONFIG.sportDb.upstream}/match/${encodeURIComponent(matchId)}/details?with_events=true`),
    sportDbFetch(`${SPORT_CONFIG.sportDb.upstream}/match/${encodeURIComponent(matchId)}/stats`)
  ]);

  if (matchResult.status === 'rejected') {
    throw matchResult.reason;
  }

  const rawMatch = unwrapOne(matchResult.value);
  const match = normalizeMatch(rawMatch, sport);
  return {
    ...match,
    stats: normalizeStats(statsResult.status === 'fulfilled' ? statsResult.value : rawMatch),
    events: normalizeEvents(rawMatch)
  };
}

export function getFallbackMatches() {
  return [];
}

export function getSportApiWarning() {
  return lastSportApiWarning;
}

async function sportDbFetch(path) {
  const apiKey = getSportDbApiKey();
  if (!apiKey) {
    throw new Error('SportDB.dev API key is missing');
  }

  const endpoint = `${SPORT_CONFIG.sportDb.baseUrl}/${path}`;
  let response;
  try {
    response = await fetch(endpoint, {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey
      }
    });
  } catch (error) {
    throw new Error(`SportDB.dev blocked request from ${window.location.origin}. Add this origin in dashboard.sportdb.dev API key settings or use a same-origin proxy. ${error.message}`);
  }

  if (!response.ok) {
    const message = await readErrorMessage(response);
    throw new Error(`SportDB.dev ${response.status}: ${message || response.statusText}. Endpoint: ${endpoint}`);
  }

  return response.json();
}

async function readErrorMessage(response) {
  try {
    const text = await response.text();
    if (!text) return '';
    try {
      const json = JSON.parse(text);
      return json.detail || json.message || text;
    } catch {
      return text.slice(0, 180);
    }
  } catch {
    return '';
  }
}

function normalizeMatchList(payload, sport) {
  const rows = Array.isArray(payload)
    ? payload
    : payload.matches || payload.data || payload.live || payload.fixtures || payload.events || [];
  return rows.map((item) => normalizeMatch(item, sport)).filter(Boolean);
}

async function fetchEspnScoreboards(sport) {
  const settled = await Promise.allSettled(
    ESPN_LEAGUES.map((league) => fetchJsonPublic(espnScoreboardUrl(league)).then((data) => ({ league, data })))
  );
  const matches = settled.flatMap((item) => {
    if (item.status !== 'fulfilled') return [];
    const leagueName = item.value.data.leagues?.[0]?.name || item.value.league;
    return normalizeEspnEvents(item.value.data.events || [], item.value.league, sport, leagueName);
  });
  return matches.slice(0, 30);
}

async function fetchEspnMatchDetails(matchId, sport) {
  const [, league, eventId] = String(matchId).split(':');
  const [scoreboardResult, summaryResult] = await Promise.allSettled([
    fetchJsonPublic(espnScoreboardUrl(league)),
    fetchJsonPublic(`https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/summary?event=${encodeURIComponent(eventId)}`)
  ]);

  if (scoreboardResult.status === 'rejected') throw scoreboardResult.reason;

  const event = (scoreboardResult.value.events || []).find((item) => String(item.id) === String(eventId));
  if (!event) throw new Error(`ESPN fallback match ${eventId} was not found`);
  const leagueName = scoreboardResult.value.leagues?.[0]?.name || league;
  const match = normalizeEspnEvent(event, league, sport, leagueName);
  const summary = summaryResult.status === 'fulfilled' ? summaryResult.value : {};

  return {
    ...match,
    stats: normalizeEspnStats(summary.boxscore || event),
    events: normalizeEspnTimeline(summary, match)
  };
}

async function fetchJsonPublic(url) {
  const response = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Public sports fallback ${response.status}: ${url}`);
  return response.json();
}

function espnScoreboardUrl(league) {
  return `https://site.api.espn.com/apis/site/v2/sports/soccer/${league}/scoreboard`;
}

function normalizeEspnEvents(events, league, sport, leagueName) {
  return events.map((event) => normalizeEspnEvent(event, league, sport, leagueName)).filter(Boolean);
}

function normalizeEspnEvent(event, league, sport, leagueName = league) {
  const competition = event.competitions?.[0] || {};
  const competitors = competition.competitors || [];
  const homeRaw = competitors.find((item) => item.homeAway === 'home') || competitors[0] || {};
  const awayRaw = competitors.find((item) => item.homeAway === 'away') || competitors[1] || {};
  const statusType = competition.status?.type || event.status?.type || {};
  const clock = competition.status?.displayClock || event.status?.displayClock || '';
  const elapsed = parseInt(clock, 10);
  const tournamentName = event.league?.name || competition.league?.name || leagueName || event.season?.slug || league;

  return {
    id: `espn:${league}:${event.id}`,
    sport,
    source: 'espn',
    tournament: tournamentName,
    flag: countryFlag(competition.venue?.address?.country || ''),
    status: statusType.state === 'in' ? 'live' : statusType.completed ? 'finished' : 'upcoming',
    statusText: statusType.description || statusType.shortDetail || 'Scheduled',
    home: normalizeEspnTeam(homeRaw),
    away: normalizeEspnTeam(awayRaw),
    score: {
      h: pickNumber(homeRaw.score, 0),
      a: pickNumber(awayRaw.score, 0)
    },
    time: statusType.state === 'in' ? clock || `${elapsed || 0}'` : statusType.completed ? 'ФТ' : formatEspnKickoff(event.date || competition.date),
    stats: normalizeEspnStats(competition),
    events: normalizeEspnCompetitionEvents(competition),
    history: []
  };
}

function normalizeEspnTeam(raw) {
  const team = raw.team || {};
  const name = team.displayName || team.shortDisplayName || team.name || raw.displayName || 'Team';
  return {
    name,
    logo: team.logo || team.logos?.[0]?.href || raw.logo || '⚽',
    color: team.color ? `#${team.color.replace('#', '')}` : colorFromName(name)
  };
}

function normalizeEspnStats(source) {
  const competitors = source.competitors || [];
  const home = competitors.find((item) => item.homeAway === 'home') || competitors[0] || {};
  const away = competitors.find((item) => item.homeAway === 'away') || competitors[1] || {};
  const homeStats = home.statistics || [];
  const awayStats = away.statistics || [];
  const wanted = [
    ['possessionPct', 'Владение'],
    ['totalShots', 'Удары'],
    ['shotsOnTarget', 'Удары в створ'],
    ['wonCorners', 'Угловые'],
    ['foulsCommitted', 'Фолы']
  ];
  return wanted.map(([name, label]) => ({
    l: label,
    h: statValue(homeStats, name),
    a: statValue(awayStats, name)
  })).filter((row) => row.h || row.a);
}

function statValue(stats, name) {
  const item = stats.find((stat) => stat.name === name);
  const value = item?.displayValue ?? item?.value ?? 0;
  return Number(String(value).replace('%', '')) || 0;
}

function normalizeEspnTimeline(summary, match) {
  const details = summary.details || summary.plays || summary.commentary || [];
  if (Array.isArray(details) && details.length) {
    return details.slice(0, 20).map((event) => ({
      minute: pickText(event.clock?.displayValue, event.timeElapsed?.displayValue, event.displayTime, event.minute, '—'),
      type: translateEvent(pickText(event.type?.text, event.type?.displayName, event.type, event.text, 'Событие')),
      team: pickText(event.team?.displayName, event.team?.name, ''),
      player: pickText(event.athletesInvolved?.[0]?.displayName, event.participants?.[0]?.athlete?.displayName, ''),
      detail: pickText(event.text, event.shortText, '')
    }));
  }
  return normalizeEspnCompetitionEvents({ details: match.events }, match);
}

function normalizeEspnCompetitionEvents(competition) {
  const details = competition.details || [];
  if (!Array.isArray(details) || !details.length) return [];
  return details.slice(0, 20).map((event) => ({
    minute: pickText(event.clock?.displayValue, event.time, event.minute, '—'),
    type: translateEvent(pickText(event.type?.text, event.type, 'Событие')),
    team: pickText(event.team?.displayName, event.team?.name, ''),
    player: pickText(event.athletesInvolved?.[0]?.displayName, event.scorer, ''),
    detail: pickText(event.text, event.shortText, '')
  }));
}

function formatEspnKickoff(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Scheduled';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function unwrapOne(payload) {
  if (Array.isArray(payload)) return payload[0] || {};
  return payload.match || payload.data || payload.fixture || payload.event || payload;
}

function normalizeMatch(item, sport) {
  if (item.eventId || item.homeName || item.awayName || item.eventStageId) {
    return normalizeFlashscoreMatch(item, sport);
  }

  const home = pickTeam(item, 'home');
  const away = pickTeam(item, 'away');
  const score = pickScore(item);
  const statusText = pickText(item.status, item.status_text, item.state, item.period, item.fixture?.status?.long, item.fixture?.status?.short);
  const elapsed = pickNumber(item.elapsed, item.minute, item.time, item.fixture?.status?.elapsed, item.status?.elapsed);

  return {
    id: String(pickText(item.id, item.match_id, item.matchId, item.fixture_id, item.fixture?.id)),
    sport,
    source: 'sportdb',
    tournament: pickText(item.league?.name, item.league, item.competition?.name, item.tournament?.name, item.competition, 'Live Football'),
    flag: countryFlag(pickText(item.country?.name, item.country, item.area?.name)),
    status: isLiveValue(statusText, elapsed) ? 'live' : 'upcoming',
    statusText: statusText || 'IN PLAY',
    home,
    away,
    score,
    time: elapsed ? `${elapsed}'` : statusText || 'LIVE',
    stats: normalizeStats(item),
    events: normalizeEvents(item),
    history: []
  };
}

function normalizeFlashscoreMatch(item, sport) {
  const stageId = String(pickText(item.eventStageId, item.stageId, item.statusId, ''));
  const stageText = pickText(item.eventStage, item.stage, item.status, item.statusName, '');
  const homeName = pickText(item.homeName, item.home?.name, item.homeTeam?.name, 'Home');
  const awayName = pickText(item.awayName, item.away?.name, item.awayTeam?.name, 'Away');
  const startValue = pickText(item.startDateTimeUtc, item.startTime, item.startUtime, '');
  const status = flashscoreStatus(stageId, stageText);

  return {
    id: String(pickText(item.eventId, item.id, item.matchId)),
    sport,
    source: 'sportdb-flashscore',
    tournament: pickText(item.tournamentName, item.tournament?.name, item.competitionName, item.competition?.name, 'Flashscore Live'),
    flag: countryFlag(pickText(item.countryName, item.country?.name, item.country, item.categoryName)),
    status,
    statusText: stageText || flashscoreStageLabel(stageId),
    home: {
      name: homeName,
      logo: pickText(item.homeLogo, item.homeImage, item.home?.logo, item.homeTeam?.logo, '⚽'),
      color: colorFromName(homeName)
    },
    away: {
      name: awayName,
      logo: pickText(item.awayLogo, item.awayImage, item.away?.logo, item.awayTeam?.logo, '⚽'),
      color: colorFromName(awayName)
    },
    score: {
      h: pickScoreValue(item.homeScore, item.homeCurrentScore, item.homeFullTimeScore),
      a: pickScoreValue(item.awayScore, item.awayCurrentScore, item.awayFullTimeScore)
    },
    time: status === 'live'
      ? calculateFlashscoreClock(stageId, item.stageStartUtime, item.gameTime, stageText)
      : status === 'finished' ? 'ФТ' : formatFlashscoreKickoff(startValue),
    stats: normalizeStats(item),
    events: normalizeEvents(item),
    history: []
  };
}

function pickTeam(item, side) {
  const source = item.teams?.[side] || item[side] || item[`${side}_team`] || item[`${side}Team`] || {};
  const fallbackName = side === 'home' ? 'Home' : 'Away';
  const name = pickText(source.name, source.team_name, source.title, item[`${side}_name`], item[`${side}Name`], fallbackName);
  return {
    name,
    logo: pickText(source.logo, source.badge, source.crest, source.image, item[`${side}_logo`], item[`${side}Logo`], '⚽'),
    color: colorFromName(name)
  };
}

function pickScore(item) {
  const goals = item.goals || item.score || item.scores || {};
  return {
    h: pickNumber(goals.home, goals.home_score, goals.localteam_score, item.home_score, item.homeGoals, item.goals_home, 0),
    a: pickNumber(goals.away, goals.away_score, goals.visitorteam_score, item.away_score, item.awayGoals, item.goals_away, 0)
  };
}

function pickScoreValue(...values) {
  const found = values.find((value) => value !== undefined && value !== null && value !== '');
  if (found === undefined || found === null || found === '') return 0;
  if (typeof found === 'object') return pickNumber(found.current, found.display, found.value, 0);
  return String(found);
}

function flashscoreStatus(stageId, stageText) {
  if (['2', '6', '7', '12', '13', '38'].includes(stageId) || isLiveValue(stageText, 1)) return 'live';
  if (['3', '242'].includes(stageId) || /finished|full time|after/i.test(String(stageText))) return 'finished';
  return 'upcoming';
}

function flashscoreStageLabel(stageId) {
  const map = {
    1: 'Scheduled',
    2: 'Live',
    3: 'Finished',
    6: 'Extra time',
    7: 'Penalties',
    12: 'First half',
    13: 'Second half',
    38: 'Half time',
    242: 'Full time'
  };
  return map[stageId] || 'Scheduled';
}

function calculateFlashscoreClock(stageId, stageStartUtime, gameTime, fallback) {
  if (gameTime) return String(gameTime).includes("'") ? String(gameTime) : `${gameTime}'`;
  const started = Number(stageStartUtime);
  if (!started) return fallback || flashscoreStageLabel(stageId);

  const elapsed = Math.max(0, Math.floor((Date.now() / 1000 - started) / 60));
  if (stageId === '12') return `${Math.min(45, elapsed + 1)}'`;
  if (stageId === '13') return `${Math.min(90, 45 + elapsed + 1)}'`;
  if (stageId === '38') return 'HT';
  return `${elapsed + 1}'`;
}

function formatFlashscoreKickoff(value) {
  if (!value) return 'Scheduled';
  const date = /^\d+$/.test(String(value)) ? new Date(Number(value) * 1000) : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function normalizeStats(payload) {
  const rows = Array.isArray(payload)
    ? payload
    : payload.stats || payload.statistics || payload.match_stats || payload.data || payload.periods?.[0]?.stats || [];

  if (Array.isArray(rows) && rows.length) {
    return rows.slice(0, 8).map((row) => ({
      l: translateStat(pickText(row.type, row.name, row.label, row.stat, 'Статистика')),
      h: pickNumber(row.home, row.home_value, row.intHome, row.values?.home, 0),
      a: pickNumber(row.away, row.away_value, row.intAway, row.values?.away, 0)
    }));
  }

  return [
    { l: 'Владение', h: pickNumber(payload.possession_home, payload.stats?.possession?.home, 0), a: pickNumber(payload.possession_away, payload.stats?.possession?.away, 0) },
    { l: 'Удары', h: pickNumber(payload.shots_home, payload.stats?.shots?.home, 0), a: pickNumber(payload.shots_away, payload.stats?.shots?.away, 0) },
    { l: 'Удары в створ', h: pickNumber(payload.shots_on_home, payload.stats?.shots_on_goal?.home, 0), a: pickNumber(payload.shots_on_away, payload.stats?.shots_on_goal?.away, 0) }
  ].filter((row) => row.h || row.a);
}

function normalizeEvents(payload) {
  const rows = payload.events || payload.timeline || payload.incidents || payload.goals || payload.details || [];
  if (!Array.isArray(rows)) return [];

  return rows.slice().sort((a, b) => pickNumber(a.minute, a.time, 0) - pickNumber(b.minute, b.time, 0)).map((event) => ({
    minute: `${pickText(event.minute, event.time, event.elapsed, '—')}'`,
    type: translateEvent(pickText(event.type, event.event_type, event.name, 'Событие')),
    team: pickText(event.team?.name, event.team, ''),
    player: pickText(event.player?.name, event.player, event.scorer, ''),
    detail: pickText(event.detail, event.assist?.name, event.assist, event.comment, '')
  }));
}

function isLiveMatch(match) {
  if (match.status) return match.status === 'live';
  return isLiveValue(match.statusText, parseInt(match.time, 10));
}

function isLiveValue(status, elapsed) {
  return Boolean(elapsed && elapsed > 0 && elapsed < 130) || LIVE_STATUS_RE.test(String(status || ''));
}

function pickText(...values) {
  const found = values.find((value) => value !== undefined && value !== null && value !== '');
  if (typeof found === 'object') return found.name || found.title || '';
  return found === undefined || found === null ? '' : String(found);
}

function pickNumber(...values) {
  const found = values.find((value) => value !== undefined && value !== null && value !== '');
  const parsed = Number(found);
  return Number.isFinite(parsed) ? parsed : 0;
}

function translateStat(label = '') {
  const map = {
    possession: 'Владение',
    'Ball Possession': 'Владение',
    shots: 'Удары',
    'Total Shots': 'Удары',
    shots_on_goal: 'Удары в створ',
    'Shots on Goal': 'Удары в створ',
    corners: 'Угловые',
    fouls: 'Фолы',
    yellow_cards: 'Желтые',
    red_cards: 'Красные'
  };
  return map[label] || label;
}

function translateEvent(label = '') {
  const map = {
    goal: 'Гол',
    Goal: 'Гол',
    card: 'Карточка',
    yellow_card: 'Желтая карточка',
    red_card: 'Красная карточка',
    substitution: 'Замена'
  };
  return map[label] || label;
}

function colorFromName(name) {
  const colors = ['#22c55e', '#06b6d4', '#8b5cf6', '#f97316', '#ef4444', '#facc15', '#3b82f6'];
  const index = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function countryFlag(country) {
  const map = {
    England: '🇬🇧',
    Spain: '🇪🇸',
    Germany: '🇩🇪',
    Italy: '🇮🇹',
    France: '🇫🇷',
    USA: '🇺🇸',
    Canada: '🇨🇦'
  };
  return map[country] || '🌍';
}
