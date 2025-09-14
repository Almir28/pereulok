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
