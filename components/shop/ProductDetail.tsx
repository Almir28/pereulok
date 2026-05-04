"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const buyUrl = product.buyUrl || product.contactUrl;

  return (
    <div className="space-y-8">
      <Link href="/shop" className="editorial-link">
        <span aria-hidden="true">←</span>
        Вернуться в магазин
      </Link>

      <section className="editorial-surface overflow-hidden">
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative min-h-[360px] bg-night-3 lg:min-h-[640px]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
              <span className="editorial-chip border-cobalt/20 bg-night/70 text-cobalt-soft">
                {product.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10">
            <p className="section-kicker">{product.eyebrow}</p>
            <h1 className="mt-4 max-w-3xl font-serif text-[2.8rem] leading-[0.96] text-mist sm:text-[4.6rem]">
              {product.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-9 text-mist-soft">
              {product.detail || product.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                  Price
                </p>
                <p className="mt-2 font-serif text-[2.3rem] leading-none text-mist">
                  {product.price}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                  Type
                </p>
                <p className="mt-2 text-sm font-semibold text-mist">
                  {product.mode === "subscription" ? "Subscription" : "Digital product"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                Description
              </p>
              <p className="mt-3 text-base leading-8 text-mist-muted">{product.description}</p>
            </div>

            <ul className="mt-6 grid gap-3 text-sm leading-7 text-mist-muted sm:grid-cols-2">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cobalt" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a href={product.contactUrl} className="editorial-button-ghost">
                  Contact Seller
                </a>
                <a href={buyUrl} className="editorial-button">
                  Buy
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
