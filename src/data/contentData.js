/**
 * contentData.js
 * ---------------------------------------------------------------------------
 * Hand-authored (but easily API-replaceable) content: SDP programs, Design
 * Thinking workshops, the academic calendar and the announcements feed.
 * ---------------------------------------------------------------------------
 */

export const SDP_PROGRAMS = [
  { id: "sdp01", year: "fy", type: "Workshop", organizingDept: "CSE (AI & ML)", title: "Foundations of Version Control (Git & GitHub)", date: "2026-08-10", status: "completed", hours: 8, venue: "Computer Lab 3", description: "A hands-on introduction to Git branching, commits, pull requests and resolving merge conflicts, ending with every student pushing a first repository to GitHub." },
  { id: "sdp02", year: "fy", type: "Seminar", organizingDept: "CSE (AI & ML)", title: "Career Pathways in Computer Engineering", date: "2026-08-14", status: "upcoming", hours: 3, venue: "Seminar Hall 1", description: "An orientation seminar mapping out career tracks available to CSE (AI & ML) graduates — software development, data science, research and higher studies — with alumni panel Q&A." },
  { id: "sdp03", year: "fy", type: "Certification", organizingDept: "CSE (AI & ML)", title: "NPTEL: Problem Solving through Programming in C", date: "2026-09-20", status: "upcoming", hours: 40, venue: "Self-paced (Online)", description: "A self-paced NPTEL certification covering C fundamentals, pointers and data structures, with a proctored end exam counted toward SDP credit." },
  { id: "sdp17", year: "fy", type: "Workshop", organizingDept: "CSE (AI & ML)", title: "MS Office & Technical Documentation", date: "2026-08-22", status: "upcoming", hours: 6, venue: "Computer Lab 2", description: "Practical session on formatting technical reports, building spreadsheets with formulas/charts, and preparing a clean project presentation deck." },
  { id: "sdp04", year: "sy", type: "Workshop", organizingDept: "CSE (AI & ML)", title: "Data Structures Bootcamp — Competitive Track", date: "2026-08-09", status: "completed", hours: 12, venue: "Computer Lab 4", description: "An intensive problem-solving bootcamp on arrays, trees and graphs aimed at competitive-programming and interview preparation, with timed contest rounds." },
  { id: "sdp05", year: "sy", type: "Hackathon", organizingDept: "CSE (AI & ML)", title: "VIT Innovate 48 — Intra-college Hackathon", date: "2026-08-21", status: "upcoming", hours: 48, venue: "Innovation Center", description: "A 48-hour intra-college hackathon where SY teams build a working prototype around an open problem statement, judged by faculty and industry mentors." },
  { id: "sdp06", year: "sy", type: "Guest Lecture", organizingDept: "CSE (AI & ML)", title: "Cloud-native Systems at Scale", date: "2026-09-14", status: "upcoming", hours: 2, venue: "Seminar Hall 2", description: "An industry guest lecture on designing cloud-native, horizontally-scalable systems, covering containers, orchestration and observability at production scale." },
  { id: "sdp07", year: "sy", type: "Industrial Visit", organizingDept: "CSE (AI & ML)", title: "Industrial Visit — Persistent Systems, Hinjawadi", date: "2026-09-28", status: "upcoming", hours: 6, venue: "Off-campus — Hinjawadi IT Park", description: "A guided visit to Persistent Systems' Hinjawadi campus, including a facility tour and interaction with engineering teams about real-world project workflows." },
  { id: "sdp18", year: "sy", type: "Certification", organizingDept: "CSE (AI & ML)", title: "NPTEL: Database Management Systems", date: "2026-10-12", status: "upcoming", hours: 40, venue: "Self-paced (Online)", description: "A self-paced NPTEL certification covering relational design, normalization, transactions and query optimization, with a proctored end exam." },
  { id: "sdp08", year: "ty", type: "Certification", organizingDept: "CSE (AI & ML)", title: "AWS Academy Cloud Foundations", date: "2026-08-12", status: "completed", hours: 30, venue: "Computer Lab 5 / Self-paced", description: "The official AWS Academy Cloud Foundations track, covering core AWS services, pricing and the well-architected framework, ending in an AWS badge exam." },
  { id: "sdp09", year: "ty", type: "Workshop", organizingDept: "CSE (AI & ML)", title: "Applied Machine Learning with scikit-learn", date: "2026-08-16", status: "upcoming", hours: 16, venue: "AI & ML Lab", description: "A project-based workshop building classification and regression pipelines end-to-end in scikit-learn, from data cleaning through model evaluation." },
  { id: "sdp10", year: "ty", type: "Hackathon", organizingDept: "CSE (AI & ML)", title: "Smart India Hackathon — Internal Screening", date: "2026-08-20", status: "upcoming", hours: 24, venue: "Innovation Center", description: "The department's internal screening round for Smart India Hackathon, where shortlisted teams pitch and prototype against nationally published problem statements." },
  { id: "sdp11", year: "ty", type: "Guest Lecture", organizingDept: "CSE (AI & ML)", title: "Medical Imaging & Diagnostic AI in Practice", date: "2026-09-05", status: "upcoming", hours: 2, venue: "Seminar Hall 1", description: "A guest lecture from a practicing AI/healthcare researcher on applying deep learning to medical imaging, and the regulatory realities of deploying diagnostic AI." },
  { id: "sdp12", year: "ty", type: "Industrial Visit", organizingDept: "CSE (AI & ML)", title: "Industrial Visit — KPIT Technologies", date: "2026-09-18", status: "upcoming", hours: 6, venue: "Off-campus — KPIT, Hinjawadi", description: "A visit to KPIT Technologies to see applied AI/ML work in the mobility and automotive-software domain, including a Q&A with their engineering leads." },
  { id: "sdp13", year: "be", type: "Certification", organizingDept: "CSE (AI & ML)", title: "Google Cloud Professional ML Engineer — Prep Track", date: "2026-08-11", status: "completed", hours: 35, venue: "Self-paced (Online)", description: "A structured preparation track for the Google Cloud Professional ML Engineer certification, covering the full ML lifecycle on Vertex AI and MLOps practices." },
  { id: "sdp14", year: "be", type: "Workshop", organizingDept: "CSE (AI & ML)", title: "System Design for Placement Interviews", date: "2026-08-19", status: "upcoming", hours: 10, venue: "Seminar Hall 2", description: "A placement-focused workshop on high-level and low-level system design — scaling, caching, sharding and trade-off discussions — with mock interview rounds." },
  { id: "sdp15", year: "be", type: "Seminar", organizingDept: "CSE (AI & ML)", title: "Research Paper Writing & IEEE Formatting", date: "2026-09-01", status: "upcoming", hours: 3, venue: "Seminar Hall 1", description: "A seminar on structuring a research paper, IEEE double-column formatting, citation practice and journal/conference selection — aimed at Major Project publication." },
  { id: "sdp16", year: "be", type: "Guest Lecture", organizingDept: "CSE (AI & ML)", title: "From Campus to Founder — Alumni Startup Panel", date: "2026-09-15", status: "upcoming", hours: 2, venue: "Auditorium", description: "A panel of department alumni who have founded startups, discussing the transition from campus projects to funded companies and lessons learned along the way." },
];

export const ACADEMIC_CALENDAR = [
  { date: "2026-08-05", title: "Odd Semester 2026-27 Commences", cat: "calendar" },
  { date: "2026-08-08", title: "SDP Registrations Open — All Years", cat: "sdp" },
  { date: "2026-08-10", title: "Course Project Topic Finalization Deadline", cat: "cp" },
  { date: "2026-08-17", title: "EDI Concept Design Submission", cat: "edi" },
  { date: "2026-08-20", title: "Smart India Hackathon — Internal Screening", cat: "sdp" },
  { date: "2026-08-24", title: "EDI Mid-Sem Review — All Years", cat: "edi" },
  { date: "2026-09-01", title: "Course Project Mid-Sem Review Window Opens", cat: "cp" },
  { date: "2026-09-22", title: "Mid-Semester Examinations Begin", cat: "calendar" },
  { date: "2026-10-13", title: "Design Thinking Showcase — All Divisions", cat: "dt" },
  { date: "2026-10-30", title: "EDI Final Report Submission", cat: "edi" },
  { date: "2026-11-10", title: "Course Project Final Report Submission", cat: "cp" },
  { date: "2026-11-20", title: "EDI End-Sem Review & Demo Day", cat: "edi" },
  { date: "2026-12-01", title: "End-Semester Examinations Begin", cat: "calendar" },
  { date: "2026-12-19", title: "Odd Semester 2026-27 Concludes", cat: "calendar" },
];

export const ANNOUNCEMENT_CATEGORIES = [
  "SDP", "EDI", "DT", "CP", "Exams", "Placements", "Admissions", "Workshops",
  "Internships", "Hackathons", "Academic Calendar", "Seminars", "Holidays",
];

export const ANNOUNCEMENTS = [
  { id: 1, date: "2026-08-05", category: "Academic Calendar", title: "Odd Semester 2026-27 Timetable Published", body: "Division-wise lecture and lab timetables for the odd semester are now live on the portal.", unread: true },
  { id: 2, date: "2026-08-06", category: "Admissions", title: "CAP Round 3 Seat Confirmation", body: "Newly admitted first-year students must confirm allotted seats and complete document verification by 12 August.", unread: false },
  { id: 3, date: "2026-08-07", category: "Workshops", title: "Git & GitHub Refresher Session", body: "An optional refresher session on branching and pull requests will be held for SY students on 9 August.", unread: false },
  { id: 4, date: "2026-08-08", category: "SDP", title: "SDP Registrations Open — All Years", body: "Students can now register for this term's Skill Development Program tracks through the portal.", unread: false },
  { id: 5, date: "2026-08-09", category: "Hackathons", title: "Smart India Hackathon — Internal Screening Opens", body: "Teams interested in SIH 2026 must register for the internal screening round by 20 August.", unread: false },
  { id: 6, date: "2026-08-10", category: "CP", title: "Course Project Topic Finalization Deadline", body: "All course-project groups must lock their topic and faculty guide by end of day.", unread: false },
  { id: 7, date: "2026-08-11", category: "Placements", title: "Resume Review Drive — Training & Placement Cell", body: "One-on-one resume review slots are open for BE students; book a slot through the placement portal.", unread: false },
  { id: 8, date: "2026-08-12", category: "Internships", title: "Summer Internship Report Submission Deadline", body: "Students who completed a summer internship must submit their reports and certificates by 14 August.", unread: false },
  { id: 9, date: "2026-08-14", category: "SDP", title: "Career Pathways in Computer Engineering — Seminar", body: "An SDP seminar for FY students covering career tracks across the AI & ML pipeline.", unread: false },
  { id: 10, date: "2026-08-17", category: "EDI", title: "EDI Milestone: Concept Design Submission", body: "All EDI project groups must upload their approved concept design document.", unread: false },
  { id: 11, date: "2026-08-19", category: "DT", title: "Rapid Prototyping Workshop", body: "Hands-on low-fidelity prototyping session using craft materials and paper prototyping kits.", unread: false },
  { id: 12, date: "2026-08-20", category: "Hackathons", title: "SIH Internal Screening — Round Schedule Released", body: "Screening slots by division have been published; check your batch announcements for your slot.", unread: false },
  { id: 13, date: "2026-08-21", category: "Holidays", title: "Institute Closed — Regional Holiday", body: "The institute will remain closed on 21 August on account of a public holiday.", unread: false },
  { id: 14, date: "2026-08-24", category: "EDI", title: "EDI Mid-Sem Review — All Years", body: "Mid-semester reviews for Engineering Design & Innovation projects begin today across all divisions.", unread: false },
  { id: 15, date: "2026-08-27", category: "DT", title: "Usability Testing & Feedback Synthesis", body: "Final design-thinking workshop session before the design-sprint showcase.", unread: false },
  { id: 16, date: "2026-09-01", category: "CP", title: "Course Project Mid-Sem Review Schedule", body: "Course project mid-semester review slots by batch have been published on the portal.", unread: false },
  { id: 17, date: "2026-09-05", category: "SDP", title: "Guest Lecture — Medical Imaging & Diagnostic AI", body: "A guest lecture for TY students exploring applied AI/ML in medical imaging and diagnostics.", unread: false },
  { id: 18, date: "2026-09-12", category: "SDP", title: "NPTEL DBMS Certification — Enrolment Closing", body: "Last date to enrol for the NPTEL Database Management Systems certification track.", unread: false },
  { id: 19, date: "2026-09-18", category: "SDP", title: "Industrial Visit — KPIT Technologies", body: "TY students shortlisted for the KPIT industrial visit should collect consent forms from the department office.", unread: false },
  { id: 20, date: "2026-09-22", category: "Exams", title: "Mid-Semester Exam Seating Arrangement", body: "Seating arrangements for the upcoming mid-semester examinations have been published division-wise.", unread: false },
  { id: 21, date: "2026-10-13", category: "DT", title: "Design Thinking Showcase — All Divisions", body: "First-year design-sprint teams present final prototypes to a faculty panel.", unread: false },
  { id: 22, date: "2026-10-30", category: "EDI", title: "EDI Final Report Submission", body: "All EDI groups must submit their final report and source files ahead of the end-sem review.", unread: false },
  { id: 23, date: "2026-11-10", category: "CP", title: "Course Project Final Report Submission", body: "Course-project final reports and repositories are due across every subject and division.", unread: false },
  { id: 24, date: "2026-11-20", category: "EDI", title: "EDI End-Sem Review & Demo Day", body: "End-semester EDI demonstrations and evaluations take place across all divisions.", unread: false },
  { id: 25, date: "2026-12-01", category: "Exams", title: "End-Semester Examinations Begin", body: "End-semester theory and practical examinations begin across all years.", unread: false },
];