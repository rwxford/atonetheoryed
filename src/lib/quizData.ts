import type { Question, QuizMode } from "./types";

/**
 * Question dataset for both quiz depths.
 *
 *  - SHORT mode (7 questions): high-level archetypal questions that map core
 *    theological instincts. Every short question is tagged `["short", "deep"]`.
 *  - DEEP mode (18 questions): the seven short questions plus eleven deep-only
 *    questions tagged `["deep"]` that track scriptural emphases, historical
 *    voices, and sub-facets of divine attributes.
 *
 * Each option distributes integer weights across one to three theories, so a
 * single choice can express a blended instinct (the "synergistic" weighting).
 * Weights are kept small (1–3) and deliberately overlapping so that every model
 * remains reachable as a top result.
 */
export const questions: Question[] = [
  // ----------------------------- SHORT + DEEP -----------------------------
  {
    id: "q1",
    modes: ["short", "deep"],
    prompt: "What was most fundamentally wrong that the atonement had to address?",
    options: [
      {
        id: "q1a",
        label: "Humanity stood guilty before a just law and the penalty had to be resolved.",
        weights: { penal_substitution: 2, satisfaction: 1 },
      },
      {
        id: "q1b",
        label: "Humanity was held captive by powers — sin, death, evil — and needed liberation.",
        weights: { christus_victor: 2, ransom: 2 },
      },
      {
        id: "q1c",
        label: "Humanity was estranged and hard-hearted, needing to be moved and changed.",
        weights: { moral_influence: 2, participatory: 1 },
      },
      {
        id: "q1d",
        label: "Human nature itself was broken at the root and needed to be healed and remade.",
        weights: { recapitulation: 2, participatory: 1 },
      },
    ],
  },
  {
    id: "q2",
    modes: ["short", "deep"],
    prompt: "Above all, the cross reveals…",
    options: [
      { id: "q2a", label: "God's justice meeting sin.", weights: { penal_substitution: 2, governmental: 1 } },
      { id: "q2b", label: "God's victory over the forces of evil.", weights: { christus_victor: 2 } },
      { id: "q2c", label: "God's self-giving love.", weights: { moral_influence: 2 } },
      { id: "q2d", label: "God exposing and ending human violence.", weights: { scapegoat: 2 } },
    ],
  },
  {
    id: "q3",
    modes: ["short", "deep"],
    prompt: "Which image resonates most strongly?",
    options: [
      {
        id: "q3a",
        label: "A courtroom where a debt of justice is paid.",
        weights: { penal_substitution: 2, satisfaction: 2 },
      },
      {
        id: "q3b",
        label: "A battlefield where the captor is defeated and prisoners are freed.",
        weights: { christus_victor: 2, ransom: 2 },
      },
      {
        id: "q3c",
        label: "A physician healing a patient — a new Adam restoring the race.",
        weights: { recapitulation: 2, participatory: 1 },
      },
      {
        id: "q3d",
        label: "A mirror held up to a mob, revealing the innocence of its victim.",
        weights: { scapegoat: 2 },
      },
    ],
  },
  {
    id: "q4",
    modes: ["short", "deep"],
    prompt: "Salvation is best described as…",
    options: [
      { id: "q4a", label: "Acquittal — being declared right with God.", weights: { penal_substitution: 2 } },
      {
        id: "q4b",
        label: "Liberation — being set free from bondage.",
        weights: { ransom: 2, christus_victor: 1 },
      },
      { id: "q4c", label: "Union — being joined to God's own life.", weights: { participatory: 2 } },
      {
        id: "q4d",
        label: "Transformation — being inwardly changed by love.",
        weights: { moral_influence: 2 },
      },
    ],
  },
  {
    id: "q5",
    modes: ["short", "deep"],
    prompt: "How do you understand God's relationship to the suffering of the cross?",
    options: [
      {
        id: "q5a",
        label: "God required that sin's penalty be borne.",
        weights: { penal_substitution: 2 },
      },
      {
        id: "q5b",
        label: "God upheld the moral order of the universe through a public act.",
        weights: { governmental: 2, satisfaction: 1 },
      },
      {
        id: "q5c",
        label: "God absorbed and overcame human violence rather than requiring it.",
        weights: { scapegoat: 2, moral_influence: 1 },
      },
      {
        id: "q5d",
        label: "God entered our condition to defeat death from within.",
        weights: { christus_victor: 1, recapitulation: 1, participatory: 1 },
      },
    ],
  },
  {
    id: "q6",
    modes: ["short", "deep"],
    prompt: "Which biblical note rings loudest for you?",
    options: [
      {
        id: "q6a",
        label: "“He was pierced for our transgressions.” (Isaiah 53)",
        weights: { penal_substitution: 2, satisfaction: 1 },
      },
      {
        id: "q6b",
        label: "“Disarming the powers… triumphing over them.” (Colossians 2)",
        weights: { christus_victor: 2 },
      },
      { id: "q6c", label: "“A ransom for many.” (Mark 10:45)", weights: { ransom: 2 } },
      {
        id: "q6d",
        label: "“That they may be one… in us.” (John 17)",
        weights: { participatory: 2 },
      },
    ],
  },
  {
    id: "q7",
    modes: ["short", "deep"],
    prompt: "The chief result of the atonement is…",
    options: [
      {
        id: "q7a",
        label: "A restored order and the honor due to God.",
        weights: { satisfaction: 2, governmental: 1 },
      },
      {
        id: "q7b",
        label: "A people freed to follow Christ's example of love.",
        weights: { moral_influence: 2 },
      },
      {
        id: "q7c",
        label: "A humanity remade in Christ, the new Adam.",
        weights: { recapitulation: 2 },
      },
      {
        id: "q7d",
        label: "A cosmos reconciled as Christ reigns victorious.",
        weights: { christus_victor: 2 },
      },
    ],
  },

  // ------------------------------- DEEP ONLY ------------------------------
  {
    id: "q8",
    modes: ["deep"],
    prompt: "When Scripture speaks of a 'price' or 'debt', it is best understood as…",
    helper: "A question about the direction and meaning of the transaction.",
    options: [
      {
        id: "q8a",
        label: "A penalty satisfied before God's justice and law.",
        weights: { penal_substitution: 2 },
      },
      { id: "q8b", label: "A debt of honor restored to God.", weights: { satisfaction: 2 } },
      {
        id: "q8c",
        label: "A ransom that frees captives from death and the devil.",
        weights: { ransom: 2, christus_victor: 1 },
      },
      {
        id: "q8d",
        label: "Not central — the real issue is healing or revelation, not a price.",
        weights: { recapitulation: 1, moral_influence: 1, scapegoat: 1 },
      },
    ],
  },
  {
    id: "q9",
    modes: ["deep"],
    prompt: "How are divine justice and mercy related in the atonement?",
    options: [
      {
        id: "q9a",
        label: "Justice must be fully satisfied for mercy to be extended.",
        weights: { penal_substitution: 2, satisfaction: 1 },
      },
      {
        id: "q9b",
        label: "God upholds public justice without exacting the exact penalty.",
        weights: { governmental: 2 },
      },
      {
        id: "q9c",
        label: "Mercy transforms us; the language of 'justice' is secondary.",
        weights: { moral_influence: 2 },
      },
      {
        id: "q9d",
        label: "Justice is restorative — setting right and healing.",
        weights: { recapitulation: 1, participatory: 1, scapegoat: 1 },
      },
    ],
  },
  {
    id: "q10",
    modes: ["deep"],
    prompt: "The incarnation (God becoming human) is…",
    options: [
      {
        id: "q10a",
        label: "Necessary so that a fitting substitute could bear the penalty.",
        weights: { penal_substitution: 1, satisfaction: 1 },
      },
      {
        id: "q10b",
        label: "Already saving in itself — God uniting humanity to God in Christ.",
        weights: { participatory: 2, recapitulation: 1 },
      },
      {
        id: "q10c",
        label: "The new Adam retracing and reversing human history.",
        weights: { recapitulation: 2 },
      },
      {
        id: "q10d",
        label: "God entering the arena to defeat the powers.",
        weights: { christus_victor: 2 },
      },
    ],
  },
  {
    id: "q11",
    modes: ["deep"],
    prompt: "The resurrection is primarily…",
    options: [
      {
        id: "q11a",
        label: "Vindication that the penalty was fully paid.",
        weights: { penal_substitution: 2 },
      },
      {
        id: "q11b",
        label: "The decisive moment of victory over death.",
        weights: { christus_victor: 2, ransom: 1 },
      },
      {
        id: "q11c",
        label: "The firstfruits of a humanity remade and deified.",
        weights: { participatory: 2, recapitulation: 1 },
      },
      {
        id: "q11d",
        label: "Confirmation of the love that calls us to new life.",
        weights: { moral_influence: 2 },
      },
    ],
  },
  {
    id: "q12",
    modes: ["deep"],
    prompt: "Human sin is best framed as…",
    options: [
      { id: "q12a", label: "Guilt and the transgression of law.", weights: { penal_substitution: 2 } },
      {
        id: "q12b",
        label: "An offense against God's honor and the right order of things.",
        weights: { satisfaction: 2 },
      },
      {
        id: "q12c",
        label: "Bondage and captivity.",
        weights: { ransom: 2, christus_victor: 1 },
      },
      {
        id: "q12d",
        label: "A sickness or corruption of nature to be healed.",
        weights: { recapitulation: 1, participatory: 1 },
      },
    ],
  },
  {
    id: "q13",
    modes: ["deep"],
    prompt: "Human violence and victimhood at the cross most clearly…",
    options: [
      {
        id: "q13a",
        label: "Show the innocent victim exposing the scapegoat mechanism.",
        weights: { scapegoat: 3 },
      },
      {
        id: "q13b",
        label: "Show the powers of evil overreaching and being defeated.",
        weights: { christus_victor: 2 },
      },
      {
        id: "q13c",
        label: "Show a love so deep it absorbs wrongdoing.",
        weights: { moral_influence: 2 },
      },
      {
        id: "q13d",
        label: "Show the penalty for sin being borne.",
        weights: { penal_substitution: 2 },
      },
    ],
  },
  {
    id: "q14",
    modes: ["deep"],
    prompt: "The Day of Atonement and Israel's sacrificial imagery are…",
    options: [
      {
        id: "q14a",
        label: "Fulfilled as Christ bears the penalty in our place.",
        weights: { penal_substitution: 2, satisfaction: 1 },
      },
      {
        id: "q14b",
        label: "Reframed — Christ unveils and ends sacrificial violence.",
        weights: { scapegoat: 3 },
      },
      {
        id: "q14c",
        label: "Taken up into Christ's victory and our liberation.",
        weights: { christus_victor: 1, ransom: 1 },
      },
      {
        id: "q14d",
        label: "Read as cleansing and healing that restore communion.",
        weights: { participatory: 1, recapitulation: 1 },
      },
    ],
  },
  {
    id: "q15",
    modes: ["deep"],
    prompt: "Ongoing transformation (sanctification) relates to the atonement as…",
    options: [
      {
        id: "q15a",
        label: "The fruit of being declared righteous.",
        weights: { penal_substitution: 1, satisfaction: 1 },
      },
      {
        id: "q15b",
        label: "Its very heart — participation in the divine life.",
        weights: { participatory: 3 },
      },
      {
        id: "q15c",
        label: "Its goal — being conformed to Christ's example of love.",
        weights: { moral_influence: 2 },
      },
      {
        id: "q15d",
        label: "Sharing in Christ's victory, walking free of bondage.",
        weights: { christus_victor: 1, ransom: 1 },
      },
    ],
  },
  {
    id: "q16",
    modes: ["deep"],
    prompt: "Which historical voice do you find most compelling?",
    options: [
      {
        id: "q16a",
        label: "Anselm — on honor, debt, and fittingness.",
        weights: { satisfaction: 2 },
      },
      {
        id: "q16b",
        label: "Irenaeus — on recapitulation in the new Adam.",
        weights: { recapitulation: 2 },
      },
      {
        id: "q16c",
        label: "Athanasius and the Greek Fathers — on union and deification.",
        weights: { participatory: 2 },
      },
      {
        id: "q16d",
        label: "The Reformers — on justification and penal substitution.",
        weights: { penal_substitution: 2 },
      },
    ],
  },
  {
    id: "q17",
    modes: ["deep"],
    prompt: "Which concern most shapes your view?",
    options: [
      {
        id: "q17a",
        label: "Upholding the seriousness of divine law and justice.",
        weights: { penal_substitution: 1, governmental: 1, satisfaction: 1 },
      },
      {
        id: "q17b",
        label: "Affirming God's non-violence and a critique of scapegoating.",
        weights: { scapegoat: 2, moral_influence: 1 },
      },
      {
        id: "q17c",
        label: "Keeping incarnation and resurrection central, not only the cross.",
        weights: { recapitulation: 1, participatory: 1, christus_victor: 1 },
      },
      {
        id: "q17d",
        label: "Centering liberation from everything that enslaves.",
        weights: { ransom: 2, christus_victor: 1 },
      },
    ],
  },
  {
    id: "q18",
    modes: ["deep"],
    prompt: "If you had to name the 'engine' of the atonement, it is…",
    options: [
      {
        id: "q18a",
        label: "Substitution — Christ in our place.",
        weights: { penal_substitution: 2, satisfaction: 1 },
      },
      {
        id: "q18b",
        label: "Victory — Christ over the powers.",
        weights: { christus_victor: 2, ransom: 1 },
      },
      {
        id: "q18c",
        label: "Participation — Christ uniting us to God.",
        weights: { participatory: 2, recapitulation: 1 },
      },
      {
        id: "q18d",
        label: "Revelation — Christ disclosing love and unveiling violence.",
        weights: { moral_influence: 2, scapegoat: 1 },
      },
    ],
  },
];

/** Returns the questions that belong to the requested mode, in order. */
export function getQuestions(mode: QuizMode): Question[] {
  return questions.filter((q) => q.modes.includes(mode));
}

/** Question counts per mode (computed once). */
export const QUESTION_COUNTS: Record<QuizMode, number> = {
  short: getQuestions("short").length,
  deep: getQuestions("deep").length,
};
