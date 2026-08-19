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