(function () {
  'use strict';

  const path = window.location.pathname;
  const isEnglish = path.split('/').filter(Boolean)[0] === 'en';
  const labels = isEnglish ? {
    home: 'Home',
    feed: 'Feed',
    politics: 'Politics',
    sport: 'Sport',
    store: 'Store',
    premium: 'Premium',
    about: 'About',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    founder: 'Founder-led media by',
    tagline: 'A calm digital media ecosystem: stories, world signals, sport, premium notes and digital services.',
    support: 'support@pereuloq.ru',
    telegram: 'Telegram'
  } : {
    home: 'Главная',
    feed: 'Лента',
    politics: 'Политика',
    sport: 'Спорт',
    store: 'Магазин',
    premium: 'Premium',
    about: 'О проекте',
    privacy: 'Privacy Policy',
    contact: 'Контакты',
    founder: 'Founder-led media by',
    tagline: 'Спокойная digital-экосистема: медиа, мировые сигналы, спорт, Premium и цифровые сервисы.',
    support: 'support@pereuloq.ru',
    telegram: 'Telegram'
  };

  function rootPrefix() {
    const parts = path.split('/').filter(Boolean);
    if (!parts.length) return '';
    const dirs = parts[parts.length - 1].includes('.') ? parts.slice(0, -1) : parts;
    return '../'.repeat(dirs.length);
  }

  const root = rootPrefix();
  const href = (page) => `${root}${isEnglish ? 'en/' : ''}${page}`;
  const ruHref = (page) => `${root}${page}`;
  const enHref = (page) => `${root}en/${page}`;

  function pageKey() {
    const bodyPage = document.body?.dataset?.page;
    if (bodyPage) {
      if (bodyPage === 'world-sport') return 'sport';
      if (bodyPage === 'private') return 'premium';
      return bodyPage;
    }
    if (path.includes('politics')) return 'politics';
    if (path.includes('world-sport') || path.includes('/sport/') || path.endsWith('/sport.html')) return 'sport';
    if (path.includes('store') || path.includes('gift-card') || path.includes('xbox') || path.includes('product')) return 'store';
    if (path.includes('private')) return 'premium';
    if (path.includes('feed')) return 'feed';
    if (path.includes('about')) return 'about';
    return 'home';
  }

  const nav = [
    ['home', labels.home, href('index.html')],
    ['feed', labels.feed, href('feed.html')],
    ['politics', labels.politics, href('politics.html')],
    ['sport', labels.sport, href('world-sport.html')],
    ['store', labels.store, href('store.html')],
    ['premium', labels.premium, href('private.html')],
    ['about', labels.about, href('about.html')]
  ];

  function navLinks(cls) {
    const active = pageKey();
    return nav.map(([key, label, url]) => (
      `<a class="${cls}${key === active ? ' on active' : ''}" data-nav="${key}" href="${url}">${label}</a>`
    )).join('');
  }

  function installStyles() {
    if (document.getElementById('PEREULOQ_SITE_SYSTEM_STYLE')) return;
    const style = document.createElement('style');
    style.id = 'PEREULOQ_SITE_SYSTEM_STYLE';
    style.textContent = `
      .site-visually-hidden{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      body.pereuloq-system,body.pereuloq-system *{cursor:auto!important}
      body.pereuloq-system .cursor,body.pereuloq-system .cursor-ring,body.pereuloq-system .cur,body.pereuloq-system .cur-ring{display:none!important}
      .hdr.site-hdr{position:sticky!important;top:0!important;left:0!important;right:0!important;z-index:900!important;height:66px!important;display:flex!important;align-items:center!important;background:rgba(8,10,15,.76)!important;border-bottom:1px solid rgba(242,244,255,.1)!important;backdrop-filter:blur(26px) saturate(170%)!important;-webkit-backdrop-filter:blur(26px) saturate(170%)!important;box-shadow:0 16px 60px rgba(0,0,0,.18)!important}
      .site-hdr .hdr-inner{width:100%!important;max-width:1440px!important;margin:0 auto!important;padding:0 28px!important;display:flex!important;align-items:center!important;gap:18px!important;justify-content:space-between!important;position:relative!important}
      .site-hdr .logo{display:inline-flex!important;align-items:baseline!important;gap:3px!important;color:#f6f7fb!important;text-decoration:none!important;flex:0 0 auto!important;margin:0!important}
      .site-hdr .logo-main{font-family:Inter,system-ui,sans-serif!important;font-size:22px!important;font-weight:800!important;letter-spacing:-.035em!important}
      .site-hdr .logo-dot{width:5px!important;height:5px!important;border-radius:999px!important;background:#ff9f0a!important;margin:0 0 4px 1px!important;animation:none!important}
      .site-nav{display:flex!important;align-items:center!important;justify-content:center!important;gap:4px!important;position:static!important;left:auto!important;transform:none!important;flex:1 1 auto!important;min-width:0!important}
      .site-nav .nav-link{display:inline-flex!important;align-items:center!important;justify-content:center!important;color:rgba(218,224,242,.72)!important;font:700 13px/1 Inter,system-ui,sans-serif!important;padding:8px 11px!important;border-radius:999px!important;letter-spacing:0!important;white-space:nowrap!important;text-decoration:none!important;background:transparent!important}
      .site-nav .nav-link:hover,.site-nav .nav-link.on{color:#fff!important;background:rgba(255,255,255,.075)!important}
      .site-nav .nav-link[data-nav="premium"]{color:#ffd38a!important;background:rgba(255,159,10,.1)!important}
      .site-hdr .hdr-right{display:flex!important;align-items:center!important;gap:8px!important;flex:0 0 auto!important;margin:0!important}
      .site-hdr .lang-switcher{display:inline-flex!important;align-items:center!important;gap:3px!important;padding:3px!important;border:1px solid rgba(255,255,255,.1)!important;border-radius:999px!important;background:rgba(255,255,255,.04)!important;margin:0!important}
      .site-hdr .lang-switcher a{min-width:30px!important;padding:7px 8px!important;border-radius:999px!important;color:rgba(218,224,242,.7)!important;font:800 10px/1 Inter,system-ui,sans-serif!important;text-align:center!important;text-decoration:none!important}
      .site-hdr .lang-switcher a.active{color:#090b10!important;background:#ff9f0a!important}
      .site-hdr .hdr-theme,.site-hdr .hdr-menu{width:36px!important;height:36px!important;border:1px solid rgba(255,255,255,.11)!important;border-radius:999px!important;background:rgba(255,255,255,.045)!important;color:#dbe2f4!important;display:inline-flex!important;align-items:center!important;justify-content:center!important}
      .site-hdr .hdr-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:999px!important;padding:10px 16px!important;background:linear-gradient(135deg,#ef4444,#b91c1c)!important;color:#fff!important;font:800 12px/1 Inter,system-ui,sans-serif!important;text-transform:uppercase!important;letter-spacing:.05em!important;text-decoration:none!important}
      .site-mobile-panel{position:fixed!important;inset:76px 14px auto 14px!important;z-index:920!important;display:none!important;padding:12px!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:22px!important;background:rgba(8,10,15,.95)!important;backdrop-filter:blur(26px) saturate(170%)!important;box-shadow:0 24px 90px rgba(0,0,0,.48)!important}
      .site-mobile-panel.open{display:grid!important;gap:4px!important}
      .site-mobile-panel a{display:flex!important;align-items:center!important;justify-content:space-between!important;border-radius:14px!important;padding:13px 14px!important;color:#dbe2f4!important;text-decoration:none!important;font:750 14px/1.2 Inter,system-ui,sans-serif!important}
      .site-mobile-panel a.on,.site-mobile-panel a:hover{background:rgba(255,159,10,.11)!important;color:#ffd38a!important}
      .site-footer{margin-top:72px!important;border-top:1px solid rgba(242,244,255,.09)!important;background:linear-gradient(180deg,rgba(10,13,22,.96),#050609)!important;color:#dbe2f4!important;padding:46px 0 28px!important}
      .site-footer .wrap{max-width:1440px!important;margin:0 auto!important;padding:0 28px!important}
      .site-footer-grid{display:grid!important;grid-template-columns:minmax(220px,1.3fr) repeat(3,minmax(150px,.8fr))!important;gap:26px!important;align-items:start!important}
      .site-footer-brand{font:850 24px/1 Inter,system-ui,sans-serif!important;letter-spacing:-.04em!important;margin-bottom:10px!important;color:#fff!important}
      .site-footer-tag{max-width:430px!important;color:rgba(218,224,242,.68)!important;font:500 14px/1.7 Inter,system-ui,sans-serif!important}
      .site-footer-label{color:#ff9f0a!important;font:800 11px/1 Inter,system-ui,sans-serif!important;letter-spacing:.12em!important;text-transform:uppercase!important;margin-bottom:13px!important}
      .site-footer-links{display:grid!important;gap:9px!important}
      .site-footer a{color:rgba(218,224,242,.72)!important;text-decoration:none!important;font:650 13px/1.35 Inter,system-ui,sans-serif!important}
      .site-footer a:hover{color:#fff!important}
      .site-footer-bottom{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:16px!important;flex-wrap:wrap!important;margin-top:34px!important;padding-top:20px!important;border-top:1px solid rgba(242,244,255,.08)!important;color:rgba(218,224,242,.56)!important;font:600 12px/1.4 Inter,system-ui,sans-serif!important}
      .site-footer-legal{display:flex!important;gap:14px!important;flex-wrap:wrap!important}
      .pereuloq-trust-system{margin:30px auto!important;max-width:1180px!important;padding:24px!important;border:1px solid rgba(242,244,255,.1)!important;border-radius:24px!important;background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.025))!important;box-shadow:0 20px 80px rgba(0,0,0,.18)!important}
      .pereuloq-trust-head{display:flex!important;justify-content:space-between!important;gap:18px!important;align-items:end!important;margin-bottom:18px!important}
      .pereuloq-trust-head h2{margin:0!important;color:#fff!important;font:800 clamp(24px,3vw,34px)/1.05 Inter,system-ui,sans-serif!important;letter-spacing:-.035em!important}
      .pereuloq-trust-head p{margin:6px 0 0!important;color:rgba(218,224,242,.68)!important;max-width:620px!important;font:500 14px/1.65 Inter,system-ui,sans-serif!important}
      .pereuloq-trust-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}
      .pereuloq-trust-card{padding:16px!important;border:1px solid rgba(255,255,255,.09)!important;border-radius:16px!important;background:rgba(8,10,15,.35)!important}
      .pereuloq-trust-card strong{display:block!important;color:#fff!important;font:800 14px/1.25 Inter,system-ui,sans-serif!important;margin-bottom:7px!important}
      .pereuloq-trust-card span{display:block!important;color:rgba(218,224,242,.66)!important;font:500 12.5px/1.55 Inter,system-ui,sans-serif!important}
      .pereuloq-trust-actions{display:flex!important;gap:10px!important;flex-wrap:wrap!important;margin-top:18px!important}
      .pereuloq-trust-actions a{display:inline-flex!important;align-items:center!important;justify-content:center!important;border-radius:999px!important;padding:11px 15px!important;font:800 12px/1 Inter,system-ui,sans-serif!important;text-decoration:none!important;border:1px solid rgba(255,255,255,.12)!important;color:#fff!important;background:rgba(255,255,255,.055)!important}
      .pereuloq-trust-actions a:first-child{background:#ff9f0a!important;color:#090b10!important;border-color:#ff9f0a!important}
      @media (max-width:1100px){.site-nav{display:none!important}.site-hdr .hdr-menu{display:inline-flex!important}.site-footer-grid{grid-template-columns:1fr 1fr!important}.pereuloq-trust-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media (min-width:1101px){.site-hdr .hdr-menu{display:none!important}}
      @media (max-width:640px){.hdr.site-hdr{height:60px!important}.site-hdr .hdr-inner{padding:0 14px!important}.site-hdr .hdr-btn{padding:9px 12px!important;font-size:11px!important}.site-hdr .lang-switcher{display:none!important}.site-footer{padding-top:36px!important}.site-footer .wrap{padding:0 18px!important}.site-footer-grid{grid-template-columns:1fr!important}.site-footer-bottom{display:grid!important}.pereuloq-trust-system{margin:22px 16px!important;padding:18px!important;border-radius:20px!important}.pereuloq-trust-head{display:block!important}.pereuloq-trust-grid{grid-template-columns:1fr!important}}
      @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
    `;
    document.head.appendChild(style);
  }

  function renderHeader() {
    const current = document.querySelector('header.hdr') || document.querySelector('nav.navbar');
    if (!current) return;
    const active = pageKey();
    const header = document.createElement('header');
    header.className = 'hdr site-hdr';
    header.id = 'HDR';
    header.innerHTML = `
      <div class="hdr-inner">
        <a class="logo" href="${href('index.html')}" aria-label="Pereuloq">
          <span class="logo-main">Pereuloq</span><span class="logo-dot"></span>
        </a>
        <nav class="site-nav" aria-label="${isEnglish ? 'Main navigation' : 'Основная навигация'}">${navLinks('nav-link')}</nav>
        <div class="hdr-right">
          <div class="lang-switcher" aria-label="Language selector">
            <a href="${ruHref('index.html')}" hreflang="ru" class="${!isEnglish ? 'active' : ''}">RU</a>
            <a href="${enHref('index.html')}" hreflang="en" class="${isEnglish ? 'active' : ''}">EN</a>
          </div>
          <button class="hdr-theme" id="THEME_BTN" type="button" aria-label="${isEnglish ? 'Change theme' : 'Сменить тему'}">☽</button>
          <a class="hdr-btn" data-nav="premium" href="${href('private.html')}">${labels.premium}</a>
          <button class="hdr-menu" id="MOBILE_MENU_BTN" type="button" aria-label="${isEnglish ? 'Open menu' : 'Открыть меню'}" aria-expanded="false">☰</button>
        </div>
      </div>
    `;
    current.replaceWith(header);
    document.body.dataset.page = active === 'premium' ? 'private' : active;

    document.querySelectorAll('.mobile-panel,.mob-nav,.politics-mobile').forEach((panel) => panel.remove());
    const panel = document.createElement('div');
    panel.className = 'mobile-panel site-mobile-panel';
    panel.id = 'MOBILE_PANEL';
    panel.innerHTML = navLinks('');
    header.insertAdjacentElement('afterend', panel);
  }

  function renderFooter() {
    const current = document.querySelector('footer');
    if (!current) return;
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="wrap">
        <div class="site-footer-grid">
          <div>
            <div class="site-footer-brand">Pereuloq</div>
            <p class="site-footer-tag">${labels.tagline}</p>
          </div>
          <div>
            <div class="site-footer-label">${isEnglish ? 'Sections' : 'Разделы'}</div>
            <div class="site-footer-links">
              <a href="${href('feed.html')}">${labels.feed}</a>
              <a href="${href('politics.html')}">${labels.politics}</a>
              <a href="${href('world-sport.html')}">${labels.sport}</a>
              <a href="${href('store.html')}">${labels.store}</a>
            </div>
          </div>
          <div>
            <div class="site-footer-label">${isEnglish ? 'Project' : 'Проект'}</div>
            <div class="site-footer-links">
              <a href="${href('almir-khialov.html')}">Almir Khialov</a>
              <a href="${href('private.html')}">${labels.premium}</a>
              <a href="${href('about.html')}">${labels.about}</a>
              <a href="${href('privacy.html')}">${labels.privacy}</a>
            </div>
          </div>
          <div>
            <div class="site-footer-label">${labels.contact}</div>
            <div class="site-footer-links">
              <a href="mailto:support@pereuloq.ru">support@pereuloq.ru</a>
              <a href="https://t.me/almir328" target="_blank" rel="noopener">${labels.telegram}</a>
              <a href="https://pereuloq.ru">pereuloq.ru</a>
            </div>
          </div>
        </div>
        <div class="site-footer-bottom">
          <div>© Pereuloq 2026. ${labels.founder} <a href="${href('almir-khialov.html')}">Almir Khialov</a>.</div>
          <div class="site-footer-legal"><a href="${href('privacy.html')}">${labels.privacy}</a><a href="${href('store.html')}">${labels.store}</a><a href="${href('private.html')}">${labels.premium}</a></div>
        </div>
      </div>
    `;
    current.replaceWith(footer);
  }

  function setupInteractions() {
    const panel = document.getElementById('MOBILE_PANEL');
    const menu = document.getElementById('MOBILE_MENU_BTN');
    menu?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const open = panel?.classList.toggle('open');
      menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel?.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        panel.classList.remove('open');
        menu?.setAttribute('aria-expanded', 'false');
      }
    });

    const theme = document.getElementById('THEME_BTN');
    const saved = localStorage.getItem('pereuloq-theme') || document.documentElement.getAttribute('data-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    if (theme) theme.textContent = saved === 'dark' ? '☽' : '☀';
    theme?.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('pereuloq-theme', next);
      theme.textContent = next === 'dark' ? '☽' : '☀';
    });
  }

  function boot() {
    document.body.classList.add('pereuloq-system');
    installStyles();
    renderHeader();
    renderFooter();
    setupInteractions();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
