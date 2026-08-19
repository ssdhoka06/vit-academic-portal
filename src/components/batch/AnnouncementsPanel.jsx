import { useApi } from "../../hooks/useApi";
import api from "../../services/api";
import { Loader, EmptyState } from "../ui/Feedback";
import { formatDate } from "../../utils/format";

export default function AnnouncementsPanel() {
  const { data, loading } = useApi(() => api.getAnnouncements({ limit: 8 }), []);
  if (loading) return <Loader label="Loading announcements…" />;
  if (!data?.length) return <EmptyState title="No announcements" />;

  return (
    <div className="card card-pad">
      {data.map((a) => (
        <div className="announcement-item" key={a.id}>
          <div className="ann-date">{formatDate(a.date)}</div>
          <div>
            <span className="ann-badge">{a.category}</span>
            <div className="ann-title">{a.title}</div>
            <p className="ann-body">{a.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
