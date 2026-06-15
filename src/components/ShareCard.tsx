import type { QuizMode, QuizResult, TheoryId } from "@/lib/types";
import { getTheory } from "@/lib/theoriesData";
import { shareHeadline } from "@/lib/shareText";

/**
 * A fixed-width (1080px) branded card used purely as the capture target for the
 * client-side "Save as image" / Web Share file. It mirrors the result banner's
 * design. It is rendered off-screen by {@link ShareBar}; it is never part of the
 * normal reading flow, so it is intentionally not responsive.
 */
export function ShareCard({ result }: { result: QuizResult; mode?: QuizMode }) {
  const isBlend = result.kind === "blend" && !!result.blend;
  const members: TheoryId[] = isBlend ? result.blend!.members : [result.topId];
  const accentA = getTheory(members[0]).accentHex;
  const accentB = getTheory(members[1] ?? members[0]).accentHex;
  const headline = shareHeadline(result);
  const top = result.ranked.filter((s) => s.percent > 0).slice(0, 5);

  return (
    <div
      style={{ width: 1080 }}
      className="overflow-hidden rounded-[28px] border border-black/10 bg-parchment"
    >
      <div
        style={{
          background: isBlend
            ? `linear-gradient(110deg, ${accentA}, ${accentB})`
            : accentA,
        }}
        className="px-14 pb-12 pt-11 text-parchment"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/25">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <rect x="10.5" y="3" width="3" height="18" rx="1" />
              <rect x="6" y="8" width="12" height="3" rx="1" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Theories of Atonement
          </span>
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-parchment/80">
          {isBlend ? "Quiz result · Blended hybrid" : "Quiz result · Single model"}
        </p>
        <h1 className="mt-2 font-serif text-6xl font-bold leading-tight">{headline}</h1>

        {isBlend && (
          <div className="mt-5 flex flex-wrap gap-2">
            {members.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-2 rounded-full bg-black/25 px-4 py-1.5 text-base font-medium"
              >
                <span
                  className="h-3 w-3 rounded-full ring-1 ring-white/40"
                  style={{ backgroundColor: getTheory(id).accentHex }}
                />
                {getTheory(id).name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="px-14 py-9">
        <div className="space-y-3">
          {top.map((s) => (
            <div key={s.id} className="flex items-center gap-4">
              <span className="w-56 shrink-0 text-base font-medium text-ink">
                {getTheory(s.id).name}
              </span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-black/10">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${Math.max(s.percent, 2)}%`,
                    backgroundColor: getTheory(s.id).accentHex,
                  }}
                />
              </span>
              <span className="w-14 shrink-0 text-right text-base font-semibold text-ink-soft">
                {Math.round(s.percent)}%
              </span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-base text-ink-soft">
          Take the quiz · a neutral guide to the historic models of the atonement
        </p>
      </div>
    </div>
  );
}
