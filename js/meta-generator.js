(function () {
  'use strict';

  const SITE = {
    name: 'Pereuloq',
    url: 'https://pereuloq.ru',
    locale: 'ru_RU',
    author: 'Almir Khialov',
    defaultImage: 'https://pereuloq.ru/assets/icons/android-chrome-512x512.png',
    description: 'Pereuloq — современное digital media о технологиях, культуре, AI, моде, кино, успехе и полезных идеях. Главная без политики, войн и продаж.',
    keywords: ['Pereuloq', 'digital media', 'технологии', 'культура', 'AI', 'мода', 'кино', 'медиа']
  };

  const PAGE_SEO = {
    '/': {
      title: 'Pereuloq — спокойное digital media о технологиях, культуре и AI',
      description: 'Pereuloq — современное digital media о технологиях, культуре, AI, моде, кино, успехе и полезных идеях. Главная без политики, войн и продаж.',
      keywords: ['Pereuloq', 'digital media', 'технологии', 'культура', 'AI', 'мода']
    },
    '/index.html': {
      title: 'Pereuloq — спокойное digital media о технологиях, культуре и AI',
      description: 'Pereuloq — современное digital media о технологиях, культуре, AI, моде, кино, успехе и полезных идеях. Главная без политики, войн и продаж.',
      keywords: ['Pereuloq', 'digital media', 'технологии', 'культура', 'AI', 'мода']
    },
    '/feed.html': {
      title: 'Лента Pereuloq - свежие новости и статьи',
      description: 'Свежая лента Pereuloq: новости, статьи, культурные материалы, технологии, здоровье, кино, бизнес и подборки редакции.',
      keywords: ['лента новостей', 'свежие статьи', 'Pereuloq feed', 'новости культуры', 'технологии']
    },
    '/politics.html': {
      title: 'Мировая политика - Pereuloq',
      description: 'Отдельный premium-раздел Pereuloq о мировой политике, геополитике, кризисах, санкциях и международных конфликтах.',
      keywords: ['мировая политика', 'геополитика', 'международные конфликты', 'санкции', 'кризисы']
    },
    '/about.html': {
      title: 'О проекте Pereuloq — founder-led digital media',
      description: 'Pereuloq — founder-led digital media о технологиях, культуре, AI, спорте, мировой политике, Premium и цифровых сервисах.',
      keywords: ['о Pereuloq', 'онлайн медиа', 'редакционный журнал', 'проект Pereuloq']
    },
    '/privacy.html': {
      title: 'Политика конфиденциальности Pereuloq',
      description: 'Политика конфиденциальности Pereuloq: как сайт работает с данными, аналитикой, cookies и пользовательскими настройками.',
      keywords: ['политика конфиденциальности', 'privacy', 'Pereuloq']
    },
    '/private.html': {
      title: 'Pereuloq Premium — закрытые материалы и аналитика',
      description: 'Pereuloq Premium — закрытые материалы, редакционные мысли, аналитика, longreads, AI и доступ к закрытому Telegram за 99 рублей.',
      keywords: ['Pereuloq Premium', 'закрытые материалы', 'аналитика', 'подписка']
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
      title: 'Pereuloq Store — цифровой concierge-сервис',
      description: 'Pereuloq Store — premium digital concierge service: Apple Gift Card, Xbox Game Pass, игры и подписки с заказом через Telegram и поддержкой.',
      keywords: ['магазин цифровых товаров', 'Apple Gift Card', 'подписки', 'цифровые коды']
    },
    '/apple-gift-card.html': {
      title: 'Apple Gift Card — купить цифровую карту для App Store и iTunes',
      description: 'Apple Gift Card для App Store и iTunes: выбор региона, номинала, расчет цены в рублях и быстрый заказ цифровой карты.',
      keywords: ['Apple Gift Card', 'подарочная карта Apple', 'iTunes карта', 'цифровой код']
    },
    '/apple-gift-card-product.html': {
      title: 'Apple Gift Card — купить цифровую карту для App Store и iTunes',
      description: 'Apple Gift Card для App Store и iTunes: цифровая карта Apple с выбором номинала, региона и быстрым оформлением заказа.',
      keywords: ['Apple Gift Card Turkey', 'Apple Turkey', 'iTunes Turkey', 'подарочная карта Турция']
    },
    '/product.html': {
      title: 'Цифровой товар — Pereuloq Store',
      description: 'Страница цифрового товара Pereuloq Store с условиями заказа, Telegram-поддержкой, проверкой доступности и безопасной активацией.',
      keywords: ['цифровой товар', 'Pereuloq Store', 'онлайн покупка']
    },
    '/almir-khialov.html': {
      title: 'Almir Khialov — Founder & Owner of Pereuloq',
      description: 'Almir Khialov is the founder and owner of Pereuloq, a modern digital media and technology platform focused on useful content, digital products and online services.',
      keywords: ['Almir Khialov', 'Pereuloq founder', 'Founder Owner Pereuloq', 'digital media']
    }
  };

  const translations = {
    ru: {
      searchPlaceholder: 'Найти новость, тему или рубрику',
      searchEmpty: 'Ничего не найдено. Попробуйте другое слово.',
      orderCopied: '✓ Заказ скопирован',
      linkCopied: '✓ Ссылка скопирована',
      subscribed: '✦ Вы в списке. Добро пожаловать.',
      emailInvalid: '⚠ Введите корректный email'
    },
    en: {
      searchPlaceholder: 'Search stories, topics or sections',
      searchEmpty: 'Nothing found. Try another keyword.',
      orderCopied: '✓ Order copied',
      linkCopied: '✓ Link copied',
      subscribed: '✦ You are on the list. Welcome.',
      emailInvalid: '⚠ Enter a valid email'
    }
  };

  const currentLang = () => (document.documentElement.lang || '').toLowerCase().startsWith('en') || window.location.pathname.startsWith('/en/') ? 'en' : 'ru';
  const t = (key) => translations[currentLang()]?.[key] || translations.ru[key] || key;

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
      const maybeEn = parts.includes('en');
      if (maybeEn && file === 'index.html') return '/en/';
      if (maybeEn) return `/en/${folder === 'posts' || folder === 'pages' ? `${folder}/` : ''}${file}`;
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

    const currentPath = pagePath();
    const isEn = currentLang() === 'en';
    const pathWithoutLang = currentPath.replace(/^\/en(?=\/|$)/, '') || '/';
    const config = (isEn ? {
      '/': {
        title: 'Pereuloq — calm digital media about technology, culture and AI',
        description: 'Pereuloq is a modern digital media project about technology, culture, AI, fashion, cinema, success and useful ideas. The home page stays calm: no politics, wars or sales.',
        keywords: ['Pereuloq', 'digital media', 'technology', 'culture', 'AI', 'fashion']
      },
      '/index.html': {
        title: 'Pereuloq — calm digital media about technology, culture and AI',
        description: 'Pereuloq is a modern digital media project about technology, culture, AI, fashion, cinema, success and useful ideas. The home page stays calm: no politics, wars or sales.',
        keywords: ['Pereuloq', 'digital media', 'technology', 'culture', 'AI', 'fashion']
      },
      '/feed.html': {
        title: 'Pereuloq Feed — fresh stories and updates',
        description: 'Fresh Pereuloq feed with stories about technology, culture, business, digital products and useful online services.',
        keywords: ['Pereuloq feed', 'technology stories', 'digital media']
      },
      '/store.html': {
        title: 'Pereuloq Store — digital concierge service',
        description: 'Pereuloq Store is a premium digital concierge service for Apple Gift Card, Xbox, games, subscriptions and digital services ordered through Telegram.',
        keywords: ['Pereuloq Store', 'digital concierge', 'digital products', 'Apple Gift Card', 'Xbox Game Pass']
      },
      '/about.html': {
        title: 'About Pereuloq — useful media, digital services and products',
        description: 'Pereuloq is a modern online magazine and digital platform focused on useful technology content, digital products and online services without noise.',
        keywords: ['about Pereuloq', 'digital media', 'technology platform']
      },
      '/almir-khialov.html': {
        title: 'Almir Khialov — Founder & Owner of Pereuloq',
        description: 'Almir Khialov is the founder and owner of Pereuloq, a modern digital media and technology platform focused on useful content, digital products and online services.',
        keywords: ['Almir Khialov', 'Pereuloq founder', 'Founder Owner Pereuloq']
      }
    } : PAGE_SEO)[pathWithoutLang] || PAGE_SEO[pathWithoutLang] || PAGE_SEO[`/${pathWithoutLang.split('/').pop()}`] || {
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
      canonical: absoluteUrl(currentPath === '/index.html' ? '/' : currentPath)
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

  window.PereuloqSEOConfig = { SITE, PAGE_SEO, translations, currentLang, t };
  window.PereuloqMetaGenerator = { applyMeta, metaByPage, findArticle, getArticles, absoluteUrl, cleanText, trim, articlePath, currentLang, t };
})();
