import { motion } from "framer-motion";
import { FiAward, FiCompass, FiFileText, FiFolder } from "react-icons/fi";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { CP_PHASES } from "../../data/constants";
import { Loader } from "../ui/Feedback";

export default function DashboardCards() {
  const { data: stats, loading } = useApi(() => api.getDashboardStats(), []);
  const { data: sdp } = useApi(() => api.getAllSDP(), []);

  if (loading || !stats) return <Loader label="Loading dashboard…" />;

  const completed = sdp?.filter((s) => s.status === "completed").length ?? 0;
  const upcoming = sdp?.filter((s) => s.status === "upcoming").length ?? 0;

  const cards = [
    { icon: <FiAward />, cls: "icon-sdp", title: "Skill Development Program", desc: `${completed} completed · ${upcoming} upcoming`, num: `${completed + upcoming} programs` },
    { icon: <FiCompass />, cls: "icon-edi", title: "Engineering Design & Innovation", desc: "Mid-Sem & End-Sem reviews across every division", num: `${stats.totalEDIGroups.toLocaleString("en-IN")} EDI groups` },
    { icon: <FiFileText />, cls: "icon-dt", title: "Design Thinking", desc: "Publication and patent tracking for every EDI group", num: `${stats.totalEDIGroups.toLocaleString("en-IN")} papers tracked` },
    { icon: <FiFolder />, cls: "icon-cp", title: "Course Projects", desc: `${stats.totalCPGroups.toLocaleString("en-IN")} groups running this term`, num: `${CP_PHASES.length} phases` },
  ];

  return (
    <div className="dash-grid">
      {cards.map((c, i) => (
        <motion.div
          key={c.title}
          className="card dash-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <div className={`dash-icon ${c.cls}`}>{c.icon}</div>
          <div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <div className="dash-num">{c.num}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}