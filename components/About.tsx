"use client";

import { useEffect, useRef } from "react";
import { personal } from "@/lib/data";
import { MapPin, GraduationCap, CalendarDays, Briefcase } from "lucide-react";

/* ── Intersection reveal hook ────────────────────────────── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

const STATS = [
  { value: "2+",  label: "Years Coding"    },
  { value: "20+", label: "Projects Built"  },
  { value: "10+", label: "Technologies"    },
  { value: "∞",   label: "Cups of Chai ☕" },
];

export default function About() {
  const leftRef  = useReveal(0);
  const rightRef = useReveal(0.15);

  return (
    <section id="about" className="section bg-about">
      <div className="section-divider" />

      <div className="container">
        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "3.5rem" }}>
          <span className="section-tag section-tag--cyan">WHO I AM</span>
          <h2 className="section-title gradient-text">About Me</h2>
        </div>

        <div className="about-grid">
          {/* ── LEFT: profile card ──────────────────────────── */}
          <div ref={leftRef} className="reveal">
            <div className="card" style={{ padding: "2rem 1.75rem", position: "relative", overflow: "hidden" }}>
              {/* Corner brackets */}
              {[
                { top: 0,    left: 0,    borderTop: "2px solid", borderLeft:  "2px solid", borderColor: "rgba(0,229,255,0.45)" },
                { top: 0,    right: 0,   borderTop: "2px solid", borderRight: "2px solid", borderColor: "rgba(0,229,255,0.45)" },
                { bottom: 0, left: 0,    borderBottom: "2px solid", borderLeft:  "2px solid", borderColor: "rgba(0,229,255,0.45)" },
                { bottom: 0, right: 0,   borderBottom: "2px solid", borderRight: "2px solid", borderColor: "rgba(0,229,255,0.45)" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: 36, height: 36, ...s }} />
              ))}

              {/* Avatar */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
                <div
                  className="about-avatar-wrap anim-pulse-ring"
                  style={{ animationName: "pulse-ring" }}
                >
                  <div className="about-avatar-inner">👨‍💻</div>
                </div>
              </div>

              <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, textAlign: "center", marginBottom: "0.25rem" }}>
                {personal.name}
              </h3>
              <p style={{ textAlign: "center", color: "var(--clr-cyan)", fontWeight: 600, fontSize: "var(--text-sm)", marginBottom: "1.5rem" }}>
                {personal.role}
              </p>

              {/* Info rows */}
              {[
                { Icon: MapPin,        text: personal.location,     },
                { Icon: GraduationCap, text: personal.university,   },
                { Icon: Briefcase,     text: "Open to opportunities"},
                { Icon: CalendarDays,  text: "2+ Years Experience"  },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="about-info-row">
                  <span className="icon"><Icon size={15} /></span>
                  <span style={{ fontSize: "var(--text-sm)" }}>{text}</span>
                </div>
              ))}

              {/* Decorative bg glow */}
              <div style={{
                position: "absolute", top: -50, right: -50,
                width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>

          {/* ── RIGHT: bio + stats + CTAs ───────────────────── */}
          <div ref={rightRef} className="reveal">
            <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-base)", lineHeight: 1.85, marginBottom: "1.25rem" }}>
              {personal.bio}
            </p>
            <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-base)", lineHeight: 1.85, marginBottom: "2.25rem" }}>
              When I&apos;m not coding you&apos;ll find me exploring the latest dev trends,
              contributing to open source, sipping chai with a YouTube tutorial, or
              talking about football. I believe great code tells a story — and I love
              crafting that story.
            </p>

            {/* Stats */}
            <div className="stats-grid" style={{ marginBottom: "2rem" }}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="stat-card">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem" }}>
              <a href="/#contact" className="btn btn-primary">
                Get in Touch
              </a>
              <a
                href="https://github.com/wahad-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
