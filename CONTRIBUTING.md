# Contributing to Theories of Atonement

Thanks for your interest in improving this project. It is a small, client-side
[Next.js](https://nextjs.org/) app that lets people explore historic Christian
**theories of the atonement** through a short quiz and an encyclopedia of
models. Because the subject is theological and contested, contributions are held
to a few extra standards around **neutrality** and **sourcing** described below.

By contributing, you agree that your contributions will be licensed under the
project's [MIT License](./LICENSE).

---

## Table of contents

- [Ground rules](#ground-rules)
- [Editorial standards](#editorial-standards)
  - [Neutrality](#neutrality)
  - [Attribution](#attribution)
  - [Sourcing](#sourcing)
- [Local development](#local-development)
- [Verification gates](#verification-gates)
- [Submitting changes](#submitting-changes)
- [Reporting issues](#reporting-issues)

---

## Ground rules

- Be respectful. This project documents a range of theological positions that
  people hold sincerely and disagree about in good faith.
- The app is **descriptive, not prescriptive**. It explains what each theory
  claims and who has argued for or against it. It does not tell users which
  view is correct.
- Keep the app **client-side and dependency-light**. There is no backend and no
  analytics; please do not add either without discussion first.

## Editorial standards

These apply to any change that touches content in `src/lib/theoriesData.ts`,
`src/lib/quizData.ts`, `src/lib/blends.ts`, or copy rendered in the UI.

### Neutrality

- Present each theory **on its own terms** before evaluating it.
- Frame strengths as claims made **by proponents** and critiques as claims made
  **by critics**, rather than asserting them in the project's own voice. The
  data model reflects this: keep strengths and critiques attributed.
- Avoid loaded or devotional language that implies one model is the "real" or
  "biblical" one. Where a view is a minority or contested position, say so
  plainly and neutrally.

### Attribution

- Tie each theory to the figures and traditions historically associated with it
  (e.g. Anselm with satisfaction, Abelard with moral influence, Aulén's framing
  of *Christus Victor*). Attribute carefully and avoid overstating who held what.

### Sourcing

- **Do not fabricate sources, quotations, dates, or attributions.** If you are
  not sure a claim is accurate, leave it out or open a
  [content correction](#reporting-issues) instead.
- Prefer **stable, reputable references**: the
  [Stanford Encyclopedia of Philosophy](https://plato.stanford.edu/),
  established reference works, and clearly-identified author or survey pages.
- Every link you add must resolve to a real, relevant page. Verify it loads and
  actually supports the statement it accompanies.
- Keep links durable. Prefer canonical entry URLs over deep links that rot.

## Local development

Requirements: **Node 22** and **pnpm 10** (the repo pins pnpm `10.33.2` in CI).

```bash
pnpm install          # install dependencies (uses the committed lockfile)
pnpm dev              # start the dev server at http://localhost:3000
```

Useful scripts:

| Script            | What it does                          |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | Run the development server            |
| `pnpm build`      | Production build                      |
| `pnpm start`      | Serve the production build            |
| `pnpm lint`       | Run ESLint                            |
| `pnpm test`       | Run the vitest suite once             |
| `pnpm test:watch` | Run vitest in watch mode              |

The quiz scoring logic lives in `src/lib/quizEngine.ts` and is covered by
`src/lib/quizEngine.test.ts`. If you change scoring, blends, or the question
set, **update the tests** in the same change.

## Verification gates

Before opening a pull request, make sure all three gates pass locally. CI runs
the same three on every PR:

```bash
pnpm lint
pnpm test
pnpm build
```

A type check (`pnpm exec tsc --noEmit`) is also a good idea for larger changes.

## Submitting changes

1. Create a feature branch off `main` (e.g. `content/scapegoat-sources`).
2. Keep each PR focused on a single concern.
3. Ensure `pnpm lint`, `pnpm test`, and `pnpm build` all pass.
4. Fill out the pull request template, including the sourcing checklist when
   your change touches theological content.
5. If your change alters the number of questions, scoring behavior, or blends,
   confirm the tests and the counts in `README.md` are updated to match.

## Reporting issues

Use the issue templates:

- **Bug report** — something in the app misbehaves.
- **Feature request** — an idea for the quiz or encyclopedia.
- **Content correction** — a theological inaccuracy, misattribution, or a
  broken or unsupported source link. Please include a reputable reference.

Thanks for helping keep this resource accurate and fair.
