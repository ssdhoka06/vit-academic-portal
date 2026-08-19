export function Loader({ label = "Loading…" }) {
  return (
    <div className="loader-wrap">
      <div className="spinner" />
      <div className="mono" style={{ fontSize: 12 }}>{label}</div>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", desc = "", icon = null }) {
  return (
    <div className="empty-state">
      {icon}
      <h4>{title}</h4>
      {desc && <p style={{ margin: 0, fontSize: 13 }}>{desc}</p>}
    </div>
  );
}
