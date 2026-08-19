import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { formatDate, isPastDate } from "../../utils/format";
import { Loader } from "../ui/Feedback";
import { DIVISIONS, BATCHES, GROUPS_PER_DIVISION, STUDENTS_PER_DIVISION } from "../../data/constants";

export function AboutCard() {
  return (
    <div className="card card-pad">
      <h3 style={{ fontSize: 15, marginBottom: 10 }}>About this portal</h3>
      <p className="text-muted" style={{ fontSize: 13, marginBottom: 16 }}>
        Maintained by the Department of Computer Science &amp; Engineering (AI &amp; ML), this portal is the
        department's single academic record. Every year (FY, SY, TY, Final Year) is organised into {DIVISIONS.length}{" "}
        divisions (A–F), each split into {BATCHES.length} batches of roughly {Math.round(STUDENTS_PER_DIVISION / BATCHES.length)}{" "}
        students, with {GROUPS_PER_DIVISION} project groups of 5 students per division per subject. Select a year, then
        a division and batch, to view Overview, SDP, EDI, Design Thinking, Course Projects, Faculty Mentor, Review
        Dates, Submission Dates and Announcements for that cohort.
      </p>
      <div className="chip-row">
        <span className="pill-static">{DIVISIONS.length} Divisions</span>
        <span className="pill-static">{BATCHES.length} Batches / Division</span>
        <span className="pill-static">{STUDENTS_PER_DIVISION} Students / Division</span>
        <span className="pill-static">{GROUPS_PER_DIVISION} Project Groups / Subject</span>
      </div>
    </div>
  );
}

export function AnnouncementsPreview() {
  const { data, loading } = useApi(() => api.getAnnouncements({ limit: 4 }), []);
  return (
    <div className="card card-pad">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <h3 style={{ fontSize: 16, margin: 0 }}>Recent announcements</h3>
        <Link to="/announcements" className="mono" style={{ fontSize: 12, color: "var(--brand-600)", fontWeight: 600 }}>View all →</Link>
      </div>
      {loading && <Loader />}
      {data?.map((a) => (
        <div className="announcement-item" key={a.id}>
          <div className="ann-date">{formatDate(a.date).replace(/,.*/, "")}</div>
          <div>
            <span className="ann-badge">{a.category}</span>
            <div className="ann-title">{a.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TimelinePreview() {
  const { data, loading } = useApi(() => api.getAcademicCalendar(), []);
  const upcoming = data?.filter((e) => !isPastDate(e.date)).slice(0, 5) ?? [];

  return (
    <div className="card card-pad">
      <h3 style={{ fontSize: 16, marginBottom: 14 }}>Upcoming on the calendar</h3>
      {loading && <Loader />}
      <div className="timeline">
        {upcoming.map((ev) => (
          <div className="timeline-item" key={ev.title}>
            <div className="tl-date">{formatDate(ev.date)}</div>
            <div className="tl-title">{ev.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}