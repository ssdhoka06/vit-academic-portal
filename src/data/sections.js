export const BATCH_SECTIONS = [
  { key: "overview", label: "Overview" },
  { key: "sdp", label: "Skill Development (SDP)" },
  { key: "edi", label: "Engineering Design (EDI)" },
  { key: "dt", label: "Design Thinking (DT)" },
  { key: "cp", label: "Course Projects (CP)" },
  { key: "mentor", label: "Faculty Mentor" },
  { key: "reviews", label: "Review Dates" },
  { key: "submissions", label: "Submission Dates" },
  { key: "announcements", label: "Announcements" },
];

// Final Year has no Course-Project-tracked subjects (its non-EDI subjects
// are electives/theory, and the Major Project stands in for EDI) — so the
// Course Projects tab doesn't apply there.
export function getSectionsForYear(yearId) {
  if (yearId === "be") return BATCH_SECTIONS.filter((s) => s.key !== "cp");
  return BATCH_SECTIONS;
}