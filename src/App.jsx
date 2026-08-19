import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/layout/BackToTop";
import HomePage from "./pages/HomePage";
import YearPage from "./pages/YearPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import CalendarPage from "./pages/CalendarPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/year/:yearId" element={<YearPage />} />
          <Route path="/year/:yearId/:division/:batch/:section" element={<YearPage />} />
          <Route path="/year/:yearId/:division/:batch" element={<YearPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
