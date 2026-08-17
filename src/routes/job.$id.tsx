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
    <section className="mt-6">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}

function JobDetail() {
  const { job } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link to="/" className="text-sm text-primary underline">
          ← Back to all profiles
        </Link>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{job.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {job.organization} · {job.category} · {job.minimumQualification}
        </p>
        <p className="mt-4 text-sm leading-relaxed">{job.description}</p>

        <dl className="mt-6 grid gap-3 rounded-lg border border-border p-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Qualification</dt>
            <dd>{job.qualification}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Age</dt>
            <dd>{job.ageMin != null && job.ageMax != null ? `${job.ageMin} – ${job.ageMax} years` : "As per notification"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Pay</dt>
            <dd>{job.salary || "As per notification"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Eligible streams</dt>
            <dd>{job.eligibleStreams.join(", ")}</dd>
          </div>
        </dl>

        <Section title="Responsibilities" items={job.responsibilities} />
        <Section title="Selection process" items={job.selectionProcess} />
        <Section title="Syllabus" items={job.syllabus} />

        <p className="mt-6 text-sm">
          <a href={job.officialWebsite} target="_blank" rel="noreferrer" className="text-primary underline">
            Official recruiting authority website
          </a>
        </p>
        <p className="mt-8 text-xs text-muted-foreground">{DISCLAIMER}</p>
      </div>
    </div>
  );
}
