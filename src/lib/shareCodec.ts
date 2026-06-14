import type { AnswerMap, QuizMode } from "./types";
import { getQuestions } from "./quizData";

/**
 * Stateless share codec.
 *
 * A completed quiz is encoded into a short, URL-path-safe string that fully
 * describes the result, so a shared link needs no server or database. The code
 * records, per question (in canonical `getQuestions(mode)` order), which option
 * the user picked; decoding re-runs the same scoring engine.
 *
 * Format (version 1): `"1" + mode + body`
 *   - version : single char, currently `"1"`.
 *   - mode    : `"s"` (short) | `"d"` (deep).
 *   - body    : one char per question, in order — `"a".."z"` = the chosen
 *               option's 0-based index for that question, or `"-"` when
 *               unanswered.
 *
 * Stability contract: question ids/order and per-question option order are
 * **append-only**. Existing questions must never be reordered (nor their
 * options), or old links would decode to a different result. Breaking changes
 * bump {@link SHARE_CODE_VERSION} (keep a frozen evaluator for prior versions).
 */

export const SHARE_CODE_VERSION = "1";

const MODE_TO_CHAR: Record<QuizMode, string> = { short: "s", deep: "d" };
const CHAR_TO_MODE: Record<string, QuizMode> = { s: "short", d: "deep" };

const UNANSWERED = "-";
const LETTER_A = 97; // char code for "a"

const indexToChar = (index: number): string => String.fromCharCode(LETTER_A + index);
const charToIndex = (ch: string): number => ch.charCodeAt(0) - LETTER_A;

/** Encode a (possibly partial) answer set for `mode` into a share code. */
export function encodeShareCode(answers: AnswerMap, mode: QuizMode): string {
  let body = "";
  for (const q of getQuestions(mode)) {
    const chosen = answers[q.id];
    const idx = chosen ? q.options.findIndex((o) => o.id === chosen) : -1;
    body += idx >= 0 && idx < 26 ? indexToChar(idx) : UNANSWERED;
  }
  return `${SHARE_CODE_VERSION}${MODE_TO_CHAR[mode]}${body}`;
}

export interface DecodedShare {
  mode: QuizMode;
  answers: AnswerMap;
}

/**
 * Decode a share code back into a mode + answer map. Returns `null` only when
 * the code is structurally invalid (bad version or mode). Unknown/garbled body
 * characters and length mismatches degrade gracefully: affected questions are
 * treated as unanswered, so the engine still produces a sane result.
 */
export function decodeShareCode(code: string): DecodedShare | null {
  if (typeof code !== "string" || code.length < 2) return null;
  if (code[0] !== SHARE_CODE_VERSION) return null;
  const mode = CHAR_TO_MODE[code[1]];
  if (!mode) return null;

  const questions = getQuestions(mode);
  const body = code.slice(2);
  const answers: AnswerMap = {};

  for (let i = 0; i < questions.length; i++) {
    const ch = body[i];
    if (!ch || ch === UNANSWERED) continue;
    const option = questions[i].options[charToIndex(ch)];
    if (option) answers[questions[i].id] = option.id;
  }

  return { mode, answers };
}
