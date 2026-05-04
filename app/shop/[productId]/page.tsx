import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { getProduct, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product) {
    return {
      title: "Продукт не найден"
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image }]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = getProduct(productId);

  if (!product) {
    notFound();
  }

  return (
    <main className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="shell">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}
