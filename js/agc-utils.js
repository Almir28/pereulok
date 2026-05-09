export const rubFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0
});

export const numberFormatter = new Intl.NumberFormat('ru-RU', {
  maximumFractionDigits: 0
});

export function getCountrySlug(defaultSlug = 'turkey') {
  const params = new URLSearchParams(window.location.search);
  return params.get('country') || defaultSlug;
}

export function formatRub(value) {
  return `≈ ${rubFormatter.format(value)} RUB`;
}

export function formatNominal(value, country) {
  const amount = numberFormatter.format(value);
  return country.symbolPosition === 'before'
    ? `${country.symbol}${amount}`
    : `${amount} ${country.symbol}`;
}

export function calculateFinalRub(value, country) {
  return Math.round(value * country.rateToRub * country.markup);
}

export function createOrderId() {
  if (window.crypto?.getRandomValues) {
    const buffer = new Uint32Array(1);
    window.crypto.getRandomValues(buffer);
    return `#AGC-${String(buffer[0] % 9000 + 1000)}`;
  }
  return `#AGC-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.left = '-9999px';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
}

export function toast(message) {
  const toastEl = document.getElementById('TOAST');
  if (!toastEl) return;
  const icon = document.getElementById('T_I');
  const text = document.getElementById('T_M') || document.getElementById('T_T');
  if (icon) icon.textContent = '✓';
  if (text) text.textContent = message;
  toastEl.classList.add('on');
  clearTimeout(window.__agcToastTimer);
  window.__agcToastTimer = setTimeout(() => toastEl.classList.remove('on'), 3200);
}

export function onReady(callback) {
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}
