"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";

type NavItem = {
  href: string;
  label: string;
};

type HeaderMenuProps = {
  navItems: NavItem[];
  ctaHref: string;
  ctaLabel: string;
  sessionInitial?: string | null;
  sessionTitle?: string | null;
};

export function HeaderMenu({
  navItems,
  ctaHref,
  ctaLabel,
  sessionInitial,
  sessionTitle
}: HeaderMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-mist md:hidden"
        aria-expanded={open}
        aria-controls="mobile-site-menu"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-muted">
          Menu
        </span>
      </button>

      {open ? (
        <div
          id="mobile-site-menu"
          className="fixed inset-0 z-[60] md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="absolute inset-0 bg-night/80 backdrop-blur-md"
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
          />

          <div className="absolute inset-x-4 top-4 rounded-[28px] border border-white/10 bg-night-2 p-5 shadow-editorial">
            <div className="flex items-center justify-between gap-4">
              <BrandMark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mist-muted"
              >
                Закрыть
              </button>
            </div>

            <nav className="mt-8 grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base font-medium text-mist transition duration-200 hover:bg-white/[0.08]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-cobalt/20 bg-cobalt/10 p-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt-soft">
                  Pereuloq
                </p>
                <p className="mt-2 text-sm text-mist-muted">
                  Лента, магазин и страницы проекта в статической версии для GitHub Pages.
                </p>
              </div>
              {sessionInitial ? (
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-sm font-semibold text-mist"
                  title={sessionTitle || undefined}
                >
                  {sessionInitial}
                </span>
              ) : null}
            </div>

            <Link
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-cobalt px-5 text-sm font-semibold text-night"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
