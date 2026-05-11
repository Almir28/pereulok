(function () {
  'use strict';

  const ready = (callback) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback, { once: true });
    else callback();
  };

  function enhanceImages(meta) {
    document.querySelectorAll('img').forEach((img, index) => {
      if (!img.getAttribute('alt')) {
        img.setAttribute('alt', meta.article?.title || img.closest('article')?.querySelector('h1,h2,h3')?.textContent || 'Pereuloq');
      }
      if (index > 0 && !img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      img.addEventListener('error', () => {
        img.dataset.broken = 'true';
        img.alt = img.alt || 'Изображение временно недоступно';
      }, { once: true });
    });
  }

  function relatedArticles(meta) {
    if (!meta.article || document.querySelector('[data-seo-related]')) return;
    const container = document.querySelector('.post-body') || document.querySelector('article');
    if (!container) return;
    const articles = (window.PereuloqMetaGenerator?.getArticles?.() || [])
      .filter((item) => item.href !== meta.article.href)
      .sort((a, b) => {
        const categoryScore = Number(b.cat === meta.article.cat) - Number(a.cat === meta.article.cat);
        if (categoryScore) return categoryScore;
        return Number(b.id || 0) - Number(a.id || 0);
      })
      .slice(0, 3);
    if (!articles.length) return;

    const section = document.createElement('section');
    section.className = 'seo-related';
    section.dataset.seoRelated = 'true';
    section.innerHTML = `
      <div class="seo-related-head">
        <span>Читайте также</span>
        <a href="../feed.html">Все материалы</a>
      </div>
      <div class="seo-related-grid">
        ${articles.map((article) => `
          <a class="seo-related-card" href="../${article.href.replace(/^\/+/, '')}">
            <span>${article.cat || 'Материал'}</span>
            <strong>${article.title}</strong>
            <small>${article.desc || ''}</small>
          </a>
        `).join('')}
      </div>
    `;
    container.appendChild(section);
  }

  function trackEngagement(meta) {
    const send = (eventName, params = {}) => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, {
          page_title: document.title,
          page_location: window.location.href,
          content_group: meta.article?.cat || document.body?.dataset.page || 'page',
          ...params
        });
      }
    };

    if (meta.article) {
      let sentHalf = false;
      window.addEventListener('scroll', () => {
        if (sentHalf) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && window.scrollY / max > 0.5) {
          sentHalf = true;
          send('article_engagement', { article_title: meta.article.title, engagement_depth: '50%' });
        }
      }, { passive: true });
    }

    document.addEventListener('click', (event) => {
      const storeLink = event.target.closest('a[href*="store"],a[href*="gift-card"],[data-contact-seller]');
      const sportLink = event.target.closest('a[href*="sport"],a[href*="match"]');
      if (storeLink) send('store_conversion_click', { link_text: storeLink.textContent.trim().slice(0, 80) });
      if (sportLink) send('sports_click', { link_text: sportLink.textContent.trim().slice(0, 80) });
    });
  }

  ready(() => {
    if (!window.PereuloqMetaGenerator) return;
    const meta = window.PereuloqMetaGenerator.applyMeta();
    window.PereuloqStructuredData?.applyStructuredData(meta);
    enhanceImages(meta);
    relatedArticles(meta);
    trackEngagement(meta);
  });
})();
