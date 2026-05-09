import { giftCardCountries, giftCardData, giftCardSettings } from '../data/gift-card-data.js';
import { buildOptions, createOrderText } from './agc-order.js';
import { copyText, formatRub, getCountrySlug, onReady, toast } from './agc-utils.js';
import { hydrateSkeleton, pulsePrice } from './agc-animations.js';

const cardImage = 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/giftcard-email-geode-select-2021?wid=600&hei=600&fmt=png-alpha&.v=bUgyM0RTaXJFS1BjZEl0R2ZhY3NWQk9UR2s3SlFFOWM2MGNlbHd1VE9uS0ZWOGd0ZE9RYTMwdzJDckhhbzIydlM0TjRWdzF2UjRGVEY0c3dBQVZ6VFRNNDAxQXNodDdOckZoZ08zRDVGUEk';

let currentOrderText = '';
let currentSellerUrl = giftCardSettings.sellerUrl;

function countryCard(country) {
  const first = buildOptions(country)[0];
  return `
    <a class="agc-country-card" href="${country.href}" style="--country-a:${country.accent};--country-b:${country.tint}" aria-label="Открыть ${country.title}">
      <span class="agc-country-aurora" aria-hidden="true"></span>
      <span class="agc-country-top">
        <span class="agc-country-code">${country.code}</span>
        <span class="agc-country-status">Доступно</span>
      </span>
      <span class="agc-country-art" aria-hidden="true">
        <img src="${cardImage}" alt="" loading="lazy" decoding="async">
      </span>
      <span class="agc-country-copy">
        <span class="agc-country-kicker">Apple Gift Card</span>
        <h2>${country.label}</h2>
        <p>${country.accountHint}</p>
      </span>
      <span class="agc-country-foot">
        <span>${country.currency}</span>
        <strong>от ${formatRub(first.rub)}</strong>
      </span>
    </a>`;
}

function renderCountrySkeleton() {
  return Array.from({ length: 8 }, () => `
    <article class="agc-country-card agc-skeleton" aria-hidden="true">
      <span class="agc-skeleton-line short"></span>
      <span class="agc-skeleton-orb"></span>
      <span class="agc-skeleton-line"></span>
      <span class="agc-skeleton-line soft"></span>
    </article>`).join('');
}

function renderCountries() {
  const grid = document.getElementById('AGC_COUNTRIES');
  const count = document.getElementById('AGC_COUNTRY_COUNT');
  if (!grid) return;
  document.title = 'Apple Gift Card — страны и цифровые коды | Pereuloq';
  if (count) count.textContent = `${giftCardCountries.length} регионов`;
  grid.innerHTML = renderCountrySkeleton();
  hydrateSkeleton(grid, () => {
    grid.innerHTML = giftCardCountries.map(countryCard).join('');
  });
}

function syncMeta(country) {
  document.title = `${country.title} — номинал и заказ | Pereuloq`;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', `${country.title}: выбор номинала ${country.currency}, финальная цена в RUB, генерация заказа и связь с продавцом в Telegram.`);
  }
}

function renderEmptyProduct(slug) {
  const page = document.getElementById('AGC_PRODUCT_PAGE');
  if (!page) return;
  page.innerHTML = `
    <div class="wrap">
      <section class="agc-empty-product">
        <div class="agc-loader" aria-hidden="true"></div>
        <h1>Регион не найден</h1>
        <p>Для региона "${slug}" пока нет конфигурации. Вернитесь к списку стран и выберите доступный вариант.</p>
        <a class="btn-ab primary" href="apple-gift-card.html">Выбрать страну</a>
      </section>
    </div>`;
}

function updateProduct(country, options) {
  const select = document.getElementById('AGC_DENOM_SELECT');
  const selectedValue = Number(select?.value || options[0].value);
  const option = options.find((item) => item.value === selectedValue) || options[0];
  const conversion = document.getElementById('AGC_CONVERSION');
  const price = document.getElementById('AGC_PRICE');
  const stickyPrice = document.getElementById('AGC_STICKY_PRICE');
  const order = document.getElementById('AGC_ORDER_TEXT');

  currentOrderText = createOrderText(country, option);
  currentSellerUrl = giftCardSettings.sellerUrl;

  if (conversion) conversion.textContent = formatRub(option.rub);
  if (price) price.textContent = option.label;
  if (stickyPrice) stickyPrice.textContent = formatRub(option.rub);
  if (order) order.value = currentOrderText;
  pulsePrice(conversion, stickyPrice);
}

function renderProduct() {
  const page = document.getElementById('AGC_PRODUCT_PAGE');
  if (!page) return;
  const slug = getCountrySlug(giftCardSettings.defaultCountry);
  const country = giftCardData[slug];
  if (!country) {
    renderEmptyProduct(slug);
    return;
  }

  const options = buildOptions(country);
  syncMeta(country);

  const title = document.getElementById('AGC_PRODUCT_TITLE');
  const region = document.getElementById('AGC_PRODUCT_REGION');
  const description = document.getElementById('AGC_PRODUCT_DESC');
  const warning = document.getElementById('AGC_WARNING');
  const select = document.getElementById('AGC_DENOM_SELECT');
  const rate = document.getElementById('AGC_RATE');
  const heroCard = document.getElementById('AGC_PRODUCT_CARD');
  const selectorWrap = document.getElementById('AGC_SELECTOR_WRAP');
  const unavailable = document.getElementById('AGC_UNAVAILABLE');

  if (title) title.textContent = country.title;
  if (region) region.textContent = country.label;
  if (description) description.textContent = 'Вы покупаете подарочную карту (код) для пополнения аккаунта iTunes / Apple Store.';
  if (warning) warning.textContent = `Промокод можно активировать только на аккаунтах с регионом ${country.region}.`;
  if (rate) rate.textContent = 'Финальная стоимость обновляется автоматически при выборе номинала.';
  if (selectorWrap) selectorWrap.hidden = false;
  if (unavailable) unavailable.hidden = true;
  document.querySelectorAll('.agc-ready-only').forEach((block) => { block.hidden = false; });
  if (heroCard) {
    heroCard.style.setProperty('--country-a', country.accent);
    heroCard.style.setProperty('--country-b', country.tint);
  }
  if (select) {
    select.innerHTML = options.map((option) => `<option value="${option.value}">${option.label} · ${formatRub(option.rub)}</option>`).join('');
    select.value = String(options.find((item) => item.value === 100)?.value || options[0].value);
    select.addEventListener('change', () => updateProduct(country, options));
  }

  updateProduct(country, options);
}

async function copyOrderAndMaybeOpen(openSeller) {
  if (!currentOrderText) return;
  await copyText(currentOrderText);
  toast('Заказ скопирован');
  if (openSeller) window.open(currentSellerUrl, '_blank', 'noopener');
}

function bindActions() {
  window.copyAgcOrder = (openSeller = false) => copyOrderAndMaybeOpen(Boolean(openSeller));
  document.addEventListener('click', (event) => {
    const copyButton = event.target.closest('[data-agc-copy]');
    const contactButton = event.target.closest('[data-agc-contact]');
    if (copyButton?.hasAttribute('onclick') || contactButton?.hasAttribute('onclick')) return;
    if (copyButton) copyOrderAndMaybeOpen(false);
    if (contactButton) copyOrderAndMaybeOpen(true);
  });
}

onReady(() => {
  window.setTimeout(() => {
    renderCountries();
    renderProduct();
    bindActions();
  }, 0);
});
