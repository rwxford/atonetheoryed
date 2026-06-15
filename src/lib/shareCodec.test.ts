import { describe, it, expect } from "vitest";
import {
  encodeShareCode,
  decodeShareCode,
  SHARE_CODE_VERSION,
} from "./shareCodec";
import { getQuestions } from "./quizData";
import type { AnswerMap, QuizMode } from "./types";

/** Build an answer map by choosing option `pick(i)` for each question. */
function answersFor(mode: QuizMode, pick: (i: number) => number): AnswerMap {
  const a: AnswerMap = {};
  getQuestions(mode).forEach((q, i) => {
    a[q.id] = q.options[pick(i) % q.options.length].id;
  });
  return a;
}

describe("shareCodec", () => {
  it("round-trips a full short answer set", () => {
    const answers = answersFor("short", (i) => i);
    const decoded = decodeShareCode(encodeShareCode(answers, "short"));
    expect(decoded).not.toBeNull();
    expect(decoded!.mode).toBe("short");
    expect(decoded!.answers).toEqual(answers);
  });

  it("round-trips a full deep answer set", () => {
    const answers = answersFor("deep", (i) => i % 4);
    const decoded = decodeShareCode(encodeShareCode(answers, "deep"))!;
    expect(decoded.mode).toBe("deep");
    expect(decoded.answers).toEqual(answers);
  });

  it("encodes a version + mode prefix and one char per question", () => {
    const code = encodeShareCode({}, "short");
    expect(code.startsWith(`${SHARE_CODE_VERSION}s`)).toBe(true);
    expect(code.length).toBe(2 + getQuestions("short").length);
  });

  it("represents unanswered questions and preserves a partial answer set", () => {
    const qs = getQuestions("short");
    const answers: AnswerMap = { [qs[0].id]: qs[0].options[1].id };
    const code = encodeShareCode(answers, "short");
    expect(code[2]).toBe("b"); // first question -> option index 1
    expect(code[3]).toBe("-"); // second question unanswered
    expect(decodeShareCode(code)!.answers).toEqual(answers);
  });

  it("returns null for structurally invalid codes", () => {
    expect(decodeShareCode("")).toBeNull();
    expect(decodeShareCode("x")).toBeNull();
    expect(decodeShareCode("9sab")).toBeNull(); // bad version
    expect(decodeShareCode("1xab")).toBeNull(); // bad mode
  });

  it("decodes garbled body chars as unanswered without throwing", () => {
    const decoded = decodeShareCode("1sZZZ");
    expect(decoded).not.toBeNull();
    expect(decoded!.mode).toBe("short");
    expect(Object.keys(decoded!.answers)).toHaveLength(0);
  });

  it("tolerates a short body (older link) by treating the rest as unanswered", () => {
    const qs = getQuestions("deep");
    const decoded = decodeShareCode("1da")!; // only first deep question answered
    expect(decoded.answers[qs[0].id]).toBe(qs[0].options[0].id);
    expect(Object.keys(decoded.answers)).toHaveLength(1);
  });
});
