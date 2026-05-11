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
      logo: abs('/assets/logo.svg'),
      sameAs: [config.url]
    };
  }

  function website() {
    const config = site();
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.name,
      url: config.url,
      inLanguage: 'ru-RU',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${config.url}/feed.html?q={search_term_string}`,
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
      image: [abs(articleData.img || meta.image)],
      datePublished: articleData.isoDate || articleData.publishedAt || '2026-05-11T09:00:00+03:00',
      dateModified: articleData.modifiedAt || articleData.isoDate || '2026-05-11T09:00:00+03:00',
      author: {
        '@type': 'Organization',
        name: articleData.author || config.name,
        url: config.url
      },
      publisher: {
        '@type': 'Organization',
        name: config.name,
        logo: {
          '@type': 'ImageObject',
          url: abs('/assets/logo.svg')
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': meta.canonical
      },
      articleSection: articleData.cat || 'Новости',
      inLanguage: 'ru-RU'
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
      image: productData.image || abs('/assets/logo.svg'),
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
