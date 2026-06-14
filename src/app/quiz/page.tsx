import type { Metadata } from "next";
import { QuizClient } from "@/components/QuizClient";
import type { QuizMode } from "@/lib/types";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Answer weighted questions to discover which model — or blend of models — of the atonement best matches your theological instincts.",
};

function parseMode(value: string | string[] | undefined): QuizMode {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "deep" ? "deep" : "short";
}

export default async function QuizPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string | string[] }>;
}) {
  const { mode } = await searchParams;
  const quizMode = parseMode(mode);

  return <QuizClient mode={quizMode} />;
}
