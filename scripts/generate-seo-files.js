#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SITE = 'https://pereuloq.ru';
const GENERATED_AT = new Date().toISOString();
const NEWS_WINDOW_DAYS = 2;

const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'daily', section: 'home' },
  { loc: '/feed.html', priority: '0.9', changefreq: 'daily', section: 'feed' },
  { loc: '/politics.html', priority: '0.8', changefreq: 'daily', section: 'politics' },
  { loc: '/world-sport.html', priority: '0.8', changefreq: 'daily', section: 'sport' },
  { loc: '/about.html', priority: '0.5', changefreq: 'monthly', section: 'project' },
  { loc: '/privacy.html', priority: '0.3', changefreq: 'yearly', section: 'legal' },
  { loc: '/private.html', priority: '0.6', changefreq: 'weekly', section: 'premium' },
  { loc: '/sport.html', priority: '0.5', changefreq: 'weekly', section: 'sport' },
  { loc: '/store.html', priority: '0.8', changefreq: 'weekly', section: 'store' },
  { loc: '/shop.html', priority: '0.5', changefreq: 'weekly', section: 'store' },
  { loc: '/product.html', priority: '0.4', changefreq: 'monthly', section: 'store' },
  { loc: '/apple-gift-card.html', priority: '0.7', changefreq: 'weekly', section: 'store' },
  { loc: '/apple-gift-card-product.html', priority: '0.7', changefreq: 'weekly', section: 'store' },
  { loc: '/xbox.html', priority: '0.7', changefreq: 'weekly', section: 'store' },
  { loc: '/xbox-games.html', priority: '0.6', changefreq: 'weekly', section: 'store' },
  { loc: '/xbox-game-pass.html', priority: '0.7', changefreq: 'weekly', section: 'store' },
  { loc: '/almir-khialov.html', priority: '0.5', changefreq: 'monthly', section: 'founder' },
  { loc: '/all-news.html', priority: '0.5', changefreq: 'daily', section: 'feed' },
  { loc: '/all-results.html', priority: '0.5', changefreq: 'daily', section: 'sport' },
  { loc: '/all-trends.html', priority: '0.5', changefreq: 'daily', section: 'feed' },
  { loc: '/blog.html', priority: '0.4', changefreq: 'weekly', section: 'feed' },
  { loc: '/pages/sports.html', priority: '0.4', changefreq: 'daily', section: 'sport' },
  { loc: '/pages/match.html', priority: '0.3', changefreq: 'daily', section: 'sport' }
];

const xml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const clean = (value = '') => String(value)
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]*>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const validImage = (value) => {
  const image = String(value || '').trim();
  if (!image || image === 'undefined' || image === 'null') return '';
  return image;
};

const absolute = (loc) => {
  if (!loc || loc === '/') return `${SITE}/`;
  if (/^https?:\/\//i.test(loc)) return loc;
  return `${SITE}${loc.startsWith('/') ? loc : `/${loc}`}`;
};

const localPath = (loc) => loc === '/' ? 'index.html' : loc.replace(/^\//, '');
const isoDateOnly = (value) => {
  const parsed = value ? new Date(value) : null;
  if (parsed && !Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return GENERATED_AT.slice(0, 10);
};

function fileLastmod(loc) {
  const file = localPath(loc);
  if (!fs.existsSync(file)) return GENERATED_AT.slice(0, 10);
  return fs.statSync(file).mtime.toISOString().slice(0, 10);
}

function runMainArticles() {
  const code = fs.readFileSync('js/main.js', 'utf8');
  const noop = () => {};
  const sandbox = {
    window: { addEventListener: noop, localStorage: { getItem: noop, setItem: noop } },
    document: {
      documentElement: { lang: 'ru', setAttribute: noop },
      body: { dataset: {} },
      addEventListener: noop,
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null
    },
    location: { pathname: '/', search: '', href: `${SITE}/` },
    console,
    setTimeout: noop,
    clearTimeout: noop,
    requestAnimationFrame: noop
  };
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { timeout: 1500 });
  } catch (error) {
    console.warn(`main.js article read warning: ${error.message}`);
  }
  return sandbox.window.PEREULOQ_PUBLIC_ARTICLES || sandbox.window.PEREULOQ_ARTICLES || [];
}

function politicsArticles() {
  if (!fs.existsSync('data/politics-feed.json')) return [];
  const data = JSON.parse(fs.readFileSync('data/politics-feed.json', 'utf8'));
  return (data.articles || []).map((article) => ({
    id: article.id,
    title: article.title,
    desc: article.dek,
    cat: article.category || 'Мировая политика',
    kind: 'news',
    author: article.author || 'Almir Khialov',
    date: article.date,
    isoDate: article.isoDate,
    modifiedAt: article.modifiedAt || article.isoDate,
    img: article.image,
    href: article.url,
    tags: article.tags || []
  }));
}

function htmlArticles() {
  const dirs = ['posts', 'politics', 'sport', 'en/posts', 'en/politics', 'en/sport'];
  const files = dirs.flatMap((dir) => fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((file) => file.endsWith('.html')).map((file) => `${dir}/${file}`)
    : []);
  return files.map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
      .map((match) => {
        try { return JSON.parse(match[1]); } catch (_) { return null; }
      })
      .find((item) => item && /Article$/.test(item['@type'] || ''));
    const title = clean((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1])
      || clean((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1]).replace(/\s+[—-]\s+Pereuloq$/i, '');
    const desc = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) || [])[1]
      || clean((html.match(/class=["']post-lead["'][^>]*>([\s\S]*?)<\/p>/i) || [])[1]);
    const image = validImage((html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) || [])[1])
      || validImage((html.match(/<img[^>]+src=["']([^"']+)["']/i) || [])[1]);
    const section = jsonLd?.articleSection || clean((html.match(/class=["']post-kicker["'][^>]*>([\s\S]*?)<\/div>/i) || [])[1])
      || (file.includes('/politics') || file.startsWith('politics/') ? 'Мировая политика' : file.includes('/sport') || file.startsWith('sport/') ? 'Спорт' : 'Лента');
    return {
      id: file.replace(/\.html$/, ''),
      title,
      desc,
      cat: section,
      kind: 'news',
      author: jsonLd?.author?.name || 'Almir Khialov',
      isoDate: jsonLd?.datePublished,
      modifiedAt: jsonLd?.dateModified || jsonLd?.datePublished,
      img: image,
      href: file,
      lang: file.startsWith('en/') ? 'en' : 'ru'
    };
  }).filter((article) => article.title && article.href);
}

function normalize(article) {
  const href = String(article.href || article.url || '').replace(/^\/+/, '');
  const isEn = href.startsWith('en/');
  const cat = article.cat || article.category || (href.includes('politics/') ? 'Мировая политика' : href.includes('sport/') ? 'Спорт' : 'Лента');
  return {
    id: article.id || href.replace(/\.html$/, ''),
    title: clean(article.title),
    description: clean(article.desc || article.dek || article.excerpt || article.body || article.title),
    section: clean(cat),
    url: absolute(href),
    path: `/${href}`,
    image: validImage(article.img || article.image),
    imageAlt: clean(article.imageAlt || article.title),
    author: article.author || 'Almir Khialov',
    datePublished: article.isoDate || article.publishedAt || article.created_at || null,
    dateModified: article.modifiedAt || article.updatedAt || article.isoDate || article.publishedAt || null,
    lang: article.lang || (isEn ? 'en' : 'ru'),
    tags: article.tags || [],
    isNews: article.kind !== 'post' && !href.includes('store.html')
  };
}

function mergeArticles() {
  const map = new Map();
  [...htmlArticles(), ...runMainArticles(), ...politicsArticles()].forEach((article) => {
    const normalized = normalize(article);
    if (!normalized.path || normalized.path === '/') return;
    const existing = map.get(normalized.path) || {};
    map.set(normalized.path, {
      ...existing,
      ...normalized,
      description: normalized.description || existing.description,
      image: normalized.image || existing.image,
      datePublished: normalized.datePublished || existing.datePublished,
      dateModified: normalized.dateModified || existing.dateModified
    });
  });
  return [...map.values()].filter((article) => fs.existsSync(article.path.replace(/^\//, '')));
}

function staticPageEntries() {
  const entries = [];
  for (const item of STATIC_PAGES) {
    if (item.loc === '/' || fs.existsSync(localPath(item.loc))) {
      entries.push({
        loc: absolute(item.loc),
        lastmod: fileLastmod(item.loc),
        changefreq: item.changefreq,
        priority: item.priority
      });
    }
    const enLoc = item.loc === '/' ? '/en/' : `/en${item.loc}`;
    if (fs.existsSync(localPath(enLoc))) {
      entries.push({
        loc: absolute(enLoc),
        lastmod: fileLastmod(enLoc),
        changefreq: item.changefreq,
        priority: item.priority
      });
    }
  }
  return entries;
}

function articleEntries(articles) {
  return articles.map((article) => ({
    loc: article.url,
    lastmod: isoDateOnly(article.dateModified || article.datePublished),
    changefreq: 'monthly',
    priority: article.path.includes('/politics/') || article.path.includes('/sport/') ? '0.8' : '0.7'
  }));
}

function buildSitemap(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((item) => `  <url>\n    <loc>${xml(item.loc)}</loc>\n    <lastmod>${xml(item.lastmod)}</lastmod>\n    <changefreq>${xml(item.changefreq)}</changefreq>\n    <priority>${xml(item.priority)}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
}

function recentNews(articles) {
  const cutoff = new Date(Date.now() - NEWS_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  return articles.filter((article) => {
    const published = article.datePublished ? new Date(article.datePublished) : null;
    return article.isNews && published && !Number.isNaN(published.getTime()) && published >= cutoff;
  });
}

function buildNewsSitemap(articles) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${articles.map((article) => `  <url>\n    <loc>${xml(article.url)}</loc>\n    <news:news>\n      <news:publication>\n        <news:name>Pereuloq</news:name>\n        <news:language>${article.lang === 'en' ? 'en' : 'ru'}</news:language>\n      </news:publication>\n      <news:publication_date>${xml(article.datePublished)}</news:publication_date>\n      <news:title>${xml(article.title)}</news:title>\n    </news:news>\n  </url>`).join('\n')}\n</urlset>\n`;
}

function buildImageSitemap(articles) {
  const withImages = articles.filter((article) => article.image);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${withImages.map((article) => `  <url>\n    <loc>${xml(article.url)}</loc>\n    <image:image>\n      <image:loc>${xml(article.image)}</image:loc>\n      <image:title>${xml(article.imageAlt || article.title)}</image:title>\n      <image:caption>${xml(article.description || article.title)}</image:caption>\n    </image:image>\n  </url>`).join('\n')}\n</urlset>\n`;
}

function buildIndex(articles, pages) {
  return JSON.stringify({
    generatedAt: GENERATED_AT,
    site: SITE,
    counts: {
      pages: pages.length,
      articles: articles.length,
      newsSitemapArticles: recentNews(articles).length,
      images: articles.filter((article) => article.image).length
    },
    articles,
    pages
  }, null, 2) + '\n';
}

const articles = mergeArticles().sort((a, b) => String(b.datePublished || '').localeCompare(String(a.datePublished || '')));
const pages = staticPageEntries();
const sitemapEntries = [...pages, ...articleEntries(articles)]
  .filter((item, index, arr) => arr.findIndex((candidate) => candidate.loc === item.loc) === index);

fs.writeFileSync('sitemap.xml', buildSitemap(sitemapEntries));
fs.writeFileSync('news-sitemap.xml', buildNewsSitemap(recentNews(articles)));
fs.writeFileSync('image-sitemap.xml', buildImageSitemap(articles));
fs.writeFileSync('data/seo-index.json', buildIndex(articles, pages));

console.log(`SEO files generated: ${sitemapEntries.length} urls, ${recentNews(articles).length} news urls, ${articles.filter((article) => article.image).length} image urls.`);
