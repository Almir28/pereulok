import type { Post } from "@/lib/types";

export function getPostImageUrl(
  post: Pick<Post, "image" | "imageUrl">,
  _width = 1600,
  _height = 1000
) {
  return post.image || post.imageUrl || null;
}

export function isSanityImage(url: string) {
  return url.includes("cdn.sanity.io");
}
