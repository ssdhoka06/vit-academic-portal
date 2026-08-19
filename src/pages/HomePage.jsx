import Hero from "../components/home/Hero";
import DashboardCards from "../components/home/DashboardCards";
import { AboutCard, AnnouncementsPreview, TimelinePreview } from "../components/home/HomePanels";
import SectionHeading from "../components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="container-app">
          <SectionHeading eyebrow="At a glance" title="Program dashboard" desc="A snapshot of the four academic tracks running in parallel this semester." />
          <div style={{ height: 20 }} />
          <DashboardCards />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container-app">
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
            <div className="stack-20">
              <AboutCard />
              <AnnouncementsPreview />
            </div>
            <TimelinePreview />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .section-tight .container-app > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
