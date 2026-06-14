import type { Metadata } from "next";
import Link from "next/link";
import { QUESTION_COUNTS } from "@/lib/quizData";
import { BLEND_THRESHOLD_PERCENT } from "@/lib/quizEngine";
import { OVERVIEW_RESOURCES, theories } from "@/lib/theoriesData";

export const metadata: Metadata = {
  title: "About & Method",
  description:
    "How the quiz scores answers, how the 10% blended-hybrid rule works, the neutrality policy, and the sources behind each model.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-10 sm:py-12">
      <div className="mx-auto max-w-3xl space-y-10">
        <header>
          <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
            About &amp; method
          </h1>
          <p className="mt-3 text-ink-soft">
            This project is an academic teaching tool. It describes nine historic
            Christian theories of the atonement and offers a quiz to help you see
            which emphases shape your own reading.
          </p>
        </header>

        <Section title="Neutrality policy">
          <p>
            The copy throughout is intended to be descriptive, not evaluative. For
            each model, <em>strengths</em> are written as claims that proponents
            make and <em>critiques</em> as concerns that critics raise. No model is
            presented as more correct, orthodox, or superior than another. The quiz
            reports the emphases latent in your answers — it does not adjudicate
            theological truth.
          </p>
        </Section>

        <Section title="How scoring works">
          <ul className="list-disc space-y-2 pl-5">
            <li>
              The short quiz has{" "}
              <strong className="text-ink">{QUESTION_COUNTS.short}</strong>{" "}
              questions; the deep quiz has{" "}
              <strong className="text-ink">{QUESTION_COUNTS.deep}</strong>.
            </li>
            <li>
              Each answer carries small integer weights that can be{" "}
              <strong className="text-ink">distributed across several models</strong>{" "}
              at once (for example, +2 to Christus Victor and +2 to Ransom), so
              blended instincts are preserved.
            </li>
            <li>
              Raw points are summed per model and then normalized to a percentage
              of the total, which is what the result bars display.
            </li>
          </ul>
        </Section>

        <Section title={`The ${BLEND_THRESHOLD_PERCENT}% blended-hybrid rule`}>
          <p>
            After normalizing, the engine compares the leading model with the rest:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              If the leader clears every other model by{" "}
              <strong className="text-ink">{BLEND_THRESHOLD_PERCENT}% or more</strong>,
              a single dedicated result is shown.
            </li>
            <li>
              If one or more models land{" "}
              <strong className="text-ink">within {BLEND_THRESHOLD_PERCENT}%</strong>{" "}
              of the leader, a blended result is generated instead — a named pair
              (such as <em>the Penal–Victor Blend</em>) for two models, or{" "}
              <em>the Kaleidoscopic View</em> when three or more cluster together.
              The result explains how those specific models cross-pollinate.
            </li>
          </ul>
        </Section>

        <Section title="Privacy & performance">
          <p>
            Everything runs in your browser. There are no accounts, no analytics,
            and no external API calls; your answers are kept only in your
            browser&rsquo;s session storage so you can refresh without losing
            progress. Fonts are self-hosted at build time, so even they make no
            third-party requests.
          </p>
        </Section>

        <Section title="Sources">
          <p>
            Each of the {theories.length} models links to its own references. A few
            neutral, general starting points:
          </p>
          <ul className="mt-3 space-y-2">
            {OVERVIEW_RESOURCES.map((r) => (
              <li key={r.url}>
                <a
                  className="link-underline text-navy"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">
            Links are curated toward stable, authoritative references and primary
            authors; bibliographic citations (author, work, year) are given so a
            source can be found even if a URL moves.
          </p>
        </Section>

        <div className="flex flex-wrap gap-3 border-t border-black/10 pt-8">
          <Link
            href="/quiz?mode=short"
            className="focus-ring rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-parchment hover:bg-navy/90"
          >
            Take the quiz
          </Link>
          <Link
            href="/encyclopedia"
            className="focus-ring rounded-xl border border-navy/30 bg-white/70 px-5 py-2.5 text-sm font-semibold text-navy hover:bg-white"
          >
            Compare all models
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="font-serif text-xl font-semibold text-navy">{title}</h2>
      <div className="leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}
