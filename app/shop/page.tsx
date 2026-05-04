import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Магазин",
  description: "Подписки и продукты Pereuloq."
};

export default function ShopPage() {
  return (
    <main className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="shell">
        <ShopGrid products={products} />
      </div>
    </main>
  );
}
