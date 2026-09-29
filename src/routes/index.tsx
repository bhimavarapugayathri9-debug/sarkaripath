import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ALL_JOBS } from "@/data/jobs";
import { CATEGORIES, QUALIFICATION_LEVELS, STREAMS, DISCLAIMER, ELIGIBILITY_DISCLAIMER } from "@/data/types";
import { getApplicationStatus, statusClass } from "@/data/status";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "SarkariPath — Government Jobs & Competitive Exams Guide" }, { name: "description", content: "Explore government job and exam profiles by qualification, stream and category, with official sources and eligibility details." }] }),
  component: Home,
});

function Home() {
  const [category, setCategory] = useState("All categories");
  const [query, setQuery] = useState("");
  const [qualification, setQualification] = useState("All");
  const [finderOpen, setFinderOpen] = useState(false);
  const [age, setAge] = useState("");
  const [stream, setStream] = useState("Any stream");
  const [finderQualification, setFinderQualification] = useState("All");

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const job of ALL_JOBS) for (const item of job.categories) counts.set(item, (counts.get(item) ?? 0) + 1);
    return counts;
  }, []);
  // Only offer categories backed by catalogue records, so the UI never has dead/zero-result category cards.
  const availableCategories = CATEGORIES.filter((item) => (categoryCounts.get(item) ?? 0) > 0);
  const jobs = useMemo(() => {
    const term = query.trim().toLowerCase();
    return ALL_JOBS.filter((job) => {
      if (category !== "All categories" && !job.categories.includes(category as (typeof CATEGORIES)[number])) return false;
      if (qualification !== "All" && job.minimumQualification !== qualification) return false;
      return !term || [job.title, job.organization, job.description, ...job.tags, ...job.categories].join(" ").toLowerCase().includes(term);
    });
  }, [category, query, qualification]);
  const eligibleJobs = useMemo(() => ALL_JOBS.filter((job) => {
    if (finderQualification !== "All" && job.minimumQualification !== finderQualification) return false;
    if (stream !== "Any stream" && !job.eligibleStreams.includes(stream as (typeof STREAMS)[number]) && !job.eligibleStreams.includes("Any Degree") && !job.eligibleStreams.includes("Any Engineering")) return false;
    if (age && job.ageMin !== null && Number(age) < job.ageMin) return false;
    if (age && job.ageMax !== null && Number(age) > job.ageMax) return false;
    return true;
  }), [age, finderQualification, stream]);

  return <div className="min-h-screen bg-background text-foreground">
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-3"><div className="flex items-center justify-between gap-3 text-xs"><span className="font-semibold uppercase tracking-[0.2em]">SarkariPath</span><span className="hidden text-primary-foreground/70 sm:block">Competitive Exam Awareness · official sources first</span></div></div>
      <div className="h-[3px] w-full gazette-rule" />
      <div className="mx-auto max-w-6xl px-4 pb-10 pt-9 sm:pb-14 sm:pt-12">
        <p className="inline-flex rounded-full border border-gold/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Competitive Exam Awareness</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-bold sm:text-5xl">Government Jobs &amp; Competitive Exams</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">Browse {ALL_JOBS.length} structured exam and career profiles. Recruitment dates are shown only when verified against an official notification.</p>
        <dl className="mt-7 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-4">{[["Profiles", ALL_JOBS.length], ["Categories", availableCategories.length], ["Qualifications", "10th → PG"], ["Sources", "Official"]].map(([label, value]) => <div key={String(label)} className="bg-primary px-4 py-3"><dt className="text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">{label}</dt><dd className="mt-1 font-display text-lg font-bold text-gold">{value}</dd></div>)}</dl>
      </div>
    </header>
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-9">
      <section className="rounded-xl border border-gold/30 bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-widest text-gold-foreground/80">Personalised search</p><h2 className="mt-1 text-xl font-bold">Find opportunities by your profile</h2></div><button onClick={() => setFinderOpen(!finderOpen)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">{finderOpen ? "Close finder" : "Open eligibility finder"}</button></div>
        {finderOpen && <div className="mt-5 border-t border-border pt-5"><div className="grid gap-3 sm:grid-cols-3"><label className="text-xs font-semibold">Age<input aria-label="Age" type="number" min="14" max="100" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Enter age" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-normal" /></label><label className="text-xs font-semibold">Qualification<select value={finderQualification} onChange={(e) => setFinderQualification(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-normal"><option value="All">Any qualification</option>{QUALIFICATION_LEVELS.map((x) => <option key={x}>{x}</option>)}</select></label><label className="text-xs font-semibold">Degree / stream<select value={stream} onChange={(e) => setStream(e.target.value)} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-normal"><option>Any stream</option>{STREAMS.map((x) => <option key={x}>{x}</option>)}</select></label></div><p className="mt-4 text-sm font-semibold">{eligibleJobs.length} possible profile matches</p><p className="mt-1 text-xs text-muted-foreground">{ELIGIBILITY_DISCLAIMER} This initial search uses catalogue qualification, stream and age fields; it does not replace notification-specific checks.</p><ul className="mt-3 grid gap-2 sm:grid-cols-2">{eligibleJobs.slice(0, 8).map((job) => <li key={job.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3 text-sm"><Link to="/job/$id" params={{ id: job.id }} className="font-semibold text-primary underline-offset-2 hover:underline">{job.title}</Link><span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${statusClass(getApplicationStatus(job))}`}>{getApplicationStatus(job)}</span></li>)}</ul>{eligibleJobs.length > 8 && <p className="mt-2 text-xs text-muted-foreground">Showing first 8 of {eligibleJobs.length}. Use search below to browse all results.</p>}</div>}
      </section>

      <section id="opportunities"><div className="mb-4"><h2 className="text-2xl font-bold tracking-tight">Browse opportunities</h2><p className="mt-1 text-sm text-muted-foreground">Search across the complete catalogue, then narrow by category and qualification.</p></div>
        <div className="grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_minmax(180px,240px)_minmax(170px,210px)]">
          <label className="sr-only" htmlFor="job-search">Search opportunities</label><input id="job-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search exams, jobs, organisations, streams…" className="min-w-0 rounded-lg border border-input bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/40" />
          <select aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)} className="min-w-0 rounded-lg border border-input bg-card px-3 py-2.5 text-sm"><option>All categories</option>{availableCategories.map((x) => <option key={x} value={x}>{x} · {categoryCounts.get(x)}</option>)}</select>
          <select aria-label="Filter by qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} className="min-w-0 rounded-lg border border-input bg-card px-3 py-2.5 text-sm"><option value="All">Any qualification</option>{QUALIFICATION_LEVELS.map((x) => <option key={x}>{x}</option>)}</select>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span><strong className="text-foreground">{jobs.length}</strong> matching profiles</span>{(query || category !== "All categories" || qualification !== "All") && <button onClick={() => { setQuery(""); setCategory("All categories"); setQualification("All"); }} className="font-semibold text-primary underline">Clear filters</button>}</div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{jobs.map((job) => { const status = getApplicationStatus(job); const source = job.officialNotificationUrl ?? job.officialWebsite; return <article key={job.id} className="card-elevated flex min-w-0 flex-col rounded-xl border border-border bg-card p-5"><div className="flex flex-wrap items-center gap-2"><span className="rounded bg-primary px-2 py-1 text-[10px] font-semibold uppercase text-primary-foreground">{job.category}</span><span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${statusClass(status)}`}>{status}</span></div><h3 className="mt-3 text-lg font-bold leading-snug">{job.title}</h3><p className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{job.organization}</p><p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{job.description}</p><div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4"><Link to="/job/$id" params={{ id: job.id }} className="text-sm font-semibold text-primary hover:underline">View details →</Link><a href={source} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline underline-offset-2">{job.officialNotificationUrl ? "Official notification" : "Official authority"}</a><span className="ml-auto text-xs text-muted-foreground">{job.minimumQualification}</span></div></article>; })}</div>
        {jobs.length === 0 && <p className="mt-8 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No profiles match these filters. Try a broader search.</p>}
      </section>
      <section><h2 className="mb-4 text-xl font-bold">Explore categories</h2><div className="flex flex-wrap gap-2">{availableCategories.map((item) => <button key={item} onClick={() => { setCategory(item); document.getElementById("opportunities")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-full border border-border bg-card px-3 py-2 text-sm hover:border-gold/60">{item}<span className="ml-2 text-xs text-muted-foreground">{categoryCounts.get(item)}</span></button>)}</div></section>
    </main>
    <footer className="mt-8 border-t border-border bg-surface"><div className="mx-auto max-w-6xl px-4 py-8"><p className="font-display text-sm font-bold">SarkariPath</p><p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p></div></footer>
  </div>;
}
