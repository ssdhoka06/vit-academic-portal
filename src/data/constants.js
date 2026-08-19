/**
 * constants.js
 * ---------------------------------------------------------------------------
 * The single source of truth for the academic hierarchy: Years, Divisions,
 * Batches and the semester-wise subject curriculum.
 *
 * Subject lists for FY / SY / TY-Semester-1 follow the curriculum supplied by
 * the department. TY-Semester-2 and Final Year (BE) subjects are grounded in
 * VIT Pune's published CSE (AI & ML) course structure (AY 2025-26, Modules
 * VI-VIII) — Software Engineering / Cyber Security & Blockchain / Deep
 * Learning for TY-Sem2, and the Generative AI / Vision / Major-Project track
 * for Final Year, where the capstone Major Project stands in for the
 * dedicated "Engineering Design & Innovation" course that FY/SY/TY carry.
 *
 * Every subject that is NOT flagged `mode: "EDI"` is a Course-Project (CP)
 * subject. Exactly one subject per semester is flagged `mode: "EDI"` — this
 * mirrors the real curriculum, where Engineering Design & Innovation (or, in
 * Final Year, the Major Project) is itself a distinct credited subject.
 * ---------------------------------------------------------------------------
 */

export const YEARS = [
  { id: "fy", label: "First Year", short: "FY", semesterLabel: "Semester I – II", semesters: [1, 2] },
  { id: "sy", label: "Second Year", short: "SY", semesterLabel: "Semester III – IV", semesters: [1, 2] },
  { id: "ty", label: "Third Year", short: "TY", semesterLabel: "Semester V – VI", semesters: [1, 2] },
  { id: "be", label: "Final Year", short: "BE", semesterLabel: "Semester VII – VIII", semesters: [1, 2] },
];

export const DIVISIONS = ["A", "B", "C", "D", "E", "F"];
export const BATCHES = ["B1", "B2", "B3"];

export const STUDENTS_PER_DIVISION = 75;
export const GROUP_SIZE = 5;
export const GROUPS_PER_DIVISION = 15;

// Human-readable semester roman numerals per year (for display only)
export const SEMESTER_ROMAN = {
  fy: { 1: "Semester I", 2: "Semester II" },
  sy: { 1: "Semester III", 2: "Semester IV" },
  ty: { 1: "Semester V", 2: "Semester VI" },
  be: { 1: "Semester VII", 2: "Semester VIII" },
};

/**
 * SUBJECTS[yearId][semesterIndex] -> array of subject descriptors
 *   code        unique short code, used as a data key everywhere
 *   name        display name
 *   credits     nominal credit value (cosmetic, keeps it realistic)
 *   mode        "CP" (course project), "EDI", or "THEORY" (elective/theory
 *               subject with no project tracked in this app — used for
 *               Final Year's non-EDI subjects, which have no Course Project)
 *   domain      key into the CP_TITLE_POOLS / EDI_THEME_POOLS lookup tables
 */
export const SUBJECTS = {
  fy: {
    1: [
      { code: "FY101", name: "Python for Engineers", credits: 3, mode: "CP", domain: "python" },
      { code: "FY102", name: "Applied Electromechanics", credits: 3, mode: "CP", domain: "electromech" },
      { code: "FY103", name: "Data Analysis", credits: 3, mode: "CP", domain: "dataAnalysis" },
      { code: "FY104", name: "Calculus and Statistics", credits: 3, mode: "CP", domain: "calcStats" },
      { code: "FY105", name: "Engineering Design & Innovation – 1", credits: 2, mode: "EDI", domain: "ediFoundation" },
    ],
    2: [
      { code: "FY201", name: "Problem Solving & Programming", credits: 3, mode: "CP", domain: "problemSolving" },
      { code: "FY202", name: "Linear Algebra and Differential Equations", credits: 3, mode: "CP", domain: "linearAlgebra" },
      { code: "FY203", name: "Web Development", credits: 3, mode: "CP", domain: "webDev" },
      { code: "FY204", name: "Environmental Studies", credits: 2, mode: "CP", domain: "envStudies" },
      { code: "FY205", name: "Engineering Design & Innovation – 2", credits: 2, mode: "EDI", domain: "ediFoundation" },
    ],
  },
  sy: {
    1: [
      { code: "SY301", name: "Fundamentals of Data Structures", credits: 3, mode: "CP", domain: "fds" },
      { code: "SY302", name: "Database Management Systems", credits: 3, mode: "CP", domain: "dbms" },
      { code: "SY303", name: "Object Oriented Programming", credits: 3, mode: "CP", domain: "oop" },
      { code: "SY304", name: "Augmented Reality & Virtual Reality (AR/VR)", credits: 3, mode: "CP", domain: "arvr" },
      { code: "SY305", name: "Engineering Design & Innovation – 3", credits: 2, mode: "EDI", domain: "ediApplied" },
    ],
    2: [
      { code: "SY401", name: "Advanced Data Structures", credits: 3, mode: "CP", domain: "ads" },
      { code: "SY402", name: "Artificial Intelligence", credits: 3, mode: "CP", domain: "ai" },
      { code: "SY403", name: "Operating Systems", credits: 3, mode: "CP", domain: "os" },
      { code: "SY404", name: "Internet of Things", credits: 3, mode: "CP", domain: "iot" },
      { code: "SY405", name: "Engineering Design & Innovation – 4", credits: 2, mode: "EDI", domain: "ediApplied" },
    ],
  },
  ty: {
    1: [
      { code: "TY501", name: "Computer Network Technology", credits: 4, mode: "CP", domain: "cn" },
      { code: "TY502", name: "Cloud Computing", credits: 4, mode: "CP", domain: "cloud" },
      { code: "TY503", name: "Machine Learning", credits: 4, mode: "CP", domain: "ml" },
      { code: "TY504", name: "Design and Analysis of Algorithms", credits: 4, mode: "CP", domain: "daa" },
      { code: "TY505", name: "Engineering Design & Innovation – 5", credits: 6, mode: "EDI", domain: "ediCapstone" },
    ],
    2: [
      { code: "TY601", name: "Software Engineering", credits: 4, mode: "CP", domain: "se" },
      { code: "TY602", name: "Cyber Security and Blockchain", credits: 4, mode: "CP", domain: "cyber" },
      { code: "TY603", name: "Deep Learning", credits: 4, mode: "CP", domain: "dl" },
      { code: "TY604", name: "Engineering Design & Innovation – 6", credits: 6, mode: "EDI", domain: "ediCapstone" },
    ],
  },
  be: {
    1: [
      { code: "BE701", name: "Generative AI", credits: 2, mode: "THEORY", domain: "genai" },
      { code: "BE702", name: "Deep Learning for Computer Vision", credits: 2, mode: "THEORY", domain: "cv" },
      { code: "BE703", name: "Major Project – Phase I", credits: 9, mode: "EDI", domain: "majorProject" },
    ],
    2: [
      { code: "BE801", name: "Agentic AI", credits: 2, mode: "THEORY", domain: "agentic" },
      { code: "BE802", name: "Parallel Computer Architecture", credits: 2, mode: "THEORY", domain: "pca" },
      { code: "BE803", name: "Major Project – Phase II", credits: 10, mode: "EDI", domain: "majorProject" },
    ],
  },
};

export function getSubjects(yearId, semesterIndex) {
  return SUBJECTS[yearId]?.[semesterIndex] ?? [];
}

export function getAllSubjectsForYear(yearId) {
  return [...getSubjects(yearId, 1), ...getSubjects(yearId, 2)];
}

export const CP_PHASES = [
  "Topic Finalization", "Requirement Analysis", "Design & Architecture",
  "Implementation – Sprint 1", "Implementation – Sprint 2", "Testing & Integration",
  "Documentation", "Final Presentation",
];

export const CP_STATUSES = ["Not Started", "In Progress", "Under Review", "Completed"];

export const CP_RUBRIC = [
  { criterion: "Problem Formulation", weight: 10 },
  { criterion: "Design & Implementation", weight: 35 },
  { criterion: "Testing & Correctness", weight: 20 },
  { criterion: "Documentation", weight: 15 },
  { criterion: "Viva / Presentation", weight: 20 },
];

export const EDI_STAGES = [
  "Problem Identification", "Literature Survey & Need Analysis", "Concept Design & Mentor Approval",
  "Prototype Development", "Mid-Sem Review", "Testing & Iteration", "Final Documentation", "End-Sem Review & Demo",
];

export const EDI_EVALUATION_STATUSES = ["Yet to Start", "Prototype in Progress", "Ready for Mid-Sem", "Ready for End-Sem", "Evaluated"];

export const EDI_RUBRIC = [
  { criterion: "Problem Identification & Need Statement", weight: 15 },
  { criterion: "Design Novelty & Feasibility", weight: 20 },
  { criterion: "Prototype / Proof of Concept", weight: 25 },
  { criterion: "Testing & Validation", weight: 15 },
  { criterion: "Documentation & Report", weight: 10 },
  { criterion: "Viva & Presentation", weight: 15 },
];

export const EDI_DELIVERABLES_POOL = [
  "Problem statement & need analysis document", "Literature survey report", "Concept design sketches",
  "Working prototype", "Circuit / system schematic", "Test plan & validation report",
  "Final project report", "Poster for design showcase", "Source code repository", "User / field-test feedback log",
];

/**
 * Research Publication & Patent Tracking (the "DT" module)
 * ---------------------------------------------------------------------------
 * Departmental workflow: every EDI project group is expected to write up
 * its work as a research paper and submit it to an IEEE / Springer / Scopus
 * -indexed conference or journal. If the paper is accepted and the faculty
 * guide judges the work sufficiently novel, the group may be advised to
 * file a patent. This module tracks that lifecycle end-to-end, one record
 * per EDI group.
 * ---------------------------------------------------------------------------
 */
export const PUBLICATION_STATUSES = [
  "Drafting", "Submitted", "Under Review", "Revision Requested",
  "Accepted", "Rejected", "Camera Ready", "Published", "Patent Filing",
];

export const INDEXING_OPTIONS = ["IEEE", "Springer", "Scopus", "Other"];

export const REGISTRATION_FEE_STATUSES = ["Not Applicable", "Pending", "Paid"];
export const COPYRIGHT_FORM_STATUSES = ["Not Applicable", "Pending", "Submitted"];
export const CAMERA_READY_STATUSES = ["Not Applicable", "Pending", "Submitted"];
export const PATENT_RECOMMENDATION_STATUSES = ["Not Evaluated", "Not Recommended", "Recommended"];
export const PATENT_FILING_STATUSES = [
  "Not Applicable", "Draft in Preparation", "Filed — Provisional", "Filed — Complete", "Under Examination",
];

// Research domain, by the EDI subject's tier (ties the paper's field to the
// scope of the underlying EDI project — a FY sensor build vs. a Final Year
// major project sit in very different research domains).
export const RESEARCH_DOMAIN_POOL = {
  ediFoundation: ["Embedded Systems", "IoT & Sensor Networks", "Assistive Technology", "Consumer Electronics"],
  ediApplied: ["Human-Computer Interaction", "Smart Cities", "Healthcare Technology", "Applied IoT"],
  ediCapstone: ["Artificial Intelligence", "Smart Infrastructure", "Sustainable Computing", "Applied Machine Learning"],
  majorProject: ["Machine Learning & AI", "Computer Vision", "NLP & Language Models", "Cybersecurity", "Distributed Systems"],
};