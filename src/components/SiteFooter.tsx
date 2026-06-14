import Link from "next/link";
import { OVERVIEW_RESOURCES } from "@/lib/theoriesData";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/40">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h2 className="font-serif text-lg font-semibold text-navy">
            Theories of Atonement
          </h2>
          <p className="mt-2 max-w-prose text-sm text-ink-soft">
            An academic, descriptive guide to the historic Christian models of the
            atonement. The aim is understanding, not advocacy: no view is presented
            as more correct than another.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            Explore
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="link-underline" href="/quiz?mode=short">
                Take the short quiz
              </Link>
            </li>
            <li>
              <Link className="link-underline" href="/quiz?mode=deep">
                Take the deep quiz
              </Link>
            </li>
            <li>
              <Link className="link-underline" href="/encyclopedia">
                Compare all models
              </Link>
            </li>
            <li>
              <Link className="link-underline" href="/about">
                Method &amp; neutrality
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            General references
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {OVERVIEW_RESOURCES.map((r) => (
              <li key={r.url}>
                <a
                  className="link-underline"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            Runs entirely in your browser. No accounts, no analytics, no external
            API calls.
          </p>
          <p>For study and discussion · Sources are linked per model.</p>
        </div>
      </div>
    </footer>
  );
}
