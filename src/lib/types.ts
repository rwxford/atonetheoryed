/**
 * Core type definitions for the Theories of Atonement application.
 *
 * The data model is intentionally strict so that the question dataset, the
 * scoring weights, and the result schema are all checked at compile time.
 */

/** Stable identifiers for the nine atonement models covered by this project. */
export type TheoryId =
  | "penal_substitution"
  | "christus_victor"
  | "moral_influence"
  | "satisfaction"
  | "governmental"
  | "recapitulation"
  | "participatory"
  | "ransom"
  | "scapegoat";

/** The full, ordered list of theory ids. Single source of truth for iteration. */
export const THEORY_IDS: readonly TheoryId[] = [
  "penal_substitution",
  "christus_victor",
  "moral_influence",
  "satisfaction",
  "governmental",
  "recapitulation",
  "participatory",
  "ransom",
  "scapegoat",
] as const;

/** Kind of external reference, used purely for labelling in the UI. */
export type ResourceKind = "encyclopedia" | "primary" | "academic" | "reference";

/** A verified, navigable external source. */
export interface Resource {
  label: string;
  url: string;
  kind: ResourceKind;
  author?: string;
  year?: string;
}

/** A scripture reference with an optional, neutral note on how it is cited. */
export interface ScriptureRef {
  ref: string;
  note?: string;
}

/**
 * A single atonement model. Strengths and critiques are written as *attributed*,
 * descriptive statements (what proponents/critics argue) to preserve neutrality.
 */
export interface Theory {
  id: TheoryId;
  name: string;
  /** Short token used when composing blend names, e.g. "Penal". */
  shortName: string;
  aka: string[];
  era: string;
  figures: string[];
  traditions: string[];
  /** One- to two-sentence neutral summary. */
  summary: string;
  /** Fuller neutral description of the model. */
  description: string;
  /** The mechanism the model foregrounds (its "engine"). */
  emphasis: string;
  /** Points commonly argued in its favour (attributed to proponents). */
  strengths: string[];
  /** Points commonly raised against it (attributed to critics). */
  critiques: string[];
  scripture: ScriptureRef[];
  resources: Resource[];
  /** Hex accent drawn from the project palette (see globals.css). */
  accentHex: string;
  /** Human-readable palette colour name. */
  colorName: string;
}

/** Quiz depth. */
export type QuizMode = "short" | "deep";

/** A partial map of theory -> integer points awarded by an answer choice. */
export type Weights = Partial<Record<TheoryId, number>>;

/** A single answer choice. Selecting it adds its `weights` to the running tally. */
export interface QuizOption {
  id: string;
  label: string;
  weights: Weights;
}

/** A quiz question. `modes` controls which depths include the question. */
export interface Question {
  id: string;
  modes: QuizMode[];
  prompt: string;
  helper?: string;
  options: QuizOption[];
}

/** Map of questionId -> selected optionId. */
export type AnswerMap = Record<string, string>;

/** A theory's computed score. */
export interface TheoryScore {
  id: TheoryId;
  raw: number;
  /** Percentage of total points (0–100). 0 when no points were awarded. */
  percent: number;
}

export type ResultKind = "single" | "blend";

/** Describes a blended/hybrid outcome. */
export interface BlendInfo {
  /** e.g. "The Penal–Victor Blend" or "The Kaleidoscopic View". */
  name: string;
  members: TheoryId[];
  /** Neutral description of how the member models cross-pollinate. */
  crossPollination: string;
}

/** The full result returned by the engine. */
export interface QuizResult {
  kind: ResultKind;
  /** All theories, sorted by raw score descending. */
  ranked: TheoryScore[];
  topId: TheoryId;
  /** The percentage-point threshold used for the blend rule. */
  thresholdPercent: number;
  /** Present only when `kind === "blend"`. */
  blend?: BlendInfo;
  /** Number of questions answered. */
  answered: number;
  /** Total questions presented for the chosen mode. */
  total: number;
}
