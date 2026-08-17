import { upscJobs } from "./catalog/upsc";
import { sscJobs } from "./catalog/ssc";
import { bankingJobs } from "./catalog/banking";
import { railwayJobs } from "./catalog/railways";
import { defenceJobs } from "./catalog/defence";
import { teachingJobs } from "./catalog/teaching";
import { scienceJobs } from "./catalog/science";
import type { JobRecord } from "./types";

export const ALL_JOBS: JobRecord[] = [
  ...upscJobs,
  ...sscJobs,
  ...bankingJobs,
  ...railwayJobs,
  ...defenceJobs,
  ...teachingJobs,
  ...scienceJobs,
];

export function getJobById(id: string): JobRecord | undefined {
  return ALL_JOBS.find((j) => j.id === id);
}
