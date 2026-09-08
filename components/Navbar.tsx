"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";

const LINKS = [
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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`nb-header${scrolled ? " nb-scrolled" : ""}`}>
      <nav className="container nb-inner">

        {/* Logo */}
        <Link href="/" className="nb-logo">
          <span className="nb-logo-icon">
            <Code2 size={17} strokeWidth={2.5} />
          </span>
          <span className="nb-logo-text">
            <span>Wahad</span>.dev
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="nb-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={`nav-link${pathname === l.href ? " active" : ""}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="/#contact" className="btn btn-primary btn-sm nb-cta">
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          className="nb-toggle"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`nb-drawer${open ? " nb-drawer--open" : ""}`}>
        <ul className="nb-drawer-list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav-link nb-drawer-link${pathname === l.href ? " active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li style={{ paddingTop: "0.875rem" }}>
            <a href="/#contact" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}
               onClick={() => setOpen(false)}>
              Hire Me
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        .nb-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          border-bottom: 1px solid transparent;
          transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s, box-shadow 0.4s;
        }
        .nb-scrolled {
          background: var(--nav-bg-scrolled);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border-bottom-color: var(--nav-border-scrolled);
          box-shadow: var(--nav-shadow-scrolled);
        }
        .nb-inner {
          display: flex; align-items: center;
          justify-content: space-between;
          height: 68px; gap: 1rem;
        }
        /* Logo */
        .nb-logo {
          display: flex; align-items: center; gap: 0.5rem;
          text-decoration: none; flex-shrink: 0;
        }
        .nb-logo-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple));
          display: flex; align-items: center; justify-content: center;
          color: #fff; flex-shrink: 0;
          box-shadow: 0 2px 14px rgba(0,132,199,0.30);
        }
        .nb-logo-text {
          font-size: 1.15rem; font-weight: 800;
          letter-spacing: -0.02em; color: var(--clr-text);
        }
        .nb-logo-text span { color: var(--clr-cyan); }
        /* Links */
        .nb-links {
          display: flex; align-items: center; gap: 2rem;
          list-style: none; flex: 1; justify-content: center;
        }
        .nb-cta { display: inline-flex; }
        /* Toggle */
        .nb-toggle {
          display: none; background: none;
          border: 1.5px solid var(--clr-border);
          border-radius: 8px; color: var(--clr-text);
          padding: 0.3rem; line-height: 1;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .nb-toggle:hover {
          color: var(--clr-cyan); border-color: var(--clr-cyan);
          background: var(--clr-cyan-dim);
        }
        /* Drawer */
        .nb-drawer {
          overflow: hidden; max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
          background: var(--nav-drawer-bg);
          border-bottom: 1px solid transparent;
        }
        .nb-drawer--open {
          max-height: 440px;
          border-bottom-color: var(--clr-border);
        }
        .nb-drawer-list {
          list-style: none;
          padding: 0.75rem 1.5rem 1.5rem;
          display: flex; flex-direction: column; gap: 0;
        }
        .nb-drawer-link {
          display: block; padding: 0.75rem 0;
          font-size: 1rem !important; font-weight: 600;
          border-bottom: 1px solid var(--clr-faint);
        }
        @media (max-width: 768px) {
          .nb-links { display: none; }
          .nb-cta   { display: none; }
          .nb-toggle { display: flex; align-items: center; justify-content: center; }
        }
        @media (min-width: 769px) {
          .nb-drawer { display: none; }
        }
      `}</style>
    </header>
  );
}
