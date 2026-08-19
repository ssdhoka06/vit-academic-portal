import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="section" style={{ textAlign: "center" }}>
      <div className="container-app">
        <div className="section-eyebrow" style={{ justifyContent: "center", display: "inline-flex" }}>404</div>
        <h2 className="section-title">That page doesn't exist</h2>
        <p className="section-desc" style={{ margin: "0 auto 24px" }}>Check the link, or head back to the dashboard.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
}
