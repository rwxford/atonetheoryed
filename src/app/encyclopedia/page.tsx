import type { Metadata } from "next";
import { EncyclopediaExplorer } from "@/components/EncyclopediaExplorer";

export const metadata: Metadata = {
  title: "Encyclopedia",
  description:
    "Compare all nine models of the atonement side by side: era, key figures, core emphasis, traditions, strengths, critiques, scripture, and sources.",
};

export default function EncyclopediaPage() {
  return (
    <div className="container-page py-10 sm:py-12">
      <header className="mb-8 max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
          The Atonement Encyclopedia
        </h1>
        <p className="mt-3 text-ink-soft">
          A &ldquo;compare all&rdquo; reference for the historic models. Search and
          filter the table, then expand any row to read its strengths, critiques,
          scriptural references, and sources. The presentation is descriptive — no
          model is ranked above another.
        </p>
      </header>
      <EncyclopediaExplorer />
    </div>
  );
}
