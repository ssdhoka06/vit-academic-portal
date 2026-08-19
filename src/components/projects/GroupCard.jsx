import SealBadge from "../ui/SealBadge";
import ProgressBar from "../ui/ProgressBar";

export default function GroupCard({ group, mode, onClick }) {
  const isCP = mode === "CP";
  return (
    <button className="card group-card" onClick={onClick}>
      <div className="group-card-top">
        <div>
          <div className="group-code mono">GROUP {group.code}</div>
          <div className="group-title">{group.title}</div>
        </div>
        <SealBadge status={isCP ? group.status : group.evaluationStatus} />
      </div>

      {isCP ? (
        <ProgressBar value={group.progress} />
      ) : (
        <div className="text-muted" style={{ fontSize: 12.5 }}>{group.currentStage}</div>
      )}

      <div className="group-meta-row">
        <span>{group.members.length} members</span>
        <span>{(isCP ? group.facultyGuide : group.facultyMentor)?.name}</span>
      </div>
    </button>
  );
}
