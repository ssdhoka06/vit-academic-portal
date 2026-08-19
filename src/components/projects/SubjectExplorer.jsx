import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader, EmptyState } from "../ui/Feedback";
import GroupCard from "./GroupCard";
import GroupDetailModal from "./GroupDetailModal";

export default function SubjectExplorer({ yearId, division, batch, mode }) {
  const [semester, setSemester] = useState(1);
  const [activeSubjectCode, setActiveSubjectCode] = useState(null);
  const [openGroup, setOpenGroup] = useState(null);

  const { data: sem1Subjects } = useApi(() => api.getSemesterSubjects(yearId, 1), [yearId]);
  const { data: sem2Subjects } = useApi(() => api.getSemesterSubjects(yearId, 2), [yearId]);

  const subjectsForSemester = (semester === 1 ? sem1Subjects : sem2Subjects)?.filter((s) => s.mode === mode) ?? [];
  const activeSubject = subjectsForSemester.find((s) => s.code === activeSubjectCode) ?? subjectsForSemester[0] ?? null;

  // reset selected subject whenever the semester or year changes
  useEffect(() => { setActiveSubjectCode(null); }, [semester, yearId, mode]);

  const { data: groups, loading: groupsLoading } = useApi(
    () => (activeSubject ? api.getSubjectGroups(yearId, division, activeSubject, semester, batch) : Promise.resolve([])),
    [yearId, division, batch, activeSubject?.code, semester]
  );

  if (!sem1Subjects || !sem2Subjects) return <Loader label="Loading subjects…" />;

  return (
    <div>
      <div className="semester-tabs">
        {[1, 2].map((s) => (
          <button key={s} className={`semester-tab${semester === s ? " is-active" : ""}`} onClick={() => setSemester(s)}>
            Semester {s === 1 ? "I" : "II"}
          </button>
        ))}
      </div>

      {subjectsForSemester.length === 0 ? (
        <EmptyState title={`No ${mode} subject this semester`} desc="Check the other semester tab." />
      ) : (
        <>
          <div className="subject-chip-row">
            {subjectsForSemester.map((s) => (
              <button
                key={s.code}
                className={`subject-chip${s.code === activeSubject?.code ? " is-active" : ""}${s.mode === "EDI" ? " is-edi" : ""}`}
                onClick={() => setActiveSubjectCode(s.code)}
              >
                {s.name}
                <small>{s.code} · {s.credits} credits</small>
              </button>
            ))}
          </div>

          {groupsLoading || !groups ? (
            <Loader label="Loading project groups…" />
          ) : groups.length === 0 ? (
            <EmptyState title="No groups found" desc="This batch has no groups assigned for this subject yet." />
          ) : (
            <div className="group-grid">
              {groups.map((g) => (
                <GroupCard key={g.id} group={g} mode={mode} onClick={() => setOpenGroup(g)} />
              ))}
            </div>
          )}
        </>
      )}

      <GroupDetailModal group={openGroup} mode={mode} onClose={() => setOpenGroup(null)} />
    </div>
  );
}
