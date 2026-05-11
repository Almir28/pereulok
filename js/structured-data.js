(function () {
  'use strict';

  const inject = (id, data) => {
    if (!data) return;
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = id;
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(data, null, 2);
  };

  function buildBreadcrumb(meta) {
    const schema = window.PereuloqSchema;
    if (!schema) return null;
    const article = meta.article;
    const items = [
      { name: 'Pereuloq', url: '/' },
      { name: 'Лента', url: '/feed.html' }
    ];
    if (article) items.push({ name: article.title, url: window.location.pathname });
    else items.push({ name: document.title.replace(' - Pereuloq', '').replace(' — Pereuloq', ''), url: window.location.pathname });
    return schema.breadcrumb(items);
  }

  function applyStructuredData(meta) {
    const schema = window.PereuloqSchema;
    if (!schema) return;
    inject('schema-organization', schema.organization());
    inject('schema-website', schema.website());
    inject('schema-breadcrumbs', buildBreadcrumb(meta));

    if (meta.article) {
      inject('schema-article', schema.article(meta.article, meta));
      return;
    }
    if (document.body?.dataset.page === 'sport' || window.location.pathname.includes('/pages/match')) {
      inject('schema-sports-event', schema.sportsEvent());
      return;
    }
    if (/store|gift-card|product|xbox/i.test(window.location.pathname)) {
      inject('schema-product', schema.product());
      inject('schema-faq', schema.faq([
        {
          question: 'Как оформить заказ на цифровой товар?',
          answer: 'Выберите товар, номинал или тариф, скопируйте автоматически созданный заказ и отправьте его продавцу.'
        },
        {
          question: 'Можно ли вернуть цифровой код?',
          answer: 'Цифровые товары и коды после выдачи не подлежат возврату, если иное не указано в описании товара.'
        }
      ]));
    }
  }

  window.PereuloqStructuredData = { applyStructuredData };
})();
