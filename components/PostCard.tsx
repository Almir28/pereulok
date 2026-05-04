import Image from "next/image";
import Link from "next/link";
import { getPostImageUrl, isSanityImage } from "@/lib/post-image";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  className?: string;
  featured?: boolean;
  priority?: boolean;
};

function formatDate(date?: string) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function PostCard({
  post,
  className,
  featured = false,
  priority = false
}: PostCardProps) {
  const imageUrl = getPostImageUrl(post, featured ? 1600 : 1000, featured ? 1200 : 760);
  const date = formatDate(post.publishedAt);

  return (
    <article
      className={cn(
        "group overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-sm transition duration-500 ease-out hover:scale-102 hover:shadow-soft",
        className
      )}
    >
      <Link href={`/post/${post.slug}`} className="flex h-full min-h-[inherit] flex-col">
        <div className="relative min-h-[240px] flex-1 overflow-hidden bg-neutral-100">
          {imageUrl && isSanityImage(imageUrl) ? (
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              priority={priority}
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
              sizes={
                featured
                  ? "(min-width: 1024px) 66vw, 100vw"
                  : "(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 100vw"
              }
            />
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={post.title}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#f7f7f7,#ededed)]" />
          )}
        </div>

        <div className="flex min-h-[180px] flex-col justify-between gap-6 p-6 sm:p-7">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted">
              {post.category ? <span>{post.category}</span> : null}
              {post.category && date ? <span aria-hidden="true">/</span> : null}
              {date ? <time dateTime={post.publishedAt}>{date}</time> : null}
            </div>

            <h3
              className={cn(
                "mt-4 font-semibold leading-[1.02] text-ink",
                featured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"
              )}
            >
              {post.title}
            </h3>
          </div>

          {post.excerpt ? (
            <p className="line-clamp-2 max-w-2xl text-sm leading-6 text-muted">
              {post.excerpt}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
