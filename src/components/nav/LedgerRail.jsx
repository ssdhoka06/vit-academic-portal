import { useNavigate } from "react-router-dom";
import { BATCH_SECTIONS } from "../../data/sections";

export default function LedgerRail({ yearId, division, batch, activeSection }) {
  const navigate = useNavigate();
  return (
    <nav className="ledger-rail" aria-label="Batch record sections">
      {BATCH_SECTIONS.map((s, i) => (
        <button
          key={s.key}
          className={`ledger-item${s.key === activeSection ? " is-active" : ""}`}
          onClick={() => navigate(`/year/${yearId}/${division}/${batch}/${s.key}`)}
        >
          <span className="ledger-num mono">{String(i + 1).padStart(2, "0")}</span>
          <span className="ledger-label">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}
