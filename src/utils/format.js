export { formatDate, isPastDate } from "../data/generators";

export function statusToSealClass(status) {
  const map = {
    "Not Started": "seal-not-started",
    "Yet to Start": "seal-not-started",
    Drafting: "seal-not-started",
    "In Progress": "seal-in-progress",
    "Prototype in Progress": "seal-in-progress",
    Submitted: "seal-in-progress",
    Accepted: "seal-in-progress",
    "Camera Ready": "seal-in-progress",
    "Under Review": "seal-under-review",
    "Ready for Mid-Sem": "seal-under-review",
    "Ready for End-Sem": "seal-under-review",
    "Revision Requested": "seal-under-review",
    Rejected: "seal-under-review",
    Completed: "seal-completed",
    Evaluated: "seal-completed",
    Published: "seal-completed",
    "Patent Filing": "seal-completed",
  };
  return map[status] || "seal-not-started";
}

export function classNames(...parts) {
  return parts.filter(Boolean).join(" ");
}