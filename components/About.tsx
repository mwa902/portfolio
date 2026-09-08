"use client";

import { useEffect, useRef } from "react";
import { personal } from "@/lib/data";
import { MapPin, GraduationCap, CalendarDays, Briefcase } from "lucide-react";

function useReveal(cls = "reveal", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.classList.add(cls);
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cls, delay]);
  return ref;
}

const STATS = [
  { value:"2+",  label:"Years Coding"    },
  { value:"20+", label:"Projects Built"  },
  { value:"10+", label:"Technologies"    },
  { value:"∞",   label:"Cups of Chai ☕" },
];

export default function About() {
  const l = useReveal("reveal-l", 0);
  const r = useReveal("reveal-r", 0.12);

  return (
    <section id="about" className="section bg-about">
      <div className="section-sep" />
      <div className="container">

        <div className="text-center" style={{ marginBottom:"3.5rem" }}>
          <span className="eyebrow eyebrow--cyan">Who I Am</span>
          <h2 className="section-title gradient-text">About Me</h2>
          <p className="section-subtitle">Developer, student, chai enthusiast.</p>
        </div>

        <div className="about-grid">
          {/* Profile card */}
          <div ref={l}>
            <div className="about-card">
              <div style={{ display:"flex", justifyContent:"center", marginBottom:"1.1rem" }}>
                <div className="about-avatar-wrap anim-pulse-ring">
                  <div className="about-avatar-inner">👨‍💻</div>
                </div>
              </div>
              <h3 style={{ fontSize:"var(--tx-2xl)", fontWeight:800, marginBottom:"0.2rem" }}>{personal.name}</h3>
              <p style={{ color:"var(--clr-cyan)", fontWeight:600, fontSize:"var(--tx-sm)", marginBottom:"1.4rem" }}>{personal.role}</p>

              {[
                { Icon: MapPin,        text: personal.location       },
                { Icon: GraduationCap, text: personal.university     },
                { Icon: Briefcase,     text: "Open to opportunities" },
                { Icon: CalendarDays,  text: "2+ Years Experience"   },
              ].map(({ Icon, text }, i) => (
                <div key={i} className="about-info-row">
                  <span className="icon"><Icon size={14} /></span>
                  <span style={{ fontSize:"var(--tx-sm)" }}>{text}</span>
                </div>
              ))}

              {/* decorative glow */}
              <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
            </div>
          </div>

          {/* Bio + stats */}
          <div ref={r} style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <p style={{ color:"var(--clr-muted)", fontSize:"var(--tx-base)", lineHeight:1.85, marginBottom:"1.1rem" }}>
              {personal.bio}
            </p>
            <p style={{ color:"var(--clr-muted)", fontSize:"var(--tx-base)", lineHeight:1.85, marginBottom:"2rem" }}>
              When I&apos;m not coding you&apos;ll find me exploring new dev trends, contributing to open source,
              sipping chai with a good tutorial, or talking football. Great code tells a story — I love crafting that story.
            </p>

            <div className="stats-grid">
              {STATS.map(({ value, label }) => (
                <div key={label} className="stat-card">
                  <div className="stat-value">{value}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.875rem" }}>
              <a href="/#contact" className="btn btn-primary">Get in Touch</a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub Profile</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
