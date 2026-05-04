import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { HeaderMenu } from "@/components/HeaderMenu";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/feed", label: "Лента" },
  { href: "/shop", label: "Магазин" },
  { href: "/about", label: "О проекте" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur-xl">
      <div className="shell flex h-[72px] items-center gap-4">
        <div className="flex min-w-0 items-center gap-8">
          <BrandMark />

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-mist-muted transition duration-200 hover:bg-white/[0.05] hover:text-mist"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden min-h-10 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-mist-muted transition duration-200 hover:bg-white/[0.08] hover:text-mist sm:inline-flex"
          >
            Pereuloq+
          </Link>

          <Link
            href="/feed"
            className="hidden min-h-10 items-center rounded-full bg-cobalt px-5 text-sm font-semibold text-night transition duration-200 hover:bg-cobalt-soft md:inline-flex"
          >
            Лента
          </Link>

          <HeaderMenu
            navItems={navItems}
            ctaHref="/feed"
            ctaLabel="Открыть ленту"
          />
        </div>
      </div>
    </header>
  );
}
