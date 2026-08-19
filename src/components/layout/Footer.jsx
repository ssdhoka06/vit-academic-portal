import { Link } from "react-router-dom";
import { YEARS } from "../../data/constants";

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="container-app">
        <div className="footer-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img src="/vit_logo.png" alt="VIT Pune" className="brand-mark-img brand-mark-img-sm" />
              <div>
                <h5 style={{ margin: 0 }}>CSE (AI &amp; ML) Academic Portal</h5>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)" }}>Vishwakarma Institute of Technology, Pune</div>
              </div>
            </div>
            <p style={{ fontSize: 12.5, maxWidth: 320, color: "rgba(255,255,255,0.5)" }}>
              A unified academic record — Skill Development, Engineering Design &amp; Innovation, Design
              Thinking and Course Projects — for every year, division and batch in the department.
            </p>
          </div>
          <div>
            <h5>Years</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {YEARS.map((y) => <Link key={y.id} to={`/year/${y.id}`}>{y.label}</Link>)}
            </div>
          </div>
          <div>
            <h5>Portal</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link to="/calendar">Calendar</Link>
              <Link to="/announcements">Announcements</Link>
              <Link to="/">Dashboard</Link>
            </div>
          </div>
          <div>
            <h5>Note</h5>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
              All content on this portal is illustrative mock data generated for demonstration.
              Replace <code>src/services/api.js</code> with live endpoints to go into production.
            </p>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Department of Computer Science &amp; Engineering (AI &amp; ML), Vishwakarma Institute of Technology, Pune.</div>
      </div>
    </footer>
  );
}