import Link from "next/link";
import { theories } from "@/lib/theoriesData";
import { QUESTION_COUNTS } from "@/lib/quizData";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page py-16 sm:py-24">
          <div className="max-w-3xl">
            <span className="pill border-navy/20 bg-white/70 text-navy">
              Academic · Unbiased · Runs in your browser
            </span>
            <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] text-navy sm:text-5xl md:text-6xl">
              Which theory of the atonement{" "}
              <span className="text-crimson">frames your thinking?</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Explore nine historic Christian models of how the cross
              &ldquo;works&rdquo; — from Penal Substitution and Christus Victor to
              Theosis and the Girardian scapegoat reading. Take a weighted quiz, or
              compare every model side by side. No view is ranked above another.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/quiz?mode=short"
                className="focus-ring rounded-xl bg-navy px-6 py-3 text-sm font-semibold text-parchment shadow-sm transition hover:bg-navy/90"
              >
                Take the short quiz · {QUESTION_COUNTS.short} questions
              </Link>
              <Link
                href="/quiz?mode=deep"
                className="focus-ring rounded-xl border border-navy/30 bg-white/70 px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white"
              >
                Deep quiz · {QUESTION_COUNTS.deep} questions
              </Link>
              <Link
                href="/encyclopedia"
                className="focus-ring rounded-xl px-6 py-3 text-sm font-semibold text-navy underline decoration-from-font underline-offset-4 hover:opacity-80"
              >
                Browse the encyclopedia →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mode cards */}
      <section className="container-page pb-4">
        <div className="grid gap-5 md:grid-cols-2">
          <ModeCard
            title="Short mode"
            count={QUESTION_COUNTS.short}
            href="/quiz?mode=short"
            blurb="High-level, archetypal questions that surface your core theological instincts in just a few minutes."
            accent="#917614"
          />
          <ModeCard
            title="Deep mode"
            count={QUESTION_COUNTS.deep}
            href="/quiz?mode=deep"
            blurb="Granular questions tracking scriptural emphases, historical voices, and sub-facets of divine justice, love, and victory."
            accent="#2a4d2a"
          />
        </div>
      </section>

      {/* Feature strip */}
      <section className="container-page py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <Feature
            title="Weighted, synergistic scoring"
            body="Each answer can distribute points to several models at once, so blended instincts are captured rather than flattened."
          />
          <Feature
            title="The 10% blended-hybrid rule"
            body="If two or more models finish within 10% of each other, you get a named hybrid (e.g. the Penal–Victor Blend) instead of a single label."
          />
          <Feature
            title="Sourced & neutral"
            body="Every model lists key figures, scripture, strengths, critiques, and links to references such as the Stanford Encyclopedia of Philosophy."
          />
        </div>
      </section>

      {/* The nine models */}
      <section className="container-page pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-2xl font-semibold text-navy">
            The nine models
          </h2>
          <Link href="/encyclopedia" className="link-underline text-sm text-navy">
            Compare all →
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {theories.map((t) => (
            <li key={t.id}>
              <Link
                href="/encyclopedia"
                className="card focus-ring group flex h-full items-start gap-3 p-4 transition hover:shadow-md"
              >
                <span
                  aria-hidden
                  className="mt-0.5 h-9 w-9 shrink-0 rounded-lg ring-1 ring-black/10"
                  style={{ backgroundColor: t.accentHex }}
                />
                <span>
                  <span className="block font-medium text-navy">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    {t.emphasis}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function ModeCard({
  title,
  count,
  href,
  blurb,
  accent,
}: {
  title: string;
  count: number;
  href: string;
  blurb: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="card focus-ring group relative overflow-hidden p-6 transition hover:shadow-md"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1.5"
        style={{ backgroundColor: accent }}
      />
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-xl font-semibold text-navy">{title}</h3>
        <span className="text-sm font-medium text-ink-soft">{count} questions</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{blurb}</p>
      <span className="mt-4 inline-block text-sm font-semibold text-navy group-hover:underline">
        Start →
      </span>
    </Link>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/50 p-5">
      <h3 className="font-serif text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
    </div>
  );
}
