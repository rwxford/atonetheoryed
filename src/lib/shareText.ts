import type { QuizMode, QuizResult, TheoryId } from "./types";
import { getTheory } from "./theoriesData";

/**
 * Pure builders for the text that accompanies a shared result. Kept free of any
 * DOM/browser API so they can be unit-tested and reused by the share sheet,
 * mail/SMS bodies, the .txt and .md downloads, and (later) image alt text.
 */

const APP_NAME = "Theories of Atonement";

const NEUTRALITY_NOTE =
  "This neutral, educational quiz reflects the emphases in your answers, not a claim about which view is correct.";

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

/** Plain-text export (used for the .txt download and email/SMS bodies). */
export function sharePlainText(
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
    `Take the quiz: ${url}`,
    "",
    NEUTRALITY_NOTE,
  ].join("\n");
}

/** Markdown export (used for the .md download and markdown-aware targets). */
export function shareMarkdown(
  result: QuizResult,
  mode: QuizMode,
  url: string,
): string {
  return [
    `# My ${APP_NAME} result: ${shareHeadline(result)}`,
    "",
    context(result),
    "",
    `**Where my answers landed** (${mode} mode · ${result.answered}/${result.total} answered)`,
    "",
    ...distributionLines(result).map((l) => `- ${l}`),
    "",
    `[Take the quiz](${url})`,
    "",
    `> ${NEUTRALITY_NOTE}`,
    "",
  ].join("\n");
}
