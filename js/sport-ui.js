import { SPORT_CONFIG } from '../data/sport-config.js';
import { fetchLeagueBundle, getSportApiWarning, hasSportDbApiKey } from './api.js';
import { fetchStandings } from './thesportsdb-api.js';
import { $, $$, escapeHtml, predictionFromHistory, updateHistoryFromMatches, writeJson } from './sport-utils.js';

const state = {
  activeSport: 'all',
  apiSport: SPORT_CONFIG.defaultSport,
  status: 'all',
  query: '',
  view: 'grid',
  matches: [],
  selectedPredictions: {},
  previousScores: new Map(),
  loading: true,
  apiError: ''
};

let refreshTimer = null;
let toastTimer = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSportPage, { once: true });
} else {
  initSportPage();
}

async function initSportPage() {
  bindChrome();
  renderChips();
  renderSkeleton();
  renderAnalytics();
  renderStandingsSkeleton();
  await Promise.all([refreshMatches(), refreshStandings()]);
  refreshTimer = setInterval(refreshMatches, SPORT_CONFIG.refreshMs);
}

function bindChrome() {
  $('#THEME_BTN')?.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    $('#THEME_BTN').textContent = next === 'dark' ? '☽' : '☀';
  });

  $('#MOBILE_MENU_BTN')?.addEventListener('click', () => $('#MOBILE_PANEL')?.classList.toggle('on'));
  $('#SEARCH')?.addEventListener('input', (event) => {
    state.query = event.target.value.trim().toLowerCase();
    renderMatches();
  });
  $('#SEL_STATUS')?.addEventListener('change', (event) => {
    state.status = event.target.value;
    renderMatches();
  });
  $('#vt-grid')?.addEventListener('click', () => setView('grid'));
  $('#vt-list')?.addEventListener('click', () => setView('list'));
  $('#REFRESH_BTN')?.addEventListener('click', refreshMatches);
  $('#SPORT_CHIPS')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sport]');
    if (!button) return;
    state.activeSport = button.dataset.sport;
    state.apiSport = state.activeSport === 'all' ? SPORT_CONFIG.defaultSport : state.activeSport;
    renderChips();
    renderSkeleton();
    refreshMatches();
  });
  $('#MATCHES_GRID')?.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    const pred = event.target.closest('[data-pred]');
    if (tab) switchTab(tab);
    if (pred) selectPrediction(pred);
    if (!tab && !pred) {
      const card = event.target.closest('[data-match-href]');
      if (card) window.location.href = card.dataset.matchHref;
    }
  });
  $('#MATCHES_GRID')?.addEventListener('keydown', (event) => {
    if (!['Enter', ' '].includes(event.key)) return;
    const card = event.target.closest('[data-match-href]');
    if (!card) return;
    event.preventDefault();
    window.location.href = card.dataset.matchHref;
  });

  const statusSelect = $('#SEL_STATUS');
  if (statusSelect) statusSelect.value = state.status;
}

async function refreshMatches() {
  if (!state.matches.length) renderSkeleton();
  $('#MATCHES_GRID')?.classList.add('is-refreshing');
  try {
    const apiMatches = await fetchLeagueBundle(state.apiSport);
    const merged = mergeMatches(apiMatches);
    const apiWarning = getSportApiWarning();
    const history = updateHistoryFromMatches(merged, SPORT_CONFIG.historyKey);
    state.matches = merged.map((match) => ({
      ...match,
      pred: predictionFromHistory(match, history)
    }));
    state.apiError = apiWarning;
    writeJson(SPORT_CONFIG.matchesKey, state.matches);
    state.loading = false;
    renderMatches();
    renderFeatured();
    renderStatsLine();
    updateApiStatus(apiWarning ? 'fallback' : 'connected');
    $('#LAST_UPDATE').textContent = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date());
  } catch (error) {
    console.error('[Sport API]', error);
    showToast(hasSportDbApiKey() ? 'Ошибка SportDB.dev. Live-данные временно недоступны.' : 'Добавьте SportDB.dev API key для live-данных.');
    state.matches = [];
    state.apiError = error.message || 'SportDB.dev недоступен';
    writeJson(SPORT_CONFIG.matchesKey, state.matches);
    state.loading = false;
    renderMatches();
    renderFeatured();
    renderStatsLine();
    updateApiStatus(hasSportDbApiKey() ? 'error' : 'missing-key');
  } finally {
    $('#MATCHES_GRID')?.classList.remove('is-refreshing');
  }
}

async function refreshStandings() {
  const target = $('#STANDINGS_GRID');
  if (!target) return;
  try {
    const rows = await fetchStandings(SPORT_CONFIG.defaultLeagueId);
    renderStandings(rows);
  } catch (error) {
    console.error('[TheSportsDB standings]', error);
    target.innerHTML = '<div class="soft-note">Турнирная таблица временно недоступна.</div>';
  }
}

function mergeMatches(apiMatches) {
  const live = apiMatches.filter((match) => match.status === 'live');
  return (live.length ? live : apiMatches).slice(0, 24);
}

function renderChips() {
  $('#SPORT_CHIPS').innerHTML = SPORT_CONFIG.sports.map((sport) => `
    <button class="sp-chip${state.activeSport === sport.id ? ' on' : ''}" type="button" data-sport="${sport.id}" aria-pressed="${state.activeSport === sport.id}">
      <span aria-hidden="true">${sport.icon}</span>
      <span>${sport.label}</span>
      <span class="sp-count">${countBySport(sport.id)}</span>
    </button>
  `).join('');
}

function renderSkeleton() {
  $('#MATCHES_GRID').innerHTML = Array.from({ length: 6 }, () => `
    <article class="mc skeleton-card" aria-hidden="true">
      <div class="mc-hdr"><span class="skeleton sk-w1"></span><span class="skeleton sk-badge"></span></div>
      <div class="mc-body"><div class="mc-teams-row">
        <div class="mc-team"><span class="skeleton sk-logo"></span><span class="skeleton sk-name"></span></div>
        <span class="skeleton sk-score"></span>
        <div class="mc-team"><span class="skeleton sk-logo"></span><span class="skeleton sk-name"></span></div>
      </div></div>
    </article>
  `).join('');
}

function renderStandingsSkeleton() {
  const target = $('#STANDINGS_GRID');
  if (!target) return;
  target.innerHTML = Array.from({ length: 6 }, () => `
    <div class="standing-row skeleton-standing" aria-hidden="true">
      <span class="skeleton sk-badge"></span>
      <span class="skeleton sk-logo"></span>
      <span class="skeleton sk-name"></span>
      <span class="skeleton sk-w1"></span>
    </div>
  `).join('');
}

function renderStandings(rows = []) {
  const target = $('#STANDINGS_GRID');
  if (!target) return;
  if (!rows.length) {
    target.innerHTML = '<div class="soft-note">Турнирная таблица пока пустая.</div>';
    return;
  }
  target.innerHTML = `
    <div class="standing-head">
      <span>#</span><span>Клуб</span><span>И</span><span>В</span><span>Н</span><span>П</span><span>О</span>
    </div>
    ${rows.map((row) => `
      <div class="standing-row">
        <span class="standing-rank">${escapeHtml(row.rank)}</span>
        <span class="standing-team">${logoMarkup(row.badge, row.team)}<strong>${escapeHtml(row.team)}</strong></span>
        <span>${escapeHtml(row.played)}</span>
        <span>${escapeHtml(row.wins)}</span>
        <span>${escapeHtml(row.draws)}</span>
        <span>${escapeHtml(row.losses)}</span>
        <span class="standing-points">${escapeHtml(row.points)}</span>
      </div>
    `).join('')}
  `;
}

function renderMatches() {
  renderChips();
  const items = filteredMatches();
  const grid = $('#MATCHES_GRID');
  grid.classList.toggle('list-view', state.view === 'list');

  if (!items.length) {
    grid.innerHTML = `
      <div class="empty-state sportdb-empty">
        <div class="es-ico">LIVE</div>
        <div class="es-txt">Сейчас live-матчей нет.</div>
        <div class="es-help">${escapeHtml(state.apiError || 'SportDB.dev не вернул матчи со статусом Live / In Play. Будущие матчи доступны через фильтр «Все статусы», когда источник отдает расписание.')}</div>
        <div class="es-help">Для SportDB добавьте origin <strong>${escapeHtml(window.location.origin)}</strong> в настройках ключа и проверьте, что ключ активен.</div>
      </div>`;
    return;
  }

  grid.innerHTML = items.map((match) => matchCard(match)).join('');
  requestAnimationFrame(() => $$('.score-changed').forEach((el) => el.classList.add('pulse')));
}

function matchCard(match) {
  const scoreKey = `${match.id}:${match.score.h}:${match.score.a}:${match.time}`;
  const changed = state.previousScores.get(match.id) && state.previousScores.get(match.id) !== scoreKey;
  state.previousScores.set(match.id, scoreKey);

  return `
    <article class="mc ${match.status}" data-id="${escapeHtml(match.id)}" data-match-href="${matchHref(match)}" tabindex="0" aria-label="${escapeHtml(match.home.name)} против ${escapeHtml(match.away.name)}">
      <div class="mc-hdr">
        <div class="mc-tournament"><span class="mc-flag">${match.flag}</span>${escapeHtml(match.tournament)}</div>
        ${statusBadge(match)}
      </div>
      <div class="mc-body">
        <div class="mc-teams-row">
          ${teamMarkup(match.home, 'home')}
          <div class="mc-score-center score-changed${changed ? ' changed' : ''}">
            ${scoreMarkup(match)}
            ${timeMarkup(match)}
          </div>
          ${teamMarkup(match.away, 'away')}
        </div>
      </div>
      <div class="mc-footer">
        <div class="mc-tabs" role="tablist">
          <button class="mc-tab on" type="button" data-tab="pred" data-id="${escapeHtml(match.id)}">Прогноз</button>
          <button class="mc-tab" type="button" data-tab="stats" data-id="${escapeHtml(match.id)}">Статистика</button>
          <button class="mc-tab" type="button" data-tab="hist" data-id="${escapeHtml(match.id)}">История</button>
        </div>
        <div class="mc-tab-content show" data-panel="pred">${predictionMarkup(match)}</div>
        <div class="mc-tab-content" data-panel="stats">${statsMarkup(match)}</div>
        <div class="mc-tab-content" data-panel="hist">${historyMarkup(match)}</div>
      </div>
    </article>
  `;
}

function teamMarkup(team, side) {
  return `
    <div class="mc-team ${side}">
      <div class="mc-logo" style="border-color:${team.color}44" role="img" aria-label="${escapeHtml(team.name)}">${logoMarkup(team.logo, team.name)}</div>
      <div class="mc-tname">${escapeHtml(team.name)}</div>
    </div>
  `;
}

function logoMarkup(logo, name) {
  if (/^https?:\/\//.test(String(logo))) {
    return `<img src="${escapeHtml(logo)}" alt="${escapeHtml(name)}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${escapeHtml((name || 'T').trim().charAt(0).toUpperCase() || 'T')}'))">`;
  }
  return escapeHtml(logo);
}

function statusBadge(match) {
  if (match.status === 'live') return '<div class="mc-badge badge-live"><span class="badge-live-dot"></span>LIVE</div>';
  if (match.status === 'finished') return '<div class="mc-badge badge-fin">Завершен</div>';
  return '<div class="mc-badge badge-soon">Скоро</div>';
}

function scoreMarkup(match) {
  if (match.status === 'upcoming') return `<div class="mc-score mc-kickoff">${escapeHtml(match.time)}</div>`;
  return `<div class="mc-score ${match.status === 'live' ? 'live-score' : ''}">${escapeHtml(match.score.h)} : ${escapeHtml(match.score.a)}</div>`;
}

function timeMarkup(match) {
  if (match.status === 'upcoming') return '';
  return `<div class="mc-time ${match.status === 'live' ? 'live-time' : ''}">${escapeHtml(match.time)}</div>`;
}

function predictionMarkup(match) {
  const selected = state.selectedPredictions[match.id] ?? -1;
  const labels = match.pred.d === null
    ? [{ key: 'h', label: match.home.name.split(' ')[0] }, { key: 'a', label: match.away.name.split(' ')[0] }]
    : [{ key: 'h', label: 'П1' }, { key: 'd', label: 'Х' }, { key: 'a', label: 'П2' }];

  return `<div class="mc-pred">${labels.map((item, index) => `
    <button class="pred-opt${selected === index ? ' sel' : ''}" type="button" data-pred="${index}" data-id="${escapeHtml(match.id)}">
      <span class="pred-label">${escapeHtml(item.label)}</span>
      <span class="pred-pct">${match.pred[item.key]}%</span>
      <span class="pred-bar" style="width:${match.pred[item.key]}%"></span>
    </button>
  `).join('')}</div>`;
}

function statsMarkup(match) {
  if (!match.stats.length) {
    return '<div class="soft-note">Статистика появится после старта матча.</div>';
  }
  return `<div class="mc-stats">${match.stats.map((stat) => {
    const total = Number(stat.h) + Number(stat.a) || 1;
    const left = Math.round((Number(stat.h) / total) * 100);
    return `
      <div class="mcs-row">
        <span>${escapeHtml(stat.h)}</span>
        <div><div class="mcs-label">${escapeHtml(stat.l)}</div><div class="mcs-track"><span class="mcs-l" style="width:${left}%"></span><span class="mcs-r" style="width:${100 - left}%"></span></div></div>
        <span>${escapeHtml(stat.a)}</span>
      </div>
    `;
  }).join('')}</div>`;
}

function historyMarkup(match) {
  const rows = match.history?.length ? match.history : [{ date: 'Скоро', score: 'нет данных', res: 'd' }];
  return `<div class="mc-history">${rows.map((row) => `
    <div class="hist-row">
      <span class="hist-date">${escapeHtml(row.date)}</span>
      <span>${escapeHtml(match.home.name.split(' ')[0])} vs ${escapeHtml(match.away.name.split(' ')[0])}</span>
      <span class="hist-score">${escapeHtml(row.score)}</span>
      <span class="hist-res hr-${escapeHtml(row.res)}">${row.res === 'w' ? 'W' : row.res === 'l' ? 'L' : 'D'}</span>
    </div>
  `).join('')}</div>`;
}

function renderFeatured() {
  const featured = state.matches.find((match) => match.status === 'live') || state.matches[0];
  if (!featured) {
    $('#FEATURED_CARD').innerHTML = '<div class="featured-empty">Live-матчи появятся здесь после успешного ответа SportDB.dev</div>';
    return;
  }
  $('#FEATURED_CARD').innerHTML = `
    <div class="fmc-header"><div class="fmc-tournament">🏆 ${escapeHtml(featured.tournament)}</div>${statusBadge(featured)}</div>
    <div class="fmc-body">
      <div class="fmc-teams">
        ${featuredTeam(featured.home)}
        <div class="fmc-score-wrap">${scoreMarkup(featured)}${timeMarkup(featured)}</div>
        ${featuredTeam(featured.away)}
      </div>
      <div class="fmc-bar-wrap">${statsMarkup(featured).replace('mc-stats', 'fmc-stats')}</div>
    </div>
  `;
}

function featuredTeam(team) {
  return `<div class="fmc-team"><div class="fmc-logo">${logoMarkup(team.logo, team.name)}</div><div class="fmc-tname">${escapeHtml(team.name)}</div></div>`;
}

function renderAnalytics() {
  $('#ANALYTICS_GRID').innerHTML = `
    <article class="an-card">
      <div class="an-card-head"><div class="an-card-title">Форма команд</div><span class="an-badge">localStorage</span></div>
      <div id="FORM_GUIDE" class="form-stack"></div>
    </article>
    <article class="an-card">
      <div class="an-card-head"><div class="an-card-title">Прогноз дня</div><span class="an-badge cyan">AI mock</span></div>
      <div class="donut-wrap"><div class="donut-score">46%</div><div class="donut-labels"><div><span class="dl-dot green"></span>Победа фаворита</div><div><span class="dl-dot amber"></span>Ничья</div><div><span class="dl-dot red"></span>Андердог</div></div></div>
      <p class="an-note">Расчет строится на сохраненной истории игр и резервной форме, поэтому раздел работает без backend.</p>
    </article>
    <article class="an-card">
      <div class="an-card-head"><div class="an-card-title">API статус</div><span class="an-badge" id="SPORTDB_BADGE">SportDB.dev</span></div>
      <div class="api-stack">
        <div>Обновление: <strong>${SPORT_CONFIG.refreshMs / 1000} сек.</strong></div>
        <div>Источник: <strong>TheSportsDB API</strong></div>
        <div>Origin: <strong>${escapeHtml(window.location.origin)}</strong></div>
        <div>Последний запрос: <strong id="LAST_UPDATE">загрузка</strong></div>
        <div class="api-warning" id="API_WARNING" hidden></div>
        <div class="api-key-box"><span>X-API-Key</span><strong>ключ встроен в frontend headers</strong></div>
      </div>
    </article>
  `;
}

function updateApiStatus(status) {
  const badge = $('#SPORTDB_BADGE');
  if (!badge) return;
  badge.textContent = status === 'connected' ? 'Live connected' : status === 'fallback' ? 'Fallback schedule' : status === 'missing-key' ? 'Need API key' : 'API error';
  badge.classList.toggle('cyan', status === 'connected');
  badge.classList.toggle('danger', status === 'error' || status === 'missing-key' || status === 'fallback');
  const warning = $('#API_WARNING');
  if (!warning) return;
  warning.hidden = status !== 'fallback';
  warning.textContent = status === 'fallback'
    ? `TheSportsDB Live не подключился: ${state.apiError}. Показываем расписание, последние результаты или demo cards.`
    : '';
}

function renderStatsLine() {
  $('#live-count').textContent = state.matches.filter((match) => match.status === 'live').length;
  $('#match-count').textContent = state.matches.length;
  const guide = $('#FORM_GUIDE');
  if (!guide) return;
  guide.innerHTML = state.matches.slice(0, 4).map((match) => `
    <div class="form-row"><span>${escapeHtml(match.home.name)}</span><span>${(match.history || []).slice(0, 5).map((row) => `<b class="fg-${row.res}">${row.res.toUpperCase()}</b>`).join('')}</span></div>
  `).join('');
}

function filteredMatches() {
  return state.matches.filter((match) => {
    const sportMatch = state.activeSport === 'all' || match.sport === state.activeSport;
    const statusMatch = state.status === 'all' || match.status === state.status;
    const text = `${match.home.name} ${match.away.name} ${match.tournament}`.toLowerCase();
    return sportMatch && statusMatch && (!state.query || text.includes(state.query));
  });
}

function switchTab(button) {
  const card = button.closest('.mc');
  const panelName = button.dataset.tab;
  $$('.mc-tab', card).forEach((item) => item.classList.toggle('on', item === button));
  $$('.mc-tab-content', card).forEach((panel) => panel.classList.toggle('show', panel.dataset.panel === panelName));
}

function selectPrediction(button) {
  state.selectedPredictions[button.dataset.id] = Number(button.dataset.pred);
  button.closest('.mc-pred').querySelectorAll('.pred-opt').forEach((item) => item.classList.toggle('sel', item === button));
  showToast('Прогноз сохранен');
}

function setView(view) {
  state.view = view;
  $('#vt-grid').classList.toggle('on', view === 'grid');
  $('#vt-list').classList.toggle('on', view === 'list');
  renderMatches();
}

function countBySport(sport) {
  if (sport === 'all') return state.matches.length || '...';
  return state.matches.filter((match) => match.sport === sport).length || 0;
}

function matchHref(match) {
  const target = window.location.pathname.includes('/pages/') ? 'match.html' : 'pages/match.html';
  const params = new URLSearchParams({
    id: match.id,
    sport: match.sport || SPORT_CONFIG.defaultSport
  });
  return `${target}?${params.toString()}`;
}

function showToast(message) {
  $('#T_M').textContent = message;
  $('#TOAST').classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#TOAST').classList.remove('on'), 3200);
}

window.addEventListener('beforeunload', () => {
  if (refreshTimer) clearInterval(refreshTimer);
});
