import SectionHeading from "../components/ui/SectionHeading";
import Timeline from "../components/timeline/Timeline";

export default function CalendarPage() {
  return (
    <div className="section">
      <div className="container-app">
        <SectionHeading eyebrow="Semester roadmap" title="Academic timeline" desc="Every milestone in the odd semester 2026-27 calendar, from SDP registration through End-Semester examinations." />
        <div style={{ height: 22 }} />
        <Timeline />
      </div>
    </div>
  );
}
