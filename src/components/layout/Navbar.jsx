import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { YEARS } from "../../data/constants";

const linkClass = ({ isActive }) => `nav-link${isActive ? " is-active" : ""}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="app-navbar">
      <div className="container-app navbar-inner">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">
            <img src="/vit_logo.png" alt="VIT Pune" className="brand-mark-img" />
          </span>
          <span className="brand-text">
            <span className="brand-title">CSE (AI &amp; ML) Academic Portal</span>
            <span className="brand-sub">Vishwakarma Institute of Technology, Pune</span>
          </span>
        </NavLink>

        <button className="nav-toggle" onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
          {open ? <FiX /> : <FiMenu />}
        </button>

        <div className={`nav-links${open ? " is-open" : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Home</NavLink>
          {YEARS.map((y) => (
            <NavLink key={y.id} to={`/year/${y.id}`} className={linkClass} onClick={() => setOpen(false)}>
              {y.short}
            </NavLink>
          ))}
          <NavLink to="/calendar" className={linkClass} onClick={() => setOpen(false)}>Calendar</NavLink>
          <NavLink to="/announcements" className={linkClass} onClick={() => setOpen(false)}>Announcements</NavLink>
        </div>
      </div>
    </nav>
  );
}