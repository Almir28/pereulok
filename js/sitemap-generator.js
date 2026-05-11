(function () {
  'use strict';

  const staticPages = [
    '/',
    '/feed.html',
    '/about.html',
    '/privacy.html',
    '/private.html',
    '/sport.html',
    '/pages/sports.html',
    '/pages/match.html',
    '/store.html',
    '/apple-gift-card.html',
    '/apple-gift-card-product.html',
    '/xbox.html',
    '/xbox-games.html',
    '/xbox-game-pass.html',
    '/product.html'
  ];

  function getUrls() {
    const articles = window.PereuloqMetaGenerator?.getArticles?.() || [];
    const articleUrls = articles.map((article) => window.PereuloqMetaGenerator.articlePath(article));
    return [...new Set(staticPages.concat(articleUrls))];
  }

  function toAbsoluteUrls() {
    const abs = window.PereuloqMetaGenerator?.absoluteUrl || ((value) => value);
    return getUrls().map(abs);
  }

  window.PereuloqSitemapGenerator = { staticPages, getUrls, toAbsoluteUrls };
})();
