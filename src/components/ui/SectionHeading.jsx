export default function SectionHeading({ eyebrow, title, desc, className = "" }) {
  return (
    <div className={className}>
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      {title && <h2 className="section-title">{title}</h2>}
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}
