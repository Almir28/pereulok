"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ShopGridProps = {
  products: Product[];
};

export function ShopGrid({ products }: ShopGridProps) {
  const categories = useMemo(
    () => ["Все", ...Array.from(new Set(products.map((product) => product.category)))],
    [products]
  );
  const [activeCategory, setActiveCategory] = useState("Все");
  const [query, setQuery] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Все" || product.category === activeCategory;
      const matchesQuery =
        !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, products, query]);

  const groupedProducts = useMemo(
    () =>
      categories
        .filter((category) => category !== "Все")
        .map((category) => ({
          category,
          products: visibleProducts.filter((product) => product.category === category)
        }))
        .filter((group) => group.products.length > 0),
    [categories, visibleProducts]
  );

  return (
    <div className="space-y-8">
      <section className="editorial-surface p-4 sm:p-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] transition duration-200",
                activeCategory === category
                  ? "bg-cobalt text-night shadow-glow"
                  : "border border-white/10 bg-white/[0.03] text-mist-muted hover:bg-white/[0.08] hover:text-mist"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-5">
          <label className="sr-only" htmlFor="shop-search">
            Поиск по магазину
          </label>
          <input
            id="shop-search"
            value={query}
            type="search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск цифровых продуктов"
            className="h-12 w-full rounded-2xl border border-white/10 bg-night px-4 text-base text-mist outline-none transition placeholder:text-mist-muted focus:border-cobalt"
          />
        </div>
      </section>

      <section className="editorial-surface overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
          <div>
            <p className="section-kicker">Магазин</p>
            <h1 className="mt-4 max-w-4xl font-serif text-[2.8rem] leading-[0.96] text-mist sm:text-[4.4rem]">
              Цифровые продукты Pereuloq, разложенные по понятным категориям.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mist-soft">
              Выберите категорию или найдите продукт по названию. Каждая карточка ведет
              на отдельную страницу с описанием, ценой и действиями.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
              GitHub Pages
            </p>
            <p className="mt-3 text-xl font-semibold text-mist">
              Статический магазин
            </p>
            <p className="mt-2 text-sm leading-7 text-mist-muted">
              Покупка и вопросы оформляются через кнопки связи на странице продукта.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        {groupedProducts.map((group) => (
          <div key={group.category} className="space-y-4">
            <div className="divider-label">
              <span className="text-cobalt-soft">{group.category}</span>
              <span>{group.products.length} поз.</span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.id}`}
                    className="editorial-surface-soft group overflow-hidden transition duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-night-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
                      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                        <span className="editorial-chip border-cobalt/20 bg-night/70 text-cobalt-soft">
                          {product.eyebrow}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist-muted">
                            {product.category}
                          </p>
                          <h2 className="mt-3 font-serif text-[2rem] leading-none text-mist">
                            {product.name}
                          </h2>
                        </div>
                        <p className="shrink-0 font-serif text-[1.7rem] text-mist">
                          {product.price}
                        </p>
                      </div>

                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-mist-soft">
                        {product.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between gap-4">
                        <span className="editorial-link">
                          Подробнее
                          <span aria-hidden="true">→</span>
                        </span>
                        <span className="text-xs text-mist-muted">
                          {product.mode === "subscription" ? "Подписка" : "Цифровой продукт"}
                        </span>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        ))}

        {!visibleProducts.length ? (
          <div className="editorial-surface-soft p-8 text-center">
            <p className="font-serif text-3xl text-mist">Ничего не найдено.</p>
            <p className="mt-3 text-sm leading-7 text-mist-muted">
              Попробуйте другую категорию или измените поисковый запрос.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
