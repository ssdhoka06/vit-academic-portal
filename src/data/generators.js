/**
 * generators.js
 * ---------------------------------------------------------------------------
 * Deterministic ("seeded") mock-data generation. The same
 * Year + Division + Subject + Group-number always resolves to the same
 * title, members, mentor and dates within a session — so the UI feels like
 * it's backed by a real, stable dataset rather than re-randomising on every
 * render.
 *
 * This is the layer to eventually delete in favour of real API responses;
 * everything above it (components) only talks to services/api.js, which
 * mirrors these function signatures as async calls.
 * ---------------------------------------------------------------------------
 */
import {
  YEARS, DIVISIONS, BATCHES, STUDENTS_PER_DIVISION, GROUP_SIZE, GROUPS_PER_DIVISION,
  getAllSubjectsForYear, getSubjects, CP_PHASES, CP_STATUSES, EDI_STAGES,
  EDI_EVALUATION_STATUSES, EDI_DELIVERABLES_POOL, RESEARCH_DOMAIN_POOL,
} from "./constants";
import {
  FIRST_NAMES, LAST_NAMES, FACULTY_POOL, HOD_FACULTY, CP_TITLE_POOLS, EDI_THEME_POOLS, CP_DESCRIPTION_TEMPLATES,
  CONFERENCE_JOURNAL_POOL, PAPER_TITLE_TEMPLATES, REVIEW_COMMENTS_POOL, DOCUMENT_POOL,
} from "./pools";
import { EDI_GROUP_FACULTY_OVERRIDES, CP_SUBJECT_FACULTY_OVERRIDES, getGroupCount } from "./facultyOverrides";

/* ------------------------------------------------------------------ *
 * Seeding primitives
 * ------------------------------------------------------------------ */
export function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}
export function pick(pool, seed) {
  return pool[seed % pool.length];
}
function studentName(seed) {
  return `${pick(FIRST_NAMES, seed)} ${pick(LAST_NAMES, seed >> 3)}`;
}

/**
 * Splits a division's full group list into sequential batch blocks —
 * Batch 1 gets the first N groups, Batch 2 the next N, and so on — rather
 * than interleaving group numbers across batches. This matches how batches
 * are actually assigned on the roster (Group 1-5 = B1, 6-10 = B2, 11-15 = B3
 * for a 15-group division split three ways), so group numbers stay
 * contiguous within a batch instead of scattering across it.
 */
function filterByBatch(items, batch) {
  if (!batch) return items;
  const idx = BATCHES.indexOf(batch);
  if (idx === -1) return items;
  const perBatch = Math.ceil(items.length / BATCHES.length);
  return items.filter((_, i) => Math.floor(i / perBatch) === idx);
}

// Index of the first item that falls in a given batch, under the same
// sequential-block scheme filterByBatch uses (so overrides land in the
// batch they're meant for).
function firstIndexInBatch(totalLength, batch) {
  const idx = BATCHES.indexOf(batch);
  if (idx === -1) return -1;
  const perBatch = Math.ceil(totalLength / BATCHES.length);
  const pos = idx * perBatch;
  return pos < totalLength ? pos : -1;
}

/* ------------------------------------------------------------------ *
 * Term calendar — Semester 1 is the currently running odd semester
 * (AY 2026-27), Semester 2 is the upcoming even semester.
 * ------------------------------------------------------------------ */
const TERM_WINDOWS = {
  1: { start: "2026-08-05", end: "2026-12-19" },
  2: { start: "2027-01-06", end: "2027-05-15" },
};
function addDays(iso, days) {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function dateWithinTerm(semesterIndex, fraction, jitterDays = 0) {
  const { start, end } = TERM_WINDOWS[semesterIndex];
  const len = Math.round((new Date(end) - new Date(start)) / 86400000);
  return addDays(start, Math.round(len * fraction) + jitterDays);
}
export function isPastDate(iso) {
  return new Date(iso + "T00:00:00") < new Date();
}
export function formatDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function subjectSchedule(semesterIndex, subjectCode, mode) {
  const seed = hashStr(`${subjectCode}-sched`);
  const jitter = (seed % 11) - 5; // -5..+5 day spread per subject
  if (mode === "EDI") {
    return {
      midSemReviewDate: dateWithinTerm(semesterIndex, 0.45, jitter),
      endSemReviewDate: dateWithinTerm(semesterIndex, 0.95, jitter),
      deliverableDueDate: dateWithinTerm(semesterIndex, 0.62, jitter),
    };
  }
  return {
    midSemReviewDate: dateWithinTerm(semesterIndex, 0.4, jitter),
    submissionDate: dateWithinTerm(semesterIndex, 0.8, jitter),
    endSemReviewDate: dateWithinTerm(semesterIndex, 0.93, jitter),
  };
}

/* ------------------------------------------------------------------ *
 * Faculty
 * ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ *
 * Faculty
 * ------------------------------------------------------------------ */
// The batch's "Faculty Mentor" is the department's Head of Department —
// a single, real, fixed point of contact (see HOD_FACULTY in pools.js) —
// rather than a name drawn from the general faculty pool. Kept as a
// function (instead of exporting the constant directly) so the call sites
// and signature don't need to change if this is ever made batch-specific
// again later.
export function getFacultyMentorForBatch(_yearId, _division, _batch) {
  return HOD_FACULTY;
}

/* ------------------------------------------------------------------ *
 * Course Project (CP) groups — 15 per division per subject
 * ------------------------------------------------------------------ */
export function getCPGroups(yearId, division, subject, semesterIndex, batch = null) {
  const pool = CP_TITLE_POOLS[subject.domain] || CP_TITLE_POOLS.python;
  const schedule = subjectSchedule(semesterIndex, subject.code, "CP");
  // Department-supplied faculty override: when set, this single guide
  // covers every group (all batches) for this subject/division, rather
  // than each group getting an independently-picked faculty member.
  const o = CP_SUBJECT_FACULTY_OVERRIDES[yearId]?.[division]?.[subject.code];
  const subjectOverride = o ? { name: o.name, designation: o.designation, dept: "CSE (AI & ML)" } : null;
  const groups = [];

  for (let g = 1; g <= GROUPS_PER_DIVISION; g++) {
    const seedBase = hashStr(`${yearId}-${division}-${subject.code}-G${g}`);
    const members = Array.from({ length: GROUP_SIZE }, (_, m) => studentName(seedBase + m * 17 + 3));
    const progress = 5 + (seedBase % 91); // 5-95
    let status;
    if (progress < 20) status = CP_STATUSES[0];
    else if (progress < 60) status = CP_STATUSES[1];
    else if (progress < 90) status = CP_STATUSES[2];
    else status = CP_STATUSES[3];
    const phaseIdx = Math.min(CP_PHASES.length - 1, Math.floor((progress / 100) * CP_PHASES.length));
    const milestone = status === CP_STATUSES[3] ? "Project closed out — awaiting final grading" : CP_PHASES[phaseIdx];

    groups.push({
      id: `${subject.code}-${division}-G${String(g).padStart(2, "0")}`,
      teamNumber: g,
      code: `${division}${String(g).padStart(2, "0")}`,
      subjectCode: subject.code,
      courseName: subject.name,
      title: pick(pool, seedBase),
      description: pick(CP_DESCRIPTION_TEMPLATES, seedBase),
      members,
      facultyGuide: subjectOverride || pick(FACULTY_POOL, hashStr(`${yearId}-${division}-${subject.code}-G${g}-fac`)),
      status,
      progress,
      milestone,
      submissionDate: schedule.submissionDate,
      midSemReviewDate: schedule.midSemReviewDate,
      endSemReviewDate: schedule.endSemReviewDate,
    });
  }

  return filterByBatch(groups, batch);
}

/* ------------------------------------------------------------------ *
 * EDI groups — 15 per division per EDI subject
 * ------------------------------------------------------------------ */
function ediFacultyOverride(yearId, division, subjectCode, groupNumber) {
  const o = EDI_GROUP_FACULTY_OVERRIDES[yearId]?.[division]?.[subjectCode]?.[groupNumber];
  return o ? { name: o.name, designation: o.designation, dept: "CSE (AI & ML)" } : null;
}

export function getEDIGroups(yearId, division, subject, semesterIndex, batch = null) {
  const pool = EDI_THEME_POOLS[subject.domain] || EDI_THEME_POOLS.ediApplied;
  const schedule = subjectSchedule(semesterIndex, subject.code, "EDI");
  const groupCount = getGroupCount(yearId, division, subject.code, GROUPS_PER_DIVISION);
  const groups = [];

  for (let g = 1; g <= groupCount; g++) {
    const seedBase = hashStr(`${yearId}-${division}-${subject.code}-EDI-G${g}`);
    const members = Array.from({ length: GROUP_SIZE }, (_, m) => studentName(seedBase + m * 19 + 7));
    const theme = pick(pool, seedBase);
    const stageIdx = seedBase % EDI_STAGES.length;
    const deliverables = [
      EDI_DELIVERABLES_POOL[(seedBase + 0) % EDI_DELIVERABLES_POOL.length],
      EDI_DELIVERABLES_POOL[(seedBase + 3) % EDI_DELIVERABLES_POOL.length],
      EDI_DELIVERABLES_POOL[(seedBase + 6) % EDI_DELIVERABLES_POOL.length],
    ];

    groups.push({
      id: `${subject.code}-${division}-EDI-G${String(g).padStart(2, "0")}`,
      teamNumber: g,
      code: `${division}${String(g).padStart(2, "0")}`,
      subjectCode: subject.code,
      courseName: subject.name,
      title: theme.title,
      problemStatement: theme.problemStatement,
      members,
      facultyMentor: ediFacultyOverride(yearId, division, subject.code, g) || pick(FACULTY_POOL, hashStr(`${yearId}-${division}-${subject.code}-EDI-G${g}-fac`)),
      currentStage: EDI_STAGES[stageIdx],
      deliverables,
      evaluationStatus: pick(EDI_EVALUATION_STATUSES, seedBase + g),
      midSemReviewDate: schedule.midSemReviewDate,
      endSemReviewDate: schedule.endSemReviewDate,
      deliverableDueDate: schedule.deliverableDueDate,
    });
  }

  return filterByBatch(groups, batch);
}

/* ------------------------------------------------------------------ *
 * Research Publication & Patent Tracking — one record per EDI group.
 * Reuses the same seed base as getEDIGroups so the same team/members/
 * faculty guide line up between the EDI tab and this dashboard.
 * ------------------------------------------------------------------ */
function mockDoi(indexing, seed) {
  if (indexing === "IEEE") return `10.1109/ACCESS.2026.${3000000 + (seed % 900000)}`;
  if (indexing === "Springer") return `10.1007/s${10000 + (seed % 89999)}-026-${1000 + (seed % 8999)}-x`;
  return `10.5281/zenodo.${7000000 + (seed % 900000)}`;
}

export function getResearchPublications(yearId, division, subject, semesterIndex, batch = null) {
  const themePool = EDI_THEME_POOLS[subject.domain] || EDI_THEME_POOLS.ediApplied;
  const domainPool = RESEARCH_DOMAIN_POOL[subject.domain] || RESEARCH_DOMAIN_POOL.ediApplied;
  const groupCount = getGroupCount(yearId, division, subject.code, GROUPS_PER_DIVISION);
  const records = [];

  for (let g = 1; g <= groupCount; g++) {
    const seedBase = hashStr(`${yearId}-${division}-${subject.code}-EDI-G${g}`); // same as getEDIGroups
    const paperSeed = hashStr(`${yearId}-${division}-${subject.code}-EDI-G${g}-paper`);
    const jitter = (paperSeed % 9) - 4;

    const members = Array.from({ length: GROUP_SIZE }, (_, m) => studentName(seedBase + m * 19 + 7));
    const theme = pick(themePool, seedBase);
    const facultyGuide = ediFacultyOverride(yearId, division, subject.code, g) || pick(FACULTY_POOL, hashStr(`${yearId}-${division}-${subject.code}-EDI-G${g}-fac`));
    const researchDomain = pick(domainPool, paperSeed);
    const venue = pick(CONFERENCE_JOURNAL_POOL, paperSeed);
    const paperTitle = pick(PAPER_TITLE_TEMPLATES, paperSeed)(theme.title);
    const abstract = `This paper presents ${theme.title.toLowerCase()}, addressing the problem that ${theme.problemStatement.charAt(0).toLowerCase()}${theme.problemStatement.slice(1)} We describe the system design, an early prototype, and a preliminary evaluation, and discuss considerations for real-world deployment.`;

    // --- lifecycle stage roll ---------------------------------------
    const roll = paperSeed % 100;
    let stageIndex; // 0 draft,1 submitted,2 review,3 revision,4 accepted,5 camera-ready,6 published
    let rejected = false;
    if (roll < 8) stageIndex = 0;
    else if (roll < 20) stageIndex = 1;
    else if (roll < 34) stageIndex = 2;
    else if (roll < 46) stageIndex = 3;
    else if (roll < 54) { stageIndex = 2; rejected = true; }
    else if (roll < 66) stageIndex = 4;
    else if (roll < 78) stageIndex = 5;
    else stageIndex = 6;

    const patentRecommended = stageIndex === 6 && (paperSeed % 100) < 35;
    const currentStatus = rejected ? "Rejected"
      : stageIndex === 0 ? "Drafting"
      : stageIndex === 1 ? "Submitted"
      : stageIndex === 2 ? "Under Review"
      : stageIndex === 3 ? "Revision Requested"
      : stageIndex === 4 ? "Accepted"
      : stageIndex === 5 ? "Camera Ready"
      : patentRecommended ? "Patent Filing" : "Published";

    const submissionDate = stageIndex >= 1 || rejected ? dateWithinTerm(semesterIndex, 0.5, jitter) : null;
    const acceptanceRejectionDate = rejected ? dateWithinTerm(semesterIndex, 0.62, jitter)
      : stageIndex >= 4 ? dateWithinTerm(semesterIndex, 0.62, jitter) : null;
    const presentationDate = stageIndex >= 5 ? dateWithinTerm(semesterIndex, 0.85, jitter) : null;
    const publicationDate = stageIndex === 6 ? dateWithinTerm(semesterIndex, 0.97, jitter) : null;
    const doi = stageIndex === 6 ? mockDoi(venue.indexing, paperSeed) : null;

    const reviewerComments = rejected ? pick(REVIEW_COMMENTS_POOL.rejected, paperSeed)
      : stageIndex === 0 ? "Not yet submitted."
      : stageIndex === 1 ? "Awaiting reviewer assignment."
      : stageIndex === 2 ? pick(REVIEW_COMMENTS_POOL.underReview, paperSeed)
      : stageIndex === 3 ? pick(REVIEW_COMMENTS_POOL.revision, paperSeed)
      : pick(REVIEW_COMMENTS_POOL.accepted, paperSeed);

    const revisionRequested = stageIndex === 3;
    const cameraReadyStatus = stageIndex >= 5 ? "Submitted" : stageIndex === 4 ? "Pending" : "Not Applicable";
    const registrationFeeStatus = stageIndex >= 5 ? "Paid" : stageIndex === 4 ? "Pending" : "Not Applicable";
    const copyrightFormStatus = stageIndex >= 5 ? "Submitted" : stageIndex === 4 ? "Pending" : "Not Applicable";

    const aiSimilarityPercent = stageIndex === 0 ? null : 3 + (paperSeed % 26);
    const plagiarismPercent = stageIndex === 0 ? null : 1 + ((paperSeed >> 2) % 14);

    const patentRecommendationStatus = stageIndex < 6 ? "Not Evaluated" : patentRecommended ? "Recommended" : "Not Recommended";
    const patentFilingStatus = !patentRecommended ? "Not Applicable" : pick(
      ["Draft in Preparation", "Filed — Provisional", "Filed — Complete", "Under Examination"], paperSeed + g,
    );

    const deadlines = [];
    if (stageIndex === 0) deadlines.push({ label: "Full paper submission deadline", date: dateWithinTerm(semesterIndex, 0.55, jitter) });
    else if (stageIndex === 1 || (stageIndex === 2 && !rejected)) deadlines.push({ label: "Review decision expected", date: dateWithinTerm(semesterIndex, 0.6, jitter) });
    else if (stageIndex === 3) deadlines.push({ label: "Revised manuscript due", date: dateWithinTerm(semesterIndex, 0.58, jitter) });
    else if (stageIndex === 4) deadlines.push({ label: "Camera-ready & registration deadline", date: dateWithinTerm(semesterIndex, 0.75, jitter) });
    else if (stageIndex === 5) deadlines.push({ label: "Presentation date", date: presentationDate });
    else if (rejected) deadlines.push({ label: "Resubmission target (alternate venue)", date: dateWithinTerm(semesterIndex, 0.85, jitter) });
    else if (patentRecommended && patentFilingStatus === "Draft in Preparation") deadlines.push({ label: "Provisional patent filing deadline", date: dateWithinTerm(semesterIndex, 0.99, jitter) });

    const documents = [DOCUMENT_POOL.draft];
    if (stageIndex >= 1) documents.push(DOCUMENT_POOL.submission, DOCUMENT_POOL.similarity);
    if (stageIndex === 3) documents.push(DOCUMENT_POOL.reviewerComments);
    if (rejected) documents.push(DOCUMENT_POOL.rejection);
    else if (stageIndex >= 4) documents.push(DOCUMENT_POOL.acceptance);
    if (stageIndex >= 5) documents.push(DOCUMENT_POOL.cameraReady, DOCUMENT_POOL.copyright, DOCUMENT_POOL.registration);
    if (stageIndex === 6) documents.push(DOCUMENT_POOL.published);

    records.push({
      id: `${subject.code}-${division}-RP-G${String(g).padStart(2, "0")}`,
      teamNumber: g,
      code: `${division}${String(g).padStart(2, "0")}`,
      subjectCode: subject.code,
      courseName: subject.name,
      members,
      facultyGuide,
      paperTitle,
      abstract,
      researchDomain,
      currentStatus,
      targetVenue: venue,
      submissionDate,
      acceptanceRejectionDate,
      reviewerComments,
      revisionRequested,
      cameraReadyStatus,
      registrationFeeStatus,
      copyrightFormStatus,
      presentationDate,
      publicationDate,
      doi,
      aiSimilarityPercent,
      plagiarismPercent,
      patentRecommendationStatus,
      patentFilingStatus,
      deadlines,
      documents,
    });
  }

  return filterByBatch(records, batch);
}

/* ------------------------------------------------------------------ *
 * Batch overview + aggregated review/submission dates
 * ------------------------------------------------------------------ */
export function getBatchOverview(yearId, division, batch) {
  const year = YEARS.find((y) => y.id === yearId);
  const mentor = getFacultyMentorForBatch(yearId, division, batch);
  const subjects = getAllSubjectsForYear(yearId);
  const cpSubjects = subjects.filter((s) => s.mode === "CP");
  const ediSubjects = subjects.filter((s) => s.mode === "EDI");
  const seed = hashStr(`${yearId}-${division}-${batch}-overview`);

  return {
    year, division, batch, mentor,
    strength: Math.round(STUDENTS_PER_DIVISION / BATCHES.length),
    cpSubjectCount: cpSubjects.length,
    ediSubjectCount: ediSubjects.length,
    groupsPerSubject: Math.round(GROUPS_PER_DIVISION / BATCHES.length),
    overallProgress: 25 + (seed % 60),
    summary: `Batch ${batch} of Division ${division}, ${year.label}, is currently progressing through ${
      year.id === "fy" ? "foundational Design Thinking, SDP onboarding and its first course projects" : "EDI prototyping, subject-wise course projects and SDP skill tracks"
    } for the ${year.semesterLabel} term.`,
  };
}

export function getReviewAndSubmissionDates(yearId) {
  const reviews = [];
  const submissions = [];
  [1, 2].forEach((semIdx) => {
    getSubjects(yearId, semIdx).forEach((subject) => {
      if (subject.mode !== "CP" && subject.mode !== "EDI") return; // THEORY subjects carry no project tracking
      const sched = subjectSchedule(semIdx, subject.code, subject.mode);
      if (subject.mode === "CP") {
        reviews.push({ label: `${subject.name} — Mid-Sem Review`, date: sched.midSemReviewDate });
        reviews.push({ label: `${subject.name} — End-Sem Review`, date: sched.endSemReviewDate });
        submissions.push({ label: `${subject.name} — Course Project Submission`, date: sched.submissionDate });
      } else {
        reviews.push({ label: `${subject.name} — Mid-Sem Review`, date: sched.midSemReviewDate });
        reviews.push({ label: `${subject.name} — End-Sem Review`, date: sched.endSemReviewDate });
        submissions.push({ label: `${subject.name} — Deliverable Submission`, date: sched.deliverableDueDate });
      }
    });
  });
  reviews.sort((a, b) => a.date.localeCompare(b.date));
  submissions.sort((a, b) => a.date.localeCompare(b.date));
  return { reviews, submissions };
}

/* ------------------------------------------------------------------ *
 * Dashboard-wide statistics
 * ------------------------------------------------------------------ */
export function getDashboardStats() {
  let totalCPGroups = 0;
  let totalEDIGroups = 0;
  YEARS.forEach((y) => {
    const subjects = getAllSubjectsForYear(y.id);
    subjects.forEach((s) => {
      DIVISIONS.forEach((d) => {
        const count = getGroupCount(y.id, d, s.code, GROUPS_PER_DIVISION);
        if (s.mode === "CP") totalCPGroups += count;
        else if (s.mode === "EDI") totalEDIGroups += count;
      });
    });
  });
  return {
    totalStudents: YEARS.length * DIVISIONS.length * STUDENTS_PER_DIVISION,
    totalDivisions: YEARS.length * DIVISIONS.length,
    totalCPGroups,
    totalEDIGroups,
    totalProjectGroups: totalCPGroups + totalEDIGroups,
    facultyMentors: FACULTY_POOL.length,
  };
}