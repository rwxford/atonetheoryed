import { describe, it, expect } from "vitest";
import {
  shareHeadline,
  shareSummaryLine,
  sharePlainText,
  shareMarkdown,
} from "./shareText";
import { evaluateQuiz } from "./quizEngine";
import { getQuestions } from "./quizData";
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

  it("includes a distribution and the url in plain text and markdown", () => {
    const result = evaluateQuiz(pickAll("deep", 1), "deep");
    const url = "https://example.test/r/1dabc";
    const txt = sharePlainText(result, "deep", url);
    const md = shareMarkdown(result, "deep", url);

    expect(txt).toContain(url);
    expect(txt).toContain("deep mode");
    expect(txt).toMatch(/—\s\d+%/);

    expect(md).toContain(`](${url})`);
    expect(md.startsWith("# My Theories of Atonement result:")).toBe(true);
  });

  it("handles an empty result without throwing", () => {
    const result = evaluateQuiz({}, "short");
    expect(() => sharePlainText(result, "short", "u")).not.toThrow();
    expect(() => shareMarkdown(result, "short", "u")).not.toThrow();
    expect(shareSummaryLine(result)).toContain("result:");
  });
});
