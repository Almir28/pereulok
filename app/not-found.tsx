import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <section className="shell">
        <div className="editorial-surface mx-auto max-w-3xl p-6 text-center sm:p-8 lg:p-10">
          <p className="section-kicker">404</p>
          <h1 className="mt-4 font-serif text-[2.8rem] leading-none text-mist sm:text-[4rem]">
            Страница не найдена
          </h1>
          <p className="mt-5 text-base leading-8 text-mist-soft">
            Возможно, материал еще не опубликован или ссылка изменилась.
          </p>
          <Link href="/" className="editorial-button mt-8">
            Вернуться к ленте
          </Link>
        </div>
      </section>
    </main>
  );
}
