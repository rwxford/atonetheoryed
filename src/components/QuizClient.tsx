"use client";

import dynamic from "next/dynamic";
import type { QuizMode } from "@/lib/types";

/**
 * The quiz is inherently interactive and reads from sessionStorage, so it is
 * loaded client-only (`ssr: false`). This keeps initial state restoration free
 * of hydration mismatches and matches the project's client-side-execution goal.
 */
const QuizWizard = dynamic(
  () => import("./QuizWizard").then((m) => m.QuizWizard),
  {
    ssr: false,
    loading: () => <QuizSkeleton />,
  },
);

export function QuizClient({ mode }: { mode: QuizMode }) {
  // `key` ensures a clean remount (and per-mode session restore) on mode change.
  return <QuizWizard key={mode} mode={mode} />;
}

function QuizSkeleton() {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-2xl animate-pulse">
        <div className="mb-8 h-2 w-full rounded-full bg-black/10" />
        <div className="card p-6 sm:p-8">
          <div className="h-7 w-3/4 rounded bg-black/10" />
          <div className="mt-6 space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-16 w-full rounded-xl bg-black/5" />
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">Loading quiz…</p>
      </div>
    </div>
  );
}
