#!/usr/bin/env node
'use strict';

const fs = require('fs');
const vm = require('vm');

const SITE = 'https://pereuloq.ru';
const DATE_MAP = {
  'января': '01',
  'февраля': '02',
  'марта': '03',
  'апреля': '04',
  'мая': '05',
  'июня': '06',
  'июля': '07',
  'августа': '08',
  'сентября': '09',
  'октября': '10',
  'ноября': '11',
  'декабря': '12'
};

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
  '/product.html',
  '/shop.html',
  '/blog.html'
];

const xml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const absolute = (path) => SITE + (path === '/' ? '/' : (path.startsWith('/') ? path : `/${path}`));

function publishedDate(value) {
  const match = String(value || '').toLowerCase().match(/(\d{1,2})\s+([а-яё]+)\s+(\d{4})/);
  if (!match) return '2026-05-11';
  return `${match[3]}-${DATE_MAP[match[2]] || '01'}-${match[1].padStart(2, '0')}`;
}

function readArticles() {
  const code = fs.readFileSync('js/main.js', 'utf8');
  const sandbox = { window: { addEventListener() {} }, document: {}, console };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox.window.PEREULOQ_PUBLIC_ARTICLES || sandbox.window.PEREULOQ_ARTICLES || [];
}

function buildSitemap(articles) {
  const availablePages = staticPages.filter((item, index, arr) => (
    arr.indexOf(item) === index && (item === '/' || fs.existsSync(item.replace(/^\//, '')))
  ));
  const urls = [
    ...availablePages.map((loc) => ({
      loc: absolute(loc),
      lastmod: '2026-05-11',
      changefreq: loc === '/' || loc === '/feed.html' ? 'daily' : 'weekly',
      priority: loc === '/' ? '1.0' : '0.7'
    })),
    ...articles.map((article) => ({
      loc: absolute(article.href),
      lastmod: publishedDate(article.date),
      changefreq: 'monthly',
      priority: '0.8'
    }))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((item) => `  <url>\n    <loc>${xml(item.loc)}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n    <changefreq>${item.changefreq}</changefreq>\n    <priority>${item.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
}

function buildNewsSitemap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${articles.map((article) => `  <url>\n    <loc>${xml(absolute(article.href))}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>Pereuloq</news:name>\n        <news:language>ru</news:language>\n      </news:publication>\n      <news:publication_date>${publishedDate(article.date)}</news:publication_date>\n      <news:title>${xml(article.title)}</news:title>\n    </news:news>\n  </url>`).join('\n')}\n</urlset>\n`;
}

function buildImageSitemap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${articles.map((article) => `  <url>\n    <loc>${xml(absolute(article.href))}</loc>\n    <image:image>\n      <image:loc>${xml(article.img)}</image:loc>\n      <image:title>${xml(article.title)}</image:title>\n      <image:caption>${xml(article.desc || article.title)}</image:caption>\n    </image:image>\n  </url>`).join('\n')}\n</urlset>\n`;
}

const articles = readArticles();
fs.writeFileSync('sitemap.xml', buildSitemap(articles));
fs.writeFileSync('news-sitemap.xml', buildNewsSitemap(articles));
fs.writeFileSync('image-sitemap.xml', buildImageSitemap(articles));
console.log(`SEO files generated for ${articles.length} articles.`);
