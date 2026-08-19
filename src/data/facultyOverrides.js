/**
 * facultyOverrides.js
 * ---------------------------------------------------------------------------
 * Explicit, department-supplied faculty assignments that override the
 * deterministically-picked defaults for specific real Year + Division +
 * Subject combinations, straight from official rosters.
 * ---------------------------------------------------------------------------
 */

/**
 * CP_SUBJECT_FACULTY_OVERRIDES
 * ---------------------------------------------------------------------------
 * Department-supplied faculty guide for an ENTIRE Course-Project subject
 * within a division — every one of the groups (across all three batches)
 * for that subject share this single named guide, rather than each group
 * getting an independently-picked faculty member.
 *
 * Shape: CP_SUBJECT_FACULTY_OVERRIDES[yearId][division][subjectCode] -> { name, designation }
 * ---------------------------------------------------------------------------
 */
export const CP_SUBJECT_FACULTY_OVERRIDES = {
  fy: {
    E: {
      FY101: { name: "Prof. Supriya Telsang", designation: "Assistant Professor" }, // Python for Engineers
      FY102: { name: "Prof. Kalpesh Joshi", designation: "Assistant Professor" }, // Applied Electromechanics
      FY103: { name: "Prof. Sayali Shinde", designation: "Assistant Professor" }, // Data Analysis
      FY104: { name: "Prof. Shital Sobale", designation: "Assistant Professor" }, // Calculus and Statistics
      FY201: { name: "Prof. Amruta Bhawarthi", designation: "Assistant Professor" }, // Problem Solving & Programming
      FY202: { name: "Prof. Shital Sobale", designation: "Assistant Professor" }, // Linear Algebra and Differential Equations
      FY203: { name: "Prof. S. M. Kolekar", designation: "Assistant Professor" }, // Web Development
    },
  },
  sy: {
    E: {
      SY301: { name: "Dr. Jyoti Kanjalkar", designation: "Professor" }, // Fundamentals of Data Structures
      SY302: { name: "Prof. Prajakta Musale", designation: "Assistant Professor" }, // Database Management Systems
      SY303: { name: "Prof. Geeta Zaware", designation: "Assistant Professor" }, // Object Oriented Programming
      SY304: { name: "Prof. Swapnil Shinde", designation: "Assistant Professor" }, // AR/VR
      SY401: { name: "Dr. Kailash Shaw", designation: "Professor" }, // Advanced Data Structures
      SY402: { name: "Prof. Trupti Deshmukh", designation: "Assistant Professor" }, // Artificial Intelligence
      SY403: { name: "Prof. Ashlesha Sawant", designation: "Assistant Professor" }, // Operating Systems
      SY404: { name: "Prof. Vanita Babanne", designation: "Assistant Professor" }, // Internet of Things
    },
  },
  ty: {
    E: {
      TY501: { name: "Prof. Dipti Gaikwad", designation: "Assistant Professor" }, // Computer Network Technology
      TY502: { name: "Prof. Sneha Patil", designation: "Assistant Professor" }, // Cloud Computing
      TY503: { name: "Prof. Kalyani Ghuge", designation: "Assistant Professor" }, // Machine Learning
      TY504: { name: "Dr. Ravishankar Bhaganagare", designation: "Professor" }, // Design and Analysis of Algorithms
    },
  },
};

/**
 * EDI_GROUP_FACULTY_OVERRIDES
 * ---------------------------------------------------------------------------
 * Department-supplied, group-wise EDI faculty-guide assignments for a
 * specific Year + Division + EDI subject, straight from the official roster.
 * Unlike CP_SUBJECT_FACULTY_OVERRIDES (one guide for the whole subject),
 * this assigns a different guide per individual group.
 *
 * TY Division E and SY Division E both use the SAME guide roster for both
 * of that year's EDI subjects (Sem 1 and Sem 2) — the department confirmed
 * guides don't change between semesters for these divisions — so each
 * roster below is defined once and referenced under both subject codes.
 *
 * Shape: EDI_GROUP_FACULTY_OVERRIDES[yearId][division][subjectCode][groupNumber] -> { name, designation }
 * ---------------------------------------------------------------------------
 */

// TY, Division E — 18 groups (this division's real roster runs to 18, not
// the app's usual 15; see GROUP_COUNT_OVERRIDES below, which widens the
// generator loop for exactly this division/subject pair).
const TY_E_EDI_GUIDES = {
  1: { name: "Prof. Kalyani Ghuge", designation: "Assistant Professor" },
  2: { name: "Dr. Gitanjali Shinde", designation: "Professor" },
  3: { name: "Dr. Varsha Dange", designation: "Professor" },
  4: { name: "Dr. Madhuri Barhate", designation: "Professor" },
  5: { name: "Prof. Kanchan Wankhade", designation: "Assistant Professor" },
  6: { name: "Prof. Sneha Manoj Patil", designation: "Assistant Professor" },
  7: { name: "Prof. Dipti Ajitkumar Gaikwad", designation: "Assistant Professor" },
  8: { name: "Prof. Sonal Fatangare", designation: "Assistant Professor" },
  9: { name: "Prof. Supriya Popat Mandhare", designation: "Assistant Professor" },
  10: { name: "Prof. Vanita Sharad Babanne", designation: "Assistant Professor" },
  11: { name: "Prof. Geeta Balkrushna Zaware", designation: "Assistant Professor" },
  12: { name: "Prof. Ashlesha Gopinath Sawant", designation: "Assistant Professor" },
  13: { name: "Prof. Grishma Bobhate", designation: "Assistant Professor" },
  14: { name: "Prof. Amruta Bhawarthi", designation: "Assistant Professor" },
  15: { name: "Dr. Uma Patil", designation: "Professor" },
  16: { name: "Dr. Trupti Ghongade", designation: "Professor" },
  17: { name: "Dr. Virendrakumar Anna Dhotre", designation: "Professor" },
  18: { name: "Dr. Ravishankar Bhaganagare", designation: "Professor" },
};

// SY, Division E — 15 groups (fits the app's default group count exactly).
const SY_E_EDI_GUIDES = {
  1: { name: "Prof. Ankesh Khare", designation: "Assistant Professor" },
  2: { name: "Dr. Amruta Amune", designation: "Professor" },
  3: { name: "Prof. Dipti Gaikwad", designation: "Assistant Professor" },
  4: { name: "Dr. Virendrakumar Dhotre", designation: "Professor" },
  5: { name: "Dr. Kiran Ingle", designation: "Professor" },
  6: { name: "Prof. Amruta Bhawarthi", designation: "Assistant Professor" },
  7: { name: "Prof. Sahebrao Tanaji Bhalshankar", designation: "Assistant Professor" },
  8: { name: "Dr. Varsha Dange", designation: "Professor" },
  9: { name: "Prof. Kanchan Wankhade", designation: "Assistant Professor" },
  10: { name: "Prof. Vijay Rathod", designation: "Assistant Professor" },
  11: { name: "Prof. Sahebrao Tanaji Bhalshankar", designation: "Assistant Professor" },
  12: { name: "Prof. Ashlesha Sawant", designation: "Assistant Professor" },
  13: { name: "Dr. Jyoti Kanjalkar", designation: "Professor" },
  14: { name: "Prof. Vanita Babanne", designation: "Assistant Professor" },
  15: { name: "Prof. Ankesh Khare", designation: "Assistant Professor" },
};

export const EDI_GROUP_FACULTY_OVERRIDES = {
  ty: {
    E: {
      TY505: TY_E_EDI_GUIDES, // Sem 1 EDI
      TY604: TY_E_EDI_GUIDES, // Sem 2 EDI — same guides, department-confirmed
    },
  },
  sy: {
    E: {
      SY305: SY_E_EDI_GUIDES, // Sem 1 EDI — same guides, department-confirmed
      SY405: SY_E_EDI_GUIDES, // Sem 2 EDI
    },
  },
};

/**
 * GROUP_COUNT_OVERRIDES
 * ---------------------------------------------------------------------------
 * The app defaults every division/subject to GROUPS_PER_DIVISION (15)
 * groups. TY Division E's real EDI roster runs to 18 groups instead, so
 * this widens the generator loop specifically for that division/subject —
 * everywhere else keeps the default.
 *
 * Shape: GROUP_COUNT_OVERRIDES[yearId][division][subjectCode] -> number
 * ---------------------------------------------------------------------------
 */
export const GROUP_COUNT_OVERRIDES = {
  ty: {
    E: { TY505: 18, TY604: 18 },
  },
};

export function getGroupCount(yearId, division, subjectCode, fallback) {
  return GROUP_COUNT_OVERRIDES[yearId]?.[division]?.[subjectCode] ?? fallback;
}