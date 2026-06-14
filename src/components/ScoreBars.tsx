import type { TheoryScore, TheoryId } from "@/lib/types";
import { getTheory } from "@/lib/theoriesData";

interface ScoreBarsProps {
  scores: TheoryScore[];
  /** Optional set of theory ids to emphasize (e.g. blend members). */
  highlight?: TheoryId[];
  /** Hide models that scored zero. Default true. */
  hideZero?: boolean;
}

/**
 * Horizontal bar chart of normalized scores. Bar length is scaled to the top
 * score so the chart fills the space; the numeric label shows each model's
 * share of the total points.
 */
export function ScoreBars({ scores, highlight, hideZero = true }: ScoreBarsProps) {
  const visible = hideZero ? scores.filter((s) => s.raw > 0) : scores;
  const max = Math.max(...visible.map((s) => s.percent), 1);
  const highlightSet = new Set(highlight ?? []);

  if (visible.length === 0) {
    return (
      <p className="text-sm text-ink-soft">No answers recorded yet.</p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {visible.map((s) => {
        const theory = getTheory(s.id);
        const emphasized = highlightSet.size === 0 || highlightSet.has(s.id);
        const width = `${Math.max((s.percent / max) * 100, 4)}%`;
        return (
          <li key={s.id} className="grid grid-cols-[9.5rem_1fr_3rem] items-center gap-3">
            <span
              className={`truncate text-sm ${
                emphasized ? "font-medium text-ink" : "text-ink-soft"
              }`}
              title={theory.name}
            >
              {theory.name}
            </span>
            <span className="h-3 w-full overflow-hidden rounded-full bg-black/5">
              <span
                className="block h-full rounded-full transition-[width] duration-700 ease-out"
                style={{
                  width,
                  backgroundColor: theory.accentHex,
                  opacity: emphasized ? 1 : 0.4,
                }}
              />
            </span>
            <span
              className={`text-right text-xs tabular-nums ${
                emphasized ? "text-ink" : "text-ink-soft"
              }`}
            >
              {Math.round(s.percent)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}
