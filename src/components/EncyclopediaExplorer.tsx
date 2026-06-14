"use client";

import { useMemo, useState } from "react";
import { theories } from "@/lib/theoriesData";
import type { TheoryId } from "@/lib/types";
import { TheoryArticle } from "./TheoryArticle";

type SortKey = "az" | "za" | "chrono";

/** Approximate century-of-origin of each *idea*, used only for chronological sort. */
const ORIGIN_ORDER: Record<TheoryId, number> = {
  christus_victor: 50,
  recapitulation: 180,
  ransom: 250,
  participatory: 318,
  satisfaction: 1098,
  moral_influence: 1135,
  penal_substitution: 1536,
  governmental: 1617,
  scapegoat: 1978,
};

export function EncyclopediaExplorer() {
  const [query, setQuery] = useState("");
  const [tradition, setTradition] = useState("all");
  const [sort, setSort] = useState<SortKey>("az");
  const [openId, setOpenId] = useState<TheoryId | null>(null);

  const traditions = useMemo(() => {
    const set = new Set<string>();
    theories.forEach((t) => t.traditions.forEach((tr) => set.add(tr)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = theories.filter((t) => {
      const matchesTradition =
        tradition === "all" || t.traditions.includes(tradition);
      if (!matchesTradition) return false;
      if (!q) return true;
      const haystack = [
        t.name,
        t.shortName,
        t.emphasis,
        t.summary,
        t.description,
        ...t.aka,
        ...t.figures,
        ...t.traditions,
        ...t.scripture.map((s) => s.ref),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

    const sorted = [...list].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      return ORIGIN_ORDER[a.id] - ORIGIN_ORDER[b.id];
    });
    return sorted;
  }, [query, tradition, sort]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Search
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search models, figures, scripture…"
              className="focus-ring w-full rounded-xl border border-black/15 bg-white/80 px-3 py-2 text-sm"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Tradition
            </span>
            <select
              value={tradition}
              onChange={(e) => setTradition(e.target.value)}
              className="focus-ring w-full rounded-xl border border-black/15 bg-white/80 px-3 py-2 text-sm sm:w-56"
            >
              <option value="all">All traditions</option>
              {traditions.map((tr) => (
                <option key={tr} value={tr}>
                  {tr}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="focus-ring w-full rounded-xl border border-black/15 bg-white/80 px-3 py-2 text-sm sm:w-48"
            >
              <option value="az">Name (A–Z)</option>
              <option value="za">Name (Z–A)</option>
              <option value="chrono">Chronological</option>
            </select>
          </label>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-ink-soft">
          <span aria-live="polite">
            Showing <strong className="text-ink">{filtered.length}</strong> of{" "}
            {theories.length} models
          </span>
          {(query || tradition !== "all" || sort !== "az") && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTradition("all");
                setSort("az");
              }}
              className="link-underline"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Comparison table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Comparison of atonement models. Expand a row for strengths,
              critiques, scripture, and sources.
            </caption>
            <thead>
              <tr className="border-b border-black/10 bg-white/60 text-xs uppercase tracking-wider text-ink-soft">
                <th scope="col" className="px-4 py-3 font-semibold">Model</th>
                <th scope="col" className="px-4 py-3 font-semibold">Era</th>
                <th scope="col" className="px-4 py-3 font-semibold">Core emphasis</th>
                <th scope="col" className="px-4 py-3 font-semibold">Traditions</th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const open = openId === t.id;
                return (
                  <FragmentRow
                    key={t.id}
                    open={open}
                    onToggle={() => setOpenId(open ? null : t.id)}
                    theory={t}
                  />
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-ink-soft">
                    No models match your filters.{" "}
                    <button
                      type="button"
                      className="link-underline"
                      onClick={() => {
                        setQuery("");
                        setTradition("all");
                      }}
                    >
                      Clear search
                    </button>
                    .
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FragmentRow({
  theory,
  open,
  onToggle,
}: {
  theory: (typeof theories)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `theory-panel-${theory.id}`;
  return (
    <>
      <tr className="border-b border-black/5 align-top hover:bg-white/50">
        <th scope="row" className="px-4 py-3 font-normal">
          <span className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-4 w-4 shrink-0 rounded ring-1 ring-black/10"
              style={{ backgroundColor: theory.accentHex }}
            />
            <span>
              <span className="block font-medium text-navy">{theory.name}</span>
              {theory.aka[0] && (
                <span className="block text-xs text-ink-soft">{theory.aka[0]}</span>
              )}
            </span>
          </span>
        </th>
        <td className="px-4 py-3 text-ink-soft">{theory.era}</td>
        <td className="px-4 py-3 text-ink">{theory.emphasis}</td>
        <td className="px-4 py-3 text-ink-soft">{theory.traditions.join("; ")}</td>
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="focus-ring rounded-lg border border-navy/30 bg-white/70 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-white"
          >
            {open ? "Hide" : "Expand"}
          </button>
        </td>
      </tr>
      {open && (
        <tr id={panelId}>
          <td colSpan={5} className="border-b border-black/10 bg-white/40 px-4 py-6 sm:px-6">
            <TheoryArticle theory={theory} />
          </td>
        </tr>
      )}
    </>
  );
}
