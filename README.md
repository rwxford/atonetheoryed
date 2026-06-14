# Theories of Atonement — Interactive Quiz & Encyclopedia

An unbiased, academic single-page application for exploring the historic
Christian models of the **atonement**. Take a weighted quiz to see which model —
or *blend* of models — best matches your theological instincts, or browse an
interactive "compare all" encyclopedia.

- **Runs entirely in your browser.** No accounts, no analytics, no external API
  calls. Quiz progress is kept only in your browser's `sessionStorage`.
- **Strictly neutral.** Copy is descriptive, not evaluative; strengths and
  critiques are attributed to proponents and critics. No model is ranked above
  another.
- **Deployable to Vercel** with zero configuration.

## The nine models

Penal Substitution · Christus Victor · Moral Influence / Exemplar · Satisfaction
· Governmental · Recapitulation · Participatory (Theosis) · Ransom · Scapegoat
(René Girard).

Each model carries a neutral summary and description, its historical era and key
figures, denominational/traditional associations, attributed strengths and
critiques, key scriptural references, and links to sources (Stanford Encyclopedia
of Philosophy, survey articles, and primary authors with the work + date named).

## Features

- **Two quiz depths.** Short mode (7 archetypal questions) and Deep mode (22
  questions tracking scriptural emphases, historical voices, and sub-facets of
  divine attributes).
- **Weighted, synergistic scoring.** A single answer can distribute points across
  several models at once (e.g. +2 Christus Victor, +2 Ransom).
- **The 10% Blended-Hybrid rule.** Scores are normalized to a percentage of the
  total. If the leading model clears every other by **≥ 10 percentage points**, a
  single dedicated result is shown. If one or more models land **within 10%**, a
  blended result is generated instead — a named pair (e.g. *the Penal–Victor
  Blend*) for two, or *the Kaleidoscopic View* for three or more — with a neutral
  explanation of how those specific models cross-pollinate.
- **Encyclopedia / "Compare All".** A filterable, sortable comparison table; expand
  any row for full strengths, critiques, scripture, and sources.
- **Accessible & responsive.** Keyboard-driven quiz (number keys + arrows), ARIA
  roles, skip link, focus-visible rings, and reduced-motion support.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) · React 19 · TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) (CSS-first `@theme` palette)
- Self-hosted fonts via `next/font` (Geist + Spectral) — no runtime font requests
- [Vitest](https://vitest.dev) for the scoring-engine test suite

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000

pnpm build        # production build (also typechecks)
pnpm start        # serve the production build

pnpm lint         # ESLint (Next core-web-vitals + TS)
pnpm test         # run the engine unit tests (Vitest)
```

## Project structure

```
src/
  lib/
    types.ts          # TheoryId, Theory, Question, Weights, QuizResult, BlendInfo
    theoriesData.ts   # the 9-model data matrix (sourced, neutral)
    quizData.ts       # 7 short + 15 deep-only questions; weighted options
    blends.ts         # curated cross-pollination text + blend builder
    quizEngine.ts     # pure scoring + the 10% blended-hybrid rule
    quizEngine.test.ts# Vitest coverage of scoring, the 10% rule, and blends
  app/
    layout.tsx, globals.css   # palette, fonts, header/footer
    page.tsx                  # landing
    quiz/page.tsx             # reads ?mode= and mounts the client-only wizard
    encyclopedia/page.tsx     # compare-all explorer
    about/page.tsx            # method, the 10% rule, neutrality, sources
  components/
    SiteHeader / SiteFooter
    QuizClient (ssr:false) -> QuizWizard -> ResultView -> ScoreBars
    TheoryArticle            # reused by results and the encyclopedia
    EncyclopediaExplorer     # filter/sort/search + expandable rows
```

## Adjusting the content or scoring

- **Add / edit a model:** update `src/lib/theoriesData.ts` (and add its id to the
  `TheoryId` union and `THEORY_IDS` in `src/lib/types.ts`).
- **Add / edit questions:** update `src/lib/quizData.ts`. Tag a question with
  `["short", "deep"]` to include it in both depths, or `["deep"]` for deep-only.
- **Tune the blend threshold:** change `BLEND_THRESHOLD_PERCENT` in
  `src/lib/quizEngine.ts` (it is surfaced in the UI automatically).
- **Curate a named blend:** add an entry to `CURATED_PAIRS` in `src/lib/blends.ts`.

Run `pnpm test` after changes — the suite checks that every model remains
reachable and that the 10% rule behaves at the boundary.

## Deployment (Vercel)

Import the repository in Vercel and accept the defaults (Framework preset:
Next.js). No environment variables are required. The static pages (`/`, `/about`,
`/encyclopedia`) are prerendered; `/quiz` reads the `?mode=` query at request time
and renders the quiz on the client.

## Notes on neutrality & sources

This is a study and discussion tool, not a statement of doctrine. The atonement
has been understood in many ways across the Christian tradition; this app aims to
present those ways fairly and let readers compare them. Source links are curated
toward stable, authoritative references; bibliographic citations (author, work,
year) are included so a source can be found even if a URL changes.
