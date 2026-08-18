import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ALL_JOBS } from "@/data/jobs";
import { CATEGORIES, QUALIFICATION_LEVELS, DISCLAIMER } from "@/data/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SarkariPath — Government Jobs & Competitive Exams Guide" },
      {
        name: "description",
        content:
          "Explore 100+ government job and competitive exam profiles by qualification, stream and category, with official sources and eligibility details.",
      },
      { property: "og:title", content: "SarkariPath — Government Jobs & Competitive Exams Guide" },
      {
        property: "og:description",
        content: "Evergreen government job and exam information for 10th, 12th, Diploma, Graduate and Post Graduate students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [qual, setQual] = useState<string>("All");

  const jobs = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ALL_JOBS.filter((j) => {
      if (selectedCategory && j.category !== selectedCategory) return false;
      if (qual !== "All" && j.minimumQualification !== qual) return false;
      if (!term) return true;
      return (
        j.title.toLowerCase().includes(term) ||
        j.organization.toLowerCase().includes(term) ||
        j.tags.join(" ").toLowerCase().includes(term)
      );
    });
  }, [q, qual, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const j of ALL_JOBS) map.set(j.category, (map.get(j.category) ?? 0) + 1);
    return map;
  }, []);

  const activeFilters = (selectedCategory ? 1 : 0) + (qual !== "All" ? 1 : 0) + (q.trim() ? 1 : 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Masthead */}
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold uppercase tracking-[0.2em]">SarkariPath</span>
            <span className="hidden text-primary-foreground/70 sm:block">
              Educational &amp; awareness portal · no fabricated deadlines
            </span>
          </div>
        </div>
        <div className="h-[3px] w-full gazette-rule" />
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pb-16 sm:pt-14">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
            Competitive Exam Awareness
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">
            Government Jobs &amp; Competitive Exams
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            Evergreen, verifiable profiles of {ALL_JOBS.length}+ government posts and exams for students
            after 10th, 12th, Diploma, Graduation, B.Tech and Post Graduation. Choose a category to explore
            matching opportunities.
          </p>

          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-4">
            {[
              ["Profiles", `${ALL_JOBS.length}+`],
              ["Categories", `${categoryCounts.size}`],
              ["Qualifications", "10th → PG"],
              ["Sources", "Official"],
            ].map(([label, value]) => (
              <div key={label} className="bg-primary px-4 py-3">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">{label}</dt>
                <dd className="mt-1 font-display text-lg font-bold text-gold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        {!selectedCategory ? (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Browse by category</h2>
              <span className="text-sm text-muted-foreground">Click a category to view jobs</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {CATEGORIES.map((c) => {
                const count = categoryCounts.get(c) ?? 0;
                return (
                  <button
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className="card-elevated group flex flex-col items-start rounded-xl border border-border bg-card p-5 text-left text-card-foreground transition hover:border-gold/60 focus:outline-none focus:ring-2 focus:ring-ring/40"
                  >
                    <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground">
                      {count} {count === 1 ? "profile" : "profiles"}
                    </span>
                    <span className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">{c}</span>
                    <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-gold">
                      View jobs
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          <section>
            {/* Category header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setQ("");
                    setQual("All");
                  }}
                  className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to categories
                </button>
                <h2 className="text-2xl font-bold tracking-tight">{selectedCategory}</h2>
                <p className="text-sm text-muted-foreground">
                  {categoryCounts.get(selectedCategory) ?? 0} profiles in this category
                </p>
              </div>
            </div>

            {/* Search panel */}
            <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m20 20-3.5-3.5" />
                    </svg>
                  </span>
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder={`Search within ${selectedCategory}`}
                    className="w-full rounded-lg border border-input bg-card py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-ring/40"
                  />
                </div>
                <select
                  value={qual}
                  onChange={(e) => setQual(e.target.value)}
                  className="rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-ring/40"
                >
                  <option value="All">Any qualification</option>
                  {QUALIFICATION_LEVELS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                <span>
                  <strong className="font-semibold text-foreground">{jobs.length}</strong> matching profiles
                </span>
                {activeFilters > 0 && (
                  <button
                    onClick={() => {
                      setQ("");
                      setQual("All");
                    }}
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {jobs.length === 0 ? (
              <p className="mt-10 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                No profiles match these filters. Try a broader search or go back to categories.
              </p>
            ) : (
              <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {jobs.map((j) => (
                  <li
                    key={j.id}
                    className="card-elevated group flex flex-col rounded-xl border border-border bg-card p-5 text-card-foreground"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="rounded bg-primary px-2 py-0.5 font-semibold uppercase tracking-wide text-primary-foreground">
                        {j.category}
                      </span>
                      <span className="rounded border border-gold/50 px-2 py-0.5 font-medium text-gold-foreground/80">
                        {j.minimumQualification}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg leading-snug font-bold">{j.title}</h2>
                    <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {j.organization}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{j.description}</p>
                    <div className="mt-auto flex items-center gap-4 border-t border-border pt-4 text-sm">
                      <Link
                        to="/job/$id"
                        params={{ id: j.id }}
                        className="font-semibold text-primary underline-offset-4 group-hover:underline"
                      >
                        View details →
                      </Link>
                      <a
                        href={j.officialWebsite}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground underline underline-offset-2"
                      >
                        Official site
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>

      <footer className="mt-8 border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <p className="font-display text-sm font-bold">SarkariPath</p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
        </div>
      </footer>
    </div>
  );
}
