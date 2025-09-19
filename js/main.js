const FEED_ENDPOINT = '/posts/index.json';
const feedReady = renderDynamicFeed();

async function renderDynamicFeed() {
  const featuredContainer = document.getElementById('featuredGrid');
  const latestGrid = document.getElementById('latestGrid');
  const overlayHero = document.getElementById('overlayHero');
  const overlayList = document.getElementById('overlayList');
  if (!featuredContainer || !latestGrid) return;

  try {
    const res = await fetch(FEED_ENDPOINT, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);
    const raw = await res.json();
    if (!Array.isArray(raw)) throw new Error('Feed payload is not an array');

    const posts = raw
      .map((post) => ({
        ...post,
        url: `/posts/${post.slug}.html`,
        dateValue: Date.parse(post.date)
      }))
      .filter((post) => !Number.isNaN(post.dateValue))
      .sort((a, b) => b.dateValue - a.dateValue);

    const formatFullDate = (iso) => safeFormatDate(iso, { day: 'numeric', month: 'long', year: 'numeric' });

    renderFeatured(posts.filter((p) => p.featured), featuredContainer, formatFullDate);
    renderLatest(posts, latestGrid, formatFullDate);
    renderOverlay(posts, overlayHero, overlayList, formatFullDate);

    document.dispatchEvent(new CustomEvent('feed:rendered', { detail: { posts } }));
  } catch (err) {
    console.error('[lenta] не удалось отрисовать ленту', err);
  }
}

function safeFormatDate(iso, options) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  try {
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
  } catch {
    return date.toLocaleDateString('ru-RU', options);
  }
}

function renderFeatured(posts, container, formatDate) {
  if (!container) return;
  container.innerHTML = '';
  if (!posts.length) {
    container.closest('section')?.classList.add('hidden');
    return;
  }
  container.closest('section')?.classList.remove('hidden');
  posts.forEach((post) => container.appendChild(createFeaturedCard(post, formatDate)));
}

function renderLatest(posts, container, formatDate) {
  if (!container) return;
  container.innerHTML = '';
  posts.forEach((post) => container.appendChild(createGridCard(post, formatDate)));
}

function renderOverlay(posts, heroContainer, listContainer, formatDate) {
  if (!heroContainer && !listContainer) return;
  const [hero, ...rest] = posts;
  if (heroContainer) {
    heroContainer.innerHTML = '';
    if (hero) heroContainer.appendChild(createOverlayHero(hero, formatDate));
  }
  if (listContainer) {
    listContainer.innerHTML = '';
    const pool = rest.slice(0, 9);
    pool.forEach((post) => listContainer.appendChild(createOverlayCard(post, formatDate)));
  }
}

function createFeaturedCard(post, formatDate) {
  const card = document.createElement('a');
  card.href = post.url;
  card.className = 'card group overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 transition glass glass-border shadow-soft bg-white/70 dark:bg-neutral-900/60';
  card.setAttribute('data-published', post.date);
  card.dataset.cat = post.category;
  card.innerHTML = `
    <div class="aspect-16-9">
      <img src="${post.image}" alt="${post.imageAlt || ''}" loading="lazy" decoding="async">
    </div>
    <div class="p-6">
      <div class="text-xs text-red-600 font-semibold">${post.categoryLabel}</div>
      <h3 class="mt-2 text-lg font-semibold group-hover:text-red-600 transition">${post.title}</h3>
      <p class="card-excerpt mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">${post.excerpt}</p>
      <div class="card-date mt-4 text-xs text-neutral-500">${formatDate(post.date)}</div>
    </div>
  `;
  return card;
}

function createGridCard(post, formatDate) {
  const layoutConfig = {
    feature: {
      wrapper: 'md:col-span-4 md:row-span-1',
      media: 'relative aspect-16-9 md:aspect-auto md:h-[300px]',
      content: 'px-6 pt-5 pb-4 md:px-8 md:pt-6 md:pb-4',
      withGradient: true,
      shadow: true
    },
    tall: {
      wrapper: 'md:col-span-2 md:row-span-1',
      media: 'relative h-56 md:h-[300px]',
      content: 'px-6 pt-5 pb-4',
      withGradient: false,
      shadow: false
    },
    standard: {
      wrapper: 'md:col-span-3 md:row-span-1',
      media: 'relative aspect-16-9',
      content: 'p-6',
      withGradient: false,
      shadow: true
    }
  };

  const cfg = layoutConfig[post.layout] || layoutConfig.standard;
  const card = document.createElement('a');
  card.href = post.url;
  card.className = `editorial-item card ${cfg.wrapper} glass glass-border bg-white/70 dark:bg-neutral-900/60${cfg.shadow ? ' shadow-soft' : ''}`;
  card.setAttribute('data-published', post.date);
  card.dataset.cat = post.category;
  card.setAttribute('data-layout', post.layout || 'standard');
  card.innerHTML = `
    <div class="${cfg.media}">
      <img src="${post.image}" alt="${post.imageAlt || ''}" class="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async">
      ${cfg.withGradient ? '<div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent"></div>' : ''}
    </div>
    <div class="${cfg.content}">
      <div class="text-xs text-red-600 font-semibold">${post.categoryLabel}</div>
      <h3 class="title mt-2 text-xl md:text-2xl font-semibold">${post.title}</h3>
      <p class="card-excerpt mt-3 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">${post.excerpt}</p>
      <div class="card-date mt-3 text-xs text-neutral-500">${formatDate(post.date)}</div>
    </div>
  `;
  return card;
}

function createOverlayHero(post, formatDate) {
  const hero = document.createElement('a');
  hero.href = post.url;
  hero.className = 'group block md:col-span-2';
  hero.setAttribute('data-published', post.date);
  hero.dataset.cat = post.category;
  hero.innerHTML = `
    <div class="rounded-3xl overflow-hidden">
      <img class="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-[1.03] transition-transform duration-700" src="${post.image}" alt="${post.imageAlt || ''}" loading="lazy" decoding="async">
    </div>
    <div class="mt-4 text-red-600 text-xs font-semibold">${post.categoryLabel}</div>
    <h3 class="mt-1 text-3xl md:text-4xl font-serif font-bold leading-snug group-hover:text-red-600">${post.title}</h3>
    <p class="mt-3 text-neutral-600 dark:text-neutral-300">${post.excerpt}</p>
    <div class="card-date mt-3 text-xs text-neutral-500">${formatDate(post.date)}</div>
  `;
  return hero;
}

function createOverlayCard(post, formatDate) {
  const card = document.createElement('a');
  card.href = post.url;
  card.className = 'group block rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 p-4 md:p-5 hover:border-red-200/60 dark:hover:border-red-700/40 transition-colors';
  card.setAttribute('data-published', post.date);
  card.dataset.cat = post.category;
  card.innerHTML = `
    <div class="overflow-hidden rounded-xl">
      <img class="w-full h-40 md:h-44 object-cover group-hover:scale-[1.03] transition-transform duration-500" src="${post.image}" alt="${post.imageAlt || ''}" loading="lazy" decoding="async">
    </div>
    <div class="mt-3 text-red-600 text-xs font-semibold">${post.categoryLabel}</div>
    <h4 class="mt-2 font-serif text-xl font-semibold leading-snug group-hover:text-red-600">${post.title}</h4>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">${post.excerpt}</p>
    <div class="card-date mt-3 text-xs text-neutral-500">${formatDate(post.date)}</div>
  `;
  return card;
}

// Mobile drawer nav (global)
(() => {
  const trigger = document.getElementById('menuBtn');
  const drawer = document.getElementById('mobileNav');
  const overlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('mobileClose');
  if (!trigger || !drawer || !overlay || !closeBtn) return;
  const links = drawer.querySelectorAll('a');
  const body = document.body;
  const TRANSITION = 300;

  const openMenu = () => {
    drawer.classList.remove('hidden');
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => {
      drawer.classList.add('is-active');
      overlay.classList.add('is-active');
    });
    trigger.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    drawer.classList.remove('is-active');
    overlay.classList.remove('is-active');
    trigger.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
    setTimeout(() => {
      if (drawer.classList.contains('is-active')) return;
      drawer.classList.add('hidden');
      overlay.classList.add('hidden');
    }, TRANSITION);
  };

  trigger.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);
  links.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
})();

// Preloader: hide when content loaded
window.addEventListener('load', () => {
  const p = document.getElementById('preloader');
  if (p) {
    p.style.opacity = '0';
    setTimeout(() => p.remove(), 350);
  }
  // Hero intro animation
  const hero = document.getElementById('hero');
  if (hero) {
    hero.animate(
      [{ transform: 'scale(1.02)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 }],
      { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
    );
  }
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Subtle moving spotlight in hero
const spot = document.getElementById('spot');
if (spot) {
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX, y = e.clientY;
    spot.style.transform = `translate(${x/20}px, ${y/20}px)`;
  });
}

// Scroll progress bar + header shadow
const headerEl = document.querySelector('header.sticky-header');
const progressEl = document.getElementById('scrollProgress');
const onScroll = () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const p = Math.min(1, Math.max(0, y / max));
  if (progressEl) progressEl.style.transform = `scaleX(${p})`;
  if (headerEl) headerEl.classList.toggle('is-scrolled', y > 4);
  const toTop = document.getElementById('toTop');
  if (toTop) toTop.classList.toggle('show', y > 400);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Back to top
document.getElementById('toTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Nav scrollspy active link
const navAnchors = Array.from(document.querySelectorAll('nav a.nav-link[href^="#"]'));
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = `#${entry.target.id}`;
    navAnchors.forEach((a) => {
      if (a.getAttribute('href') === id) {
        a.classList.toggle('active', entry.isIntersecting);
      }
    });
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

['latest', 'about'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) spyObserver.observe(el);
});

// Lenta overlay open/close
const lentaTriggers = document.querySelectorAll('[data-open-lenta]');
const lentaOverlay = document.getElementById('lentaOverlay');
const lentaClose = document.getElementById('closeLenta');
const openLenta = (e) => {
  e?.preventDefault();
  if (!lentaOverlay) return;
  lentaOverlay.classList.remove('hidden');
  // allow CSS transition on panel
  requestAnimationFrame(() => {
    const panel = lentaOverlay.querySelector('.modal');
    panel?.classList.add('show');
  });
  document.body.style.overflow = 'hidden';
};
const closeLenta = () => {
  if (!lentaOverlay) return;
  const panel = lentaOverlay.querySelector('.modal');
  panel?.classList.remove('show');
  setTimeout(() => {
    lentaOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }, 250);
};
lentaTriggers.forEach((el) => el.addEventListener('click', openLenta));
lentaClose?.addEventListener('click', closeLenta);
lentaOverlay?.addEventListener('click', (e) => {
  if (e.target === lentaOverlay) closeLenta();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lentaOverlay?.classList.contains('hidden')) closeLenta();
});

// If URL has #lenta, open on load
if (location.hash === '#lenta') {
  setTimeout(() => openLenta(), 0);
}

function initFeedSort() {
  const grid = document.querySelector('#latest .editorial-grid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.editorial-item'));
  if (!items.length) return;
  const parse = (el) => {
    const v = el.getAttribute('data-published');
    const t = v ? Date.parse(v) : NaN;
    return Number.isNaN(t) ? 0 : t;
  };
  items.sort((a, b) => parse(b) - parse(a));
  items.forEach((el) => grid.appendChild(el));
}

function initFormattedDates() {
  const apply = (root = document) => {
    root.querySelectorAll('[data-published]').forEach((node) => {
      const iso = node.getAttribute('data-published');
      const dateEl = node.querySelector('.card-date');
      if (iso && dateEl) dateEl.textContent = safeFormatDate(iso, { day: 'numeric', month: 'long', year: 'numeric' });
    });
  };
  apply(document);
  const overlay = document.getElementById('lentaOverlay');
  overlay?.addEventListener('transitionend', (e) => {
    if (e.target === overlay && !overlay.classList.contains('hidden')) apply(overlay);
  });
}


function initFilters() {
  const filters = document.getElementById('lentaFilters');
  const grid = document.querySelector('#latest .editorial-grid');
  if (!filters || !grid) return;

  const setActive = (btn) => {
    Array.from(filters.querySelectorAll('.filter-chip')).forEach((b) => b.classList.toggle('is-active', b === btn));
  };

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    const val = (btn.getAttribute('data-filter') || 'all').toLowerCase();
    setActive(btn);
    Array.from(grid.querySelectorAll('.editorial-item')).forEach((it) => {
      const cat = (it.getAttribute('data-cat') || 'all').toLowerCase();
      const match = val === 'all' || cat === val;
      it.classList.toggle('hidden', !match);
    });
  }, true);
}

function initAutoExcerpt() {
  const cards = Array.from(document.querySelectorAll('a.card[href^="/posts/"]'));
  const hasExcerpt = (card) => !!card.querySelector('.card-excerpt');
  const getInfoContainer = (card) => card.querySelector('.p-6, .p-8') || card;
  cards.forEach(async (card) => {
    if (hasExcerpt(card)) return;
    try {
      const res = await fetch(card.href, { credentials: 'same-origin' });
      if (!res.ok) return;
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const meta = doc.querySelector('meta[name="description"]');
      const text = (meta?.getAttribute('content') || '').trim();
      if (!text) return;
      const p = document.createElement('p');
      p.className = 'card-excerpt mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2';
      p.textContent = text;
      getInfoContainer(card).appendChild(p);
    } catch (e) {
      // ignore network/parse errors
    }
  });
}

function initOverlaySearch() {
  const input = document.getElementById('lentaSearch');
  if (!input || !lentaOverlay) return;
  const scope = lentaOverlay.querySelector('.modal');
  if (!scope) return;
  const getItems = () => Array.from(scope.querySelectorAll('.grid a.group, .grid a[href^="/posts/"]'));
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    getItems().forEach((el) => {
      const t = el.textContent?.toLowerCase() || '';
      el.classList.toggle('hidden', !!q && !t.includes(q));
    });
  };
  input.addEventListener('input', apply);
}

feedReady.finally(() => {
  initFeedSort();
  initFormattedDates();
  initFilters();
  initAutoExcerpt();
  initOverlaySearch();
});

// Image Lightbox for zoomable images
(() => {
  let lb, lbImg;
  const ensure = () => {
    if (lb) return lb;
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `<button class="close" aria-label="Закрыть">Esc</button><figure><img alt="" /></figure>`;
    document.body.appendChild(lb);
    lbImg = lb.querySelector('img');
    const close = () => lb.classList.remove('open');
    lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
    lb.querySelector('.close')?.addEventListener('click', close);
    lbImg?.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    return lb;
  };
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const img = t.closest('img[data-zoomable]');
    if (img) {
      const overlay = ensure();
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
      overlay.classList.add('open');
    }
  }, true);
})();
