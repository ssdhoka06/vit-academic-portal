import { useNavigate } from "react-router-dom";
import { DIVISIONS, BATCHES } from "../../data/constants";

export default function DivisionBatchBar({ yearId, division, batch, section }) {
  const navigate = useNavigate();
  const go = (nextDivision, nextBatch) => navigate(`/year/${yearId}/${nextDivision}/${nextBatch}/${section || "overview"}`);

  return (
    <div className="division-batch-bar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="bar-label">Division</span>
        <div className="division-chips">
          {DIVISIONS.map((d) => (
            <button
              key={d}
              className={`division-chip${d === division ? " is-active" : ""}`}
              onClick={() => go(d, batch)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span className="bar-label">Batch</span>
        <div className="batch-pills">
          {BATCHES.map((b) => (
            <button
              key={b}
              className={`batch-pill${b === batch ? " is-active" : ""}`}
              onClick={() => go(division, b)}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
