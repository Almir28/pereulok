import type { Post } from "@/lib/types";

export type FeedKind = "news" | "update" | "ad" | "video" | "post";

export type FeedItem = {
  id: string;
  kind: FeedKind;
  title: string;
  text: string;
  category: string;
  publishedAt: string;
  image?: string;
  href?: string;
  cta?: string;
};

export const feedKindLabels: Record<FeedKind | "all", string> = {
  all: "Все",
  news: "Новости",
  update: "Обновления",
  ad: "Реклама",
  video: "Видео",
  post: "Посты"
};

function getPostKind(post: Post, index: number): FeedKind {
  if (post.category === "Технологии" || post.category === "Проект") {
    return "news";
  }

  if (post.category === "Магазин") {
    return "update";
  }

  return index % 4 === 0 ? "post" : "news";
}

function postToFeedItem(post: Post, index: number): FeedItem {
  return {
    id: post.id || post._id,
    kind: getPostKind(post, index),
    title: post.title,
    text: post.excerpt || post.content || "Новый материал Pereuloq.",
    category: post.category || "Новости",
    publishedAt: post.publishedAt || post.created_at || new Date().toISOString(),
    image: post.image || post.imageUrl,
    href: `/post/${post.slug}`,
    cta: "Читать"
  };
}

export function buildFeedItems(posts: Post[]): FeedItem[] {
  const postItems = posts.map(postToFeedItem);

  const systemItems: FeedItem[] = [
    {
      id: "shop-update-2026-05-04",
      kind: "update",
      title: "Магазин получил категории, поиск и отдельные страницы продуктов",
      text:
        "Подписки, VPN, шаблоны и услуги теперь разделены по категориям. Карточка каждого продукта открывается отдельно.",
      category: "Магазин",
      publishedAt: "2026-05-04T09:00:00.000Z",
      href: "/shop",
      cta: "В магазин"
    },
    {
      id: "video-interface-notes",
      kind: "video",
      title: "Видео: короткий разбор спокойной сетки для медиа",
      text:
        "Показываем, как крупная типографика, интервалы и карточки разного веса помогают читать быстрее.",
      category: "Видео",
      publishedAt: "2026-05-03T16:20:00.000Z",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80",
      href: "/feed",
      cta: "Смотреть"
    },
    {
      id: "ad-media-kit",
      kind: "ad",
      title: "Рекламные размещения и спецпроекты Pereuloq",
      text:
        "Нативные интеграции, объявления в ленте и совместные материалы для цифровых продуктов.",
      category: "Реклама",
      publishedAt: "2026-05-02T12:00:00.000Z",
      href: "mailto:hello@example.com",
      cta: "Связаться"
    }
  ];

  return [...systemItems, ...postItems].sort((left, right) => {
    return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime();
  });
}
