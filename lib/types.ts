export type Post = {
  _id: string;
  id?: string;
  title: string;
  slug: string;
  image?: string;
  imageUrl?: string;
  category?: string;
  publishedAt?: string;
  status?: "draft" | "published";
  isPremium?: boolean;
  created_at?: string;
  content?: string;
  excerpt?: string;
};
