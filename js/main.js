// Theme toggle
const themeBtn = document.getElementById('themeToggle');
themeBtn?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile nav
document.getElementById('menuBtn')?.addEventListener('click', () => {
  document.getElementById('mobileNav')?.classList.toggle('hidden');
});

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

// Lenta: sort editorial cards by data-published (newest first)
(() => {
  const grid = document.querySelector('#latest .editorial-grid');
  if (!grid) return;
  const items = Array.from(grid.querySelectorAll('.editorial-item'));
  if (!items.length) return;
  const parse = (el) => {
    const v = el.getAttribute('data-published');
    const t = v ? Date.parse(v) : NaN;
    return isNaN(t) ? 0 : t;
  };
  items.sort((a, b) => parse(b) - parse(a));
  items.forEach((el) => grid.appendChild(el));
})();

// Lenta overlay: sort blocks marked with data-sort="published"
(() => {
  const containers = document.querySelectorAll('#lentaOverlay [data-sort="published"]');
  if (!containers.length) return;
  const parse = (el) => {
    const v = el?.getAttribute('data-published');
    const t = v ? Date.parse(v) : NaN;
    return isNaN(t) ? 0 : t;
  };
  containers.forEach((container) => {
    const isUL = container.tagName.toLowerCase() === 'ul';
    const children = Array.from(container.children);
    children.sort((a, b) => {
      const elA = isUL ? a.querySelector('a[href^="/posts/"]') : a;
      const elB = isUL ? b.querySelector('a[href^="/posts/"]') : b;
      return parse(elB) - parse(elA);
    });
    children.forEach((child) => container.appendChild(child));
  });
})();

// Lenta: filters (by category) on main page
(() => {
  const filters = document.getElementById('lentaFilters');
  const grid = document.querySelector('#latest .editorial-grid');
  if (!filters || !grid) return;
  const items = Array.from(grid.querySelectorAll('.editorial-item'));

  const setActive = (btn) => {
    Array.from(filters.querySelectorAll('.filter-chip')).forEach(b => b.classList.toggle('is-active', b === btn));
  };

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-chip');
    if (!btn) return;
    const val = btn.getAttribute('data-filter') || 'all';
    setActive(btn);
    const items = Array.from(grid.querySelectorAll('.editorial-item'));
    items.forEach((it) => {
      const cat = (it.getAttribute('data-cat') || 'all').toLowerCase();
      const match = val === 'all' || cat === val;
      it.classList.toggle('hidden', !match);
    });
  }, true);
})();

// Auto-excerpt: fill missing card excerpts from post meta description
(() => {
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
    } catch (e) { /* ignore network/parse errors */ }
  });
})();

// Lenta overlay: simple search filter
(() => {
  const input = document.getElementById('lentaSearch');
  if (!input || !lentaOverlay) return;
  const scope = lentaOverlay.querySelector('.modal');
  if (!scope) return;
  const items = Array.from(scope.querySelectorAll('.grid a.group, .grid a[href^="/posts/"]'));
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    items.forEach(el => {
      const t = el.textContent?.toLowerCase() || '';
      const show = !q || t.includes(q);
      el.classList.toggle('hidden', !show);
    });
  };
  input.addEventListener('input', apply);
})();

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
