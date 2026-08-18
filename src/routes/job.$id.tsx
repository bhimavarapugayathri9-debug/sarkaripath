import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getJobById } from "@/data/jobs";
import { DISCLAIMER } from "@/data/types";

export const Route = createFileRoute("/job/$id")({
  head: () => ({
    meta: [
      { title: "Job & Exam Profile — SarkariPath" },
      { name: "description", content: "Eligibility, selection process, syllabus and official source for this government post or exam." },
      { property: "og:title", content: "Job & Exam Profile — SarkariPath" },
      { property: "og:description", content: "Eligibility, selection process and official source details." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ params }) => {
    const job = getJobById(params.id);
    if (!job) throw notFound();
    return { job };
  },
  errorComponent: ({ error }) => <p className="p-8 text-sm">{error.message}</p>,
  notFoundComponent: () => <p className="p-8 text-sm">This profile was not found.</p>,
  component: JobDetail,
});

function Section({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-8">
      <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {title}
        <span className="h-px flex-1 bg-border" />
      </h2>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {items.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function JobDetail() {
  const { job } = Route.useLoaderData();

  const facts: [string, string][] = [
    ["Qualification", job.qualification],
    [
      "Age",
      job.ageMin != null && job.ageMax != null ? `${job.ageMin} – ${job.ageMax} years` : "As per notification",
    ],
    ["Pay", job.salary || "As per notification"],
    ["Eligible streams", job.eligibleStreams.join(", ")],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-3">
          <Link to="/" className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80 hover:text-gold">
            ← All profiles
          </Link>
        </div>
        <div className="h-[3px] w-full gazette-rule" />
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-8">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded border border-gold/50 px-2 py-0.5 font-semibold uppercase tracking-wide text-gold">
              {job.category}
            </span>
            <span className="text-primary-foreground/70">{job.minimumQualification}</span>
          </div>
          <h1 className="mt-4 text-3xl leading-tight font-bold sm:text-4xl">{job.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/75">{job.organization}</p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-base leading-relaxed">{job.description}</p>

        <dl className="mt-7 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {facts.map(([label, value]) => (
            <div key={label} className="bg-card p-4">
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
              <dd className="mt-1.5 text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <Section title="Responsibilities" items={job.responsibilities} />
        <Section title="Selection process" items={job.selectionProcess} />
        <Section title="Syllabus" items={job.syllabus} />

        <a
          href={job.officialWebsite}
          target="_blank"
          rel="noreferrer"
          className="mt-9 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Visit official recruiting authority ↗
        </a>

        <p className="mt-10 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
      </main>
    </div>
  );
}
