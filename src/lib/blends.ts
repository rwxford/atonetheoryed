import type { BlendInfo, TheoryId } from "./types";
import { getTheory } from "./theoriesData";

/**
 * Curated, neutral descriptions of how specific pairs of models cross-pollinate.
 *
 * Keys are the two theory ids sorted alphabetically and joined with "+", so the
 * lookup is order-independent. Any pair without a curated entry falls back to a
 * generated description built from each model's `emphasis`.
 */
const pairKey = (a: TheoryId, b: TheoryId): string => [a, b].sort().join("+");

interface PairText {
  /** Optional bespoke blend name; otherwise a name is generated. */
  name?: string;
  text: string;
}

const CURATED_PAIRS: Record<string, PairText> = {
  [pairKey("penal_substitution", "christus_victor")]: {
    name: "The Penal–Victor Blend",
    text: "These models are frequently held together: the penalty borne on the cross is, at the same time, the defeat of sin, death, and the powers. Many theologians read substitution and victory as two facets of one event — justice satisfied *and* captives freed.",
  },
  [pairKey("penal_substitution", "satisfaction")]: {
    name: "The Penal–Satisfaction Blend",
    text: "Closely related Western models. Penal substitution is often described as a development of Anselm's satisfaction: where Anselm speaks of honor and debt, the penal model speaks of law and penalty. Both locate the decisive 'work' as something rendered to God.",
  },
  [pairKey("christus_victor", "ransom")]: {
    name: "The Victor–Ransom Blend",
    text: "Historically grouped together as the 'classic' family (so Aulén). Ransom supplies the imagery of a costly price that liberates captives; Christus Victor supplies the wider drama of triumph over the powers that held them.",
  },
  [pairKey("recapitulation", "participatory")]: {
    name: "The Recapitulation–Participatory Blend",
    text: "A deeply patristic pairing. The incarnate Son retraces and heals human nature (recapitulation) so that humanity may share, by grace, in the divine life (theosis). Renewal of nature and union with God reinforce one another.",
  },
  [pairKey("moral_influence", "scapegoat")]: {
    name: "The Moral–Scapegoat Blend",
    text: "Both foreground what the cross discloses and the change it works in us. Moral influence stresses the revelation of love; the Girardian reading stresses the unmasking of violence. Together they read the cross as a transforming, non-violent revelation.",
  },
  [pairKey("moral_influence", "participatory")]: {
    name: "The Moral–Participatory Blend",
    text: "Two models that center the change worked in humanity: being moved by love (moral influence) and being united to God's life (participation). Transformation by example flows into transformation by union.",
  },
  [pairKey("christus_victor", "recapitulation")]: {
    name: "The Victor–Recapitulation Blend",
    text: "Victory over death is accomplished precisely through the incarnate new Adam. Recapitulation explains *how* the victory reaches human nature: by being lived out and reversed from within.",
  },
  [pairKey("governmental", "satisfaction")]: {
    name: "The Satisfaction–Governmental Blend",
    text: "Both are concerned to uphold justice and order. The governmental model modifies satisfaction: rather than an exact debt repaid, the cross is a public demonstration that secures God's moral government while leaving room for mercy.",
  },
  [pairKey("christus_victor", "participatory")]: {
    name: "The Participatory–Victor Blend",
    text: "An Eastern synthesis: believers are united to the victorious Christ and so share in his triumph and life. Participation supplies the 'how we are included'; victory supplies 'what we are included in'.",
  },
  [pairKey("governmental", "penal_substitution")]: {
    name: "The Penal–Governmental Blend",
    text: "Both are forensic and public. They differ on equivalence — whether Christ bears the exact penalty (penal) or makes a penal example that upholds the law (governmental) — but agree that the cross publicly honors divine justice.",
  },
  [pairKey("christus_victor", "scapegoat")]: {
    name: "The Scapegoat–Victor Blend",
    text: "The unveiling of the scapegoat mechanism is itself a kind of victory: exposing how violence operates strips the 'powers' of their hidden authority. Revelation and triumph converge.",
  },
  [pairKey("penal_substitution", "ransom")]: {
    name: "The Penal–Ransom Blend",
    text: "Both speak of a costly substitution on our behalf. Ransom frames it as a price that liberates from captivity; the penal model frames it as a penalty borne for guilt. The shared instinct is 'Christ in our place, at great cost'.",
  },
};

/**
 * Build a {@link BlendInfo} for a set of two or more theories.
 *
 *  - Two members  -> a named pair blend (curated text when available).
 *  - Three or more -> a "Kaleidoscopic View" that names the members and weaves
 *    their emphases together (anchored by the curated text of the top pair, if any).
 *
 * `members` must be ordered by score (highest first); the first two members are
 * treated as the dominant pair for naming and anchoring.
 */
export function buildBlend(members: TheoryId[]): BlendInfo {
  const [a, b] = members;

  if (members.length === 2) {
    const curated = CURATED_PAIRS[pairKey(a, b)];
    if (curated) {
      return {
        name: curated.name ?? generatedName([a, b]),
        members,
        crossPollination: curated.text,
      };
    }
    return {
      name: generatedName([a, b]),
      members,
      crossPollination: generatedPairText(a, b),
    };
  }

  // Three or more: a kaleidoscopic view.
  const names = members.map((id) => getTheory(id).name);
  const anchor = CURATED_PAIRS[pairKey(a, b)];
  const lead = anchor
    ? `${anchor.text} `
    : `${generatedPairText(a, b)} `;
  const list =
    names.slice(0, -1).join(", ") + ", and " + names[names.length - 1];

  return {
    name: "The Kaleidoscopic View",
    members,
    crossPollination:
      `Several models scored within the blend threshold, suggesting you read the ` +
      `atonement as a many-faceted reality rather than a single mechanism. Your ` +
      `closest models are ${list}. ${lead}` +
      `Held together, they describe one event seen from complementary angles — ` +
      `${members
        .map((id) => `${getTheory(id).shortName.toLowerCase()} (${lowerFirst(getTheory(id).emphasis)})`)
        .join("; ")}.`,
  };
}

/** "The Penal–Victor Blend" from two theory short names. */
function generatedName(members: TheoryId[]): string {
  return `The ${members.map((id) => getTheory(id).shortName).join("–")} Blend`;
}

/** Fallback cross-pollination text for an uncurated pair. */
function generatedPairText(a: TheoryId, b: TheoryId): string {
  const ta = getTheory(a);
  const tb = getTheory(b);
  return (
    `Your top two models scored within the blend threshold of each other. ` +
    `${ta.name} emphasizes ${lowerFirst(ta.emphasis)} while ${tb.name} ` +
    `emphasizes ${lowerFirst(tb.emphasis)} Read together, they frame the cross ` +
    `as a single event approached from two complementary angles.`
  );
}

function lowerFirst(s: string): string {
  return s.length ? s[0].toLowerCase() + s.slice(1) : s;
}
