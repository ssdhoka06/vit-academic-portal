import SectionHeading from "../components/ui/SectionHeading";
import AnnouncementFeed from "../components/announcements/AnnouncementFeed";

export default function AnnouncementsPage() {
  return (
    <div className="section">
      <div className="container-app">
        <SectionHeading eyebrow="Notice board" title="Announcements" desc="Every notice across admissions, academics, SDP, EDI, DT and course projects — filterable by category." />
        <div style={{ height: 22 }} />
        <AnnouncementFeed />
      </div>
    </div>
  );
}
