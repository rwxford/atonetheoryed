import type { Theory } from "@/lib/types";

function SwatchHeading({ theory }: { theory: Theory }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className="mt-1 h-6 w-6 shrink-0 rounded-md ring-1 ring-black/10"
        style={{ backgroundColor: theory.accentHex }}
      />
      <div>
        <h3 className="font-serif text-xl font-semibold text-navy">{theory.name}</h3>
        {theory.aka.length > 0 && (
          <p className="text-xs text-ink-soft">also: {theory.aka.join(" · ")}</p>
        )}
      </div>
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-2 py-1 text-sm">
      <dt className="font-medium text-ink-soft">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}

/**
 * Full, neutral presentation of a single model. Strengths and critiques are
 * explicitly framed as attributed claims to preserve the unbiased stance.
 */
export function TheoryArticle({ theory }: { theory: Theory }) {
  return (
    <article className="space-y-5">
      <SwatchHeading theory={theory} />

      <p className="text-[15px] leading-relaxed text-ink">{theory.summary}</p>
      <p className="leading-relaxed text-ink-soft">{theory.description}</p>

      <p className="rounded-lg border-l-4 bg-white/60 px-3 py-2 text-sm text-ink"
        style={{ borderColor: theory.accentHex }}>
        <span className="font-medium">Core emphasis: </span>
        {theory.emphasis}
      </p>

      <dl className="rounded-xl border border-black/10 bg-white/50 px-4 py-2">
        <MetaRow label="Era" value={theory.era} />
        <MetaRow label="Figures" value={theory.figures.join("; ")} />
        <MetaRow label="Traditions" value={theory.traditions.join("; ")} />
      </dl>

      <div className="grid gap-5 sm:grid-cols-2">
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            Strengths cited by proponents
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm text-ink">
            {theory.strengths.map((s, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-forest">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
            Critiques raised by critics
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm text-ink">
            {theory.critiques.map((c, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden className="text-crimson">–</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Key scriptural references
        </h4>
        <ul className="mt-2 flex flex-wrap gap-2">
          {theory.scripture.map((s) => (
            <li
              key={s.ref}
              className="pill"
              title={s.note}
            >
              <span className="font-semibold text-navy">{s.ref}</span>
              {s.note && <span className="hidden text-ink-soft sm:inline"> — {s.note}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Sources &amp; further reading
        </h4>
        <ul className="mt-2 space-y-1.5 text-sm">
          {theory.resources.map((r) => (
            <li key={`${r.label}-${r.url}`} className="flex flex-wrap items-baseline gap-x-2">
              <a
                className="link-underline text-navy"
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.label}
              </a>
              <span className="pill capitalize">{r.kind}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
