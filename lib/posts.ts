import fs from "fs/promises";
import path from "path";
import type { Post } from "@/lib/types";

type StoredPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  category: string;
  status: "draft" | "published";
  isPremium: boolean;
  publishedAt: string;
  created_at: string;
  excerpt: string;
};

const localPostsPath = path.join(process.cwd(), "data", "posts.json");

const seedPosts: StoredPost[] = [
  {
    id: "local-apple-newsroom",
    title: "Pereuloq становится спокойнее, крупнее и ближе к журналу",
    slug: "pereuloq-newsroom-redesign",
    content:
      "## Новый первый экран\n\nГлавная страница теперь строится вокруг одного сильного материала и двух соседних историй. Такой ритм ближе к Apple Newsroom: меньше интерфейсного шума, больше внимания к теме, фотографии и заголовку.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
    category: "Проект",
    status: "published",
    isPremium: false,
    publishedAt: "2026-04-30T08:00:00.000Z",
    created_at: "2026-04-30T08:00:00.000Z",
    excerpt:
      "Главная страница теперь строится вокруг одного сильного материала и двух соседних историй."
  }
];

function storedToPost(post: StoredPost): Post {
  return {
    _id: post.id,
    id: post.id,
    title: post.title,
    slug: post.slug,
    image: post.image,
    imageUrl: post.image,
    category: post.category,
    status: post.status,
    isPremium: Boolean(post.isPremium),
    publishedAt: post.publishedAt,
    created_at: post.created_at,
    content: post.content,
    excerpt: post.excerpt
  };
}

async function readLocalPosts() {
  try {
    const file = await fs.readFile(localPostsPath, "utf8");
    const posts = JSON.parse(file);

    return Array.isArray(posts) ? (posts as StoredPost[]) : seedPosts;
  } catch {
    return seedPosts;
  }
}

function sortPosts(posts: Post[]) {
  return posts.sort((left, right) => {
    const leftTime = new Date(left.publishedAt || left.created_at || 0).getTime();
    const rightTime = new Date(right.publishedAt || right.created_at || 0).getTime();

    return rightTime - leftTime;
  });
}

export async function getPublishedPosts(limit = 10) {
  const posts = await readLocalPosts();

  return sortPosts(posts.map(storedToPost).filter((post) => post.status === "published")).slice(
    0,
    limit
  );
}

export async function getPostBySlug(slug: string) {
  const posts = await readLocalPosts();
  const post = posts.find((item) => item.slug === slug && item.status === "published");

  return post ? storedToPost(post) : null;
}
