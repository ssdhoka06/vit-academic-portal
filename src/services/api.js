/**
 * services/api.js
 * ---------------------------------------------------------------------------
 * This is the ONLY file the rest of the app talks to for data. Every export
 * here returns a Promise, shaped the way a real REST/JSON endpoint would
 * respond. Today they resolve instantly from the local generators; swapping
 * in a real backend later means replacing the bodies of these functions with
 * `fetch(...)` calls — no component, hook or page needs to change.
 * ---------------------------------------------------------------------------
 */
import { YEARS, DIVISIONS, BATCHES, getSubjects, getAllSubjectsForYear, CP_RUBRIC, EDI_RUBRIC } from "../data/constants";
import {
  getCPGroups, getEDIGroups, getFacultyMentorForBatch, getBatchOverview,
  getReviewAndSubmissionDates, getDashboardStats, getResearchPublications,
} from "../data/generators";
import { SDP_PROGRAMS, ACADEMIC_CALENDAR, ANNOUNCEMENTS, ANNOUNCEMENT_CATEGORIES } from "../data/contentData";

// simulate realistic (near-zero) network latency so loading states are exercised
const resolve = (value, ms = 120) => new Promise((res) => setTimeout(() => res(value), ms));

export const api = {
  // ---- Structure -------------------------------------------------------
  getYears: () => resolve(YEARS),
  getDivisions: () => resolve(DIVISIONS),
  getBatches: () => resolve(BATCHES),
  getYear: (yearId) => resolve(YEARS.find((y) => y.id === yearId) ?? null),

  // ---- Dashboard / Home --------------------------------------------------
  getDashboardStats: () => resolve(getDashboardStats()),
  getAcademicCalendar: () => resolve(ACADEMIC_CALENDAR),
  getAnnouncementCategories: () => resolve(ANNOUNCEMENT_CATEGORIES),
  getAnnouncements: ({ category, query, limit } = {}) => {
    let list = ANNOUNCEMENTS;
    if (category && category !== "All") list = list.filter((a) => a.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q) || a.body.toLowerCase().includes(q));
    }
    list = [...list].sort((a, b) => b.date.localeCompare(a.date));
    if (limit) list = list.slice(0, limit);
    return resolve(list);
  },

  // ---- Batch-level content ----------------------------------------------
  getBatchOverview: (yearId, division, batch) => resolve(getBatchOverview(yearId, division, batch)),
  getFacultyMentor: (yearId, division, batch) => resolve(getFacultyMentorForBatch(yearId, division, batch)),
  getSDP: (yearId) => resolve(SDP_PROGRAMS.filter((p) => p.year === yearId)),
  getAllSDP: () => resolve(SDP_PROGRAMS),
  getReviewAndSubmissionDates: (yearId) => resolve(getReviewAndSubmissionDates(yearId)),

  // Research Publication & Patent Tracking — one record per EDI group,
  // for a given semester's EDI subject in this batch.
  getResearchPublications: (yearId, division, batch, semesterIndex) => {
    const ediSubject = getSubjects(yearId, semesterIndex).find((s) => s.mode === "EDI");
    if (!ediSubject) return resolve([]);
    return resolve(getResearchPublications(yearId, division, ediSubject, semesterIndex, batch));
  },

  // ---- Semester / Subject navigation -------------------------------------
  getSemesterSubjects: (yearId, semesterIndex) => resolve(getSubjects(yearId, semesterIndex)),
  getAllSubjects: (yearId) => resolve(getAllSubjectsForYear(yearId)),
  getCPRubric: () => resolve(CP_RUBRIC),
  getEDIRubric: () => resolve(EDI_RUBRIC),

  // ---- Subject-level project groups --------------------------------------
  getSubjectGroups: (yearId, division, subject, semesterIndex, batch = null) => {
    const groups = subject.mode === "EDI"
      ? getEDIGroups(yearId, division, subject, semesterIndex, batch)
      : getCPGroups(yearId, division, subject, semesterIndex, batch);
    return resolve(groups);
  },
};

export default api;