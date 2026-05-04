import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

const columns = [
  {
    title: "Навигация",
    links: [
      { href: "/", label: "Главная" },
      { href: "/feed", label: "Лента" },
      { href: "/shop", label: "Магазин" },
      { href: "/about", label: "О проекте" }
    ]
  },
  {
    title: "Форматы",
    links: [
      { href: "/shop", label: "Подписка Pereuloq+" },
      { href: "/feed", label: "Последние материалы" }
    ]
  }
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night">
      <div className="shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-md text-sm leading-7 text-mist-muted">
              Технологии, интерфейсы и спокойная редакционная подача без лишнего шума.
              Новый визуальный ритм построен поверх существующей CMS и магазина.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cobalt-soft">
                  {column.title}
                </p>
                <div className="mt-4 grid gap-3">
                  {column.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-mist-muted transition duration-200 hover:text-mist"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-mist-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Pereuloq. Все права защищены.</p>
          <p className="font-mono uppercase tracking-[0.16em]">
            Static export for GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
}
