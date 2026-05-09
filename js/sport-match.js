import { SPORT_CONFIG } from '../data/sport-config.js';
import { fetchMatchDetails, hasSportDbApiKey } from './api.js';
import { $, escapeHtml, predictionFromHistory, readJson, updateHistoryFromMatches, writeJson } from './sport-utils.js';

const params = new URLSearchParams(window.location.search);
const matchId = params.get('id');
const sport = params.get('sport') || SPORT_CONFIG.defaultSport;

const state = {
  match: null,
  previousScore: '',
  rendered: false,
  apiError: ''
};

let refreshTimer = null;
let toastTimer = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMatchPage, { once: true });
} else {
  initMatchPage();
}

async function initMatchPage() {
  bindChrome();
  renderSkeleton();
  await refreshMatch();
  refreshTimer = setInterval(refreshMatch, SPORT_CONFIG.refreshMs);
}

function bindChrome() {
  $('#THEME_BTN')?.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    $('#THEME_BTN').textContent = next === 'dark' ? '☽' : '☀';
  });
  $('#MOBILE_MENU_BTN')?.addEventListener('click', () => $('#MOBILE_PANEL')?.classList.toggle('on'));
  $('#REFRESH_BTN')?.addEventListener('click', refreshMatch);
}

async function refreshMatch() {
  try {
    const match = await loadMatch();
    const history = updateHistoryFromMatches([match], SPORT_CONFIG.historyKey);
    const enriched = {
      ...match,
      pred: predictionFromHistory(match, history)
    };
    state.apiError = '';
    writeJson(SPORT_CONFIG.matchesKey, mergeCachedMatch(enriched));
    state.match = enriched;
    if (!state.rendered) renderMatchShell(enriched);
    patchMatch(enriched);
    $('#DETAIL_LAST_UPDATE').textContent = formatUpdatedAt();
  } catch (error) {
    console.error('[Sport match]', error);
    state.apiError = error.message || 'SportDB.dev недоступен';
    showToast(hasSportDbApiKey() ? 'Ошибка SportDB.dev. Показаны сохраненные данные матча.' : 'Добавьте SportDB.dev API key на странице спорта.');
    const cached = cachedMatch();
    if (cached) {
      state.match = cached;
      if (!state.rendered) renderMatchShell(cached);
      patchMatch(cached);
    } else {
      renderEmpty();
    }
  }
}

async function loadMatch() {
  if (!matchId) throw new Error('Missing match id');
  return fetchMatchDetails(matchId, sport);
}

function renderSkeleton() {
  $('#MATCH_DETAIL').innerHTML = `
    <section class="match-detail-card">
      <div class="detail-top"><span class="skeleton sk-w1"></span><span class="skeleton sk-badge"></span></div>
      <div class="detail-scoreboard">
        <div class="detail-team"><span class="skeleton sk-logo"></span><span class="skeleton sk-name"></span></div>
        <span class="skeleton detail-score-skeleton"></span>
        <div class="detail-team"><span class="skeleton sk-logo"></span><span class="skeleton sk-name"></span></div>
      </div>
    </section>
  `;
}

function renderMatchShell(match) {
  document.title = `${match.home.name} — ${match.away.name} | Pereuloq Sport`;
  $('#MATCH_DETAIL').innerHTML = `
    <section class="match-detail-card" aria-live="polite">
      <div class="detail-top">
        <div>
          <div class="section-kicker" id="DETAIL_TOURNAMENT"></div>
          <h1 id="DETAIL_TITLE"></h1>
        </div>
        <div id="DETAIL_STATUS"></div>
      </div>
      <div class="detail-scoreboard">
        ${detailTeam('home', match.home)}
        <div class="detail-center">
          <div class="detail-score" id="DETAIL_SCORE"></div>
          <div class="detail-time" id="DETAIL_TIME"></div>
          <div class="detail-updated">Обновлено: <strong id="DETAIL_LAST_UPDATE">—</strong></div>
        </div>
        ${detailTeam('away', match.away)}
      </div>
      <div class="detail-cta-row">
        <a class="detail-back" href="../sport.html">← Все матчи</a>
        <button class="detail-refresh" id="DETAIL_REFRESH" type="button">Обновить сейчас</button>
      </div>
    </section>

    <section class="match-panels">
      <article class="match-panel">
        <div class="an-card-head"><div class="an-card-title">Статистика</div><span class="an-badge">live DOM</span></div>
        <div id="DETAIL_STATS" class="detail-stats"></div>
      </article>
      <article class="match-panel">
        <div class="an-card-head"><div class="an-card-title">События матча</div><span class="an-badge cyan">timeline</span></div>
        <div id="DETAIL_EVENTS" class="detail-events"></div>
      </article>
      <article class="match-panel">
        <div class="an-card-head"><div class="an-card-title">Прогноз</div><span class="an-badge">local history</span></div>
        <div id="DETAIL_PREDICTION" class="detail-prediction"></div>
      </article>
    </section>
  `;
  $('#DETAIL_REFRESH')?.addEventListener('click', refreshMatch);
  state.rendered = true;
}

function patchMatch(match) {
  $('#DETAIL_TOURNAMENT').textContent = match.tournament;
  $('#DETAIL_TITLE').textContent = `${match.home.name} — ${match.away.name}`;
  $('#DETAIL_STATUS').innerHTML = statusBadge(match);
  $('#DETAIL_HOME_NAME').textContent = match.home.name;
  $('#DETAIL_AWAY_NAME').textContent = match.away.name;
  $('#DETAIL_HOME_LOGO').innerHTML = logoMarkup(match.home.logo, match.home.name);
  $('#DETAIL_AWAY_LOGO').innerHTML = logoMarkup(match.away.logo, match.away.name);

  const score = match.status === 'upcoming' ? 'vs' : `${match.score.h ?? 0} : ${match.score.a ?? 0}`;
  const scoreNode = $('#DETAIL_SCORE');
  if (state.previousScore && state.previousScore !== score) {
    scoreNode.classList.remove('score-pop');
    void scoreNode.offsetWidth;
    scoreNode.classList.add('score-pop');
  }
  scoreNode.textContent = score;
  state.previousScore = score;
  $('#DETAIL_TIME').textContent = match.status === 'upcoming' ? match.time : `${match.time} · ${match.status === 'live' ? 'LIVE' : 'матч завершен'}`;
  patchStats(match.stats || []);
  patchEvents(match.events || []);
  patchPrediction(match.pred);
}

function detailTeam(side, team) {
  const upper = side.toUpperCase();
  return `
    <div class="detail-team">
      <div class="detail-logo" id="DETAIL_${upper}_LOGO">${logoMarkup(team.logo, team.name)}</div>
      <div class="detail-team-name" id="DETAIL_${upper}_NAME">${escapeHtml(team.name)}</div>
    </div>
  `;
}

function patchStats(stats) {
  $('#DETAIL_STATS').innerHTML = stats.length ? stats.map((stat) => {
    const total = Number(stat.h) + Number(stat.a) || 1;
    const left = Math.round((Number(stat.h) / total) * 100);
    return `
      <div class="detail-stat-row">
        <strong>${escapeHtml(stat.h)}</strong>
        <div><span>${escapeHtml(stat.l)}</span><div class="mcs-track"><i class="mcs-l" style="width:${left}%"></i><i class="mcs-r" style="width:${100 - left}%"></i></div></div>
        <strong>${escapeHtml(stat.a)}</strong>
      </div>
    `;
  }).join('') : '<div class="soft-note">Статистика появится после старта матча.</div>';
}

function patchEvents(events) {
  $('#DETAIL_EVENTS').innerHTML = events.length ? events.map((event) => `
    <div class="event-row">
      <span class="event-minute">${escapeHtml(event.minute)}</span>
      <div><strong>${escapeHtml(event.type)}</strong><p>${escapeHtml(event.team)} · ${escapeHtml(event.player)}</p><small>${escapeHtml(event.detail)}</small></div>
    </div>
  `).join('') : '<div class="soft-note">Событий пока нет.</div>';
}

function patchPrediction(pred = { h: 40, d: 25, a: 35 }) {
  $('#DETAIL_PREDICTION').innerHTML = `
    <div class="detail-pred-row"><span>П1</span><strong>${pred.h}%</strong><i style="width:${pred.h}%"></i></div>
    <div class="detail-pred-row"><span>Х</span><strong>${pred.d ?? 0}%</strong><i style="width:${pred.d ?? 0}%"></i></div>
    <div class="detail-pred-row"><span>П2</span><strong>${pred.a}%</strong><i style="width:${pred.a}%"></i></div>
  `;
}

function statusBadge(match) {
  if (match.status === 'live') return '<div class="mc-badge badge-live"><span class="badge-live-dot"></span>LIVE</div>';
  if (match.status === 'finished') return '<div class="mc-badge badge-fin">Завершен</div>';
  return '<div class="mc-badge badge-soon">Скоро</div>';
}

function logoMarkup(logo, name) {
  if (/^https?:\/\//.test(String(logo))) {
    return `<img src="${escapeHtml(logo)}" alt="${escapeHtml(name)}" loading="lazy">`;
  }
  return escapeHtml(logo || '●');
}

function cachedMatch() {
  const matches = readJson(SPORT_CONFIG.matchesKey, []);
  return matches.find((item) => item.id === matchId);
}

function mergeCachedMatch(match) {
  const matches = readJson(SPORT_CONFIG.matchesKey, []);
  const next = [match, ...matches.filter((item) => item.id !== match.id)].slice(0, 30);
  return next;
}

function renderEmpty() {
  $('#MATCH_DETAIL').innerHTML = `
    <section class="match-detail-card empty-state sportdb-empty">
      <div class="es-ico">⌕</div>
      <div class="es-txt">Матч не загрузился.</div>
      <div class="es-help">${escapeHtml(state.apiError || 'SportDB.dev не вернул данные по match_id.')}</div>
      <div class="es-help">Для localhost добавьте origin <strong>${escapeHtml(window.location.origin)}</strong> в настройках ключа SportDB.dev.</div>
      <a class="detail-back" href="../sport.html">Все матчи</a>
    </section>`;
}

function showToast(message) {
  $('#T_M').textContent = message;
  $('#TOAST').classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#TOAST').classList.remove('on'), 3200);
}

function formatUpdatedAt() {
  return new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(new Date());
}

window.addEventListener('beforeunload', () => {
  if (refreshTimer) clearInterval(refreshTimer);
});
