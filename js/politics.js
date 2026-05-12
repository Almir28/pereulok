const POLITICS_STATE = {
  data: null,
  filter: 'Все',
  query: ''
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function normalize(value = '') {
  return String(value).toLowerCase().replace(/\s+/g, ' ').trim();
}

async function fetchPoliticsData() {
  const response = await fetch('data/politics-feed.json', { cache: 'no-store' });
  if (!response.ok) throw new Error(`Politics feed failed: ${response.status}`);
  return response.json();
}

function articleUrl(article) {
  return article.url || `politics/${article.id}.html`;
}

function renderTicker(items = []) {
  const track = $('#POLITICS_TICKER');
  if (!track) return;
  const content = items.map((item) => `<span class="ticker-item">${item}</span>`).join('');
  track.innerHTML = content + content;
}

function renderHero(articles = []) {
  const hero = $('#POLITICS_HERO_CARD');
  const lead = articles[0];
  if (!hero || !lead) return;
  hero.innerHTML = `
    <img src="${lead.image}" alt="${lead.title}" loading="eager" decoding="async">
    <div class="hero-card-content">
      <div class="status-pill"><span class="live-dot"></span>${lead.status}</div>
      <h2>${lead.title}</h2>
      <p>${lead.dek}</p>
      <a class="btn-gold" href="${articleUrl(lead)}">Открыть материал →</a>
    </div>
  `;
}

function renderFilters(categories = []) {
  const wrap = $('#POLITICS_FILTERS');
  if (!wrap) return;
  wrap.innerHTML = categories.map((category) => (
    `<button class="filter-chip${category === POLITICS_STATE.filter ? ' active' : ''}" type="button" data-politics-filter="${category}">${category}</button>`
  )).join('');
}

function visibleArticles() {
  const articles = POLITICS_STATE.data?.articles || [];
  const query = normalize(POLITICS_STATE.query);
  return articles.filter((article) => {
    const matchesFilter = POLITICS_STATE.filter === 'Все' || article.category === POLITICS_STATE.filter || article.region === POLITICS_STATE.filter;
    const haystack = normalize([article.title, article.dek, article.category, article.region, ...(article.tags || [])].join(' '));
    return matchesFilter && (!query || haystack.includes(query));
  });
}

function cardTemplate(article, index) {
  const size = index === 0 ? 'feature' : 'compact';
  return `
    <article class="politics-card ${size} reveal">
      <a href="${articleUrl(article)}" aria-label="${article.title}">
        <div class="card-media"><img src="${article.image}" alt="${article.title}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async"></div>
        <div class="card-shade"></div>
        <div class="card-content">
          <div class="card-row">
            <span class="card-tag">${article.category}</span>
            <span class="card-tag">${article.urgency}</span>
          </div>
          <h3>${article.title}</h3>
          <p>${article.dek}</p>
          <div class="card-footer"><span>${article.date}</span><span>${article.read}</span></div>
        </div>
      </a>
    </article>
  `;
}

function renderArticles() {
  const grid = $('#POLITICS_GRID');
  if (!grid) return;
  const articles = visibleArticles();
  grid.innerHTML = articles.length
    ? articles.map(cardTemplate).join('')
    : '<div class="side-card" style="grid-column:1/-1"><h3>Материалов не найдено</h3><p>Попробуйте другой фильтр или поисковый запрос.</p></div>';
  observeReveal();
}

function renderTrending(articles = []) {
  const list = $('#POLITICS_TRENDING');
  if (!list) return;
  list.innerHTML = articles.slice(0, 5).map((article, index) => `
    <a class="trend-item" href="${articleUrl(article)}">
      <b>${String(index + 1).padStart(2, '0')}</b>
      <span>${article.title}</span>
    </a>
  `).join('');
}

function renderSponsors(sponsors = []) {
  const slots = $$('.sponsor-card[data-sponsor-slot]');
  slots.forEach((slot, index) => {
    const sponsor = sponsors[index % sponsors.length];
    if (!sponsor) return;
    slot.innerHTML = `
      <div class="sponsor-label">${sponsor.label}</div>
      <h3>${sponsor.title}</h3>
      <p>${sponsor.text}</p>
      <button type="button">${sponsor.cta}</button>
    `;
  });
}

let revealObserver;
function observeReveal() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  $$('.reveal').forEach((node) => revealObserver.observe(node));
}

function setupEvents() {
  $('#POLITICS_MENU')?.addEventListener('click', () => $('#POLITICS_MOBILE')?.classList.toggle('open'));
  $('#POLITICS_MOBILE')?.addEventListener('click', (event) => {
    if (event.target.closest('a')) $('#POLITICS_MOBILE')?.classList.remove('open');
  });
  $('#POLITICS_SEARCH')?.addEventListener('input', (event) => {
    POLITICS_STATE.query = event.target.value;
    renderArticles();
  });
  $('#POLITICS_FILTERS')?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-politics-filter]');
    if (!button) return;
    POLITICS_STATE.filter = button.dataset.politicsFilter;
    renderFilters(POLITICS_STATE.data.categories);
    renderArticles();
  });
  document.addEventListener('click', (event) => {
    const video = event.target.closest('video[data-politics-video]');
    if (!video) return;
    video.muted = !video.muted;
  });
}

async function initPolitics() {
  setupEvents();
  try {
    POLITICS_STATE.data = await fetchPoliticsData();
    const articles = POLITICS_STATE.data.articles || [];
    renderTicker(POLITICS_STATE.data.ticker || []);
    renderHero(articles);
    renderFilters(POLITICS_STATE.data.categories || ['Все']);
    renderArticles();
    renderTrending(articles);
    renderSponsors(POLITICS_STATE.data.sponsors || []);
  } catch (error) {
    console.error(error);
    const grid = $('#POLITICS_GRID');
    if (grid) grid.innerHTML = '<div class="side-card" style="grid-column:1/-1"><h3>Раздел временно недоступен</h3><p>Не удалось загрузить политическую ленту. Попробуйте обновить страницу позже.</p></div>';
  }
}

document.addEventListener('DOMContentLoaded', initPolitics);
