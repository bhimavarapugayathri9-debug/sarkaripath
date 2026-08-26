/**
 * Static catalogue of government services that GovConnect AI can route to.
 * Each entry maps to a mock department API for the prototype.
 */

export type DepartmentKey = "business" | "tax" | "license" | "property" | "welfare" | "identity";

export type DocumentType =
  | "Identity Proof"
  | "Address Proof"
  | "Business Proof"
  | "Income Certificate"
  | "Educational Certificate"
  | "Photograph"
  | "Bank Details"
  | "Property Papers"
  | "Health Certificate"
  | "Caste Certificate";

export const DOCUMENT_TYPES: DocumentType[] = [
  "Identity Proof",
  "Address Proof",
  "Business Proof",
  "Income Certificate",
  "Educational Certificate",
  "Photograph",
  "Bank Details",
  "Property Papers",
  "Health Certificate",
  "Caste Certificate",
];

export type ServiceCategory =
  | "Business & Trade"
  | "Taxation"
  | "Licences & Permits"
  | "Property & Land"
  | "Welfare & Scholarships"
  | "Identity & Records";

export interface GovService {
  key: string;
  name: string;
  department: string;
  departmentKey: DepartmentKey;
  category: ServiceCategory;
  summary: string;
  eligibility: string[];
  requiredDocuments: DocumentType[];
  estimatedDays: number;
  fee: string;
  keywords: string[];
  /** Services usually filed together with this one. */
  bundledWith: string[];
}

export const SERVICES: GovService[] = [
  {
    key: "business-registration",
    name: "Business / Firm Registration",
    department: "Ministry of Corporate Affairs",
    departmentKey: "business",
    category: "Business & Trade",
    summary:
      "Register a proprietorship, partnership or company so the business becomes a legally recognised entity.",
    eligibility: ["Applicant aged 18 or above", "Valid identity and address proof", "Proposed business address"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Photograph"],
    estimatedDays: 7,
    fee: "As notified by the registering authority",
    keywords: ["shop", "business", "startup", "company", "firm", "grocery", "restaurant", "store", "enterprise"],
    bundledWith: ["gst-registration", "trade-license"],
  },
  {
    key: "udyam-registration",
    name: "MSME / Udyam Registration",
    department: "Ministry of Micro, Small & Medium Enterprises",
    departmentKey: "business",
    category: "Business & Trade",
    summary: "Recognition as a micro, small or medium enterprise, used for scheme and credit benefits.",
    eligibility: ["Business already registered or being registered", "Investment and turnover within MSME limits"],
    requiredDocuments: ["Identity Proof", "Business Proof", "Bank Details"],
    estimatedDays: 3,
    fee: "No fee",
    keywords: ["msme", "udyam", "small business", "subsidy", "loan"],
    bundledWith: ["business-registration", "gst-registration"],
  },
  {
    key: "gst-registration",
    name: "GST Registration",
    department: "Goods & Services Tax Department",
    departmentKey: "tax",
    category: "Taxation",
    summary: "Indirect tax registration required once turnover crosses the notified threshold, or for interstate supply.",
    eligibility: ["Registered business or proprietor", "PAN linked identity proof", "Principal place of business"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Business Proof", "Bank Details"],
    estimatedDays: 7,
    fee: "No fee",
    keywords: ["gst", "tax", "turnover", "invoice", "billing"],
    bundledWith: ["business-registration", "trade-license"],
  },
  {
    key: "pan-application",
    name: "PAN Application",
    department: "Income Tax Department",
    departmentKey: "tax",
    category: "Taxation",
    summary: "Permanent Account Number for income tax, banking and high-value transactions.",
    eligibility: ["Indian resident or eligible entity", "Identity and date of birth proof"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Photograph"],
    estimatedDays: 10,
    fee: "As notified",
    keywords: ["pan", "income tax", "tax card"],
    bundledWith: ["gst-registration"],
  },
  {
    key: "professional-tax",
    name: "Professional Tax Enrolment",
    department: "State Commercial Tax Department",
    departmentKey: "tax",
    category: "Taxation",
    summary: "State-level enrolment for businesses and professionals employing staff.",
    eligibility: ["Business operating in a state that levies professional tax"],
    requiredDocuments: ["Identity Proof", "Business Proof", "Address Proof"],
    estimatedDays: 5,
    fee: "State notified",
    keywords: ["professional tax", "employees", "staff", "payroll"],
    bundledWith: ["business-registration"],
  },
  {
    key: "trade-license",
    name: "Local Trade Licence",
    department: "Municipal Corporation",
    departmentKey: "license",
    category: "Licences & Permits",
    summary: "Municipal permission to carry out a trade or business from a specific premises.",
    eligibility: ["Premises within municipal limits", "No-objection from the property owner if rented"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Business Proof"],
    estimatedDays: 15,
    fee: "Municipality notified",
    keywords: ["trade licence", "municipal", "shop licence", "local body"],
    bundledWith: ["business-registration", "fssai-license"],
  },
  {
    key: "fssai-license",
    name: "Food Business (FSSAI) Licence",
    department: "Food Safety & Standards Authority",
    departmentKey: "license",
    category: "Licences & Permits",
    summary: "Mandatory licence or registration for any business that manufactures, stores or sells food.",
    eligibility: ["Food business operator", "Premises meeting hygiene norms"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Business Proof", "Health Certificate"],
    estimatedDays: 20,
    fee: "Category based",
    keywords: ["food", "restaurant", "hotel", "grocery", "bakery", "canteen", "fssai", "eatery"],
    bundledWith: ["trade-license", "business-registration"],
  },
  {
    key: "shop-establishment",
    name: "Shops & Establishment Registration",
    department: "State Labour Department",
    departmentKey: "license",
    category: "Licences & Permits",
    summary: "Labour department registration covering working hours, holidays and employee welfare.",
    eligibility: ["Commercial establishment with a physical premises"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Business Proof"],
    estimatedDays: 10,
    fee: "State notified",
    keywords: ["shop act", "labour", "establishment", "employees"],
    bundledWith: ["trade-license", "professional-tax"],
  },
  {
    key: "fire-noc",
    name: "Fire Safety NOC",
    department: "State Fire & Emergency Services",
    departmentKey: "license",
    category: "Licences & Permits",
    summary: "No-objection certificate confirming the premises meets fire safety requirements.",
    eligibility: ["Premises above notified area or occupancy type", "Installed fire safety equipment"],
    requiredDocuments: ["Address Proof", "Property Papers", "Business Proof"],
    estimatedDays: 25,
    fee: "State notified",
    keywords: ["fire", "noc", "safety", "restaurant", "factory"],
    bundledWith: ["trade-license", "fssai-license"],
  },
  {
    key: "pollution-consent",
    name: "Pollution Control Consent",
    department: "State Pollution Control Board",
    departmentKey: "license",
    category: "Licences & Permits",
    summary: "Consent to establish or operate for units that generate effluent, emission or waste.",
    eligibility: ["Industrial or notified commercial activity"],
    requiredDocuments: ["Business Proof", "Property Papers", "Address Proof"],
    estimatedDays: 30,
    fee: "Category based",
    keywords: ["pollution", "environment", "factory", "manufacturing", "waste"],
    bundledWith: ["business-registration", "fire-noc"],
  },
  {
    key: "property-mutation",
    name: "Property Mutation",
    department: "Revenue Department",
    departmentKey: "property",
    category: "Property & Land",
    summary: "Update land or property records after a sale, gift, inheritance or partition.",
    eligibility: ["Registered transfer deed", "Clear property tax dues"],
    requiredDocuments: ["Identity Proof", "Property Papers", "Address Proof"],
    estimatedDays: 30,
    fee: "State notified",
    keywords: ["mutation", "land record", "property transfer", "inheritance"],
    bundledWith: ["property-tax", "encumbrance-certificate"],
  },
  {
    key: "property-tax",
    name: "Property Tax Assessment",
    department: "Municipal Corporation",
    departmentKey: "property",
    category: "Property & Land",
    summary: "Assessment or reassessment of annual property tax for a building or plot.",
    eligibility: ["Property owner or authorised holder"],
    requiredDocuments: ["Identity Proof", "Property Papers"],
    estimatedDays: 15,
    fee: "Assessment based",
    keywords: ["property tax", "house tax", "assessment", "municipal"],
    bundledWith: ["property-mutation", "building-permission"],
  },
  {
    key: "building-permission",
    name: "Building Plan Permission",
    department: "Town & Country Planning / Municipal Corporation",
    departmentKey: "property",
    category: "Property & Land",
    summary: "Sanction of a building plan before construction or major alteration.",
    eligibility: ["Clear title over the plot", "Plan prepared by a licensed engineer or architect"],
    requiredDocuments: ["Identity Proof", "Property Papers", "Address Proof"],
    estimatedDays: 45,
    fee: "Plan area based",
    keywords: ["construction", "building plan", "sanction", "house", "layout"],
    bundledWith: ["property-tax", "fire-noc"],
  },
  {
    key: "encumbrance-certificate",
    name: "Encumbrance Certificate",
    department: "Registration & Stamps Department",
    departmentKey: "property",
    category: "Property & Land",
    summary: "Statement of registered transactions on a property over a chosen period.",
    eligibility: ["Property details and survey number available"],
    requiredDocuments: ["Identity Proof", "Property Papers"],
    estimatedDays: 7,
    fee: "Per year searched",
    keywords: ["encumbrance", "ec", "property history", "loan"],
    bundledWith: ["property-mutation"],
  },
  {
    key: "student-scholarship",
    name: "Student Scholarship",
    department: "Department of Social Welfare / Education",
    departmentKey: "welfare",
    category: "Welfare & Scholarships",
    summary: "Financial assistance for eligible students pursuing school, diploma or higher education.",
    eligibility: [
      "Student enrolled in a recognised institution",
      "Family income within the notified limit",
      "Category and academic criteria as per scheme rules",
    ],
    requiredDocuments: [
      "Identity Proof",
      "Address Proof",
      "Income Certificate",
      "Educational Certificate",
      "Bank Details",
    ],
    estimatedDays: 45,
    fee: "No fee",
    keywords: ["scholarship", "student", "education", "fees", "child", "college", "school"],
    bundledWith: ["income-certificate", "caste-certificate"],
  },
  {
    key: "income-certificate",
    name: "Income Certificate",
    department: "Revenue Department",
    departmentKey: "welfare",
    category: "Welfare & Scholarships",
    summary: "Certificate of annual family income, used as supporting proof for most welfare schemes.",
    eligibility: ["Resident of the issuing district", "Declared family income details"],
    requiredDocuments: ["Identity Proof", "Address Proof"],
    estimatedDays: 15,
    fee: "Nominal",
    keywords: ["income certificate", "annual income", "welfare", "scholarship"],
    bundledWith: ["student-scholarship", "caste-certificate"],
  },
  {
    key: "caste-certificate",
    name: "Caste / Community Certificate",
    department: "Revenue Department",
    departmentKey: "welfare",
    category: "Welfare & Scholarships",
    summary: "Community certificate required for reservation benefits in education and employment.",
    eligibility: ["Applicant belongs to a notified community", "Family records available"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Caste Certificate"],
    estimatedDays: 21,
    fee: "Nominal",
    keywords: ["caste", "community", "sc", "st", "obc", "reservation"],
    bundledWith: ["student-scholarship", "income-certificate"],
  },
  {
    key: "ration-card",
    name: "Ration Card / Food Security Enrolment",
    department: "Department of Civil Supplies",
    departmentKey: "welfare",
    category: "Welfare & Scholarships",
    summary: "Enrolment of a household for subsidised food grain entitlements.",
    eligibility: ["Household resident in the state", "Not already enrolled elsewhere"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Income Certificate", "Photograph"],
    estimatedDays: 30,
    fee: "Nominal",
    keywords: ["ration", "food", "pds", "household", "subsidy"],
    bundledWith: ["income-certificate"],
  },
  {
    key: "pension-scheme",
    name: "Social Security Pension",
    department: "Department of Social Welfare",
    departmentKey: "welfare",
    category: "Welfare & Scholarships",
    summary: "Old age, widow or disability pension for eligible applicants.",
    eligibility: ["Age or category criteria as per scheme", "Family income within limit"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Income Certificate", "Bank Details"],
    estimatedDays: 45,
    fee: "No fee",
    keywords: ["pension", "old age", "widow", "disability", "social security"],
    bundledWith: ["income-certificate"],
  },
  {
    key: "birth-certificate",
    name: "Birth Certificate",
    department: "Office of the Registrar of Births & Deaths",
    departmentKey: "identity",
    category: "Identity & Records",
    summary: "Registration or certified copy of a birth record.",
    eligibility: ["Birth registered in the local body jurisdiction"],
    requiredDocuments: ["Identity Proof", "Address Proof"],
    estimatedDays: 10,
    fee: "Nominal",
    keywords: ["birth certificate", "newborn", "registration", "child"],
    bundledWith: ["aadhaar-update"],
  },
  {
    key: "aadhaar-update",
    name: "Aadhaar Detail Update",
    department: "Unique Identification Authority",
    departmentKey: "identity",
    category: "Identity & Records",
    summary: "Update name, address, mobile number or other demographic details in the Aadhaar record.",
    eligibility: ["Existing Aadhaar holder", "Supporting proof for the field being changed"],
    requiredDocuments: ["Identity Proof", "Address Proof"],
    estimatedDays: 15,
    fee: "As notified",
    keywords: ["aadhaar", "address change", "update", "mobile"],
    bundledWith: ["birth-certificate"],
  },
  {
    key: "driving-license",
    name: "Driving Licence",
    department: "Regional Transport Office",
    departmentKey: "identity",
    category: "Identity & Records",
    summary: "Learner or permanent driving licence for the applicable vehicle class.",
    eligibility: ["Minimum age for the vehicle class", "Medical fitness where required"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Photograph", "Health Certificate"],
    estimatedDays: 30,
    fee: "Class based",
    keywords: ["driving licence", "rto", "vehicle", "learner"],
    bundledWith: ["aadhaar-update"],
  },
  {
    key: "voter-registration",
    name: "Voter Registration",
    department: "Election Commission / Electoral Registration Officer",
    departmentKey: "identity",
    category: "Identity & Records",
    summary: "Enrolment in the electoral roll for a constituency, or correction of existing entries.",
    eligibility: ["Citizen aged 18 or above", "Ordinary resident of the constituency"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Photograph"],
    estimatedDays: 30,
    fee: "No fee",
    keywords: ["voter", "election", "epic", "electoral roll"],
    bundledWith: ["aadhaar-update"],
  },
  {
    key: "marriage-registration",
    name: "Marriage Registration",
    department: "Office of the Registrar of Marriages",
    departmentKey: "identity",
    category: "Identity & Records",
    summary: "Legal registration of a marriage and issue of the marriage certificate.",
    eligibility: ["Both parties meet the legal age", "Notice period as per applicable Act"],
    requiredDocuments: ["Identity Proof", "Address Proof", "Photograph"],
    estimatedDays: 30,
    fee: "As notified",
    keywords: ["marriage", "certificate", "registrar", "wedding"],
    bundledWith: ["aadhaar-update"],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Business & Trade",
  "Taxation",
  "Licences & Permits",
  "Property & Land",
  "Welfare & Scholarships",
  "Identity & Records",
];

export const DEPARTMENT_API: Record<DepartmentKey, string> = {
  business: "/api/public/dept/business",
  tax: "/api/public/dept/tax",
  license: "/api/public/dept/license",
  property: "/api/public/dept/property",
  welfare: "/api/public/dept/welfare",
  identity: "/api/public/dept/identity",
};

export function getService(key: string): GovService | undefined {
  return SERVICES.find((s) => s.key === key);
}

export function documentsForServices(keys: string[]): DocumentType[] {
  const set = new Set<DocumentType>();
  for (const key of keys) {
    const service = getService(key);
    if (!service) continue;
    for (const doc of service.requiredDocuments) set.add(doc);
  }
  return [...set];
}

/** Keyword fallback used when the AI gateway is unavailable. */
export function matchServicesByKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const scored = SERVICES.map((service) => {
    let score = 0;
    for (const keyword of service.keywords) {
      if (lower.includes(keyword)) score += keyword.length > 5 ? 3 : 2;
    }
    if (lower.includes(service.name.toLowerCase())) score += 5;
    return { key: service.key, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const picked = scored.slice(0, 3).map((s) => s.key);
  if (picked.length === 0) return [];

  const expanded = new Set(picked);
  const first = getService(picked[0]!);
  if (first) for (const extra of first.bundledWith) expanded.add(extra);
  return [...expanded].slice(0, 5);
}
