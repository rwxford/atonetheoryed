"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { AnswerMap, QuizMode } from "@/lib/types";
import { getQuestions } from "@/lib/quizData";
import { evaluateQuiz } from "@/lib/quizEngine";
import { ResultView } from "./ResultView";

const storageKey = (mode: QuizMode) => `atonement-quiz:${mode}`;

interface SavedState {
  answers: AnswerMap;
  index: number;
  finished: boolean;
}

/**
 * Read any in-progress session for this mode. Runs only on the client (this
 * component is mounted with `ssr: false`), so reading sessionStorage in a lazy
 * `useState` initializer is safe and cannot cause a hydration mismatch.
 */
function readSaved(mode: QuizMode, questionCount: number): SavedState {
  const empty: SavedState = { answers: {}, index: 0, finished: false };
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.sessionStorage.getItem(storageKey(mode));
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    return {
      answers: parsed.answers ?? {},
      index: Math.min(Math.max(parsed.index ?? 0, 0), Math.max(questionCount - 1, 0)),
      finished: Boolean(parsed.finished),
    };
  } catch {
    return empty;
  }
}

export function QuizWizard({ mode }: { mode: QuizMode }) {
  const questions = useMemo(() => getQuestions(mode), [mode]);

  const [answers, setAnswers] = useState<AnswerMap>(
    () => readSaved(mode, questions.length).answers,
  );
  const [index, setIndex] = useState(() => readSaved(mode, questions.length).index);
  const [finished, setFinished] = useState(
    () => readSaved(mode, questions.length).finished,
  );

  // Persist progress whenever it changes (no setState here, so this is a pure
  // "sync React state to an external system" effect).
  useEffect(() => {
    try {
      window.sessionStorage.setItem(
        storageKey(mode),
        JSON.stringify({ answers, index, finished }),
      );
    } catch {
      /* storage may be unavailable; non-fatal */
    }
  }, [answers, index, finished, mode]);

  const current = questions[index];
  const answeredCount = questions.filter((q) => answers[q.id]).length;
  const allAnswered = answeredCount === questions.length;
  const isLast = index === questions.length - 1;

  const select = useCallback(
    (optionId: string) => {
      setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
    },
    [current],
  );

  const restart = useCallback(() => {
    setAnswers({});
    setIndex(0);
    setFinished(false);
    try {
      window.sessionStorage.removeItem(storageKey(mode));
    } catch {
      /* non-fatal */
    }
  }, [mode]);

  // Keyboard: number keys to choose, arrows to move. setState only fires inside
  // the event callback, never synchronously in the effect body.
  useEffect(() => {
    if (finished) return;
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLElement &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)
      ) {
        return;
      }
      const n = Number(e.key);
      if (n >= 1 && n <= current.options.length) {
        select(current.options[n - 1].id);
      } else if (e.key === "ArrowRight" && answers[current.id]) {
        setIndex((i) => Math.min(i + 1, questions.length - 1));
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, answers, finished, questions.length, select]);

  if (finished) {
    const result = evaluateQuiz(answers, mode);
    return (
      <div className="container-page py-8 sm:py-12">
        <ResultView result={result} mode={mode} onRestart={restart} />
      </div>
    );
  }

  const progress = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Mode switch + progress */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="inline-flex rounded-xl border border-black/10 bg-white/60 p-1 text-sm">
            <Link
              href="/quiz?mode=short"
              className={`focus-ring rounded-lg px-3 py-1.5 font-medium ${
                mode === "short" ? "bg-navy text-parchment" : "text-ink-soft hover:text-navy"
              }`}
            >
              Short
            </Link>
            <Link
              href="/quiz?mode=deep"
              className={`focus-ring rounded-lg px-3 py-1.5 font-medium ${
                mode === "deep" ? "bg-navy text-parchment" : "text-ink-soft hover:text-navy"
              }`}
            >
              Deep
            </Link>
          </div>
          <p className="text-sm text-ink-soft" aria-live="polite">
            Question <span className="font-semibold text-ink">{index + 1}</span> of{" "}
            {questions.length}
          </p>
        </div>

        <div
          className="mb-8 h-2 w-full overflow-hidden rounded-full bg-black/5"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
        >
          <div
            className="h-full rounded-full bg-gold transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question card */}
        <div className="card p-6 sm:p-8">
          <fieldset>
            <legend className="font-serif text-2xl font-semibold leading-snug text-navy">
              {current.prompt}
            </legend>
            {current.helper && (
              <p className="mt-2 text-sm text-ink-soft">{current.helper}</p>
            )}

            <div className="mt-6 space-y-3">
              {current.options.map((option, i) => {
                const selected = answers[current.id] === option.id;
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition focus-within:ring-2 focus-within:ring-navy/50 ${
                      selected
                        ? "border-navy bg-navy/5 ring-1 ring-navy/30"
                        : "border-black/10 bg-white/60 hover:border-navy/40 hover:bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name={current.id}
                      value={option.id}
                      checked={selected}
                      onChange={() => select(option.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                        selected
                          ? "border-navy bg-navy text-parchment"
                          : "border-black/20 text-ink-soft"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Navigation */}
          <div className="mt-7 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIndex((i) => Math.max(i - 1, 0))}
              disabled={index === 0}
              className="focus-ring rounded-xl px-4 py-2.5 text-sm font-semibold text-navy hover:bg-white/70 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Back
            </button>

            {isLast ? (
              <button
                type="button"
                onClick={() => setFinished(true)}
                disabled={!allAnswered}
                className="focus-ring rounded-xl bg-crimson px-5 py-2.5 text-sm font-semibold text-parchment shadow-sm transition enabled:hover:bg-crimson/90 disabled:cursor-not-allowed disabled:opacity-50"
                title={allAnswered ? undefined : "Answer every question to see your result"}
              >
                See my result
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIndex((i) => Math.min(i + 1, questions.length - 1))}
                disabled={!answers[current.id]}
                className="focus-ring rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-parchment shadow-sm transition enabled:hover:bg-navy/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next →
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-ink-soft">
          Tip: press keys <kbd className="rounded bg-white/70 px-1">1</kbd>–
          <kbd className="rounded bg-white/70 px-1">{current.options.length}</kbd> to
          choose, arrow keys to move.
        </p>
      </div>
    </div>
  );
}
