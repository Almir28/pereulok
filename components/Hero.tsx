"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPostImageUrl, isSanityImage } from "@/lib/post-image";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

type HeroProps = {
  posts: Post[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function formatDate(date?: string) {
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
}

function PostVisual({
  post,
  className,
  sizes,
  priority = false
}: {
  post: Post;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const imageUrl = getPostImageUrl(post, 1800, 1200);

  return (
    <div className={cn("relative overflow-hidden bg-night-3", className)}>
      {imageUrl ? (
        isSanityImage(imageUrl) ? (
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <img
            src={imageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
        )
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#111828,#1f2a44)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
    </div>
  );
}

function EmptyState() {
  return (
    <main className="shell pb-20 pt-10 sm:pt-14">
      <div className="editorial-surface p-10 text-center">
        <p className="font-serif text-4xl text-mist">Посты пока не опубликованы.</p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-mist-muted">
          Создайте первый материал в админ-панели, и главная страница сразу оживет.
        </p>
      </div>
    </main>
  );
}

function SmallStory({ post, index }: { post: Post; index: number }) {
  return (
    <Link
      href={`/post/${post.slug}`}
      className="group grid gap-4 border-t border-white/10 py-5 transition duration-200 first:border-t-0 hover:bg-white/[0.03] sm:grid-cols-[64px_1fr]"
    >
      <span className="font-brand text-4xl font-extrabold leading-none text-white/[0.12]">
        0{index + 1}
      </span>
      <span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt-soft">
          {post.category || "Новости"}
        </span>
        <span className="mt-2 block text-base font-semibold leading-6 text-mist transition duration-200 group-hover:text-cobalt-soft">
          {post.title}
        </span>
        <span className="mt-2 block text-sm text-mist-muted">
          {formatDate(post.publishedAt)}
        </span>
      </span>
    </Link>
  );
}

export function Hero({ posts }: HeroProps) {
  const featuredPost = posts[0];
  const sidePosts = posts.slice(1, 4);
  const categoryCount = new Set(posts.map((post) => post.category).filter(Boolean)).size;

  if (!featuredPost) {
    return <EmptyState />;
  }

  return (
    <main className="pb-20 sm:pb-24">
      <section className="shell pt-8 sm:pt-10">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-night-2 shadow-editorial">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_390px]">
            <motion.article
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="grid gap-8 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:border-b-0 lg:border-r lg:p-10"
            >
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-jade/20 bg-jade/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-jade">
                    <span className="size-1.5 rounded-full bg-jade" aria-hidden="true" />
                    Новый выпуск
                  </span>
                  <span className="editorial-chip">{posts.length} материалов</span>
                  <span className="editorial-chip">{categoryCount || 1} категорий</span>
                </div>

                <p className="section-kicker mt-8">{featuredPost.category || "Новости"}</p>
                <h1 className="mt-4 max-w-4xl font-serif text-[2.65rem] leading-[0.96] text-mist sm:text-[4.25rem]">
                  {featuredPost.title}
                </h1>
                {featuredPost.excerpt ? (
                  <p className="mt-5 max-w-xl text-base leading-8 text-mist-muted">
                    {featuredPost.excerpt}
                  </p>
                ) : null}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={`/post/${featuredPost.slug}`} className="editorial-button">
                    Читать статью
                  </Link>
                  <Link href="/feed" className="editorial-button-ghost">
                    Открыть ленту
                  </Link>
                </div>
              </div>

              <Link
                href={`/post/${featuredPost.slug}`}
                className="group min-h-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
              >
                <PostVisual
                  post={featuredPost}
                  priority
                  className="h-full min-h-[300px]"
                  sizes="(min-width: 1024px) 520px, 100vw"
                />
              </Link>
            </motion.article>

            <aside className="p-6 sm:p-8">
              <div className="divider-label">Последние</div>
              <div className="mt-5">
                {sidePosts.map((post, index) => (
                  <SmallStory key={post._id} post={post} index={index} />
                ))}
              </div>

              <div className="mt-6 rounded-[24px] border border-cobalt/20 bg-cobalt/10 p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                  Разделы
                </p>
                <p className="mt-3 text-sm leading-7 text-mist-muted">
                  Лента и магазин теперь открываются отдельными страницами с собственной
                  навигацией, фильтрами и сценариями.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/feed" className="editorial-button-ghost">
                    Лента
                  </Link>
                  <Link href="/shop" className="editorial-button-ghost">
                    Магазин
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="shell pt-8 sm:pt-10">
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/feed"
            className="editorial-surface-soft min-h-[210px] p-6 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <p className="section-kicker">Лента</p>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-none text-mist">
              Новости, обновления, видео, объявления и посты.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-mist-muted">
              Отдельная страница для всего контента в формате живого потока.
            </p>
          </Link>

          <Link
            href="/shop"
            className="editorial-surface-soft min-h-[210px] p-6 transition duration-200 hover:-translate-y-1 hover:bg-white/[0.06]"
          >
            <p className="section-kicker">Магазин</p>
            <h2 className="mt-5 font-serif text-[2.2rem] leading-none text-mist">
              Цифровые продукты, подписки и сервисы.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-mist-muted">
              Категории, поиск и отдельные карточки продуктов живут на странице магазина.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
