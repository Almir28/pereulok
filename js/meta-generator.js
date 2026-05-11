(function () {
  'use strict';

  const SITE = {
    name: 'Pereuloq',
    url: 'https://pereuloq.ru',
    locale: 'ru_RU',
    author: 'Pereuloq',
    defaultImage: 'https://pereuloq.ru/assets/logo.svg',
    description: 'Pereuloq - современный онлайн-журнал о технологиях, бизнесе, культуре, здоровье, кино и важных событиях.',
    keywords: ['Pereuloq', 'новости', 'технологии', 'культура', 'бизнес', 'кино', 'здоровье', 'медиа']
  };

  const PAGE_SEO = {
    '/': {
      title: 'Pereuloq - журнал о технологиях, культуре и событиях',
      description: 'Pereuloq - премиальный онлайн-журнал о технологиях, бизнесе, культуре, здоровье, кино и интересных событиях без лишнего шума.',
      keywords: ['онлайн журнал', 'новости Pereuloq', 'технологии', 'культура', 'бизнес']
    },
    '/index.html': {
      title: 'Pereuloq - журнал о технологиях, культуре и событиях',
      description: 'Pereuloq - премиальный онлайн-журнал о технологиях, бизнесе, культуре, здоровье, кино и интересных событиях без лишнего шума.',
      keywords: ['онлайн журнал', 'новости Pereuloq', 'технологии', 'культура', 'бизнес']
    },
    '/feed.html': {
      title: 'Лента Pereuloq - свежие новости и статьи',
      description: 'Свежая лента Pereuloq: новости, статьи, культурные материалы, технологии, здоровье, кино, бизнес и подборки редакции.',
      keywords: ['лента новостей', 'свежие статьи', 'Pereuloq feed', 'новости культуры', 'технологии']
    },
    '/about.html': {
      title: 'О проекте Pereuloq',
      description: 'Pereuloq - современный онлайн-журнал о технологиях, бизнесе, путешествиях, культуре и стиле жизни с удобным чтением на всех устройствах.',
      keywords: ['о Pereuloq', 'онлайн медиа', 'редакционный журнал', 'проект Pereuloq']
    },
    '/privacy.html': {
      title: 'Политика конфиденциальности Pereuloq',
      description: 'Политика конфиденциальности Pereuloq: как сайт работает с данными, аналитикой, cookies и пользовательскими настройками.',
      keywords: ['политика конфиденциальности', 'privacy', 'Pereuloq']
    },
    '/private.html': {
      title: 'Private - Pereuloq',
      description: 'Приватный раздел Pereuloq для дополнительных материалов, подписок и закрытых обновлений проекта.',
      keywords: ['Pereuloq Private', 'закрытые материалы', 'подписка']
    },
    '/sport.html': {
      title: 'Спорт онлайн - Pereuloq',
      description: 'Спортивный раздел Pereuloq с live-матчами, счетом, турнирами, статистикой и автообновлением данных.',
      keywords: ['спорт онлайн', 'live score', 'матчи', 'футбол', 'Pereuloq Sport']
    },
    '/pages/sports.html': {
      title: 'Live-матчи - Pereuloq Sport',
      description: 'Live-матчи, счет, команды, турниры и спортивная статистика в интерфейсе Pereuloq Sport.',
      keywords: ['live матчи', 'спорт', 'счет онлайн', 'турниры']
    },
    '/pages/match.html': {
      title: 'Матч онлайн - Pereuloq Sport',
      description: 'Страница матча Pereuloq Sport: команды, счет, статус, события, статистика и live-обновление.',
      keywords: ['матч онлайн', 'статистика матча', 'live score', 'спорт']
    },
    '/store.html': {
      title: 'Магазин цифровых товаров - Pereuloq',
      description: 'Магазин Pereuloq: Apple Gift Card, игровые подписки, цифровые товары и сервисы с быстрым оформлением заказа.',
      keywords: ['магазин цифровых товаров', 'Apple Gift Card', 'подписки', 'цифровые коды']
    },
    '/apple-gift-card.html': {
      title: 'Apple Gift Card - Pereuloq Store',
      description: 'Apple Gift Card для разных регионов: выбор страны, номинала, расчет цены в рублях и быстрый заказ у продавца.',
      keywords: ['Apple Gift Card', 'подарочная карта Apple', 'iTunes карта', 'цифровой код']
    },
    '/apple-gift-card-product.html': {
      title: 'Apple Gift Card Turkey - Pereuloq Store',
      description: 'Apple Gift Card Turkey: выбор номинала, автоматический расчет итоговой цены в рублях и готовый текст заказа.',
      keywords: ['Apple Gift Card Turkey', 'Apple Turkey', 'iTunes Turkey', 'подарочная карта Турция']
    },
    '/product.html': {
      title: 'Цифровой товар - Pereuloq Store',
      description: 'Страница цифрового товара Pereuloq Store с описанием, ценой, рекомендациями и быстрым переходом к продавцу.',
      keywords: ['цифровой товар', 'Pereuloq Store', 'онлайн покупка']
    }
  };

  const cleanText = (value) => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const trim = (value, max = 158) => {
    const text = cleanText(value);
    if (text.length <= max) return text;
    return `${text.slice(0, max - 1).replace(/\s+\S*$/, '')}…`;
  };
  const canonicalPath = (pathname) => {
    let path = pathname || '/';
    if (path.endsWith('/')) return path;
    return path.replace(/\\/g, '/');
  };
  const absoluteUrl = (path) => {
    if (!path || path === '/') return SITE.url + '/';
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
  };
  const pagePath = () => {
    if (window.location.protocol === 'file:') {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const file = parts.at(-1) || 'index.html';
      const folder = parts.at(-2);
      if (folder === 'posts' || folder === 'pages') return `/${folder}/${file}`;
      return file === 'index.html' ? '/' : `/${file}`;
    }
    const pathname = canonicalPath(window.location.pathname);
    if (pathname === '/' || pathname.endsWith('/index.html')) return pathname === '/' ? '/' : pathname;
    return pathname;
  };
  const articlePath = (article) => `/${String(article.href || '').replace(/^\/+/, '')}`;
  const articleKeywords = (article) => {
    const base = [article.cat, article.title, 'Pereuloq', 'новости'];
    return [...new Set(base.concat(cleanText(article.desc).split(/[,\s]+/).filter((word) => word.length > 4).slice(0, 7)))];
  };
  const getArticles = () => window.PEREULOQ_PUBLIC_ARTICLES || window.PEREULOQ_ARTICLES || [];
  const findArticle = () => {
    const current = pagePath().replace(/\/index\.html$/, '/');
    return getArticles().find((article) => {
      const path = articlePath(article);
      return path === current || current.endsWith(path) || article.href === current.replace(/^\//, '');
    });
  };
  const metaByPage = () => {
    const article = findArticle();
    if (article) {
      return {
        type: article.kind === 'news' ? 'article' : 'article',
        title: `${article.title} - Pereuloq`,
        description: trim(article.desc || article.body || article.title),
        keywords: articleKeywords(article),
        image: article.img,
        canonical: absoluteUrl(articlePath(article)),
        article
      };
    }

    const config = PAGE_SEO[pagePath()] || PAGE_SEO[`/${pagePath().split('/').pop()}`] || {
      title: document.title || SITE.name,
      description: document.querySelector('meta[name="description"]')?.content || SITE.description,
      keywords: SITE.keywords
    };
    return {
      type: 'website',
      title: config.title,
      description: trim(config.description),
      keywords: config.keywords || SITE.keywords,
      image: config.image || SITE.defaultImage,
      canonical: absoluteUrl(pagePath() === '/index.html' ? '/' : pagePath())
    };
  };
  const setTag = (selector, create, value) => {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = create();
      document.head.appendChild(node);
    }
    Object.entries(value).forEach(([key, content]) => node.setAttribute(key, content));
    return node;
  };
  const meta = (name, content) => setTag(`meta[name="${name}"]`, () => {
    const node = document.createElement('meta');
    node.setAttribute('name', name);
    return node;
  }, { content });
  const property = (name, content) => setTag(`meta[property="${name}"]`, () => {
    const node = document.createElement('meta');
    node.setAttribute('property', name);
    return node;
  }, { content });
  const link = (rel, href) => setTag(`link[rel="${rel}"]`, () => {
    const node = document.createElement('link');
    node.setAttribute('rel', rel);
    return node;
  }, { href });

  function applyMeta(data = metaByPage()) {
    const title = data.title || SITE.name;
    const description = trim(data.description || SITE.description);
    const canonical = data.canonical || absoluteUrl(pagePath());
    const image = absoluteUrl(data.image || SITE.defaultImage);
    const keywords = Array.isArray(data.keywords) ? data.keywords.join(', ') : String(data.keywords || SITE.keywords.join(', '));

    document.title = title;
    meta('description', description);
    meta('keywords', keywords);
    meta('author', SITE.author);
    meta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    meta('theme-color', '#080b14');
    property('og:site_name', SITE.name);
    property('og:locale', SITE.locale);
    property('og:title', title);
    property('og:description', description);
    property('og:image', image);
    property('og:type', data.type === 'article' ? 'article' : 'website');
    property('og:url', canonical);
    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', title);
    meta('twitter:description', description);
    meta('twitter:image', image);
    link('canonical', canonical);
    return { ...data, title, description, canonical, image, keywords };
  }

  window.PereuloqSEOConfig = { SITE, PAGE_SEO };
  window.PereuloqMetaGenerator = { applyMeta, metaByPage, findArticle, getArticles, absoluteUrl, cleanText, trim, articlePath };
})();
