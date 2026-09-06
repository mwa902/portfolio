"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { Search, Filter } from "lucide-react";

const categories = ["All", "Full Stack", "Frontend", "AI / Full Stack"];

export default function ProjectsPage() {
  const [active, setActive]   = useState("All");
  const [query, setQuery]     = useState("");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger with a small delay so animation plays on load
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filtered = projects.filter((p) => {
    const matchCat = active === "All" || p.category === active;
    const matchQ   =
      query === "" ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchCat && matchQ;
  });

  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          padding: "140px 0 100px",
          position: "relative",
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(0,229,255,0.07) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 80% 80%, rgba(124,58,237,0.07) 0%, transparent 60%)",
        }}
      >
        {/* Particles strip */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 3,
            background: "linear-gradient(90deg, #00e5ff, #7c3aed, #ec4899)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 60,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <span
              className="inline-block text-sm font-semibold tracking-widest mb-3 px-4 py-1 rounded-full"
              style={{
                color: "#00e5ff",
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.2)",
                letterSpacing: "0.15em",
              }}
            >
              MY WORK
            </span>
            <h1 className="section-heading gradient-text mb-4">All Projects</h1>
            <p
              style={{
                color: "var(--text-secondary)",
                maxWidth: 520,
                margin: "0 auto",
                lineHeight: 1.7,
                fontSize: "1.05rem",
              }}
            >
              Every project here represents a challenge I took on, a problem I
              solved, and a skill I gained. Built with passion from Lahore, Pakistan. 🇵🇰
            </p>
          </div>

          {/* Controls */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 40,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            {/* Search */}
            <div
              style={{
                position: "relative",
                flex: "1 1 240px",
                maxWidth: 340,
              }}
            >
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--text-secondary)",
                }}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects or tech..."
                style={{
                  width: "100%",
                  paddingLeft: 40,
                  paddingRight: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  borderRadius: 10,
                  color: "#f0f0f0",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#00e5ff";
                  e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(0,229,255,0.2)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter
                size={15}
                style={{ color: "var(--text-secondary)", marginRight: 4 }}
              />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 9999,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    background:
                      active === cat
                        ? "linear-gradient(135deg, #00e5ff, #7c3aed)"
                        : "rgba(255,255,255,0.05)",
                    color: active === cat ? "#fff" : "var(--text-secondary)",
                    border:
                      active === cat
                        ? "1px solid transparent"
                        : "1px solid rgba(0,229,255,0.2)",
                    boxShadow:
                      active === cat ? "0 4px 20px rgba(0,229,255,0.3)" : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              marginBottom: 28,
            }}
          >
            Showing{" "}
            <span style={{ color: "#00e5ff", fontWeight: 700 }}>
              {filtered.length}
            </span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  visible={visible}
                />
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "80px 0",
                  color: "var(--text-secondary)",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                  No projects found for &quot;{query}&quot;
                </p>
                <p style={{ fontSize: "0.9rem", marginTop: 8 }}>
                  Try a different search or category.
                </p>
              </div>
            )}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              marginTop: 80,
              textAlign: "center",
              padding: "60px 32px",
              borderRadius: 20,
              background:
                "linear-gradient(135deg, rgba(0,229,255,0.06), rgba(124,58,237,0.06))",
              border: "1px solid rgba(0,229,255,0.15)",
            }}
          >
            <h3
              style={{
                fontSize: "1.8rem",
                fontWeight: 800,
                marginBottom: 12,
              }}
            >
              Want to collaborate on a{" "}
              <span className="gradient-text">project</span>?
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: 28,
                lineHeight: 1.7,
              }}
            >
              I&apos;m always open to discussing new opportunities and interesting ideas.
            </p>
            <a href="/#contact" className="btn-primary inline-block px-8 py-3 text-base">
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
