import { useNavigate } from "react-router-dom";
import { YEARS } from "../../data/constants";

export default function YearTabs({ activeYearId }) {
  const navigate = useNavigate();
  return (
    <div className="year-tabs">
      {YEARS.map((y) => (
        <button
          key={y.id}
          className={`year-tab${y.id === activeYearId ? " is-active" : ""}`}
          onClick={() => navigate(`/year/${y.id}`)}
        >
          {y.label}
          <small>{y.short} · {y.semesterLabel}</small>
        </button>
      ))}
    </div>
  );
}
