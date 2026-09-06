"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";

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

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* close drawer on route change */
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

        {/* ── Desktop CTA ── */}
        <a href="/#contact" className="btn btn-primary btn-sm nav-cta">
          Hire Me
        </a>

        {/* ── Mobile toggle ── */}
        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
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
          <li>
            <a
              href="/#contact"
              className="btn btn-primary w-full"
              style={{ justifyContent: "center", marginTop: "0.5rem" }}
              onClick={() => setOpen(false)}
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>

      <style>{`
        .nav-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 999;
          transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
          border-bottom: 1px solid transparent;
        }
        .nav-header--scrolled {
          background: rgba(5, 5, 15, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom-color: rgba(0,229,255,0.12);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }
        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }
        .nav-logo-icon {
          width: 36px; height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple));
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .nav-logo-text {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #fff;
        }
        .nav-logo-text span { color: var(--clr-cyan); }

        /* Desktop links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
          list-style: none;
        }
        .nav-cta { display: inline-flex; }

        /* Mobile toggle */
        .nav-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--clr-text);
          padding: 0.25rem;
          line-height: 1;
          transition: color 0.2s;
        }
        .nav-toggle:hover { color: var(--clr-cyan); }

        /* Mobile drawer */
        .nav-drawer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1);
          background: rgba(5, 5, 15, 0.97);
          border-bottom: 1px solid transparent;
        }
        .nav-drawer--open {
          max-height: 420px;
          border-bottom-color: rgba(0,229,255,0.12);
        }
        .nav-drawer-links {
          list-style: none;
          padding: 1rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .nav-link--mobile {
          display: block;
          padding: 0.65rem 0;
          font-size: 1rem !important;
          font-weight: 600;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none; }
          .nav-toggle { display: block; }
        }
        @media (min-width: 769px) {
          .nav-drawer { display: none; }
        }
      `}</style>
    </header>
  );
}
