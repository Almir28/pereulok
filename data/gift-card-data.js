export const giftCardSettings = {
  sellerUrl: 'https://t.me/almir328',
  sourceLabel: 'CBR 07.05.2026',
  sourceUrl: 'https://www.cbr.ru/scripts/XML_daily.asp',
  defaultCountry: 'turkey'
};

export const giftCardData = {
  turkey: {
    label: 'Турция',
    title: 'Apple Gift Card Turkey',
    region: 'Турция',
    code: 'TR',
    currency: 'TRY',
    symbol: 'TL',
    symbolPosition: 'after',
    rateToRub: 1.6652,
    markup: 1.2,
    accent: '#ff5f6d',
    tint: '#ffc371',
    accountHint: 'Аккаунт Apple ID с регионом Турция',
    values: [10,25,50,75,100,150,200,300,400,500,700,800,900,1000,1250,1500,2000,2500,3000,5000,7000,10000]
  },
  usa: {
    label: 'США',
    title: 'Apple Gift Card USA',
    region: 'США',
    code: 'US',
    currency: 'USD',
    symbol: '$',
    symbolPosition: 'before',
    rateToRub: 75.2246,
    markup: 1.2,
    accent: '#0071e3',
    tint: '#7dd3fc',
    accountHint: 'Аккаунт Apple ID с регионом США',
    values: [5,10,15,25,50,100,200,500]
  },
  poland: {
    label: 'Польша',
    title: 'Apple Gift Card Poland',
    region: 'Польша',
    code: 'PL',
    currency: 'PLN',
    symbol: 'zł',
    symbolPosition: 'after',
    rateToRub: 20.8928,
    markup: 1.2,
    accent: '#dc2626',
    tint: '#fca5a5',
    accountHint: 'Аккаунт Apple ID с регионом Польша',
    values: [25,50,100,150,200,250,500]
  },
  india: {
    label: 'Индия',
    title: 'Apple Gift Card India',
    region: 'Индия',
    code: 'IN',
    currency: 'INR',
    symbol: '₹',
    symbolPosition: 'before',
    rateToRub: 0.790471,
    markup: 1.2,
    accent: '#f97316',
    tint: '#86efac',
    accountHint: 'Аккаунт Apple ID с регионом Индия',
    values: [100,250,500,1000,2000,5000,10000]
  },
  japan: {
    label: 'Япония',
    title: 'Apple Gift Card Japan',
    region: 'Япония',
    code: 'JP',
    currency: 'JPY',
    symbol: '¥',
    symbolPosition: 'before',
    rateToRub: 0.478619,
    markup: 1.2,
    accent: '#e11d48',
    tint: '#f0abfc',
    accountHint: 'Аккаунт Apple ID с регионом Япония',
    values: [1000,3000,5000,10000,15000,30000,50000]
  },
  canada: {
    label: 'Канада',
    title: 'Apple Gift Card Canada',
    region: 'Канада',
    code: 'CA',
    currency: 'CAD',
    symbol: 'CA$',
    symbolPosition: 'before',
    rateToRub: 55.2432,
    markup: 1.2,
    accent: '#ef4444',
    tint: '#93c5fd',
    accountHint: 'Аккаунт Apple ID с регионом Канада',
    values: [10,15,25,50,100,200,500]
  },
  europe: {
    label: 'Европа',
    title: 'Apple Gift Card Europe',
    region: 'Европа',
    code: 'EU',
    currency: 'EUR',
    symbol: '€',
    symbolPosition: 'before',
    rateToRub: 88.06,
    markup: 1.2,
    accent: '#2563eb',
    tint: '#facc15',
    accountHint: 'Аккаунт Apple ID с регионом Европа',
    values: [10,15,25,50,100,200,500]
  },
  england: {
    label: 'Англия',
    title: 'Apple Gift Card UK',
    region: 'Англия',
    code: 'UK',
    currency: 'GBP',
    symbol: '£',
    symbolPosition: 'before',
    rateToRub: 102.0422,
    markup: 1.2,
    accent: '#1d4ed8',
    tint: '#f43f5e',
    accountHint: 'Аккаунт Apple ID с регионом Англия',
    values: [10,15,25,50,100,200,500]
  }
};

export const giftCardCountries = Object.entries(giftCardData).map(([slug, config]) => ({
  slug,
  href: `apple-gift-card-product.html?country=${slug}`,
  ...config
}));
