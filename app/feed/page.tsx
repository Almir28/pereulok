import type { Metadata } from "next";
import { FeedStream } from "@/components/feed/FeedStream";
import { buildFeedItems } from "@/lib/feed";
import { getPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Лента",
  description: "Новости, обновления, объявления, видео и посты Pereuloq."
};

export default async function FeedPage() {
  const posts = await getPublishedPosts(48);
  const items = buildFeedItems(posts);

  return (
    <main className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="shell">
        <FeedStream items={items} />
      </div>
    </main>
  );
}
