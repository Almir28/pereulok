(function () {
  'use strict';

  const site = () => window.PereuloqSEOConfig?.SITE || { name: 'Pereuloq', url: 'https://pereuloq.ru' };
  const abs = (path) => window.PereuloqMetaGenerator?.absoluteUrl(path) || path;

  function organization() {
    const config = site();
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.name,
      url: config.url,
      logo: {
        '@type': 'ImageObject',
        url: abs('/assets/icons/android-chrome-512x512.png'),
        width: 512,
        height: 512
      },
      founder: {
        '@type': 'Person',
        name: 'Almir Khialov',
        url: `${config.url}/almir-khialov.html`
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'support@pereuloq.ru',
        contactType: 'customer support',
        availableLanguage: ['Russian', 'English']
      },
      sameAs: [config.url, 'https://t.me/almir328']
    };
  }

  function website() {
    const config = site();
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.name,
      url: config.url,
      inLanguage: window.PereuloqMetaGenerator?.currentLang?.() === 'en' ? 'en-US' : 'ru-RU',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${config.url}${window.PereuloqMetaGenerator?.currentLang?.() === 'en' ? '/en' : ''}/feed.html?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  }

  function breadcrumb(items) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: abs(item.url)
      }))
    };
  }

  function article(articleData, meta) {
    const config = site();
    return {
      '@context': 'https://schema.org',
      '@type': articleData.kind === 'news' ? 'NewsArticle' : 'Article',
      headline: articleData.title,
      description: meta.description,
      image: [abs(articleData.img || articleData.image || meta.image)],
      thumbnailUrl: abs(articleData.img || articleData.image || meta.image),
      datePublished: articleData.isoDate || articleData.publishedAt || '2026-05-11T09:00:00+03:00',
      dateModified: articleData.modifiedAt || articleData.isoDate || '2026-05-11T09:00:00+03:00',
      author: {
        '@type': 'Person',
        name: articleData.author || 'Almir Khialov',
        url: `${config.url}/almir-khialov.html`
      },
      publisher: {
        '@type': 'Organization',
        name: config.name,
        logo: {
          '@type': 'ImageObject',
          url: abs('/assets/icons/android-chrome-512x512.png')
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': meta.canonical
      },
      articleSection: articleData.cat || 'Новости',
      keywords: Array.isArray(articleData.tags) ? articleData.tags.join(', ') : undefined,
      isAccessibleForFree: articleData.isPremium ? false : true,
      wordCount: document.querySelector('article')?.innerText?.split(/\s+/).filter(Boolean).length || undefined,
      inLanguage: window.PereuloqMetaGenerator?.currentLang?.() === 'en' ? 'en-US' : 'ru-RU'
    };
  }

  function sportsEvent(match = {}) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SportsEvent',
      name: match.name || document.querySelector('h1')?.textContent || 'Матч Pereuloq Sport',
      url: abs(window.location.pathname + window.location.search),
      startDate: match.startDate || undefined,
      eventStatus: 'https://schema.org/EventScheduled',
      sport: match.sport || 'Football',
      competitor: (match.teams || []).map((team) => ({
        '@type': 'SportsTeam',
        name: team.name,
        logo: team.logo
      })).filter((team) => team.name),
      organizer: {
        '@type': 'Organization',
        name: 'Pereuloq Sport',
        url: abs('/sport.html')
      }
    };
  }

  function product(productData = {}) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productData.name || document.querySelector('h1')?.textContent || 'Цифровой товар Pereuloq',
      description: productData.description || document.querySelector('meta[name="description"]')?.content || 'Цифровой товар Pereuloq Store',
      image: productData.image || abs('/assets/icons/android-chrome-512x512.png'),
      brand: {
        '@type': 'Brand',
        name: 'Pereuloq Store'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: productData.currency || 'RUB',
        price: productData.price || '0',
        availability: 'https://schema.org/InStock',
        url: abs(window.location.pathname)
      }
    };
  }

  function faq(questions = []) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
  }

  window.PereuloqSchema = { organization, website, breadcrumb, article, newsArticle: article, sportsEvent, product, faq };
})();
