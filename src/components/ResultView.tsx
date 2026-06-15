"use client";

import Link from "next/link";
import type { AnswerMap, QuizResult, QuizMode, TheoryId } from "@/lib/types";
import { getTheory } from "@/lib/theoriesData";
import { encodeShareCode } from "@/lib/shareCodec";
import { TheoryArticle } from "./TheoryArticle";
import { ScoreBars } from "./ScoreBars";
import { ShareBar } from "./ShareBar";

interface ResultViewProps {
  result: QuizResult;
  mode: QuizMode;
  answers: AnswerMap;
  shared?: boolean;
  onRestart?: () => void;
}

export function ResultView({
  result,
  mode,
  answers,
  shared = false,
  onRestart,
}: ResultViewProps) {
  const shareCode = encodeShareCode(answers, mode);
  const isBlend = result.kind === "blend" && result.blend;
  const members: TheoryId[] = isBlend ? result.blend!.members : [result.topId];
  const top = result.ranked[0];
  const second = result.ranked[1];
  const margin =
    top && second ? Math.round(top.percent - second.percent) : 0;
  const otherMode: QuizMode = mode === "short" ? "deep" : "short";

  return (
    <div className="space-y-8">
      {shared && (
        <div className="rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink print:hidden">
          <strong className="font-semibold text-navy">A shared result.</strong>{" "}
          Someone shared their quiz outcome with you. Curious where you’d land?{" "}
          <Link href="/quiz" className="link-underline font-medium text-navy">
            Take the quiz yourself →
          </Link>
        </div>
      )}
      {/* Verdict banner */}
      <header
        className="overflow-hidden rounded-2xl border border-black/10 text-parchment shadow-sm"
        style={{
          background: isBlend
            ? `linear-gradient(110deg, ${getTheory(members[0]).accentHex}, ${getTheory(
                members[1] ?? members[0],
              ).accentHex})`
            : getTheory(result.topId).accentHex,
        }}
      >
        <div className="bg-black/15 px-6 py-7 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-parchment/80">
            {isBlend ? "Your result · Blended hybrid" : "Your result · Single model"}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl">
            {isBlend ? result.blend!.name : getTheory(result.topId).name}
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-parchment/90">
            {isBlend
              ? result.blend!.crossPollination
              : getTheory(result.topId).summary}
          </p>

          {isBlend && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {members.map((id) => (
                <li
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/25 px-3 py-1 text-xs font-medium"
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 rounded-full ring-1 ring-white/40"
                    style={{ backgroundColor: getTheory(id).accentHex }}
                  />
                  {getTheory(id).name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      {/* Explanation of the rule that fired */}
      <p className="rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-ink-soft">
        {isBlend ? (
          <>
            Two or more models landed within{" "}
            <strong className="text-ink">{result.thresholdPercent}%</strong> of the
            leader, so a blended view is shown rather than a single result.
          </>
        ) : (
          <>
            Your leading model cleared the next by{" "}
            <strong className="text-ink">{margin}%</strong>, beyond the{" "}
            {result.thresholdPercent}% blend threshold, so a single dedicated
            result is shown.
          </>
        )}{" "}
        Based on {result.answered}/{result.total} questions ({mode} mode).
      </p>

      {/* Share / save */}
      <ShareBar result={result} mode={mode} code={shareCode} />

      {/* Score distribution */}
      <section className="card p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-navy">
          How your answers distributed
        </h2>
        <p className="mt-1 mb-4 text-sm text-ink-soft">
          Share of total points across all nine models. Highlighted bars are part
          of your result.
        </p>
        <ScoreBars scores={result.ranked} highlight={members} />
      </section>

      {/* Full article(s) */}
      <section className="space-y-6">
        <h2 className="font-serif text-xl font-semibold text-navy">
          {isBlend ? "The models in your blend" : "Your model in depth"}
        </h2>
        {members.map((id) => (
          <div key={id} className="card p-5 sm:p-6">
            <TheoryArticle theory={getTheory(id)} />
          </div>
        ))}
      </section>

      {/* Neutrality reminder */}
      <p className="rounded-xl border border-dashed border-black/15 bg-white/40 px-4 py-3 text-xs text-ink-soft">
        This result reflects the emphases in your answers, not a judgment about
        which model is true or best. Each model has a long history and thoughtful
        proponents and critics. Use the encyclopedia to compare them side by side.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 print:hidden">
        {shared ? (
          <Link
            href="/quiz"
            className="focus-ring rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-parchment shadow-sm transition hover:bg-navy/90"
          >
            Take the quiz yourself
          </Link>
        ) : (
          <button
            type="button"
            onClick={onRestart}
            className="focus-ring rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-parchment shadow-sm transition hover:bg-navy/90"
          >
            Retake ({mode})
          </button>
        )}
        <Link
          href={`/quiz?mode=${otherMode}`}
          className="focus-ring rounded-xl border border-navy/30 bg-white/70 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white"
        >
          Try the {otherMode} quiz
        </Link>
        <Link
          href="/encyclopedia"
          className="focus-ring rounded-xl border border-navy/30 bg-white/70 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white"
        >
          Compare all models
        </Link>
      </div>
    </div>
  );
}
