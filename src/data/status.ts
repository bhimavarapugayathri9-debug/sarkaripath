import type { JobRecord } from "./types";

export type DisplayStatus = "Upcoming" | "Application Open" | "Closing Soon" | "Application Closed" | "Exam Upcoming" | "Result Available" | "Recruitment varies by notification";

/** Status is calculated only from dated, source-backed records. Evergreen profiles stay undated. */
export function getApplicationStatus(job: JobRecord, today = new Date()): DisplayStatus {
  if (job.isEvergreen || !job.officialNotificationUrl || !job.lastVerified) return "Recruitment varies by notification";
  const day = new Date(today.toISOString().slice(0, 10) + "T00:00:00Z").getTime();
  const date = (value: string | null) => value ? new Date(`${value.slice(0, 10)}T00:00:00Z`).getTime() : null;
  const start = date(job.applicationStart), end = date(job.applicationEnd), exam = date(job.examDate), result = date(job.resultDate);
  if (result !== null && result <= day) return "Result Available";
  if (start !== null && start <= day && (end === null || end >= day)) {
    if (end !== null && end - day <= 7 * 86400000) return "Closing Soon";
    return "Application Open";
  }
  if (start !== null && start > day) return "Upcoming";
  if (end !== null && end < day) return "Application Closed";
  if (exam !== null && exam >= day) return "Exam Upcoming";
  return "Upcoming";
}

export function statusClass(status: DisplayStatus): string {
  if (status === "Application Open") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "Closing Soon") return "border-orange-200 bg-orange-50 text-orange-800";
  if (status === "Result Available") return "border-purple-200 bg-purple-50 text-purple-800";
  if (status === "Upcoming" || status === "Exam Upcoming") return "border-blue-200 bg-blue-50 text-blue-800";
  if (status === "Application Closed") return "border-slate-200 bg-slate-100 text-slate-700";
  return "border-border bg-surface text-muted-foreground";
}
