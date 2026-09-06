"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { Search, SlidersHorizontal } from "lucide-react";

const CATS = ["All", "Full Stack", "Frontend", "AI / Full Stack"];

export default function ProjectsPage() {
  const [active,  setActive]  = useState("All");
  const [query,   setQuery]   = useState("");
  const [visible, setVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* reveal header */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const filtered = projects.filter((p) => {
    const catOk = active === "All" || p.category === active;
    const qLow  = query.toLowerCase();
    const qOk   = !query ||
      p.title.toLowerCase().includes(qLow) ||
      p.tech.some((t) => t.toLowerCase().includes(qLow));
    return catOk && qOk;
  });

  return (
    <>
      <section
        className="bg-hero"
        style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "80px", position: "relative" }}
      >
        {/* Top gradient bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, var(--clr-cyan), var(--clr-purple), var(--clr-pink))",
        }} />

        <div className="container">
          {/* Page header */}
          <div
            ref={headerRef}
            className="reveal text-center"
            style={{ marginBottom: "3.5rem" }}
          >
            <span className="section-tag section-tag--cyan">MY WORK</span>
            <h1 className="section-title gradient-text" style={{ marginBottom: "1rem" }}>
              All Projects
            </h1>
            <p className="section-subtitle">
              Every project here is a problem I solved and a skill I gained.
              Built with passion from Lahore, Pakistan 🇵🇰
            </p>
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.5rem",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
              <Search
                size={15}
                style={{
                  position: "absolute", left: 12, top: "50%",
                  transform: "translateY(-50%)", color: "var(--clr-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or tech…"
                className="form-input"
                style={{ paddingLeft: "2.25rem" }}
              />
            </div>

            {/* Category filter */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              <SlidersHorizontal size={14} style={{ color: "var(--clr-muted)" }} />
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
          </div>

          {/* Count */}
          <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-sm)", marginBottom: "1.75rem" }}>
            Showing{" "}
            <span style={{ color: "var(--clr-cyan)", fontWeight: 700 }}>{filtered.length}</span>
            {" "}project{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <div ref={gridRef} className="projects-grid" style={{ marginBottom: "5rem" }}>
            {filtered.length > 0 ? (
              filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} visible={visible} />
              ))
            ) : (
              <div style={{
                gridColumn: "1 / -1", textAlign: "center",
                padding: "5rem 0", color: "var(--clr-muted)",
              }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
                <p style={{ fontSize: "var(--text-lg)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p style={{ fontSize: "var(--text-sm)" }}>
                  Try a different keyword or category.
                </p>
              </div>
            )}
          </div>

          {/* Bottom CTA banner */}
          <div style={{
            textAlign: "center",
            padding: "3.5rem 2rem",
            borderRadius: "var(--r-xl)",
            background: "linear-gradient(135deg, rgba(0,229,255,0.06), rgba(124,58,237,0.06))",
            border: "1px solid rgba(0,229,255,0.14)",
          }}>
            <h3 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
              Want to collaborate on a{" "}
              <span className="gradient-text">project</span>?
            </h3>
            <p style={{ color: "var(--clr-muted)", marginBottom: "1.75rem", fontSize: "var(--text-base)", lineHeight: 1.7 }}>
              I&apos;m always open to discussing new opportunities and interesting ideas.
            </p>
            <a href="/#contact" className="btn btn-primary btn-lg">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
