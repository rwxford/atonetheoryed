"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/quiz?mode=short", label: "Quiz", match: "/quiz" },
  { href: "/encyclopedia", label: "Encyclopedia" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-parchment/85 backdrop-blur print:hidden">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3 focus-ring rounded-lg">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-parchment shadow-sm"
          >
            {/* A simple cruciform glyph drawn in CSS/SVG — no external assets. */}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <rect x="10.5" y="3" width="3" height="18" rx="1" />
              <rect x="6" y="8" width="12" height="3" rx="1" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold text-navy">
              Theories of Atonement
            </span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Quiz &amp; Encyclopedia
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {NAV.map((item) => {
            const target = item.match ?? item.href;
            const active =
              target === "/"
                ? pathname === "/"
                : pathname.startsWith(target);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy text-parchment"
                    : "text-ink-soft hover:bg-white/70 hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
