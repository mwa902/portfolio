"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { label: "Home",     href: "/"         },
  { label: "About",    href: "/#about"   },
  { label: "Skills",   href: "/#skills"  },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();
  const { theme, toggle }       = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`nav-header${scrolled ? " nav-header--scrolled" : ""}`}>
      <nav className="container nav-inner">

        {/* ── Logo ── */}
        <Link href="/" className="nav-logo">
          <span className="nav-logo-icon">
            <Code2 size={18} strokeWidth={2.5} />
          </span>
          <span className="nav-logo-text">
            <span>Wahad</span>.dev
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav-link${pathname === l.href ? " active" : ""}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Right actions ── */}
        <div className="nav-right">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="theme-toggle"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <span className="theme-toggle-track">
              <span className="theme-toggle-thumb" />
              <Sun  size={12} className="toggle-icon toggle-icon--sun"  />
              <Moon size={12} className="toggle-icon toggle-icon--moon" />
            </span>
          </button>

          {/* Hire Me CTA */}
          <a href="/#contact" className="btn btn-primary btn-sm nav-cta">
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`nav-drawer${open ? " nav-drawer--open" : ""}`}>
        <ul className="nav-drawer-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav-link nav-link--mobile${pathname === l.href ? " active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="nav-drawer-footer">
            <button onClick={toggle} className="theme-toggle-mobile">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <a
              href="/#contact"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
              onClick={() => setOpen(false)}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        /* ── Header shell ────────────────────────────── */
        .nav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
          border-bottom: 1px solid transparent;
        }
        .nav-header--scrolled {
          background: var(--nav-bg-scrolled);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom-color: var(--nav-border-scrolled);
          box-shadow: var(--nav-shadow-scrolled);
        }

        /* ── Inner bar ───────────────────────────────── */
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
          gap: 1rem;
        }

        /* ── Logo ────────────────────────────────────── */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          flex-shrink: 0;
        }
        .nav-logo-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple));
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
          box-shadow: 0 2px 12px rgba(0,229,255,0.25);
        }
        .nav-logo-text {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--clr-text);
        }
        .nav-logo-text span { color: var(--clr-cyan); }

        /* ── Desktop links ───────────────────────────── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
          list-style: none;
          flex: 1;
          justify-content: center;
        }

        /* ── Right group ─────────────────────────────── */
        .nav-right {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          flex-shrink: 0;
        }

        .nav-cta { display: inline-flex; }

        /* ── Theme toggle pill ───────────────────────── */
        .theme-toggle {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .theme-toggle-track {
          position: relative;
          display: flex;
          align-items: center;
          width: 52px;
          height: 26px;
          border-radius: 9999px;
          background: var(--toggle-track-bg);
          border: 1.5px solid var(--toggle-track-border);
          transition: background 0.3s, border-color 0.3s;
          padding: 0 4px;
          overflow: hidden;
        }

        .theme-toggle-track:hover {
          border-color: var(--clr-cyan);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.12);
        }

        .theme-toggle-thumb {
          position: absolute;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple));
          left: var(--toggle-thumb-x, 3px);
          transition: left 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          z-index: 1;
        }

        .toggle-icon {
          position: absolute;
          transition: opacity 0.25s, color 0.25s;
        }
        .toggle-icon--sun  { right: 5px;  color: var(--toggle-sun-color);  opacity: var(--toggle-sun-opacity);  }
        .toggle-icon--moon { left:  5px;  color: var(--toggle-moon-color); opacity: var(--toggle-moon-opacity); }

        /* ── Mobile hamburger ────────────────────────── */
        .nav-toggle {
          display: none;
          background: none;
          border: 1.5px solid var(--clr-border);
          border-radius: 8px;
          color: var(--clr-text);
          padding: 0.3rem;
          line-height: 1;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .nav-toggle:hover {
          color: var(--clr-cyan);
          border-color: var(--clr-cyan);
          background: var(--clr-cyan-dim);
        }

        /* ── Mobile drawer ───────────────────────────── */
        .nav-drawer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
          background: var(--nav-drawer-bg);
          border-bottom: 1px solid transparent;
        }
        .nav-drawer--open {
          max-height: 480px;
          border-bottom-color: var(--clr-border);
        }
        .nav-drawer-links {
          list-style: none;
          padding: 0.75rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .nav-link--mobile {
          display: block;
          padding: 0.75rem 0;
          font-size: 1rem !important;
          font-weight: 600;
          border-bottom: 1px solid var(--clr-faint);
        }
        .nav-drawer-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 1rem;
        }
        .theme-toggle-mobile {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1rem;
          border-radius: var(--r-full, 9999px);
          font-size: 0.82rem;
          font-weight: 700;
          background: var(--clr-faint);
          border: 1.5px solid var(--clr-border);
          color: var(--clr-muted);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .theme-toggle-mobile:hover {
          color: var(--clr-cyan);
          border-color: var(--clr-cyan);
          background: var(--clr-cyan-dim);
        }

        /* ── Responsive breakpoints ──────────────────── */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-cta   { display: none; }
          .nav-toggle { display: flex; align-items: center; justify-content: center; }
        }
        @media (min-width: 769px) {
          .nav-drawer { display: none; }
        }
      `}</style>
    </header>
  );
}
