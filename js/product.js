import { products } from '/js/shop-data.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const fmtCurrency = (value, currency) => {
  try { return new Intl.NumberFormat('ru-RU', { style: 'currency', currency }).format(value); }
  catch { return `${value} ${currency}`; }
};

function getId() {
  const url = new URL(location.href);
  return url.searchParams.get('id');
}

function renderProduct(p) {
  if (!p) return;
  $('#pImage').src = p.cover;
  $('#pImage').alt = p.title;
  $('#pTitle').textContent = p.title;
  $('#pShort').textContent = p.short;
  $('#pType').textContent = p.type === 'subscription' ? 'Подписка' : p.type === 'digital' ? 'Цифровой товар' : 'Услуга';
  $('#pPrice').textContent = fmtCurrency(p.price, p.currency);
  $('#pPeriod').textContent = p.period || '';
  const rich = p.description
    .split('\n')
    .map(line => line.trim() ? `<p>${line}</p>` : '')
    .join('');
  const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  setHTML('pDescription', rich);
  setHTML('pFull', rich);
  $('#pFeatures').innerHTML = (p.features || []).map(f => `<li class="flex items-start gap-2"><span class="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-2"></span><span>${f}</span></li>`).join('');

  const screens = $('#pScreens');
  screens.innerHTML = (p.images || []).map(src => `<img src="${src}" alt="" class="w-full h-auto rounded-xl border border-neutral-200 dark:border-neutral-800">`).join('');

  const openCheckout = () => {
    if (!p.payment || !p.payment.checkoutUrl || p.payment.checkoutUrl.startsWith('#REPLACE')) {
      alert('Ссылка на оплату ещё не настроена. Укажите checkoutUrl в js/shop-data.js');
      return;
    }
    window.open(p.payment.checkoutUrl, '_blank', 'noopener');
  };
  $('#buyBtn').addEventListener('click', openCheckout);

  // Recommended: same category, excluding current
  const reco = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 3);
  $('#reco').innerHTML = reco.map(x => `
  <a href="/product.html?id=${encodeURIComponent(x.id)}" class="editorial-item glass glass-border bg-white/70 dark:bg-neutral-900/70 shadow-soft">
    <div class="relative h-36">
      <img src="${x.cover}" alt="${x.title}" class="absolute inset-0 w-full h-full object-cover" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
    </div>
    <div class="px-5 pt-4 pb-5">
      <div class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">${x.type === 'subscription' ? 'Подписка' : x.type === 'digital' ? 'Цифровой' : 'Услуга'}</div>
      <h3 class="title text-lg font-semibold">${x.title}</h3>
      <div class="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">${x.short}</div>
      <div class="mt-3 text-base font-semibold">${fmtCurrency(x.price, x.currency)} ${x.period || ''}</div>
    </div>
  </a>`).join('');
}

function init() {
  const id = getId();
  $('#year').textContent = String(new Date().getFullYear());
  const p = products.find(x => x.id === id) || products[0];
  renderProduct(p);
}

document.addEventListener('DOMContentLoaded', init);
