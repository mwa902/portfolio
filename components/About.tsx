"use client";

import { useEffect, useRef } from "react";
import { personal } from "@/lib/data";
import { MapPin, GraduationCap, Calendar, Coffee } from "lucide-react";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const stats = [
  { value: "2+",  label: "Years Coding",    icon: <Calendar size={20} /> },
  { value: "20+", label: "Projects Built",  icon: <Coffee size={20} />   },
  { value: "10+", label: "Technologies",    icon: <GraduationCap size={20} /> },
  { value: "∞",   label: "Cups of Chai ☕", icon: <Coffee size={20} />   },
];

export default function About() {
  const leftRef  = useReveal();
  const rightRef = useReveal();

  return (
    <section
      id="about"
      style={{
        padding: "120px 0",
        position: "relative",
        background:
          "radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.08) 0%, transparent 60%)",
      }}
    >
      {/* Section divider line */}
      <div
        style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-sm font-semibold tracking-widest mb-3 px-4 py-1 rounded-full"
            style={{
              color: "#00e5ff",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              letterSpacing: "0.15em",
            }}
          >
            WHO I AM
          </span>
          <h2 className="section-heading gradient-text">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT – avatar card */}
          <div
            ref={leftRef}
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div
              className="glass-card p-8 relative overflow-hidden"
              style={{ maxWidth: 460 }}
            >
              {/* Corner accents */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
                (pos, i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: 40, height: 40,
                      borderTop: i < 2 ? "2px solid rgba(0,229,255,0.5)" : "none",
                      borderBottom: i >= 2 ? "2px solid rgba(0,229,255,0.5)" : "none",
                      borderLeft: i % 2 === 0 ? "2px solid rgba(0,229,255,0.5)" : "none",
                      borderRight: i % 2 !== 0 ? "2px solid rgba(0,229,255,0.5)" : "none",
                      top: i < 2 ? 0 : "auto",
                      bottom: i >= 2 ? 0 : "auto",
                      left: i % 2 === 0 ? 0 : "auto",
                      right: i % 2 !== 0 ? 0 : "auto",
                    }}
                  />
                )
              )}

              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00e5ff, #7c3aed)",
                    padding: 3,
                    animation: "pulse-ring 3s ease infinite",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      background: "#0f0f2e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 56,
                    }}
                  >
                    👨‍💻
                  </div>
                </div>
              </div>

              <h3
                style={{
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  textAlign: "center",
                  marginBottom: 4,
                }}
              >
                {personal.name}
              </h3>
              <p
                style={{
                  textAlign: "center",
                  color: "#00e5ff",
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                {personal.role}
              </p>

              {/* Info rows */}
              {[
                { icon: <MapPin size={16} />,        text: personal.location     },
                { icon: <GraduationCap size={16} />, text: personal.university   },
                { icon: <Calendar size={16} />,      text: "Open to opportunities" },
              ].map(({ icon, text }, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 mb-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(0,229,255,0.05)",
                    border: "1px solid rgba(0,229,255,0.1)",
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span style={{ color: "#00e5ff" }}>{icon}</span>
                  {text}
                </div>
              ))}

              {/* Background glow */}
              <div
                style={{
                  position: "absolute",
                  top: -60, right: -60,
                  width: 200, height: 200,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* RIGHT – bio + stats */}
          <div
            ref={rightRef}
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {personal.bio}
            </p>

            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
              }}
            >
              When I&apos;m not coding, you&apos;ll find me exploring the latest dev
              trends, contributing to open source, sipping chai with a good
              YouTube tutorial, or talking about football. I believe great code
              tells a story — and I love crafting that story.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="glass-card p-5 flex flex-col items-center text-center"
                  style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 40px rgba(0,229,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <span style={{ color: "#00e5ff", marginBottom: 6 }}>{icon}</span>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      background:
                        "linear-gradient(135deg, #00e5ff, #7c3aed)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-secondary)",
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <a href="/#contact" className="btn-primary inline-block px-7 py-3 text-sm">
                Get in Touch
              </a>
              <a
                href="https://github.com/wahad-ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline inline-block px-7 py-3 text-sm"
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
