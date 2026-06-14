import type {
  AnswerMap,
  Question,
  QuizMode,
  QuizResult,
  TheoryId,
  TheoryScore,
} from "./types";
import { THEORY_IDS } from "./types";
import { getQuestions } from "./quizData";
import { buildBlend } from "./blends";

/**
 * The Blended-Hybrid threshold, in **percentage points** of the total score.
 *
 * Rule: the top model and every other model whose normalized score is within
 * this many points of the top are treated as a blend. If the top model clears
 * all others by at least this margin, a single dedicated result is rendered.
 */
export const BLEND_THRESHOLD_PERCENT = 10;

/**
 * Sum the weights of the selected options into a raw score per theory.
 * Every theory is represented, defaulting to 0.
 */
export function computeRawScores(
  answers: AnswerMap,
  questions: Question[],
): Record<TheoryId, number> {
  const raw = Object.fromEntries(
    THEORY_IDS.map((id) => [id, 0]),
  ) as Record<TheoryId, number>;

  for (const question of questions) {
    const chosenId = answers[question.id];
    if (!chosenId) continue;
    const option = question.options.find((o) => o.id === chosenId);
    if (!option) continue;
    for (const [theory, points] of Object.entries(option.weights)) {
      raw[theory as TheoryId] += points ?? 0;
    }
  }

  return raw;
}

/**
 * Convert raw scores to a ranked list with each theory's percentage of the
 * total points. Sorted by raw score descending; ties broken by the canonical
 * theory order so results are deterministic.
 */
export function rankScores(raw: Record<TheoryId, number>): TheoryScore[] {
  const total = THEORY_IDS.reduce((sum, id) => sum + raw[id], 0);
  const orderIndex = (id: TheoryId) => THEORY_IDS.indexOf(id);

  return THEORY_IDS.map((id) => ({
    id,
    raw: raw[id],
    percent: total > 0 ? (raw[id] / total) * 100 : 0,
  })).sort((a, b) => b.raw - a.raw || orderIndex(a.id) - orderIndex(b.id));
}

/**
 * Determine which theories belong to the blend: the top model plus every model
 * that (a) scored at least one point and (b) is within `threshold` percentage
 * points of the top model.
 */
export function blendMembers(
  ranked: TheoryScore[],
  threshold = BLEND_THRESHOLD_PERCENT,
): TheoryId[] {
  if (ranked.length === 0) return [];
  const top = ranked[0];
  if (top.raw === 0) return [top.id];
  return ranked
    .filter((s) => s.raw > 0 && top.percent - s.percent < threshold)
    .map((s) => s.id);
}

/**
 * The full evaluation: raw scores -> ranking -> blend rule -> result schema.
 *
 * @param answers   map of questionId -> selected optionId
 * @param mode      quiz depth (controls which questions/totals apply)
 * @param threshold optional override for the blend threshold (percentage points)
 */
export function evaluateQuiz(
  answers: AnswerMap,
  mode: QuizMode,
  threshold = BLEND_THRESHOLD_PERCENT,
): QuizResult {
  const questions = getQuestions(mode);
  const raw = computeRawScores(answers, questions);
  const ranked = rankScores(raw);
  const members = blendMembers(ranked, threshold);
  const answered = questions.filter((q) => Boolean(answers[q.id])).length;

  const base = {
    ranked,
    topId: ranked[0]?.id ?? THEORY_IDS[0],
    thresholdPercent: threshold,
    answered,
    total: questions.length,
  };

  if (members.length >= 2) {
    return { ...base, kind: "blend", blend: buildBlend(members) };
  }
  return { ...base, kind: "single" };
}
