"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="theme-rail" aria-label="Theme toggle" role="complementary">
      {/* Glow track line */}
      <div className="theme-rail-line" />

      {/* Toggle button */}
      <button
        onClick={toggle}
        className={`theme-rail-btn${isDark ? "" : " theme-rail-btn--light"}`}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        {/* Animated icon */}
        <span className={`theme-rail-icon theme-rail-icon--sun${!isDark ? " active" : ""}`}>
          <Sun size={15} strokeWidth={2.5} />
        </span>
        <span className={`theme-rail-icon theme-rail-icon--moon${isDark ? " active" : ""}`}>
          <Moon size={15} strokeWidth={2.5} />
        </span>

        {/* Glow ring on hover */}
        <span className="theme-rail-ring" />
      </button>

      {/* Label — rotated text */}
      <span className="theme-rail-label">
        {isDark ? "DARK" : "LIGHT"}
      </span>

      <style>{`
        /* ── Fixed pill on right edge, centred vertically ── */
        .theme-rail {
          position: fixed;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          z-index: 998;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          /* Pill container */
          background: var(--tr-bg, rgba(10,10,30,0.85));
          border: 1px solid var(--tr-border, rgba(0,229,255,0.22));
          border-right: none;
          border-radius: 14px 0 0 14px;
          padding: 10px 8px 12px;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow:
            -4px 0 28px rgba(0,229,255,0.12),
            -2px 0 8px rgba(0,0,0,0.35),
            inset 1px 0 0 rgba(0,229,255,0.06);
          transition: box-shadow 0.3s, background 0.35s;
        }

        [data-theme="light"] .theme-rail {
          --tr-bg: rgba(244,246,251,0.92);
          --tr-border: rgba(2,132,199,0.25);
          box-shadow:
            -4px 0 28px rgba(2,132,199,0.10),
            -2px 0 8px rgba(0,0,0,0.08);
        }

        .theme-rail:hover {
          box-shadow:
            -6px 0 40px rgba(0,229,255,0.22),
            -2px 0 12px rgba(0,0,0,0.4),
            inset 1px 0 0 rgba(0,229,255,0.12);
        }

        /* ── Glowing line on top ─────────────────────── */
        .theme-rail-line {
          width: 2px;
          height: 20px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, var(--clr-cyan));
          opacity: 0.5;
          margin-bottom: 6px;
        }

        /* ── Toggle button ───────────────────────────── */
        .theme-rail-btn {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1.5px solid rgba(0,229,255,0.28);
          background: linear-gradient(135deg,
            rgba(0,229,255,0.12) 0%,
            rgba(124,58,237,0.12) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1),
                      border-color 0.25s, box-shadow 0.25s, background 0.3s;
          overflow: hidden;
          margin-bottom: 6px;
        }

        .theme-rail-btn:hover {
          transform: scale(1.12) translateX(-2px);
          border-color: var(--clr-cyan);
          box-shadow: 0 0 20px rgba(0,229,255,0.40), 0 0 40px rgba(124,58,237,0.20);
          background: linear-gradient(135deg,
            rgba(0,229,255,0.22) 0%,
            rgba(124,58,237,0.22) 100%
          );
        }

        .theme-rail-btn:active { transform: scale(0.94) translateX(-1px); }

        [data-theme="light"] .theme-rail-btn {
          border-color: rgba(2,132,199,0.35);
          background: linear-gradient(135deg,
            rgba(2,132,199,0.10) 0%,
            rgba(124,58,237,0.10) 100%
          );
        }
        [data-theme="light"] .theme-rail-btn:hover {
          border-color: var(--clr-cyan);
          box-shadow: 0 0 20px rgba(2,132,199,0.30);
        }

        /* ── Icons ───────────────────────────────────── */
        .theme-rail-icon {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          opacity: 0;
          transform: scale(0.4) rotate(90deg);
        }
        .theme-rail-icon.active {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        .theme-rail-icon--sun  { color: #f59e0b; }
        .theme-rail-icon--moon { color: var(--clr-cyan); }

        /* ── Animated ring on hover ──────────────────── */
        .theme-rail-ring {
          position: absolute;
          inset: -1px;
          border-radius: 10px;
          border: 1.5px solid transparent;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple)) border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.25s;
          pointer-events: none;
        }
        .theme-rail-btn:hover .theme-rail-ring { opacity: 1; }

        /* ── Rotated label ───────────────────────────── */
        .theme-rail-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: var(--clr-muted);
          user-select: none;
          margin-top: 4px;
          transition: color 0.3s;
        }
        .theme-rail:hover .theme-rail-label { color: var(--clr-cyan); }

        /* ── Glowing line on bottom ──────────────────── */
        .theme-rail::after {
          content: '';
          display: block;
          width: 2px;
          height: 20px;
          border-radius: 2px;
          background: linear-gradient(180deg, var(--clr-purple), transparent);
          opacity: 0.5;
          margin-top: 4px;
        }

        /* Hide on very small screens */
        @media (max-width: 480px) {
          .theme-rail { display: none; }
        }
      `}</style>
    </div>
  );
}
