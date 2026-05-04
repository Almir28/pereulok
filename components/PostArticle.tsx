import Image from "next/image";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getPostImageUrl, isSanityImage } from "@/lib/post-image";
import type { Post } from "@/lib/types";

type PostArticleProps = {
  post: Post;
  nextPost?: Post | null;
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

function HeroImage({ post }: { post: Post }) {
  const imageUrl = getPostImageUrl(post, 1800, 1100);

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10 bg-night-3">
      {isSanityImage(imageUrl) ? (
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 1120px, calc(100vw - 32px)"
        />
      ) : (
        <img src={imageUrl} alt={post.title} className="h-full w-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
    </div>
  );
}

export function PostArticle({ post, nextPost }: PostArticleProps) {
  const date = formatDate(post.publishedAt);
  const content = post.content || "";

  return (
    <main className="pb-20 sm:pb-24">
      <article className="shell pt-8 sm:pt-10">
        {/* Major redesign: article reading view now matches the new editorial shell while keeping premium gating untouched. */}
        <header className="editorial-surface overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="editorial-chip border-cobalt/20 bg-cobalt/10 text-cobalt-soft">
                  {post.category || "Новости"}
                </span>
                {post.isPremium ? (
                  <span className="editorial-chip border-cobalt/20 bg-cobalt/10 text-cobalt-soft">
                    Pereuloq+
                  </span>
                ) : null}
                {date ? <span className="editorial-chip">{date}</span> : null}
              </div>

              <h1 className="mt-6 max-w-4xl font-serif text-[2.8rem] leading-[0.95] text-mist sm:text-[4.8rem]">
                {post.title}
              </h1>
              {post.excerpt ? (
                <p className="mt-6 max-w-3xl text-lg leading-9 text-mist-soft">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <aside className="editorial-surface-soft p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                Статус доступа
              </p>
              <p className="mt-4 text-xl font-semibold text-mist">
                Материал открыт
              </p>
              <p className="mt-3 text-sm leading-7 text-mist-muted">
                Статическая версия для GitHub Pages показывает опубликованные материалы без серверной авторизации.
              </p>

              <div className="mt-6 grid gap-3 text-sm text-mist-soft">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Формат: редакционная статья
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  Источник: {post.isPremium ? "Pereuloq+ / CMS" : "Pereuloq / CMS"}
                </div>
              </div>
            </aside>
          </div>

          <HeroImage post={post} />
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="editorial-surface p-6 sm:p-8 lg:p-10">
            <MarkdownRenderer content={content} variant="dark" />
          </div>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="editorial-surface-soft p-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                Навигация
              </p>
              <div className="mt-4 grid gap-3">
                <Link href="/" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mist transition duration-200 hover:bg-white/[0.08]">
                  На главную
                </Link>
                <Link href="/feed" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mist transition duration-200 hover:bg-white/[0.08]">
                  В ленту
                </Link>
                <Link href="/shop" className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-mist transition duration-200 hover:bg-white/[0.08]">
                  В магазин
                </Link>
              </div>
            </div>

            {nextPost ? (
              <div className="editorial-surface-soft p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                  Следующая статья
                </p>
                <Link href={`/post/${nextPost.slug}`} className="mt-4 block">
                  <h2 className="font-serif text-[1.8rem] leading-[1.02] text-mist">
                    {nextPost.title}
                  </h2>
                  {nextPost.excerpt ? (
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-mist-muted">
                      {nextPost.excerpt}
                    </p>
                  ) : null}
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt-soft">
                    Читать дальше
                  </p>
                </Link>
              </div>
            ) : null}
          </aside>
        </div>
      </article>
    </main>
  );
}
