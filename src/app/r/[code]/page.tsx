import type { Metadata } from "next";
import Link from "next/link";
import { decodeShareCode } from "@/lib/shareCodec";
import { evaluateQuiz } from "@/lib/quizEngine";
import { shareHeadline } from "@/lib/shareText";
import { ResultView } from "@/components/ResultView";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const decoded = decodeShareCode(code);
  if (!decoded) {
    return { title: "Shared result", robots: { index: false, follow: false } };
  }

  const headline = shareHeadline(evaluateQuiz(decoded.answers, decoded.mode));
  const description = `A shared result from the Theories of Atonement quiz: ${headline}. Take the quiz to compare the historic Christian models of the atonement.`;

  return {
    title: `Shared result: ${headline}`,
    description,
    // Result permutations should not be indexed, but links may be followed.
    robots: { index: false, follow: true },
    openGraph: {
      title: `${headline} · Theories of Atonement`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${headline} · Theories of Atonement`,
      description,
    },
  };
}

export default async function SharedResultPage({ params }: PageProps) {
  const { code } = await params;
  const decoded = decodeShareCode(code);

  if (!decoded) {
    return (
      <div className="container-page py-16">
        <div className="card mx-auto max-w-xl p-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-navy">
            This shared link looks invalid
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            The result code in this link couldn’t be read. It may have been
            truncated or mistyped when it was copied.
          </p>
          <div className="mt-6">
            <Link
              href="/quiz"
              className="focus-ring rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-parchment shadow-sm transition hover:bg-navy/90"
            >
              Take the quiz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const result = evaluateQuiz(decoded.answers, decoded.mode);

  return (
    <div className="container-page py-8 sm:py-12">
      <ResultView result={result} mode={decoded.mode} answers={decoded.answers} shared />
    </div>
  );
}
