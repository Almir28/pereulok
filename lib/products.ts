export type Product = {
  id: string;
  name: string;
  category: string;
  eyebrow: string;
  description: string;
  detail: string;
  price: string;
  priceCents: number;
  currency: "usd";
  mode: "subscription" | "payment";
  interval?: "month" | "year";
  image: string;
  features: string[];
  contactUrl: string;
  buyUrl?: string;
  grantsAccess: boolean;
};

export const products: Product[] = [
  {
    id: "pereuloq-plus-monthly",
    name: "Pereuloq+ на месяц",
    category: "Подписки",
    eyebrow: "Подписка",
    description: "Доступ к закрытым материалам, редакторским заметкам и ранним публикациям.",
    detail:
      "Месячная подписка для читателей, которым нужен полный доступ к закрытым статьям, ранним материалам и обновлениям редакции.",
    price: "$4 / мес",
    priceCents: 400,
    currency: "usd",
    mode: "subscription",
    interval: "month",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    features: ["Закрытые статьи", "Ранний доступ", "Статус подписчика"],
    contactUrl: "mailto:hello@example.com?subject=Pereuloq%2B%20на%20месяц",
    grantsAccess: true
  },
  {
    id: "pereuloq-plus-yearly",
    name: "Pereuloq+ на год",
    category: "Подписки",
    eyebrow: "Лучшее предложение",
    description: "Годовой доступ для тех, кто читает регулярно и хочет поддержать проект.",
    detail:
      "Годовой доступ к закрытым материалам Pereuloq с более выгодной ценой и всеми обновлениями подписки.",
    price: "$39 / год",
    priceCents: 3900,
    currency: "usd",
    mode: "subscription",
    interval: "year",
    image:
      "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1400&q=80",
    features: ["Все из Monthly", "2 месяца в подарок", "Приоритетные обновления"],
    contactUrl: "mailto:hello@example.com?subject=Pereuloq%2B%20на%20год",
    grantsAccess: true
  },
  {
    id: "pereuloq-vpn",
    name: "Pereuloq VPN",
    category: "Доступы",
    eyebrow: "VPN",
    description: "Минималистичный VPN-пакет для приватного доступа и спокойной работы.",
    detail:
      "Цифровой VPN-пакет с инструкциями после оплаты. Подходит для приватного доступа и стабильной работы с редакционными сервисами.",
    price: "$8",
    priceCents: 800,
    currency: "usd",
    mode: "payment",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    features: ["Однократная покупка", "Приватный доступ", "Инструкции после оплаты"],
    contactUrl: "mailto:hello@example.com?subject=Pereuloq%20VPN",
    grantsAccess: false
  },
  {
    id: "notion-editorial-kit",
    name: "Notion-шаблон редакции",
    category: "Шаблоны",
    eyebrow: "Шаблон",
    description: "Готовая система для контент-плана, статусов, рубрик и публикаций.",
    detail:
      "Цифровой шаблон Notion помогает вести редакционный календарь, хранить идеи, планировать выпуски и видеть статус каждой публикации.",
    price: "$12",
    priceCents: 1200,
    currency: "usd",
    mode: "payment",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80",
    features: ["Контент-план", "Статусы материалов", "База рубрик"],
    contactUrl: "mailto:hello@example.com?subject=Notion-%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD%20%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%86%D0%B8%D0%B8",
    grantsAccess: false
  },
  {
    id: "prompt-pack-content",
    name: "Пакет промптов для контента",
    category: "Шаблоны",
    eyebrow: "Промпты",
    description: "Набор промптов для идей, структуры статей, заголовков и публикаций.",
    detail:
      "Пакет для авторов и редакторов: промпты помогают собрать план материала, проверить тон, подготовить лиды и адаптировать пост под разные каналы.",
    price: "$9",
    priceCents: 900,
    currency: "usd",
    mode: "payment",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    features: ["Идеи и рубрики", "Заголовки", "Адаптация постов"],
    contactUrl: "mailto:hello@example.com?subject=%D0%9F%D0%B0%D0%BA%D0%B5%D1%82%20%D0%BF%D1%80%D0%BE%D0%BC%D0%BF%D1%82%D0%BE%D0%B2",
    grantsAccess: false
  },
  {
    id: "sanity-cms-setup",
    name: "Настройка Sanity CMS",
    category: "Услуги",
    eyebrow: "Услуга",
    description: "Помощь с подключением Sanity, схемами постов и редакционным workflow.",
    detail:
      "Индивидуальная настройка CMS для небольшого медиа или цифрового продукта: схема постов, базовые поля, токены и публикационный процесс.",
    price: "$79",
    priceCents: 7900,
    currency: "usd",
    mode: "payment",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
    features: ["Схема постов", "Настройка токенов", "Публикационный процесс"],
    contactUrl: "mailto:hello@example.com?subject=%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0%20Sanity%20CMS",
    grantsAccess: false
  }
];

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getProductCategories() {
  return Array.from(new Set(products.map((product) => product.category)));
}
