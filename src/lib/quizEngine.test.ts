import { describe, it, expect } from "vitest";
import {
  evaluateQuiz,
  computeRawScores,
  rankScores,
  blendMembers,
  BLEND_THRESHOLD_PERCENT,
} from "./quizEngine";
import { buildBlend } from "./blends";
import { getQuestions, questions } from "./quizData";
import { THEORY_IDS, type AnswerMap, type TheoryId } from "./types";

/** Build a complete raw-score record from a partial, defaulting others to 0. */
function rawOf(partial: Partial<Record<TheoryId, number>>): Record<TheoryId, number> {
  const base = Object.fromEntries(THEORY_IDS.map((id) => [id, 0])) as Record<
    TheoryId,
    number
  >;
  return { ...base, ...partial };
}

describe("question dataset", () => {
  it("has 7 short and 18 deep questions (deep ≥ 15)", () => {
    expect(getQuestions("short")).toHaveLength(7);
    expect(getQuestions("deep")).toHaveLength(18);
    expect(getQuestions("deep").length).toBeGreaterThanOrEqual(15);
  });

  it("includes every short question in deep mode", () => {
    const deepIds = new Set(getQuestions("deep").map((q) => q.id));
    for (const q of getQuestions("short")) {
      expect(deepIds.has(q.id)).toBe(true);
    }
  });

  it("makes every theory reachable (each model is awarded by some option)", () => {
    for (const id of THEORY_IDS) {
      const reachable = questions.some((q) =>
        q.options.some((o) => (o.weights[id] ?? 0) > 0),
      );
      expect(reachable, `no option awards points to ${id}`).toBe(true);
    }
  });

  it("uses only known theory ids and unique option ids", () => {
    const optionIds = new Set<string>();
    for (const q of questions) {
      for (const o of q.options) {
        expect(optionIds.has(o.id)).toBe(false);
        optionIds.add(o.id);
        for (const key of Object.keys(o.weights)) {
          expect(THEORY_IDS).toContain(key as TheoryId);
        }
      }
    }
  });
});

describe("scoring", () => {
  it("sums multi-tag weights across questions", () => {
    const answers: AnswerMap = { q1: "q1b" }; // CV +2, ransom +2
    const raw = computeRawScores(answers, getQuestions("short"));
    expect(raw.christus_victor).toBe(2);
    expect(raw.ransom).toBe(2);
    expect(raw.penal_substitution).toBe(0);
  });

  it("normalizes to percentages that sum to 100 when there are points", () => {
    const ranked = rankScores(rawOf({ penal_substitution: 3, ransom: 1 }));
    const sum = ranked.reduce((s, r) => s + r.percent, 0);
    expect(Math.round(sum)).toBe(100);
    expect(ranked[0].id).toBe("penal_substitution");
    expect(ranked[0].percent).toBeCloseTo(75, 5);
  });

  it("breaks ties using the canonical theory order (deterministic)", () => {
    const ranked = rankScores(rawOf(Object.fromEntries(THEORY_IDS.map((id) => [id, 1]))));
    expect(ranked.map((r) => r.id)).toEqual([...THEORY_IDS]);
  });
});

describe("the 10% blended-hybrid rule", () => {
  it("returns a single result when the leader clears the field by ≥ 10%", () => {
    // 11 vs 9 of 20 => 55% vs 45% => diff exactly 10 => NOT a blend.
    const ranked = rankScores(rawOf({ penal_substitution: 11, christus_victor: 9 }));
    const members = blendMembers(ranked);
    expect(members).toEqual(["penal_substitution"]);
    expect(BLEND_THRESHOLD_PERCENT).toBe(10);
  });

  it("returns a blend when a rival is within 10%", () => {
    // 11 vs 10 of 21 => ~52.4% vs ~47.6% => diff < 10 => blend.
    const ranked = rankScores(rawOf({ penal_substitution: 11, christus_victor: 10 }));
    const members = blendMembers(ranked);
    expect(members).toHaveLength(2);
    expect(members).toEqual(["penal_substitution", "christus_victor"]);
  });

  it("excludes models that scored zero even if within 10%", () => {
    const ranked = rankScores(rawOf({ penal_substitution: 1 }));
    // only one model has any points
    expect(blendMembers(ranked)).toEqual(["penal_substitution"]);
  });
});

describe("evaluateQuiz end-to-end", () => {
  it("yields a single dedicated result for a decisive penal pattern", () => {
    const answers: AnswerMap = {
      q1: "q1a",
      q2: "q2a",
      q3: "q3a",
      q4: "q4a",
      q5: "q5a",
      q6: "q6a",
      q7: "q7a",
    };
    const result = evaluateQuiz(answers, "short");
    expect(result.kind).toBe("single");
    expect(result.topId).toBe("penal_substitution");
    expect(result.answered).toBe(7);
    expect(result.total).toBe(7);
  });

  it("produces the curated Victor–Ransom blend when those two tie", () => {
    const answers: AnswerMap = {
      q1: "q1b",
      q2: "q2b",
      q3: "q3b",
      q4: "q4b",
      q5: "q5d",
      q6: "q6c",
      q7: "q7c",
    };
    const result = evaluateQuiz(answers, "short");
    expect(result.kind).toBe("blend");
    expect(result.blend?.members).toEqual(["christus_victor", "ransom"]);
    expect(result.blend?.name).toBe("The Victor–Ransom Blend");
  });

  it("handles an empty answer set without throwing", () => {
    const result = evaluateQuiz({}, "short");
    expect(result.kind).toBe("single");
    expect(result.answered).toBe(0);
    expect(result.ranked).toHaveLength(THEORY_IDS.length);
  });
});

describe("blend construction", () => {
  it("names a three-way result the Kaleidoscopic View", () => {
    const blend = buildBlend(["penal_substitution", "christus_victor", "moral_influence"]);
    expect(blend.name).toBe("The Kaleidoscopic View");
    expect(blend.members).toHaveLength(3);
    expect(blend.crossPollination.length).toBeGreaterThan(0);
  });

  it("falls back to a generated name for an uncurated pair", () => {
    const blend = buildBlend(["governmental", "scapegoat"]);
    expect(blend.name).toMatch(/Blend$/);
    expect(blend.crossPollination).toContain("Governmental");
  });
});
