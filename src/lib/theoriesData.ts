import type { Theory, TheoryId } from "./types";

/**
 * The core data matrix: nine historic models of the atonement.
 *
 * EDITORIAL POLICY (neutrality guardrail):
 *  - `summary`, `description`, and `emphasis` are descriptive, not evaluative.
 *  - `strengths` are written as claims *proponents* make.
 *  - `critiques` are written as concerns *critics* raise.
 *  - No model is presented as "correct" or "superior".
 *
 * SOURCES: links were curated toward stable, authoritative references — the
 * Stanford Encyclopedia of Philosophy, Wikipedia survey articles, and the
 * Wikipedia pages of primary authors (with the primary work + date named in the
 * label). Bibliographic citations (author, work, year) are facts independent of
 * any single URL and should be the anchor if a link ever moves.
 */

const SEP_ATONEMENT = {
  label: "Stanford Encyclopedia of Philosophy — “Atonement” (J. C. Thurow)",
  url: "https://plato.stanford.edu/entries/atonement/",
  kind: "encyclopedia" as const,
  author: "Joshua C. Thurow",
  year: "2023",
};

export const theories: Theory[] = [
  {
    id: "penal_substitution",
    name: "Penal Substitution",
    shortName: "Penal",
    aka: ["Penal Substitutionary Atonement", "PSA", "Forensic substitution"],
    era: "Reformation (16th c.) and after, building on medieval satisfaction",
    figures: ["John Calvin", "Reformation and later Reformed/Evangelical theologians"],
    traditions: ["Reformed", "Evangelical Protestant", "much of conservative Protestantism"],
    summary:
      "Christ bears, in the place of sinners, the legal penalty that human sin incurs, so that divine justice is satisfied and forgiveness is extended.",
    description:
      "On this model, sin is a transgression of God's law that justly deserves punishment. Christ, as a willing substitute representing those he saves, receives that penalty in their place. With justice met, God can justify (declare righteous) the guilty without setting the law aside.",
    emphasis: "Legal/forensic substitution — penalty, guilt, and justification.",
    strengths: [
      "Proponents argue it takes the gravity of sin and the demands of divine justice with full seriousness.",
      "It is said to fit the forensic and sacrificial vocabulary of texts such as Isaiah 53 and Romans 3.",
      "Supporters value the assurance it grounds in an objective, finished accomplishment.",
    ],
    critiques: [
      "Critics worry it can imply a division of will within the Trinity (the Father punishing the Son).",
      "Some object that it risks portraying God as requiring violence before forgiving.",
      "Others argue it can foreground legal categories at the expense of relational and transformative ones.",
    ],
    scripture: [
      { ref: "Isaiah 53:4–6", note: "Suffering Servant 'pierced for our transgressions'." },
      { ref: "Romans 3:23–26", note: "God just and the justifier; propitiation/atonement." },
      { ref: "2 Corinthians 5:21", note: "'Made him to be sin for us.'" },
      { ref: "Galatians 3:13", note: "'Christ redeemed us from the curse of the law.'" },
      { ref: "1 Peter 2:24", note: "'He himself bore our sins in his body on the tree.'" },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Penal substitution",
        url: "https://en.wikipedia.org/wiki/Penal_substitution",
        kind: "reference",
      },
      {
        label: "John Calvin, Institutes of the Christian Religion (1559), Book II",
        url: "https://en.wikipedia.org/wiki/Institutes_of_the_Christian_Religion",
        kind: "primary",
        author: "John Calvin",
        year: "1559",
      },
    ],
    accentHex: "#8d1b1b",
    colorName: "Crimson",
  },

  {
    id: "christus_victor",
    name: "Christus Victor",
    shortName: "Victor",
    aka: ["Classic view", "Dramatic view", "Conflict-and-victory"],
    era: "Patristic era; named and revived in the 20th c. by Gustaf Aulén (1931)",
    figures: ["Early Greek Fathers", "Gustaf Aulén (modern synthesis)"],
    traditions: ["Eastern Orthodoxy", "Early church", "Widely retrieved in modern theology"],
    summary:
      "In his death and resurrection Christ confronts and defeats the hostile powers — sin, death, and the devil — liberating humanity and reconciling the world to God.",
    description:
      "Atonement is portrayed as a cosmic drama of conflict and triumph. Gustaf Aulén argued that this 'classic' motif, in which God in Christ overcomes the powers that hold humanity in bondage, was the dominant view of the early church and the New Testament.",
    emphasis: "Victory and liberation over hostile powers; continuous divine action.",
    strengths: [
      "Proponents highlight that it keeps the resurrection and the cosmic scope of salvation central.",
      "Aulén argued it best reflects the New Testament's language of conflict and victory.",
      "It presents atonement as God's own continuous act from start to finish.",
    ],
    critiques: [
      "Critics note it can be less precise about *how* the victory is achieved (the mechanism).",
      "Some observe that the tidy 'classic' packaging is itself a modern (Aulén) reconstruction.",
    ],
    scripture: [
      { ref: "Colossians 2:13–15", note: "'Disarmed the rulers… triumphing over them.'" },
      { ref: "Hebrews 2:14–15", note: "Destroying the one who holds the power of death." },
      { ref: "1 Corinthians 15:54–57", note: "'Death is swallowed up in victory.'" },
      { ref: "1 John 3:8", note: "'To destroy the works of the devil.'" },
      { ref: "John 12:31", note: "'Now the ruler of this world will be cast out.'" },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Christus Victor",
        url: "https://en.wikipedia.org/wiki/Christus_Victor",
        kind: "reference",
      },
      {
        label: "Gustaf Aulén, Christus Victor (1931)",
        url: "https://en.wikipedia.org/wiki/Christus_Victor",
        kind: "primary",
        author: "Gustaf Aulén",
        year: "1931",
      },
    ],
    accentHex: "#917614",
    colorName: "Olive Gold",
  },

  {
    id: "moral_influence",
    name: "Moral Influence / Exemplar",
    shortName: "Moral",
    aka: ["Exemplarist view", "Subjective view"],
    era: "Medieval (Abelard, 1079–1142); prominent again in modern theology",
    figures: ["Peter Abelard", "Later: Hastings Rashdall; Friedrich Schleiermacher (subjective emphasis)"],
    traditions: ["Liberal Protestant", "Various modern movements"],
    summary:
      "Christ's life and death supremely demonstrate God's love, awakening a transforming response of love, repentance, and moral renewal in human beings.",
    description:
      "On this 'subjective' model the cross primarily effects change in us rather than in God: by revealing the depth of divine love it draws out repentance and conforms believers to Christ's example. It is classically associated with Peter Abelard.",
    emphasis: "Subjective transformation — revelation of love and moral example.",
    strengths: [
      "Proponents stress that it foregrounds God's love and concrete ethical transformation.",
      "It avoids depicting God as needing to be appeased before loving humanity.",
    ],
    critiques: [
      "Critics argue it can underdetermine what the cross objectively accomplishes about sin.",
      "Some hold that example alone does not address guilt or the power of sin.",
    ],
    scripture: [
      { ref: "Romans 5:8", note: "'God shows his love… while we were still sinners.'" },
      { ref: "John 13:34–35", note: "A new commandment to love as Christ loved." },
      { ref: "1 Peter 2:21", note: "Christ 'leaving you an example.'" },
      { ref: "1 John 4:9–11", note: "Divine love shown so that we love one another." },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Moral influence theory of atonement",
        url: "https://en.wikipedia.org/wiki/Moral_influence_theory_of_atonement",
        kind: "reference",
      },
      {
        label: "Peter Abelard, Commentary on Romans (c. 1135)",
        url: "https://en.wikipedia.org/wiki/Peter_Abelard",
        kind: "primary",
        author: "Peter Abelard",
        year: "c. 1135",
      },
    ],
    accentHex: "#8a9a7b",
    colorName: "Sage",
  },

  {
    id: "satisfaction",
    name: "Satisfaction",
    shortName: "Satisfaction",
    aka: ["Anselmian satisfaction", "Honor/debt model"],
    era: "Medieval (Anselm, Cur Deus Homo, c. 1098)",
    figures: ["Anselm of Canterbury"],
    traditions: ["Roman Catholic (classic formulation)", "Foundational for much Western theology"],
    summary:
      "Sin robs God of the honor due to him and incurs a debt humanity cannot repay; the God-man Christ offers a satisfaction of infinite worth that restores the moral order and makes forgiveness fitting.",
    description:
      "Framed within a medieval order of honor and debt, Anselm argued that sin dishonors God and that only one who is both God and human could render adequate satisfaction. Christ's voluntary, infinitely meritorious self-offering repays the debt, so that mercy and justice are reconciled.",
    emphasis: "Honor, debt, and the restoration of right order (satisfaction, not penalty).",
    strengths: [
      "Proponents admire its rigorous, systematic logic.",
      "Scholars note its deep influence as the seedbed of later Western models.",
    ],
    critiques: [
      "Critics observe its reliance on a feudal honor framework that is culturally located.",
      "Its distinction from penal substitution is sometimes blurred in popular use.",
    ],
    scripture: [
      { ref: "Romans 3:24–26", note: "Redemption and the demonstration of God's righteousness." },
      { ref: "Hebrews 9:11–14", note: "Christ's self-offering cleanses." },
      {
        ref: "Note",
        note: "Anselm argued largely by reason (Cur Deus Homo) rather than by proof-texting.",
      },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Satisfaction theory of atonement",
        url: "https://en.wikipedia.org/wiki/Satisfaction_theory_of_atonement",
        kind: "reference",
      },
      {
        label: "Anselm of Canterbury, Cur Deus Homo (c. 1098)",
        url: "https://en.wikipedia.org/wiki/Anselm_of_Canterbury",
        kind: "primary",
        author: "Anselm of Canterbury",
        year: "c. 1098",
      },
    ],
    accentHex: "#0b1f3b",
    colorName: "Deep Navy",
  },

  {
    id: "governmental",
    name: "Governmental",
    shortName: "Governmental",
    aka: ["Moral government theory", "Rectoral theory"],
    era: "Early modern (Hugo Grotius, 1617); developed in Arminian/Methodist thought",
    figures: ["Hugo Grotius", "Later: Jonathan Edwards Jr.", "John Miley (Methodist)"],
    traditions: ["Arminian", "Methodist", "Many Baptists"],
    summary:
      "Christ's suffering is a public demonstration of God's displeasure at sin that upholds the moral government of the universe, enabling God to forgive without exacting the precise penalty owed.",
    description:
      "Rather than paying an exact equivalent penalty, Christ's death functions as a penal example that maintains the integrity of God's moral government. It shows that sin is serious and law is upheld, while leaving God free to extend mercy.",
    emphasis: "Public demonstration of justice; deterrence; upholding moral order.",
    strengths: [
      "Proponents argue it balances mercy and justice without requiring strict equivalence.",
      "It directly addresses why a just God can righteously forgive.",
    ],
    critiques: [
      "Critics contend it loosens the substitutionary link between Christ's death and specific sins.",
      "Some find the 'demonstration' weaker than a real bearing of penalty.",
    ],
    scripture: [
      { ref: "Isaiah 42:21", note: "God magnifying the law and making it honorable." },
      { ref: "Romans 3:25–26", note: "Read as upholding public justice." },
      { ref: "2 Corinthians 5:14–15", note: "One died for all." },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Governmental theory of atonement",
        url: "https://en.wikipedia.org/wiki/Governmental_theory_of_atonement",
        kind: "reference",
      },
      {
        label: "Hugo Grotius, Defensio fidei catholicae de satisfactione Christi (1617)",
        url: "https://en.wikipedia.org/wiki/Hugo_Grotius",
        kind: "primary",
        author: "Hugo Grotius",
        year: "1617",
      },
    ],
    accentHex: "#5f1d2e",
    colorName: "Burgundy",
  },

  {
    id: "recapitulation",
    name: "Recapitulation",
    shortName: "Recapitulation",
    aka: ["Anakephalaiosis", "New Adam motif"],
    era: "Patristic (Irenaeus, Against Heresies, c. 180)",
    figures: ["Irenaeus of Lyons"],
    traditions: ["Early church (East & West)", "Influential in Orthodoxy and modern theology"],
    summary:
      "Christ 'sums up' and retraces every stage of human life, succeeding where Adam failed, and so heals and renews human nature from within.",
    description:
      "Drawing on Ephesians 1:10 ('to sum up all things in Christ'), Irenaeus held that the incarnate Son recapitulates human existence — obeying where Adam disobeyed — thereby reversing the fall and restoring humanity to communion with God.",
    emphasis: "Reversal of Adam; the incarnation heals and renews human nature.",
    strengths: [
      "Proponents value that it integrates the incarnation and Christ's whole life, not only the cross.",
      "It has strong, early patristic roots.",
    ],
    critiques: [
      "Critics note it can be less explicit about how guilt or penalty is addressed.",
    ],
    scripture: [
      { ref: "Romans 5:12–21", note: "Adam–Christ parallel." },
      { ref: "Ephesians 1:10", note: "'To unite/sum up all things in Christ.'" },
      { ref: "1 Corinthians 15:21–22, 45", note: "Christ the 'last Adam'." },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Recapitulation theory of atonement",
        url: "https://en.wikipedia.org/wiki/Recapitulation_theory_of_atonement",
        kind: "reference",
      },
      {
        label: "Irenaeus of Lyons, Against Heresies (c. 180)",
        url: "https://en.wikipedia.org/wiki/Irenaeus",
        kind: "primary",
        author: "Irenaeus of Lyons",
        year: "c. 180",
      },
    ],
    accentHex: "#2a4d2a",
    colorName: "Forest Green",
  },

  {
    id: "participatory",
    name: "Participatory (Theosis)",
    shortName: "Participatory",
    aka: ["Theosis", "Deification", "Union with Christ"],
    era: "Patristic (Athanasius); central to Orthodoxy; renewed in modern Pauline study",
    figures: ["Athanasius of Alexandria", "The Cappadocians", "Maximus the Confessor"],
    traditions: ["Eastern Orthodoxy", "Increasingly ecumenical"],
    summary:
      "Salvation is participation in the divine life: believers are united to Christ and, by grace, come to share in the divine nature (theosis).",
    description:
      "Often summarized by Athanasius's formula that God became human so that humans might be made divine — by grace, not by nature — this model centers on union with Christ and the Spirit's transforming participation in the life of God.",
    emphasis: "Union and participation; transformation into God's likeness by grace.",
    strengths: [
      "Proponents value that it unites salvation with sanctification and union with God.",
      "It has strong patristic roots and resonates with Pauline 'in Christ' language.",
    ],
    critiques: [
      "Critics ask how the Creator–creature distinction is safeguarded.",
      "The precise mechanism for forgiveness of guilt is less foregrounded.",
    ],
    scripture: [
      { ref: "2 Peter 1:4", note: "'Partakers of the divine nature.'" },
      { ref: "John 17:20–23", note: "'That they may be one… in us.'" },
      { ref: "Galatians 2:19–20", note: "'Christ lives in me.'" },
      { ref: "2 Corinthians 3:18", note: "Transformed 'from glory to glory.'" },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Theosis (Eastern Christian theology)",
        url: "https://en.wikipedia.org/wiki/Theosis_(Eastern_Christian_theology)",
        kind: "reference",
      },
      {
        label: "Athanasius, On the Incarnation (c. 318)",
        url: "https://en.wikipedia.org/wiki/Athanasius_of_Alexandria",
        kind: "primary",
        author: "Athanasius of Alexandria",
        year: "c. 318",
      },
    ],
    accentHex: "#1f5a5e",
    colorName: "Teal (palette extension)",
  },

  {
    id: "ransom",
    name: "Ransom Theory",
    shortName: "Ransom",
    aka: ["Classic ransom", "Ransom to Satan (in some patristic forms)"],
    era: "Patristic; among the earliest models (Origen; Gregory of Nyssa)",
    figures: ["Origen", "Gregory of Nyssa"],
    traditions: ["Early church", "Often grouped with the 'classic' / Christus Victor family"],
    summary:
      "Christ's death is a ransom that liberates humanity from bondage to sin and death; in some patristic forms the ransom is even described as paid to Satan, who is then overcome.",
    description:
      "Built on Jesus' saying that he came 'to give his life as a ransom for many', this model conceives salvation as a costly liberation from captivity. Classic versions differ on to whom (if anyone) the ransom is paid — a point debated already in antiquity.",
    emphasis: "Liberation by ransom/price; captivity and release.",
    strengths: [
      "Proponents point to the explicit ransom and redemption language of Scripture.",
      "It is among the earliest readings of Christ's saving work.",
    ],
    critiques: [
      "Critics — already Gregory of Nazianzus in the 4th c. — questioned the idea of a debt owed to Satan.",
      "The metaphor leaves open exactly how the transaction works.",
    ],
    scripture: [
      { ref: "Mark 10:45", note: "'A ransom for many.'" },
      { ref: "Matthew 20:28", note: "Parallel ransom saying." },
      { ref: "1 Timothy 2:5–6", note: "Christ 'gave himself as a ransom for all.'" },
      { ref: "1 Peter 1:18–19", note: "Ransomed 'with the precious blood of Christ.'" },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — Ransom theory of atonement",
        url: "https://en.wikipedia.org/wiki/Ransom_theory_of_atonement",
        kind: "reference",
      },
      {
        label: "Gregory of Nyssa, Catechetical Oration (4th c.)",
        url: "https://en.wikipedia.org/wiki/Gregory_of_Nyssa",
        kind: "primary",
        author: "Gregory of Nyssa",
        year: "4th c.",
      },
    ],
    accentHex: "#7a4a1e",
    colorName: "Bronze (palette extension)",
  },

  {
    id: "scapegoat",
    name: "Scapegoat (René Girard)",
    shortName: "Scapegoat",
    aka: ["Mimetic theory", "Girardian reading"],
    era: "Late 20th c. (René Girard; Raymund Schwager; James Alison)",
    figures: ["René Girard", "Raymund Schwager", "James Alison"],
    traditions: ["Contemporary and interdisciplinary; influential across confessions"],
    summary:
      "Drawing on mimetic theory, the cross exposes and subverts the human 'scapegoat mechanism': the innocent victim unveils and disarms sacred violence, disclosing a non-violent God.",
    description:
      "René Girard argued that human culture manages mimetic rivalry by uniting against a scapegoat. On this reading, Christ — the innocent victim — reveals that mechanism for what it is and breaks its hold, so that the cross is less a sacrifice God demands than an unveiling and ending of human violence.",
    emphasis: "Unveiling and ending sacrificial violence; the innocent victim; non-violence.",
    strengths: [
      "Proponents value its anthropological account of violence and its non-violent reading of God.",
      "It connects the cross with a broad critique of cultural scapegoating.",
    ],
    critiques: [
      "Critics ask whether it accounts for the full range of biblical sacrificial and salvific categories.",
      "There is debate over how it handles the language of 'sacrifice'.",
    ],
    scripture: [
      { ref: "Leviticus 16:8–10", note: "Day of Atonement scapegoat — background imagery." },
      { ref: "Isaiah 53:3–7", note: "The rejected, innocent sufferer." },
      { ref: "John 11:49–52", note: "'Better that one man die for the people.'" },
      { ref: "Hebrews 9–10", note: "Read against the logic of repeated sacrifice." },
    ],
    resources: [
      SEP_ATONEMENT,
      {
        label: "Wikipedia — René Girard",
        url: "https://en.wikipedia.org/wiki/Ren%C3%A9_Girard",
        kind: "reference",
      },
      {
        label: "René Girard, Things Hidden Since the Foundation of the World (1978)",
        url: "https://en.wikipedia.org/wiki/Ren%C3%A9_Girard",
        kind: "primary",
        author: "René Girard",
        year: "1978",
      },
    ],
    accentHex: "#4a2d52",
    colorName: "Plum (palette extension)",
  },
];

/** Lookup map for O(1) access by id. */
export const theoryById: Record<TheoryId, Theory> = theories.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<TheoryId, Theory>,
);

/** Convenience accessor. */
export function getTheory(id: TheoryId): Theory {
  return theoryById[id];
}

/** A neutral, project-wide overview reference for the About page / footer. */
export const OVERVIEW_RESOURCES = [
  {
    label: "Stanford Encyclopedia of Philosophy — “Atonement”",
    url: "https://plato.stanford.edu/entries/atonement/",
  },
  {
    label: "Wikipedia — Atonement in Christianity (overview)",
    url: "https://en.wikipedia.org/wiki/Atonement_in_Christianity",
  },
  {
    label: "Gustaf Aulén, Christus Victor (1931) — three classic types",
    url: "https://en.wikipedia.org/wiki/Christus_Victor",
  },
];
