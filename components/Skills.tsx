"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";

const CATS = ["All", "Frontend", "Language", "Backend", "Database", "Tools", "DevOps"];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

const EXTRAS = [
  "REST APIs","GraphQL","Jest","Vitest","CI/CD","Vercel",
  "AWS S3","Linux","Vite","Zustand","React Query",
  "Prisma","Zod","NextAuth","Shadcn/ui","Webpack",
];

export default function Skills() {
  const { ref, inView } = useInView();
  const headRef         = useReveal(0);
  const filterRef       = useReveal(0.1);
  const cloudRef        = useReveal(0);
  const [active, setActive] = useState("All");

  const list = active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section id="skills" className="section bg-skills">
      <div className="section-divider" />
      <div className="container">

        {/* Heading */}
        <div ref={headRef} className="reveal text-center" style={{ marginBottom: "3rem" }}>
          <span className="section-tag section-tag--purple">WHAT I KNOW</span>
          <h2 className="section-title gradient-text">Skills &amp; Tech Stack</h2>
          <p className="section-subtitle">
            Technologies I build with daily. Always learning something new.
          </p>
        </div>

        {/* Filter chips */}
        <div
          ref={filterRef}
          className="reveal"
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}
        >
          {CATS.map((c) => (
            <button
              key={c}
              className={`filter-btn${active === c ? " active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Skill cards */}
        <div ref={ref} className="skills-grid" style={{ marginBottom: "3.5rem" }}>
          {list.map((sk, i) => (
            <div
              key={sk.name}
              className="skill-card"
              style={{
                opacity:    inView ? 1 : 0,
                transform:  inView ? "translateY(0)" : "translateY(18px)",
                transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, border-color 0.25s, box-shadow 0.25s`,
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <span style={{ fontSize: "1.35rem", lineHeight: 1 }}>{sk.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--clr-text)" }}>
                    {sk.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{
                    fontSize: "0.65rem", fontWeight: 700,
                    padding: "0.15rem 0.55rem", borderRadius: "var(--r-full)",
                    background: "var(--clr-cyan-dim)", color: "var(--clr-cyan)",
                    border: "1px solid var(--clr-cyan-border)",
                  }}>
                    {sk.category}
                  </span>
                  <span style={{ fontWeight: 800, fontSize: "var(--text-sm)", color: "var(--clr-cyan)" }}>
                    {sk.level}%
                  </span>
                </div>
              </div>
              {/* Bar */}
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{
                    width: inView ? `${sk.level}%` : "0%",
                    transitionDelay: `${i * 0.06 + 0.15}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Also know */}
        <div ref={cloudRef} className="reveal text-center">
          <p style={{
            color: "var(--clr-muted)", fontSize: "var(--text-xs)",
            letterSpacing: "0.12em", textTransform: "uppercase",
            marginBottom: "1.1rem",
          }}>
            Also comfortable with
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            {EXTRAS.map((t) => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
