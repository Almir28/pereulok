import { products, categories } from '/js/shop-data.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const state = { cat: 'all', q: '', sort: 'popular', onlyPre: false };

const fmtCurrency = (value, currency) => {
  try { return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(value); }
  catch { return `${value} ${currency}`; }
};

// Promo rotation state
let promoRotation = [];
let promoIdx = 0;
let promoTimer = null;

function setActiveCategory(catId) {
  $$('#categoryTabs .filter-chip').forEach(b => b.classList.toggle('is-active', b.dataset.cat === catId));
}

function buildCategoryTabs() {
  const wrap = $('#categoryTabs');
  if (!wrap) return;
  const all = [{ id: 'all', name: 'Все' }, ...categories];
  wrap.innerHTML = all.map(c => `<button data-cat="${c.id}" class="filter-chip ${c.id==='all' ? 'is-active' : ''}">${c.name}</button>`).join('');
  wrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    state.cat = btn.dataset.cat;
    setActiveCategory(state.cat);
    renderGrid();
  });
}

function buildCategoryMenu() {
  const panel = $('#catMenuPanel');
  const list = $('#catMenu');
  const burger = $('#catBurger');
  if (!panel || !list || !burger) return;
  const all = [{ id: 'all', name: 'Все' }, ...categories];
  const icon = (id) => {
    switch(id){
      case 'all': return '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5h4v4H5V5zm10 0h4v4h-4V5zM5 15h4v4H5v-4zm10 0h4v4h-4v-4zM10 10h4v4h-4v-4z"/></svg>';
      case 'subs': return '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>';
      case 'digital': return '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5-5 5-5-5z"/></svg>';
      case 'services': return '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M22.7 19.3l-6.4-6.4a7 7 0 10-3.4 3.4l6.4 6.4 3.4-3.4zM4 10a6 6 0 1112 0A6 6 0 014 10z"/></svg>';
      default: return '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="4"/></svg>';
    }
  };
  list.innerHTML = all.map(c => `
    <button data-cat="${c.id}" role="menuitem" class="w-full text-left inline-flex items-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800">
      ${icon(c.id)}
      <span>${c.name}</span>
    </button>`).join('');

  const close = () => {
    panel.classList.remove('show');
    panel.addEventListener('transitionend', function onEnd(){ panel.classList.add('hidden'); panel.removeEventListener('transitionend', onEnd); }, { once: true });
    burger.setAttribute('aria-expanded','false');
  };
  const open = () => {
    panel.classList.remove('hidden');
    requestAnimationFrame(()=> panel.classList.add('show'));
    burger.setAttribute('aria-expanded','true');
  };
  burger.addEventListener('click', () => { (panel.classList.contains('hidden') || !panel.classList.contains('show')) ? open() : close(); });

  panel.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    state.cat = btn.dataset.cat;
    setActiveCategory(state.cat);
    renderGrid();
    close();
  });

  document.addEventListener('click', (e) => {
    if (panel.classList.contains('hidden')) return;
    const within = e.target.closest('#catMenuPanel, #catBurger');
    if (!within) close();
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
}

// Mobile bottom-sheet categories
function buildCategorySheet() {
  const sheet = document.getElementById('catSheet');
  const list = document.getElementById('catSheetList');
  const openBtn = document.getElementById('catFab');
  const closeBtn = document.getElementById('catSheetClose');
  if (!sheet || !list || !openBtn) return;
  const all = [{ id: 'all', name: 'Все' }, ...categories];
  list.innerHTML = all.map(c => (
    `<button data-cat="${c.id}" class="h-11 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800">${c.name}</button>`
  )).join('');
  const open = () => { sheet.classList.remove('hidden'); requestAnimationFrame(()=> sheet.classList.add('open')); document.body.style.overflow = 'hidden'; };
  const close = () => { sheet.classList.remove('open'); setTimeout(()=>{ sheet.classList.add('hidden'); document.body.style.overflow=''; }, 220); };
  openBtn.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  sheet.addEventListener('click', (e)=>{ if (e.target === sheet || e.target.classList.contains('sheet-backdrop')) close(); });
  list.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    state.cat = btn.dataset.cat;
    setActiveCategory(state.cat);
    renderHomeSections();
    close();
  });
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape' && !sheet.classList.contains('hidden')) close(); });
}

function getFilteredSorted() {
  let list = products.slice();
  if (state.onlyPre) list = list.filter(p => p.preorder);
  if (state.cat !== 'all') list = list.filter(p => p.category === state.cat);
  if (state.q) {
    const q = state.q.toLowerCase();
    list = list.filter(p => (p.title + ' ' + p.short + ' ' + p.description).toLowerCase().includes(q));
  }
  switch (state.sort) {
    case 'price-asc': list.sort((a,b)=> a.price - b.price); break;
    case 'price-desc': list.sort((a,b)=> b.price - a.price); break;
    case 'new': list.sort((a,b)=> (b.addedAt||0) - (a.addedAt||0)); break;
    default: list.sort((a,b)=> (b.popularity||0) - (a.popularity||0));
  }
  return list;
}

function productCard(p) {
  const tag = p.type === 'subscription' ? 'Подписка' : p.type === 'digital' ? 'Цифровой' : 'Услуга';
  const price = fmtCurrency(p.price, p.currency) + (p.period ? ` ${p.period}` : '');
  return `
  <article class="editorial-item glass glass-border bg-white/70 dark:bg-neutral-900/70 shadow-soft">
    <a href="/product.html?id=${encodeURIComponent(p.id)}" class="block group">
      <div class="relative h-36 sm:h-40 md:h-44">
        <img src="${p.cover}" alt="${p.title}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async">
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
        <div class="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-700 text-xs px-2 py-1">
          ${tag}
        </div>
      </div>
      <div class="px-4 pt-3 pb-4">
        <h3 class="title text-[15px] font-semibold leading-5">${p.title}</h3>
        <p class="mt-1 text-xs text-neutral-600 dark:text-neutral-300 line-clamp-2">${p.short}</p>
        <div class="mt-2 flex items-center justify-between">
          <div class="text-sm font-semibold">${price}</div>
          <button class="rounded-xl bg-black text-white dark:bg-indigo-600 px-3 py-1.5 text-[11px] font-semibold group-hover:opacity-90">Купить</button>
        </div>
      </div>
    </a>
  </article>`;
}

function tileCard(p) {
  return `
  <button class="h-full text-left bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-2 hover:shadow-md transition" data-product="${p.id}">
    <div class="aspect-4-5 bg-neutral-100 dark:bg-neutral-800"><img src="${p.cover}" alt="${p.title}" loading="lazy" decoding="async"></div>
    <div class="mt-2 text-[13px] md:text-[14px] font-semibold leading-5 line-clamp-2 min-h-[2.6em]" title="${p.title}">${p.title}</div>
  </button>`;
}

function renderSections() {
  const byPopular = products.slice().sort((a,b)=>(b.popularity||0)-(a.popularity||0)).slice(0,18);
  const byNew = products.slice().sort((a,b)=>(b.addedAt||0)-(a.addedAt||0)).slice(0,18);
  const byReco = products.filter(p=>p.recommended).slice(0,18);
  const set = (id, list) => { const el = document.getElementById(id); if (el) el.innerHTML = list.map(tileCard).join(''); };
  set('popular', byPopular); set('new', byNew); set('recommended', byReco);
}

function heroTile(p, variant='dark') {
  const price = fmtCurrency(p.price, p.currency) + (p.period ? ` ${p.period}` : '');
  const ctaClass = variant==='dark' ? 'cta-dark' : 'cta-light';
  return `
    <div class="tile" data-product="${p.id}">
      <img src="${p.cover}" alt="${p.title}">
      <div class="shade"></div>
      <div class="copy">
        <div class="headline">${p.title}</div>
        <div class="subhead">${(p.short || p.description || '').slice(0,120)}</div>
        <div class="mt-2 text-sm opacity-90">${price}</div>
        <button class="cta ${ctaClass} mt-3" type="button">Купить</button>
      </div>
    </div>`;
}

function renderHero() {
  const picks = products.filter(p=>p.recommended).slice(0,2);
  const alt = products.slice(0,2);
  const [a,b] = (picks.length>=2 ? picks : alt);
  const wrap = document.getElementById('heroTiles');
  if (!wrap) return;
  wrap.innerHTML = [a && heroTile(a,'dark'), b && heroTile(b,'light')].filter(Boolean).join('');
}

function renderPromos() {
  // Thin promo strip rotation (every 3s)
  const wideEl = document.getElementById('promoStrip');
  if (wideEl) {
    const subs = products.filter(p => p.type === 'subscription');
    const rec = products.filter(p => p.recommended);
    const pop = products.slice().sort((a,b)=>(b.popularity||0)-(a.popularity||0));
    promoRotation = [...new Set([...(rec||[]), ...(subs||[]), ...pop])];
    if (!promoRotation.length) promoRotation = products.slice();

    const setWide = (p) => {
      if (!p) return;
      if (!wideEl.dataset.fadeInit) { wideEl.style.transition = 'opacity .5s ease'; wideEl.dataset.fadeInit = '1'; }
      wideEl.style.opacity = '0';
      setTimeout(() => {
        wideEl.setAttribute('data-product', p.id);
        wideEl.innerHTML = `
          <div class="bg"></div>
          <div class="copy">
            <span class="text-xs px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60">Акция</span>
            <span class="title">${p.title}</span>
            <span class="text-xs text-neutral-600 dark:text-neutral-300 hidden sm:inline">${(p.short || p.description || '').slice(0,120)}</span>
            <button class="btn bg-indigo-600 text-white" type="button">Купить</button>
          </div>`;
        wideEl.style.opacity = '1';
      }, 160);
    };

    // initial
    promoIdx = 0; setWide(promoRotation[promoIdx]);
    // rotate unless reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      clearInterval(promoTimer);
      promoTimer = setInterval(() => {
        promoIdx = (promoIdx + 1) % promoRotation.length;
        setWide(promoRotation[promoIdx]);
      }, 3000);
    }
  }

  // Removed secondary promo tiles to keep focus on products
}

function renderHomeSections() {
  let pool = products.slice();
  if (state.cat !== 'all') pool = pool.filter(p => p.category === state.cat);
  if (state.q) {
    const q = state.q.toLowerCase();
    pool = pool.filter(p => (p.title + ' ' + p.short + ' ' + p.description).toLowerCase().includes(q));
  }
  const popular16 = pool.slice().sort((a,b)=>(b.popularity||0)-(a.popularity||0)).slice(0,16);
  const new16 = pool.slice().sort((a,b)=>(b.addedAt||0)-(a.addedAt||0)).slice(0,16);
  const set = (id,list)=>{ const el = document.getElementById(id); if (el) el.innerHTML = list.map(tileCard).join(''); };
  set('popularGrid', popular16);
  set('newGrid', new16);
}

function buildCats() {
  const wrap = $('#cats');
  if (!wrap) return;
  const all = [{ id:'all', name:'Все' }, ...categories];
  wrap.innerHTML = '';
  all.forEach(c => {
    const btn = document.createElement('button');
    btn.className = 'px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 whitespace-nowrap';
    btn.textContent = c.name; btn.dataset.id = c.id;
    btn.addEventListener('click', ()=> { state.cat = c.id; setActiveCategory(state.cat); renderGrid(); });
    wrap.appendChild(btn);
  });
  wrap.classList.remove('hidden');
  setActiveCategory(state.cat);
}

function renderGrid() {
  const grid = $('#grid');
  if (!grid) return; // grid removed when showing only section blocks
  const empty = $('#emptyState');
  const list = getFilteredSorted();
  grid.innerHTML = list.map(tileCard).join('');
  empty?.classList.toggle('hidden', list.length > 0);
}

function attachControls() {
  $('#search')?.addEventListener('input', (e) => { state.q = e.target.value; renderHomeSections(); renderGrid(); });
  $('#sort')?.addEventListener('change', (e) => { state.sort = e.target.value; renderGrid(); });
}

// Modal logic
function openProductModal(p) {
  const modal = document.getElementById('productModal');
  if (!modal) return;
  $('#mImg', modal).src = p.cover;
  $('#mTitle', modal).textContent = p.title;
  $('#mDesc', modal).textContent = p.short || p.description || '';
  $('#mPrice', modal).textContent = fmtCurrency(p.price, p.currency) + (p.period ? ` ${p.period}` : '');
  $('#mTags', modal).innerHTML = (p.features||[]).slice(0,3).map(t=>`<span class="text-xs px-2 py-1 rounded-full border border-neutral-200 dark:border-neutral-700">${t}</span>`).join(' ');
  $('#buyBtn', modal).onclick = () => {
    const url = p?.payment?.checkoutUrl;
    if (url && !url.startsWith('#REPLACE')) window.open(url, '_blank','noopener');
    else location.href = `/product.html?id=${encodeURIComponent(p.id)}`;
  };
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

document.addEventListener('click', (e) => {
  const trg = e.target.closest('[data-product]');
  if (trg) {
    const id = trg.getAttribute('data-product');
    const p = products.find(x => x.id === id);
    if (p) openProductModal(p);
  }
  if (e.target.matches('#productModal [data-close]')) {
    const m = document.getElementById('productModal');
    m?.classList.add('hidden'); m?.classList.remove('flex');
  }
});

  function init() {
    // category UI removed from header; keep functions no-op if elements absent
    renderPromos();
    buildCategorySheet();
    renderHomeSections();
    attachControls();
    renderGrid();
    $('#year').textContent = String(new Date().getFullYear());
  }

document.addEventListener('DOMContentLoaded', init);
