import Modal from "../ui/Modal";
import SealBadge from "../ui/SealBadge";
import ProgressBar from "../ui/ProgressBar";
import { formatDate } from "../../utils/format";

export default function GroupDetailModal({ group, mode, onClose }) {
  const isCP = mode === "CP";
  if (!group) return null;

  return (
    <Modal open={!!group} onClose={onClose} eyebrow={`${group.courseName} · Group ${group.code}`} title={group.title}>
      {isCP ? (
        <>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)" }}>{group.description}</p>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--brand-800)" }}>Progress</span>
              <SealBadge status={group.status} />
            </div>
            <ProgressBar value={group.progress} />
          </div>

          <dl className="modal-row"><dt>Course</dt><dd>{group.courseName}</dd></dl>
          <dl className="modal-row"><dt>Team / Group No.</dt><dd className="mono">{group.code} (Team {group.teamNumber})</dd></dl>
          <dl className="modal-row"><dt>Faculty guide</dt><dd>{group.facultyGuide.name} — {group.facultyGuide.designation}, {group.facultyGuide.dept}</dd></dl>
          <dl className="modal-row"><dt>Upcoming milestone</dt><dd>{group.milestone}</dd></dl>
          <dl className="modal-row"><dt>Mid-Sem review</dt><dd className="mono">{formatDate(group.midSemReviewDate)}</dd></dl>
          <dl className="modal-row"><dt>End-Sem review</dt><dd className="mono">{formatDate(group.endSemReviewDate)}</dd></dl>
          <dl className="modal-row"><dt>Submission due</dt><dd className="mono">{formatDate(group.submissionDate)}</dd></dl>

          <div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 8 }}>Group members</div>
            <div className="member-chip-row">
              {group.members.map((m) => <span className="member-chip" key={m}>{m}</span>)}
            </div>
          </div>
        </>
      ) : (
        <>
          <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)" }}>{group.problemStatement}</p>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--brand-800)" }}>Evaluation status</span>
              <SealBadge status={group.evaluationStatus} />
            </div>
            <div className="pill-static" style={{ display: "inline-block" }}>{group.currentStage}</div>
          </div>

          <dl className="modal-row"><dt>Course</dt><dd>{group.courseName}</dd></dl>
          <dl className="modal-row"><dt>Team / Group No.</dt><dd className="mono">{group.code} (Team {group.teamNumber})</dd></dl>
          <dl className="modal-row"><dt>Faculty mentor</dt><dd>{group.facultyMentor.name} — {group.facultyMentor.designation}, {group.facultyMentor.dept}</dd></dl>
          <dl className="modal-row"><dt>Mid-Sem review</dt><dd className="mono">{formatDate(group.midSemReviewDate)}</dd></dl>
          <dl className="modal-row"><dt>End-Sem review</dt><dd className="mono">{formatDate(group.endSemReviewDate)}</dd></dl>
          <dl className="modal-row"><dt>Deliverable due</dt><dd className="mono">{formatDate(group.deliverableDueDate)}</dd></dl>

          <div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 8 }}>Deliverables</div>
            <div className="member-chip-row">
              {group.deliverables.map((d) => <span className="member-chip" key={d}>{d}</span>)}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 13.5, color: "var(--muted)", marginBottom: 8 }}>Team members</div>
            <div className="member-chip-row">
              {group.members.map((m) => <span className="member-chip" key={m}>{m}</span>)}
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}