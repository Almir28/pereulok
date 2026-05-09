import { calculateFinalRub, createOrderId, formatNominal, formatRub } from './agc-utils.js';

export function buildOptions(country) {
  return country.values.map((value) => ({
    value,
    label: formatNominal(value, country),
    rub: calculateFinalRub(value, country)
  }));
}

export function createOrderText(country, option) {
  return `--------------------------------
ORDER ID: ${createOrderId()}

Товар:
${country.title}

Номинал:
${option.label}

Конвертация:
${formatRub(option.rub)}

Покупатель подтверждает:
✅ Регион выбран верно
✅ Товар выбран верно
✅ Цифровой товар не подлежит возврату
✅ Код будет активирован на аккаунте нужного региона
--------------------------------`;
}
