import { Hero } from "@/components/Hero";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getPublishedPosts(24);

  return <Hero posts={posts} />;
}
