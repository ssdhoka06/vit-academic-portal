import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { YEARS, DIVISIONS, BATCHES } from "../data/constants";
import { getSectionsForYear } from "../data/sections";
import YearTabs from "../components/nav/YearTabs";
import DivisionBatchBar from "../components/nav/DivisionBatchBar";
import LedgerRail from "../components/nav/LedgerRail";
import SectionHeading from "../components/ui/SectionHeading";
import OverviewPanel from "../components/batch/OverviewPanel";
import SDPPanel from "../components/batch/SDPPanel";
import DTPanel from "../components/batch/DTPanel";
import MentorPanel from "../components/batch/MentorPanel";
import ReviewSubmissionPanel from "../components/batch/ReviewSubmissionPanel";
import AnnouncementsPanel from "../components/batch/AnnouncementsPanel";
import SubjectExplorer from "../components/projects/SubjectExplorer";
import NotFoundPage from "./NotFoundPage";

export default function YearPage() {
  const { yearId, division, batch, section } = useParams();
  const navigate = useNavigate();
  const year = YEARS.find((y) => y.id === yearId);
  const sections = getSectionsForYear(yearId); // e.g. Final Year has no "cp" section

  // normalise the URL: fill in sensible defaults for any missing pieces
  useEffect(() => {
    if (!year) return;
    const d = DIVISIONS.includes(division) ? division : "A";
    const b = BATCHES.includes(batch) ? batch : "B1";
    const s = sections.some((x) => x.key === section) ? section : "overview";
    if (d !== division || b !== batch || s !== section) {
      navigate(`/year/${yearId}/${d}/${b}/${s}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, yearId, division, batch, section, navigate]);

  if (!year) return <NotFoundPage />;
  if (!DIVISIONS.includes(division) || !BATCHES.includes(batch) || !sections.some((x) => x.key === section)) return null;

  const sectionLabel = sections.find((s) => s.key === section)?.label;

  return (
    <div className="section">
      <div className="container-app">
        <SectionHeading eyebrow="Academic hierarchy" title="Year → Division → Batch" desc="Choose a year, then a division and batch, to view its full academic record." />
        <div style={{ height: 22 }} />
        <YearTabs activeYearId={yearId} />
        <DivisionBatchBar yearId={yearId} division={division} batch={batch} section={section} />

        <div className="batch-layout">
          <LedgerRail yearId={yearId} division={division} batch={batch} activeSection={section} />

          <div>
            <div className="batch-content-head">
              <div>
                <div className="batch-crumb">{year.label} / Division {division} / Batch {batch}</div>
                <h2 style={{ margin: 0, fontSize: 22 }}>{sectionLabel}</h2>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${yearId}-${division}-${batch}-${section}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {section === "overview" && <OverviewPanel yearId={yearId} division={division} batch={batch} />}
                {section === "sdp" && <SDPPanel yearId={yearId} />}
                {section === "edi" && <SubjectExplorer yearId={yearId} division={division} batch={batch} mode="EDI" />}
                {section === "dt" && <DTPanel yearId={yearId} division={division} batch={batch} />}
                {section === "cp" && <SubjectExplorer yearId={yearId} division={division} batch={batch} mode="CP" />}
                {section === "mentor" && <MentorPanel yearId={yearId} division={division} batch={batch} />}
                {section === "reviews" && <ReviewSubmissionPanel yearId={yearId} type="reviews" />}
                {section === "submissions" && <ReviewSubmissionPanel yearId={yearId} type="submissions" />}
                {section === "announcements" && <AnnouncementsPanel />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}