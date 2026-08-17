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
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [qual, setQual] = useState<string>("All");

  const jobs = useMemo(() => {
    const term = q.trim().toLowerCase();
    return ALL_JOBS.filter((j) => {
      if (cat !== "All" && j.category !== cat) return false;
      if (qual !== "All" && j.minimumQualification !== qual) return false;
      if (!term) return true;
      return (
        j.title.toLowerCase().includes(term) ||
        j.organization.toLowerCase().includes(term) ||
        j.tags.join(" ").toLowerCase().includes(term)
      );
    });
  }, [q, cat, qual]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Competitive Exam Awareness Portal
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Government Jobs &amp; Competitive Exams
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
            Evergreen, verifiable profiles of {ALL_JOBS.length}+ government posts and exams for students
            after 10th, 12th, Diploma, Graduation, B.Tech and Post Graduation. No fabricated deadlines —
            every time-sensitive update is published separately with an official source.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search exam, post or organisation"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring sm:col-span-3"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={qual}
            onChange={(e) => setQual(e.target.value)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="All">Any qualification</option>
            {QUALIFICATION_LEVELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex items-center px-1 text-sm text-muted-foreground">
            {jobs.length} matching profiles
          </div>
        </div>

        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {jobs.map((j) => (
            <li key={j.id} className="rounded-lg border border-border bg-card p-5 text-card-foreground">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-secondary px-2 py-0.5 text-secondary-foreground">{j.category}</span>
                <span>{j.minimumQualification}</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold">{j.title}</h2>
              <p className="text-sm text-muted-foreground">{j.organization}</p>
              <p className="mt-2 line-clamp-3 text-sm">{j.description}</p>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <Link to="/job/$id" params={{ id: j.id }} className="font-medium text-primary underline">
                  View details
                </Link>
                <a href={j.officialWebsite} target="_blank" rel="noreferrer" className="text-muted-foreground underline">
                  Official site
                </a>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground">{DISCLAIMER}</p>
      </footer>
    </div>
  );
}
