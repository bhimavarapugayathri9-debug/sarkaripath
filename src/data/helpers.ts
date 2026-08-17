import type { JobRecord, JobType, QualificationLevel, Sector, StateName, Stream } from "./types";

type Required_ = "id" | "title" | "organization" | "category" | "description" | "qualification";

export type JobInput = Pick<JobRecord, Required_> &
  Partial<Omit<JobRecord, Required_>> & {
    eligibleStreams: Stream[];
    minimumQualification: QualificationLevel;
    sectors: Sector[];
  };

const DEFAULT_AGE_RELAXATION =
  "Age relaxation is available for SC/ST, OBC, PwBD, ex-servicemen and other reserved categories as per Government of India rules. Exact relaxation is stated in the official notification.";

const DEFAULT_NATIONALITY =
  "Indian citizen. Certain posts also allow subjects of Nepal, Bhutan and other categories listed in the official notification.";

const DEFAULT_FEE =
  "Application fee varies by post and category. Women, SC/ST, PwBD and ex-servicemen candidates are usually exempted or charged a reduced fee. Check the official notification.";

export function job(input: JobInput): JobRecord {
  const streams = input.eligibleStreams;
  const tags = new Set<string>([
    ...(input.tags ?? []),
    input.category,
    ...input.sectors,
    ...streams,
    input.minimumQualification,
  ]);

  return {
    id: input.id,
    title: input.title,
    shortTitle: input.shortTitle ?? input.title,
    organization: input.organization,
    department: input.department ?? input.organization,
    category: input.category,
    subCategory: input.subCategory ?? input.category,
    jobType: (input.jobType ?? "Permanent Government Post") as JobType,
    description: input.description,
    responsibilities: input.responsibilities ?? [],
    qualification: input.qualification,
    eligibleStreams: streams,
    minimumQualification: input.minimumQualification,
    experienceRequired:
      input.experienceRequired ?? "No prior work experience required. Freshers are eligible.",
    ageMin: input.ageMin ?? null,
    ageMax: input.ageMax ?? null,
    ageRelaxation: input.ageRelaxation ?? DEFAULT_AGE_RELAXATION,
    nationality: input.nationality ?? DEFAULT_NATIONALITY,
    vacancies: input.vacancies ?? "Varies by notification",
    salary: input.salary ?? "As per the pay scale notified by the recruiting authority",
    payLevel: input.payLevel ?? "Refer to the official notification",
    jobLocation: input.jobLocation ?? "Across India as per posting",
    states: (input.states ?? ["All India"]) as StateName[],
    sectors: input.sectors,
    selectionProcess: input.selectionProcess ?? [],
    examPattern: input.examPattern ?? "Refer to the official notification for the current pattern.",
    syllabus: input.syllabus ?? [],
    applicationFee: input.applicationFee ?? DEFAULT_FEE,
    otherRequirements:
      input.otherRequirements ??
      "Candidates must meet all eligibility conditions on the cut-off date given in the official notification.",
    preparationTips: input.preparationTips ?? [],
    applicationStart: input.applicationStart ?? null,
    applicationEnd: input.applicationEnd ?? null,
    examDate: input.examDate ?? null,
    admitCardDate: input.admitCardDate ?? null,
    resultDate: input.resultDate ?? null,
    officialWebsite: input.officialWebsite ?? "",
    officialNotificationUrl: input.officialNotificationUrl ?? null,
    officialApplyUrl: input.officialApplyUrl ?? null,
    lastVerified: input.lastVerified ?? null,
    isEvergreen: input.isEvergreen ?? true,
    tags: [...tags],
  };
}

export const SITE = {
  upsc: "https://upsc.gov.in/",
  ssc: "https://ssc.gov.in/",
  ibps: "https://www.ibps.in/",
  sbi: "https://sbi.co.in/web/careers",
  rbi: "https://www.rbi.org.in/",
  rrb: "https://www.rrbapply.gov.in/",
  rpf: "https://rpf.indianrailways.gov.in/",
  nta: "https://www.nta.ac.in/",
  isro: "https://www.isro.gov.in/",
  drdo: "https://www.drdo.gov.in/",
  nic: "https://www.nic.in/",
  barc: "https://www.barc.gov.in/",
  csir: "https://www.csir.res.in/",
  nabard: "https://www.nabard.org/",
  sebi: "https://www.sebi.gov.in/",
  sidbi: "https://www.sidbi.in/",
  joinIndianArmy: "https://joinindianarmy.nic.in/",
  joinIndianNavy: "https://www.joinindiannavy.gov.in/",
  afcat: "https://afcat.cdac.in/",
  indianAirForce: "https://agnipathvayu.cdac.in/",
  coastGuard: "https://joinindiancoastguard.cdac.in/",
  ctet: "https://ctet.nic.in/",
  ugcNet: "https://ugcnet.nta.ac.in/",
  csirNet: "https://csirnet.nta.ac.in/",
  kvs: "https://kvsangathan.nic.in/",
  nvs: "https://navodaya.gov.in/",
  ncs: "https://www.ncs.gov.in/",
};
