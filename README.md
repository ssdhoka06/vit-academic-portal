# VIT Pune — Academic Portal

A production-shaped React frontend for a college academic portal: Skill Development
Program (SDP), Engineering Design & Innovation (EDI), Design Thinking (DT) and
subject-wise Course Projects (CP), navigable across every Year → Division → Batch →
Subject in the institute.

Everything on screen is generated from a mock data layer that mirrors the shape a real
REST API would return — swapping in a live backend later means editing one file
(`src/services/api.js`), nothing else.

## Stack

React 19 (Vite) · React Router 7 · Bootstrap 5 (grid/reset) · plain CSS with a custom
design-token system · React Icons · Framer Motion.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
```

## Folder structure

```
src/
  data/               Pure data: curriculum, name/title pools, generators, content
    constants.js        Years / Divisions / Batches / full subject curriculum
    pools.js             Name, faculty and CP/EDI title pools (by subject domain)
    generators.js         Deterministic ("seeded") group/mentor/schedule generation
    contentData.js         SDP programs, DT workshops, academic calendar, announcements
    sections.js             The ledger-rail's batch-record section list

  services/
    api.js              THE swap point — async, REST-shaped wrappers around data/*.
                         Replace a function body with a fetch() call and nothing
                         upstream needs to change.

  hooks/
    useApi.js           Generic {data, loading, error} hook around any api.* call

  utils/
    format.js           Date formatting + small UI helpers

  components/
    layout/             Navbar, Footer, BackToTop
    ui/                 SealBadge, ProgressBar, Modal, Loader/EmptyState, SectionHeading
    home/               Hero, DashboardCards, HomePanels (about/announcements/timeline)
    nav/                YearTabs, DivisionBatchBar, LedgerRail (the batch section index)
    batch/              Overview / SDP / DT / Mentor / ReviewSubmission / Announcements panels
    projects/            SubjectExplorer (semester → subject → 15 groups), GroupCard, GroupDetailModal
    timeline/            Full academic-calendar timeline
    announcements/        Full filterable/searchable announcement feed

  pages/
    HomePage.jsx, YearPage.jsx, AnnouncementsPage.jsx, CalendarPage.jsx, NotFoundPage.jsx

  App.jsx               Route table
  main.jsx               Entry point
  styles/tokens.css       Design tokens (palette, type, spacing)
  styles/global.css       Every component class in the app
```

## Data model

- **Years**: FY / SY / TY / Final Year, each with Semester I and II.
- **Divisions**: A-F (6 per year). **Batches**: B1-B3 (3 per division, ~25 students each).
- **Subjects**: configured per year/semester in `data/constants.js`. FY/SY/TY-Sem1 follow
  the department's supplied list; TY-Sem2 and Final Year are grounded in VIT Pune's
  published CSE (AI&ML) course structure (AY 2025-26). Every subject is either a
  **CP** (Course Project) subject or the semester's single **EDI** subject — in Final
  Year, the Major Project stands in for EDI, matching the real curriculum.
- **Groups**: every subject gets 15 project groups per division (5 students each),
  deterministically generated from `Year+Division+Subject+GroupNumber` — the same
  inputs always resolve to the same title, members, mentor, status and dates within
  a session, so the app feels backed by a stable dataset rather than re-randomising
  on every render.

## Replacing mock data with a real backend

1. Open `src/services/api.js`.
2. Replace a function body, e.g.:
   ```js
   getSubjectGroups: (yearId, division, subject, semesterIndex, batch) =>
     fetch(`/api/years/${yearId}/divisions/${division}/subjects/${subject.code}/groups?batch=${batch}`)
       .then((r) => r.json()),
   ```
3. Nothing in `components/`, `pages/`, or `hooks/useApi.js` needs to change — they only
   ever call `api.*` and expect a Promise back.

## Notes

- All content is illustrative mock data generated for demonstration.
- Only Bootstrap's grid/reset layer is used; all visual styling is custom (see
  `src/styles/`) to give the portal its own identity rather than a default Bootstrap look.
