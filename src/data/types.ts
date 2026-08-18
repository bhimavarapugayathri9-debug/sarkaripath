export const STREAMS = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "Mechanical",
  "Civil",
  "Chemical",
  "Biotechnology",
  "Agriculture",
  "Any Engineering",
  "Any Degree",
  "Science",
  "Commerce",
  "Arts",
  "Medical",
  "Law",
  "Pharmacy",
  "Diploma",
  "10th",
  "12th",
] as const;

export type Stream = (typeof STREAMS)[number];

export const QUALIFICATION_LEVELS = [
  "10th",
  "12th",
  "Diploma",
  "Graduation",
  "B.E./B.Tech",
  "Post Graduation",
  "Other",
] as const;

export type QualificationLevel = (typeof QUALIFICATION_LEVELS)[number];

/** Ordered from lowest to highest for "at least this level" comparisons. */
export const QUALIFICATION_ORDER: QualificationLevel[] = [
  "10th",
  "12th",
  "Diploma",
  "Graduation",
  "B.E./B.Tech",
  "Post Graduation",
];

export const CATEGORIES = [
  "UPSC",
  "SSC",
  "Banking",
  "Railways",
  "Defence",
  "Police",
  "Teaching",
  "Engineering",
  "IT",
  "Science & Technology",
  "Healthcare",
  "State Government",
  "Central Government",
  "PSU",
  "Judiciary & Law",
  "Agriculture",
  "Diploma Jobs",
  "10th/12th Pass Jobs",
] as const;

export type JobCategory = (typeof CATEGORIES)[number];

export const SECTORS = [
  "Banking",
  "Railway",
  "Defence",
  "IT",
  "Engineering",
  "Teaching",
  "Administration",
  "Science & Technology",
  "Healthcare",
  "Police",
  "PSU",
  "Judiciary & Law",
  "Agriculture",
  "State Government",
  "Central Government",
] as const;

export type Sector = (typeof SECTORS)[number];

export const STATES = [
  "All India",
  "Andhra Pradesh",
  "Telangana",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Delhi",
  "Uttar Pradesh",
  "Bihar",
  "West Bengal",
  "Odisha",
  "Rajasthan",
  "Gujarat",
  "Madhya Pradesh",
  "Punjab",
  "Haryana",
  "Other States",
] as const;

export type StateName = (typeof STATES)[number];

export type JobType =
  | "Permanent Government Post"
  | "Contract / Fixed Tenure"
  | "Apprenticeship / Trainee"
  | "Eligibility Test"
  | "Defence Service Entry";

export type ApplicationStatus =
  | "UPCOMING"
  | "APPLICATION OPEN"
  | "CLOSING SOON"
  | "APPLICATION CLOSED"
  | "EXAM UPCOMING"
  | "ADMIT CARD AVAILABLE"
  | "RESULT AVAILABLE"
  | "COMPLETED"
  | "EVERGREEN";

export interface JobRecord {
  id: string;
  title: string;
  shortTitle: string;
  organization: string;
  department: string;
  category: JobCategory;
  subCategory: string;
  jobType: JobType;
  description: string;
  responsibilities: string[];
  /** Human readable educational qualification requirement. */
  qualification: string;
  eligibleStreams: Stream[];
  minimumQualification: QualificationLevel;
  experienceRequired: string;
  /** Set to null where the official notification does not publish a fixed limit. */
  ageMin: number | null;
  ageMax: number | null;
  ageRelaxation: string;
  nationality: string;
  vacancies: string;
  salary: string;
  payLevel: string;
  jobLocation: string;
  states: StateName[];
  sectors: Sector[];
  selectionProcess: string[];
  examPattern: string;
  syllabus: string[];
  applicationFee: string;
  otherRequirements: string;
  preparationTips: string[];
  /** Time-sensitive fields. Null on evergreen catalogue records. */
  applicationStart: string | null;
  applicationEnd: string | null;
  examDate: string | null;
  admitCardDate: string | null;
  resultDate: string | null;
  officialWebsite: string;
  officialNotificationUrl: string | null;
  officialApplyUrl: string | null;
  /** ISO date. Required for every time-sensitive record. */
  lastVerified: string | null;
  isEvergreen: boolean;
  tags: string[];
}

/** Admin-managed, verified, time-sensitive notification stored in the database. */
export interface JobNotification {
  id: string;
  job_id: string | null;
  title: string;
  organization: string;
  category: string;
  notification_type: string;
  description: string | null;
  vacancies: string | null;
  qualification: string | null;
  application_start: string | null;
  application_end: string | null;
  exam_date: string | null;
  admit_card_date: string | null;
  result_date: string | null;
  official_notification_url: string | null;
  official_apply_url: string | null;
  last_verified: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const NOTIFICATION_TYPES = [
  "New Notification",
  "Application Open",
  "Deadline",
  "Exam Date",
  "Admit Card",
  "Answer Key",
  "Result",
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const NOTIFICATION_ICONS: Record<string, string> = {
  "New Notification": "📢",
  "Application Open": "📝",
  Deadline: "⏰",
  "Exam Date": "📅",
  "Admit Card": "🎫",
  "Answer Key": "📊",
  Result: "🏆",
};

export const DISCLAIMER =
  "Disclaimer: This portal is created for educational and awareness purposes. Recruitment dates, eligibility, vacancies and other details may change. Candidates must verify the latest information from the official recruiting authority before applying.";

export const ELIGIBILITY_DISCLAIMER =
  "Eligibility shown is an initial match. Candidates must verify the official notification before applying.";
