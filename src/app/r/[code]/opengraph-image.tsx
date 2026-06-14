import { ImageResponse } from "next/og";
import { decodeShareCode } from "@/lib/shareCodec";
import { evaluateQuiz } from "@/lib/quizEngine";
import { shareHeadline } from "@/lib/shareText";
import { getTheory } from "@/lib/theoriesData";
import type { QuizResult, TheoryId } from "@/lib/types";

export const alt = "A Theories of Atonement quiz result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PARCHMENT = "#f6f1e7";
const INK = "#1c1714";
const INK_SOFT = "#4b4138";

function membersOf(result: QuizResult): TheoryId[] {
  return result.kind === "blend" && result.blend
    ? result.blend.members
    : [result.topId];
}

export default async function Image({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const decoded = decodeShareCode(code);
  const result = decoded ? evaluateQuiz(decoded.answers, decoded.mode) : null;

  const headline = result ? shareHeadline(result) : "Theories of Atonement";
  const members = result ? membersOf(result) : (["penal_substitution"] as TheoryId[]);
  const accentA = getTheory(members[0]).accentHex;
  const accentB = getTheory(members[1] ?? members[0]).accentHex;
  const isBlend = !!result && result.kind === "blend";
  const eyebrow = isBlend
    ? "Quiz result · Blended hybrid"
    : result
      ? "Quiz result · Single model"
      : "Interactive quiz & encyclopedia";
  const top = result ? result.ranked.filter((s) => s.percent > 0).slice(0, 5) : [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: PARCHMENT,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "56px 64px 48px",
            color: PARCHMENT,
            backgroundImage: `linear-gradient(110deg, ${accentA}, ${isBlend ? accentB : accentA})`,
          }}
        >
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, opacity: 0.9 }}>
            Theories of Atonement
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", marginTop: 10, fontSize: 70, fontWeight: 700 }}>
            {headline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", padding: "34px 64px" }}>
          {top.map((s) => (
            <div
              key={s.id}
              style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: 16 }}
            >
              <div style={{ display: "flex", width: 360, fontSize: 26, color: INK }}>
                {getTheory(s.id).name}
              </div>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: 18,
                  backgroundColor: "rgba(0,0,0,0.10)",
                  borderRadius: 9,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    width: `${Math.max(s.percent, 2)}%`,
                    height: 18,
                    backgroundColor: getTheory(s.id).accentHex,
                    borderRadius: 9,
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  width: 72,
                  justifyContent: "flex-end",
                  fontSize: 26,
                  fontWeight: 600,
                  color: INK_SOFT,
                }}
              >
                {Math.round(s.percent)}%
              </div>
            </div>
          ))}
          <div style={{ display: "flex", marginTop: 6, fontSize: 24, color: INK_SOFT }}>
            Take the quiz · a neutral guide to the historic models of the atonement
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
