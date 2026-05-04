"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { FeedItem, FeedKind } from "@/lib/feed";
import { feedKindLabels } from "@/lib/feed";
import { cn } from "@/lib/utils";

type FeedStreamProps = {
  items: FeedItem[];
};

const feedKinds: Array<FeedKind | "all"> = ["all", "news", "update", "ad", "video", "post"];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}

function FeedCard({ item }: { item: FeedItem }) {
  const content = (
    <article className="editorial-surface-soft overflow-hidden transition duration-200 hover:bg-white/[0.06]">
      {item.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-night-3">
          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent" />
        </div>
      ) : null}

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="editorial-chip border-cobalt/20 bg-cobalt/10 text-cobalt-soft">
            {feedKindLabels[item.kind]}
          </span>
          <span className="editorial-chip">{item.category}</span>
          <time className="text-xs text-mist-muted" dateTime={item.publishedAt}>
            {formatDate(item.publishedAt)}
          </time>
        </div>

        <h2 className="mt-5 font-serif text-[2rem] leading-none text-mist sm:text-[2.55rem]">
          {item.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-mist-muted sm:text-base">
          {item.text}
        </p>

        {item.cta ? (
          <span className="editorial-link mt-5">
            {item.cta}
            <span aria-hidden="true">→</span>
          </span>
        ) : null}
      </div>
    </article>
  );

  if (!item.href) {
    return content;
  }

  if (item.href.startsWith("mailto:")) {
    return <a href={item.href}>{content}</a>;
  }

  return <Link href={item.href}>{content}</Link>;
}

export function FeedStream({ items }: FeedStreamProps) {
  const [activeKind, setActiveKind] = useState<FeedKind | "all">("all");
  const filteredItems = useMemo(
    () => (activeKind === "all" ? items : items.filter((item) => item.kind === activeKind)),
    [activeKind, items]
  );
  const counts = useMemo(
    () =>
      feedKinds.reduce(
        (accumulator, kind) => ({
          ...accumulator,
          [kind]: kind === "all" ? items.length : items.filter((item) => item.kind === kind).length
        }),
        {} as Record<FeedKind | "all", number>
      ),
    [items]
  );

  return (
    <div className="space-y-8">
      <section className="editorial-surface p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <p className="section-kicker">Лента</p>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.8rem] leading-[0.96] text-mist sm:text-[4.6rem]">
              Новости, обновления, объявления, видео и посты в одном потоке.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mist-soft">
              Здесь живет контент Pereuloq. Магазин вынесен отдельно, поэтому карточки
              продуктов не смешиваются с редакционными публикациями.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {feedKinds.slice(1).map((kind) => (
              <div key={kind} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt-soft">
                  {feedKindLabels[kind]}
                </p>
                <p className="mt-2 text-2xl font-semibold text-mist">{counts[kind]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="editorial-surface-soft p-4">
            <div className="grid gap-2">
              {feedKinds.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  onClick={() => setActiveKind(kind)}
                  className={cn(
                    "flex min-h-11 items-center justify-between rounded-2xl px-4 text-left text-sm font-semibold transition duration-200",
                    activeKind === kind
                      ? "bg-cobalt text-night"
                      : "bg-white/[0.03] text-mist-muted hover:bg-white/[0.08] hover:text-mist"
                  )}
                >
                  <span>{feedKindLabels[kind]}</span>
                  <span>{counts[kind]}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="grid gap-5">
          {filteredItems.map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}

          {!filteredItems.length ? (
            <div className="editorial-surface-soft p-8 text-center">
              <p className="font-serif text-3xl text-mist">В этом разделе пока пусто.</p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
