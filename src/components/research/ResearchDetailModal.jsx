import Modal from "../ui/Modal";
import SealBadge from "../ui/SealBadge";
import { formatDate } from "../../utils/format";

function Section({ label }) {
  return <div className="section-eyebrow" style={{ marginTop: 4 }}>{label}</div>;
}

export default function ResearchDetailModal({ record, onClose }) {
  if (!record) return null;
  const r = record;

  return (
    <Modal open={!!record} onClose={onClose} eyebrow={`${r.courseName} · Group ${r.code}`} title={r.paperTitle}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--brand-800)" }}>Current status</span>
          <SealBadge status={r.currentStatus} />
        </div>
        <p style={{ margin: 0, fontSize: 13.5, color: "var(--muted)" }}>{r.abstract}</p>
      </div>

      <Section label="Overview" />
      <dl className="modal-row"><dt>Research domain</dt><dd>{r.researchDomain}</dd></dl>
      <dl className="modal-row"><dt>Faculty guide</dt><dd>{r.facultyGuide.name} — {r.facultyGuide.designation}, {r.facultyGuide.dept}</dd></dl>
      <dl className="modal-row"><dt>Team / Group No.</dt><dd className="mono">{r.code} (Team {r.teamNumber})</dd></dl>

      <Section label="Publication" />
      <dl className="modal-row">
        <dt>Target venue</dt>
        <dd>
          <strong>{r.targetVenue.short}</strong> — {r.targetVenue.name} <span className="pill-static">{r.targetVenue.indexing}</span>
          <br />
          <a href={r.targetVenue.site} target="_blank" rel="noopener noreferrer" className="mono" style={{ fontSize: 12, color: "var(--brand-600)" }}>
            Visit venue site ↗
          </a>
        </dd>
      </dl>
      <dl className="modal-row"><dt>Submission date</dt><dd className="mono">{r.submissionDate ? formatDate(r.submissionDate) : "Not yet submitted"}</dd></dl>
      <dl className="modal-row"><dt>Acceptance / rejection date</dt><dd className="mono">{r.acceptanceRejectionDate ? formatDate(r.acceptanceRejectionDate) : "Pending"}</dd></dl>
      <dl className="modal-row"><dt>Reviewer comments</dt><dd>{r.reviewerComments}</dd></dl>
      <dl className="modal-row"><dt>Revision requested</dt><dd>{r.revisionRequested ? "Yes — see reviewer comments above" : "No"}</dd></dl>

      <Section label="Camera-ready & registration" />
      <dl className="modal-row"><dt>Camera-ready status</dt><dd><span className="pill-static">{r.cameraReadyStatus}</span></dd></dl>
      <dl className="modal-row"><dt>Registration fee</dt><dd><span className="pill-static">{r.registrationFeeStatus}</span></dd></dl>
      <dl className="modal-row"><dt>Copyright form</dt><dd><span className="pill-static">{r.copyrightFormStatus}</span></dd></dl>
      <dl className="modal-row"><dt>Presentation date</dt><dd className="mono">{r.presentationDate ? formatDate(r.presentationDate) : "Not scheduled"}</dd></dl>
      <dl className="modal-row"><dt>Publication date</dt><dd className="mono">{r.publicationDate ? formatDate(r.publicationDate) : "Not yet published"}</dd></dl>
      <dl className="modal-row">
        <dt>DOI</dt>
        <dd className="mono">
          {r.doi ? <a href={`https://doi.org/${r.doi}`} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand-600)" }}>{r.doi}</a> : "Not yet assigned"}
        </dd>
      </dl>

      <Section label="Originality checks" />
      <dl className="modal-row">
        <dt>AI similarity</dt>
        <dd style={{ color: r.aiSimilarityPercent != null && r.aiSimilarityPercent > 20 ? "var(--status-under-review)" : "var(--ink)" }}>
          {r.aiSimilarityPercent != null ? `${r.aiSimilarityPercent}%` : "Not yet checked"}
        </dd>
      </dl>
      <dl className="modal-row">
        <dt>Plagiarism</dt>
        <dd style={{ color: r.plagiarismPercent != null && r.plagiarismPercent > 15 ? "var(--status-under-review)" : "var(--ink)" }}>
          {r.plagiarismPercent != null ? `${r.plagiarismPercent}%` : "Not yet checked"}
        </dd>
      </dl>

      <Section label="Patent" />
      <dl className="modal-row"><dt>Recommendation status</dt><dd><span className="pill-static">{r.patentRecommendationStatus}</span></dd></dl>
      <dl className="modal-row"><dt>Filing status</dt><dd><span className="pill-static">{r.patentFilingStatus}</span></dd></dl>

      {r.deadlines.length > 0 && (
        <div>
          <Section label="Important deadlines" />
          <div className="member-chip-row">
            {r.deadlines.map((d) => (
              <span className="member-chip" key={d.label}>{d.label} — {formatDate(d.date)}</span>
            ))}
          </div>
        </div>
      )}

      <div>
        <Section label="Uploaded documents" />
        <div className="member-chip-row">
          {r.documents.map((d) => <span className="member-chip" key={d}>{d}</span>)}
        </div>
      </div>

      <div>
        <Section label="Team members" />
        <div className="member-chip-row">
          {r.members.map((m) => <span className="member-chip" key={m}>{m}</span>)}
        </div>
      </div>
    </Modal>
  );
}