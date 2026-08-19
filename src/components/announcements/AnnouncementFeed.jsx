import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader, EmptyState } from "../ui/Feedback";
import { formatDate } from "../../utils/format";

export default function AnnouncementFeed() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { data: categories } = useApi(() => api.getAnnouncementCategories(), []);
  const { data, loading } = useApi(() => api.getAnnouncements({ category, query }), [category, query]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 28 }} className="announcements-layout">
      <div>
        <div className="filter-bar" style={{ marginBottom: 16 }}>
          <button className={`filter-chip${category === "All" ? " is-active" : ""}`} onClick={() => setCategory("All")}>All</button>
          {categories?.map((c) => (
            <button key={c} className={`filter-chip${category === c ? " is-active" : ""}`} onClick={() => setCategory(c)}>{c}</button>
          ))}
        </div>
        <div className="search-box" style={{ marginBottom: 18 }}>
          <FiSearch />
          <input placeholder="Search announcements…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>

        <div className="card card-pad">
          {loading && <Loader />}
          {!loading && data?.length === 0 && <EmptyState title="No announcements match" desc="Try a different category or search term." />}
          {data?.map((a) => (
            <div className="announcement-item" key={a.id}>
              {a.unread ? <span className="unread-dot" /> : <span style={{ width: 7 }} />}
              <div className="ann-date">{formatDate(a.date)}</div>
              <div>
                <span className="ann-badge">{a.category}</span>
                <div className="ann-title">{a.title}</div>
                <p className="ann-body">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card card-pad" style={{ alignSelf: "start" }}>
        <h4 style={{ fontSize: 14.5, marginBottom: 8 }}>Notice categories</h4>
        <p className="text-muted" style={{ fontSize: 13, margin: 0 }}>
          Announcements span admissions, academic-calendar updates, SDP registrations, EDI/CP reviews,
          workshops, hackathons, internships, placements, holidays, exam forms and seminars.
        </p>
      </div>

      <style>{`
        @media (max-width: 880px) { .announcements-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
