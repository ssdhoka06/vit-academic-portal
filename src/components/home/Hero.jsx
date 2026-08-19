import { motion } from "framer-motion";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";

export default function Hero() {
  const { data: stats } = useApi(() => api.getDashboardStats(), []);

  const items = stats ? [
    { num: stats.totalStudents.toLocaleString("en-IN"), label: "Students across all years" },
    { num: stats.totalDivisions, label: "Active divisions (FY–BE)" },
    { num: stats.totalProjectGroups.toLocaleString("en-IN"), label: "Project groups this term" },
    { num: stats.facultyMentors, label: "Faculty mentors" },
  ] : [];

  return (
    <header className="hero">
      <div className="hero-decor" aria-hidden="true">
        <svg viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heroShard" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#33ADE4" />
              <stop offset="1" stopColor="#0B3A59" />
            </linearGradient>
          </defs>
          <polygon points="60,20 190,20 300,300 220,560 130,340" fill="url(#heroShard)" opacity="0.22" />
          <polygon points="230,40 270,40 340,220 300,560 260,380" fill="url(#heroShard)" opacity="0.14" />
          <circle cx="365" cy="70" r="15" fill="#E32236" opacity="0.55" />
        </svg>
      </div>

      <div className="container-app">
        <motion.span
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        >
          Department of Computer Science &amp; Engineering (AI &amp; ML)
        </motion.span>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
        >
          Academic Portal
        </motion.h1>
        <motion.p
          className="hero-lead"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
        >
          The official academic record for CSE (AI &amp; ML) students and faculty — coursework, projects
          and milestones for every division and batch, in one place.
        </motion.p>
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }}
        >
          {items.map((it) => (
            <div className="hero-stat" key={it.label}>
              <div className="hero-stat-num mono">{it.num ?? "—"}</div>
              <div className="hero-stat-label">{it.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
