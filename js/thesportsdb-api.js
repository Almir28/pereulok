const TSDB_REQUESTED_KEY = '1';
const TSDB_V1_KEY = '123';
const TSDB_V1_BASE = 'https://www.thesportsdb.com/api/v1/json';
const TSDB_V2_BASE = 'https://www.thesportsdb.com/api/v2/json';
const CACHE_PREFIX = 'pereuloq:thesportsdb:';
const REQUEST_TIMEOUT_MS = 8000;
const LIVE_CACHE_MS = 18000;
const LEAGUE_CACHE_MS = 10 * 60 * 1000;

let lastWarning = '';

export async function fetchLiveScores() {
  if (TSDB_REQUESTED_KEY === '1') {
    lastWarning = 'TheSportsDB v2 livescore/all требует premium API key; бесплатный ключ 1 не возвращает live JSON';
    return [];
  }

  try {
    const data = await cachedFetch('live:all', `${TSDB_V2_BASE}/livescore/all`, LIVE_CACHE_MS, {
      retryFreeKey: false,
      headers: { X_API_KEY: TSDB_REQUESTED_KEY }
    });
    lastWarning = '';
    return readRows(data, ['events', 'livescore', 'matches', 'data']).map((event) => normalizeEvent(event, 'live')).filter(Boolean);
  } catch (error) {
    lastWarning = error.message || 'TheSportsDB live недоступен';
    console.warn('[TheSportsDB] live failed', error);
    return [];
  }
}

export async function fetchLeagueMatches(leagueId = '4328') {
  try {
    const url = v1Url(`eventsnextleague.php?id=${encodeURIComponent(leagueId)}`);
    const data = await cachedFetch(`next:${leagueId}`, url, LEAGUE_CACHE_MS);
    return readRows(data, ['events']).map((event) => normalizeEvent(event, 'upcoming')).filter(Boolean);
  } catch (error) {
    lastWarning = error.message || 'TheSportsDB upcoming недоступен';
    console.warn('[TheSportsDB] upcoming failed', error);
    return demoMatches('upcoming');
  }
}

export async function fetchPastMatches(leagueId = '4328') {
  try {
    const url = v1Url(`eventspastleague.php?id=${encodeURIComponent(leagueId)}`);
    const data = await cachedFetch(`past:${leagueId}`, url, LEAGUE_CACHE_MS);
    return readRows(data, ['events']).map((event) => normalizeEvent(event, 'finished')).filter(Boolean);
  } catch (error) {
    lastWarning = error.message || 'TheSportsDB past недоступен';
    console.warn('[TheSportsDB] past failed', error);
    return demoMatches('finished');
  }
}

export async function fetchTeam(teamId = '133602') {
  const data = await cachedFetch(`team:${teamId}`, v1Url(`lookupteam.php?id=${encodeURIComponent(teamId)}`), LEAGUE_CACHE_MS);
  return readRows(data, ['teams'])[0] || null;
}

export async function searchTeam(query = 'Arsenal') {
  const safeQuery = query.trim() || 'Arsenal';
  const data = await cachedFetch(`search-team:${safeQuery.toLowerCase()}`, v1Url(`searchteams.php?t=${encodeURIComponent(safeQuery)}`), LEAGUE_CACHE_MS);
  return readRows(data, ['teams']);
}

export async function fetchStandings(leagueId = '4328') {
  try {
    const data = await cachedFetch(`standings:${leagueId}`, v1Url(`lookuptable.php?l=${encodeURIComponent(leagueId)}`), LEAGUE_CACHE_MS);
    return readRows(data, ['table']).slice(0, 10).map((row, index) => ({
      rank: row.intRank || row.rank || index + 1,
      team: row.strTeam || row.name || row.team || 'Team',
      played: row.intPlayed || row.played || row.matches || 0,
      wins: row.intWin || row.wins || 0,
      draws: row.intDraw || row.draws || 0,
      losses: row.intLoss || row.losses || 0,
      points: row.intPoints || row.points || 0,
      badge: pickImage(row)
    }));
  } catch (error) {
    console.warn('[TheSportsDB] standings failed', error);
    return demoStandings();
  }
}

export async function fetchSportsBundle(leagueId = '4328') {
  const [live, upcoming, finished] = await Promise.all([
    fetchLiveScores(),
    fetchLeagueMatches(leagueId),
    fetchPastMatches(leagueId)
  ]);
  return uniqueMatches([...live, ...upcoming, ...finished]).slice(0, 36);
}

export async function fetchMatchDetails(matchId) {
  const normalizedId = String(matchId).replace(/^tsdb:/, '');
  try {
    const data = await cachedFetch(`event:${normalizedId}`, v1Url(`lookupevent.php?id=${encodeURIComponent(normalizedId)}`), LEAGUE_CACHE_MS);
    const event = readRows(data, ['events'])[0];
    if (event) return normalizeEvent(event, eventStatus(event));
  } catch (error) {
    console.warn('[TheSportsDB] event detail failed', error);
  }
  throw new Error(`TheSportsDB event ${normalizedId} was not found`);
}

export function getTheSportsDbWarning() {
  return lastWarning;
}

function v1Url(path, key = TSDB_V1_KEY) {
  return `${TSDB_V1_BASE}/${key}/${path}`;
}

async function cachedFetch(cacheKey, url, ttl, options = {}) {
  const key = `${CACHE_PREFIX}${cacheKey}`;
  const cached = readCache(key, ttl);
  if (cached) return cached;

  let data;
  try {
    data = await fetchJson(url, options.headers);
  } catch (error) {
    throw error;
  }
  if (isInvalidKey(data)) throw new Error(data.Message || 'Invalid TheSportsDB API key');
  writeCache(key, data);
  return data;
}

async function fetchJson(url, headers = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal, cache: 'no-store', headers: { Accept: 'application/json', ...headers } });
    const text = await response.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error('TheSportsDB returned invalid JSON');
    }
    if (!response.ok) throw new Error(data.Message || data.message || `TheSportsDB ${response.status}`);
    return data;
  } finally {
    clearTimeout(timeout);
  }
}

function readRows(payload, keys) {
  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }
  if (Array.isArray(payload)) return payload;
  return [];
}

function normalizeEvent(event, forcedStatus) {
  const home = pickText(event.strHomeTeam, event.homeTeam, event.home?.name, 'Home');
  const away = pickText(event.strAwayTeam, event.awayTeam, event.away?.name, 'Away');
  const status = forcedStatus === 'live' ? 'live' : forcedStatus || eventStatus(event);
  const homeScore = pickText(event.intHomeScore, event.homeScore, event.home_score, status === 'upcoming' ? '' : '0');
  const awayScore = pickText(event.intAwayScore, event.awayScore, event.away_score, status === 'upcoming' ? '' : '0');

  return {
    id: `tsdb:${pickText(event.idEvent, event.id, event.eventId, `${home}-${away}`)}`,
    sport: sportSlug(event.strSport),
    source: 'thesportsdb',
    tournament: pickText(event.strLeague, event.league, event.strTournament, 'TheSportsDB'),
    flag: countryFlag(pickText(event.strCountry, event.strVenue)),
    status,
    statusText: pickText(event.strStatus, event.strProgress, event.strResult, status),
    home: {
      name: home,
      logo: pickImage(event, 'home') || firstLetter(home),
      color: colorFromName(home)
    },
    away: {
      name: away,
      logo: pickImage(event, 'away') || firstLetter(away),
      color: colorFromName(away)
    },
    score: {
      h: homeScore,
      a: awayScore
    },
    time: status === 'upcoming' ? formatKickoff(event) : status === 'finished' ? 'ФТ' : pickText(event.strProgress, event.strTime, 'LIVE'),
    stats: [],
    events: [],
    history: []
  };
}

function eventStatus(event) {
  const status = String(pickText(event.strStatus, event.strProgress, event.strResult, '')).toLowerCase();
  if (/live|in play|1st|2nd|half|quarter|period/.test(status)) return 'live';
  if (event.intHomeScore !== null && event.intHomeScore !== undefined && event.intAwayScore !== null && event.intAwayScore !== undefined) return 'finished';
  return 'upcoming';
}

function formatKickoff(event) {
  const raw = [event.dateEvent, event.strTime].filter(Boolean).join('T');
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return pickText(event.dateEventLocal, event.dateEvent, event.strTimestamp, 'Время уточняется');
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function pickImage(source, side = '') {
  const prefix = side === 'home' ? 'strHome' : side === 'away' ? 'strAway' : 'str';
  return pickText(
    source[`${prefix}TeamBadge`],
    source[`${prefix}Badge`],
    source[`${prefix}Logo`],
    source.strBadge,
    source.strTeamBadge,
    source.strLogo,
    source.strFanart1
  );
}

function readCache(key, ttl) {
  try {
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (!cached || Date.now() - cached.time > ttl) return null;
    return cached.data;
  } catch {
    return null;
  }
}

function writeCache(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ time: Date.now(), data }));
  } catch {
    // localStorage can be unavailable or full; network data still renders.
  }
}

function isInvalidKey(payload) {
  return /invalid .*api key/i.test(String(payload?.Message || payload?.message || payload?.message || payload || ''));
}

function uniqueMatches(matches) {
  const seen = new Set();
  return matches.filter((match) => {
    if (!match?.id || seen.has(match.id)) return false;
    seen.add(match.id);
    return true;
  });
}

function demoMatches(status) {
  const rows = [
    ['Arsenal', 'Chelsea', 'English Premier League'],
    ['Liverpool', 'Manchester City', 'English Premier League'],
    ['Tottenham', 'Newcastle', 'English Premier League']
  ];
  return rows.map(([home, away, league], index) => ({
    id: `demo:${status}:${index}`,
    sport: 'football',
    source: 'demo',
    tournament: league,
    flag: 'GB',
    status,
    statusText: status,
    home: { name: home, logo: firstLetter(home), color: colorFromName(home) },
    away: { name: away, logo: firstLetter(away), color: colorFromName(away) },
    score: { h: status === 'upcoming' ? '' : index + 1, a: status === 'upcoming' ? '' : index },
    time: status === 'upcoming' ? 'Скоро' : 'ФТ',
    stats: [],
    events: [],
    history: []
  }));
}

function demoStandings() {
  return ['Arsenal', 'Manchester City', 'Liverpool', 'Chelsea', 'Tottenham'].map((team, index) => ({
    rank: index + 1,
    team,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    points: 0,
    badge: firstLetter(team)
  }));
}

function pickText(...values) {
  const found = values.find((value) => value !== undefined && value !== null && value !== '');
  return found === undefined || found === null ? '' : String(found);
}

function sportSlug(value = '') {
  const sport = String(value).toLowerCase();
  if (sport.includes('soccer') || sport.includes('football')) return 'football';
  if (sport.includes('basket')) return 'basketball';
  if (sport.includes('hockey')) return 'hockey';
  if (sport.includes('tennis')) return 'tennis';
  return 'football';
}

function firstLetter(name) {
  return String(name || 'T').trim().charAt(0).toUpperCase() || 'T';
}

function colorFromName(name) {
  const colors = ['#22c55e', '#06b6d4', '#8b5cf6', '#f97316', '#ef4444', '#facc15', '#3b82f6'];
  const index = [...String(name)].reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function countryFlag(country) {
  const value = String(country || '').toLowerCase();
  if (value.includes('england') || value.includes('uk') || value.includes('britain')) return 'GB';
  if (value.includes('spain')) return 'ES';
  if (value.includes('germany')) return 'DE';
  if (value.includes('italy')) return 'IT';
  if (value.includes('france')) return 'FR';
  if (value.includes('usa') || value.includes('united states')) return 'US';
  return 'TSDB';
}
