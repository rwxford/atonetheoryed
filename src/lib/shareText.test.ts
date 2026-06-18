import { describe, it, expect } from "vitest";
import {
  shareEmailBody,
  shareHeadline,
  shareSummaryLine,
  sharePlainText,
  shareMarkdown,
} from "./shareText";
import { evaluateQuiz } from "./quizEngine";
import { getQuestions } from "./quizData";
import { getTheory } from "./theoriesData";
import type { AnswerMap, QuizMode } from "./types";

/** Answer every question in `mode` with the same option index. */
function pickAll(mode: QuizMode, letter: number): AnswerMap {
  const a: AnswerMap = {};
  for (const q of getQuestions(mode)) {
    a[q.id] = q.options[letter % q.options.length].id;
  }
  return a;
}

describe("shareText", () => {
  it("builds a summary line that names the result", () => {
    const result = evaluateQuiz(pickAll("short", 0), "short");
    const line = shareSummaryLine(result);
    expect(line).toContain("My Theories of Atonement result:");
    expect(shareHeadline(result).length).toBeGreaterThan(0);
    if (result.kind === "single") {
      expect(line).toMatch(/\(\d+%\)\.$/);
    }
  });

  it("includes full result details in plain text and markdown exports", () => {
    const result = evaluateQuiz(pickAll("deep", 1), "deep");
    const url = "https://example.test/r/1dabc";
    const txt = sharePlainText(result, "deep", url);
    const md = shareMarkdown(result, "deep", url);
    const topTheory = getTheory(result.topId);

    expect(txt).toContain(url);
    expect(txt).toContain("deep mode");
    expect(txt).toMatch(/—\s\d+%/);
    expect(txt).toContain(topTheory.name);
    expect(txt).toContain(topTheory.description);
    expect(txt).toContain("Strengths (as argued by proponents):");
    expect(txt).toContain("Critiques (as raised by critics):");
    expect(txt).toContain("Sources:");
    expect(txt).toContain(topTheory.resources[0].label);

    expect(md).toContain(`](${url})`);
    expect(md.startsWith("# My Theories of Atonement result:")).toBe(true);
    expect(md).toContain(`## ${topTheory.name}`);
    expect(md).toContain(topTheory.description);
    expect(md).toContain("**Strengths** (as argued by proponents):");
    expect(md).toContain("**Critiques** (as raised by critics):");
    expect(md).toContain("**Sources:**");
  });

  it("keeps the email body concise while still including the destination url", () => {
    const result = evaluateQuiz(pickAll("deep", 1), "deep");
    const url = "https://example.test/r/1dabc";
    const email = shareEmailBody(result, "deep", url);

    expect(email).toContain(url);
    expect(email).toContain("Where my answers landed");
    expect(email).not.toContain("Strengths (as argued by proponents):");
    expect(email).not.toContain("Sources:");
  });

  it("handles an empty result without throwing", () => {
    const result = evaluateQuiz({}, "short");
    expect(() => sharePlainText(result, "short", "u")).not.toThrow();
    expect(() => shareMarkdown(result, "short", "u")).not.toThrow();
    expect(() => shareEmailBody(result, "short", "u")).not.toThrow();
    expect(shareSummaryLine(result)).toContain("result:");
  });
});
