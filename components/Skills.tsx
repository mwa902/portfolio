"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

const categories = ["All", "Frontend", "Language", "Backend", "Database", "Tools", "DevOps"];

export default function Skills() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? skills : skills.filter((s) => s.category === active);

  return (
    <section
      id="skills"
      style={{
        padding: "120px 0",
        position: "relative",
        background:
          "radial-gradient(ellipse at 20% 60%, rgba(0,229,255,0.06) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-semibold tracking-widest mb-3 px-4 py-1 rounded-full"
            style={{
              color: "#7c3aed",
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.3)",
              letterSpacing: "0.15em",
            }}
          >
            WHAT I KNOW
          </span>
          <h2 className="section-heading gradient-text">Skills & Tech Stack</h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 500,
              margin: "1rem auto 0",
              lineHeight: 1.7,
            }}
          >
            A collection of technologies I&apos;ve worked with. I&apos;m always learning something new.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 18px",
                borderRadius: 9999,
                fontSize: "0.85rem",
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
                boxShadow: active === cat ? "0 4px 20px rgba(0,229,255,0.3)" : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill bars */}
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-6"
        >
          {filtered.map((skill, i) => (
            <div
              key={skill.name}
              className="glass-card p-5"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "1.4rem" }}>{skill.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    style={{
                      fontSize: "0.7rem",
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: "rgba(0,229,255,0.1)",
                      color: "#00e5ff",
                      border: "1px solid rgba(0,229,255,0.2)",
                    }}
                  >
                    {skill.category}
                  </span>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      color: "#00e5ff",
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>

              {/* Bar track */}
              <div
                style={{
                  height: 8,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 9999,
                  overflow: "hidden",
                }}
              >
                <div
                  className="skill-bar-fill"
                  style={{
                    width: inView ? `${skill.level}%` : "0%",
                    transitionDelay: `${i * 0.07 + 0.2}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tech cloud */}
        <div className="mt-20 text-center">
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.85rem",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
              textTransform: "uppercase",
            }}
          >
            Also comfortable with
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "REST APIs", "GraphQL", "Jest", "Vitest", "CI/CD", "Vercel",
              "AWS S3", "Linux", "Webpack", "Vite", "Zustand", "React Query",
              "Prisma", "Zod", "NextAuth", "Shadcn/ui",
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "5px 14px",
                  borderRadius: 9999,
                  fontSize: "0.82rem",
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.25)",
                  color: "var(--text-secondary)",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(124,58,237,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "#c4b5fd";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(124,58,237,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(124,58,237,0.08)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(124,58,237,0.25)";
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
