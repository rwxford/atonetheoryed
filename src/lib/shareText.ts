import type { QuizMode, QuizResult, TheoryId } from "./types";
import { getTheory } from "./theoriesData";

/**
 * Pure builders for the text that accompanies a shared result. Kept free of any
 * DOM/browser API so they can be unit-tested and reused by the share sheet,
 * mail/SMS bodies, and the .txt / .md downloads.
 *
 *  - {@link shareSummaryLine}  one line (social posts, SMS, "copy summary").
 *  - {@link shareEmailBody}    concise body (kept short for `mailto:` limits).
 *  - {@link sharePlainText}    FULL detail for the .txt download.
 *  - {@link shareMarkdown}     FULL detail for the .md download.
 */

const APP_NAME = "Theories of Atonement";

const NEUTRALITY_NOTE =
  "This neutral, educational quiz reflects the emphases in your answers, not a claim about which view is correct.";

const RULE = "----------------------------------------";

function members(result: QuizResult): TheoryId[] {
  return result.kind === "blend" && result.blend
    ? result.blend.members
    : [result.topId];
}

/** The headline name of the result (blend name, or the single model's name). */
export function shareHeadline(result: QuizResult): string {
  return result.kind === "blend" && result.blend
    ? result.blend.name
    : getTheory(result.topId).name;
}

/** A one-line summary suitable for a tweet, message, or share-sheet `text`. */
export function shareSummaryLine(result: QuizResult): string {
  const headline = shareHeadline(result);
  if (result.kind === "blend" && result.blend) {
    const names = members(result)
      .map((id) => getTheory(id).name)
      .join(", ");
    return `My ${APP_NAME} result: ${headline} — ${names}.`;
  }
  const pct = result.ranked[0] ? Math.round(result.ranked[0].percent) : 0;
  return `My ${APP_NAME} result: ${headline} (${pct}%).`;
}

/** `Name — 32%` lines for every model that scored above zero. */
function distributionLines(result: QuizResult): string[] {
  return result.ranked
    .filter((s) => s.percent > 0)
    .map((s) => `${getTheory(s.id).name} — ${Math.round(s.percent)}%`);
}

function context(result: QuizResult): string {
  return result.kind === "blend" && result.blend
    ? result.blend.crossPollination
    : getTheory(result.topId).summary;
}

/**
 * Concise body for email. Mirrors what the on-screen verdict shows, kept short
 * so it stays within typical `mailto:` length limits.
 */
export function shareEmailBody(
  result: QuizResult,
  mode: QuizMode,
  url: string,
): string {
  return [
    shareHeadline(result),
    "",
    context(result),
    "",
    `Where my answers landed (${mode} mode, ${result.answered}/${result.total} answered):`,
    ...distributionLines(result).map((l) => `  - ${l}`),
    "",
    `See the full result and take the quiz: ${url}`,
    "",
    NEUTRALITY_NOTE,
  ].join("\n");
}

/** Full per-model detail. `md` toggles Markdown vs plain-text formatting. */
function theoryDetail(id: TheoryId, md: boolean): string[] {
  const t = getTheory(id);
  const bullet = (s: string) => (md ? `- ${s}` : `  - ${s}`);
  const lines: string[] = [];

  lines.push(md ? `## ${t.name}` : `== ${t.name} ==`, "");
  lines.push(md ? `*${t.era}*` : `Era: ${t.era}`);
  if (t.figures.length) {
    lines.push((md ? "**Key figures:** " : "Key figures: ") + t.figures.join("; "));
  }
  lines.push("", t.description, "");

  lines.push(md ? "**Strengths** (as argued by proponents):" : "Strengths (as argued by proponents):");
  lines.push(...t.strengths.map(bullet));
  lines.push("");
  lines.push(md ? "**Critiques** (as raised by critics):" : "Critiques (as raised by critics):");
  lines.push(...t.critiques.map(bullet));

  if (t.scripture.length) {
    lines.push("", md ? "**Key scripture:**" : "Key scripture:");
    lines.push(...t.scripture.map((s) => bullet(s.note ? `${s.ref} — ${s.note}` : s.ref)));
  }
  if (t.resources.length) {
    lines.push("", md ? "**Sources:**" : "Sources:");
    lines.push(
      ...t.resources.map((r) =>
        bullet(md ? `[${r.label}](${r.url})` : `${r.label} — ${r.url}`),
      ),
    );
  }
  return lines;
}

/** FULL plain-text export (used for the .txt download). */
export function sharePlainText(
  result: QuizResult,
  mode: QuizMode,
  url: string,
): string {
  const lines: string[] = [
    `My ${APP_NAME} result: ${shareHeadline(result)}`,
    "",
    context(result),
    "",
    `Based on ${result.answered}/${result.total} questions (${mode} mode).`,
    "",
    "Score distribution:",
    ...distributionLines(result).map((l) => `  - ${l}`),
    "",
  ];
  for (const id of members(result)) {
    lines.push(RULE, "", ...theoryDetail(id, false), "");
  }
  lines.push(RULE, "", NEUTRALITY_NOTE, "", `Take the quiz: ${url}`);
  return lines.join("\n");
}

/** FULL Markdown export (used for the .md download). */
export function shareMarkdown(
  result: QuizResult,
  mode: QuizMode,
  url: string,
): string {
  const lines: string[] = [
    `# My ${APP_NAME} result: ${shareHeadline(result)}`,
    "",
    context(result),
    "",
    `*Based on ${result.answered}/${result.total} questions (${mode} mode).*`,
    "",
    "## Where my answers landed",
    "",
    ...distributionLines(result).map((l) => `- ${l}`),
    "",
  ];
  for (const id of members(result)) {
    lines.push(...theoryDetail(id, true), "");
  }
  lines.push("---", "", `> ${NEUTRALITY_NOTE}`, "", `[Take the quiz](${url})`, "");
  return lines.join("\n");
}
