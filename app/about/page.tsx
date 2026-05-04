import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Миссия, принципы и устройство Pereuloq."
};

const principles = [
  {
    title: "Читаемость важнее эффектов",
    copy: "Сильная типографика, ясная сетка и спокойные интервалы ведут контент вперед."
  },
  {
    title: "Скорость и ясность",
    copy: "Материалы, магазин и CMS должны ощущаться частью одной системы, а не набором разрозненных экранов."
  },
  {
    title: "Детали без шума",
    copy: "Микроанимации и акценты помогают ритму, но не спорят с текстом."
  }
];

const formats = [
  "Лента публикаций и редакционных заметок",
  "Подписка Pereuloq+ и цифровые продукты",
  "Админ-панель для публикации и управления доступом",
  "Sanity / локальный JSON как источник материалов"
];

export default function AboutPage() {
  return (
    <main className="pb-20 pt-8 sm:pb-24 sm:pt-10">
      <div className="shell space-y-8">
        <section className="editorial-surface p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="section-kicker">О проекте</p>
            <h1 className="mt-4 font-serif text-[2.9rem] leading-[0.95] text-mist sm:text-[4.8rem]">
              Pereuloq соединяет редакцию, продукт и интерфейс в одном спокойном ритме.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-mist-soft">
              Мы пишем о технологиях, культуре и цифровых продуктах без лишнего шума.
              Важнее всего здесь ясность: в подаче, в навигации и в том, как человек
              проходит путь от первого материала до подписки.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/feed" className="editorial-button">
                Открыть ленту
              </Link>
              <Link href="/shop" className="editorial-button-ghost">
                Посмотреть подписку
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="editorial-surface p-6 sm:p-8">
            <p className="section-kicker">Миссия</p>
            <h2 className="mt-4 font-serif text-[2.2rem] leading-none text-mist">
              Контент должен вести интерфейс, а не спорить с ним.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-mist-soft">
              <p>
                Pereuloq вырос из идеи тихой редакционной платформы: меньше визуального
                давления, больше ясности и уверенной структуры.
              </p>
              <p>
                Поэтому редизайн переносит в живой код не просто палитру, а целую
                систему приоритетов: контраст, ритм, предсказуемые переходы и чистый
                путь к подписке.
              </p>
            </div>
          </div>

          <div className="editorial-surface-soft p-6 sm:p-8">
            <p className="section-kicker">Форматы</p>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-mist-muted">
              {formats.map((format) => (
                <li key={format} className="flex gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-cobalt" />
                  <span>{format}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <div className="mb-8">
            <div className="divider-label">
              <span className="text-cobalt-soft">01</span>
              <span>Принципы</span>
            </div>
            <h2 className="mt-4 font-serif text-[2.2rem] leading-none text-mist sm:text-[3rem]">
              Что держит систему вместе.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((item) => (
              <article key={item.title} className="editorial-surface-soft p-6">
                <h3 className="font-serif text-[1.65rem] leading-tight text-mist">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-mist-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-surface grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="section-kicker">Контакты</p>
            <h2 className="mt-4 font-serif text-[2.1rem] leading-none text-mist sm:text-[3rem]">
              Нужен спецпроект, совместный материал или медиакит?
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-mist-soft">
              Напишите на почту, и мы обсудим формат. Этот раздел остался простым
              намеренно: здесь важнее быстрый контакт, чем декоративный шум.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="mailto:hello@example.com" className="editorial-button">
              hello@example.com
            </a>
            <Link href="/feed" className="editorial-button-ghost">
              Открыть ленту
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
