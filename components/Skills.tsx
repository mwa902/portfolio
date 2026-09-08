"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/lib/data";

const CATS = ["All","Frontend","Language","Backend","Database","Tools","DevOps"];
const EXTRAS = ["REST APIs","GraphQL","Jest","Vitest","CI/CD","Vercel","AWS S3","Linux","Vite","Zustand","React Query","Prisma","Zod","NextAuth","Shadcn/ui","Webpack"];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); io.disconnect(); } }, { threshold:0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return { ref, v };
}

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.classList.add("reveal"); el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold:0.1 });
    io.observe(el); return () => io.disconnect();
  }, [delay]);
  return ref;
}

export default function Skills() {
  const { ref, v } = useInView();
  const hRef = useReveal(0);
  const fRef = useReveal(0.08);
  const cRef = useReveal(0);
  const [active, setActive] = useState("All");
  const list = active === "All" ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="section bg-skills">
      <div className="section-sep" />
      <div className="container">

        <div ref={hRef} className="text-center" style={{ marginBottom:"3rem" }}>
          <span className="eyebrow eyebrow--purple">What I Know</span>
          <h2 className="section-title gradient-text">Skills &amp; Tech Stack</h2>
          <p className="section-subtitle">Technologies I build with daily. Always learning something new.</p>
        </div>

        <div ref={fRef} style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.5rem", marginBottom:"2.25rem" }}>
          {CATS.map(c => (
            <button key={c} className={`filter-btn${active===c?" active":""}`} onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>

        <div ref={ref} className="skills-grid" style={{ marginBottom:"3.5rem" }}>
          {list.map((sk, i) => (
            <div key={sk.name} className="skill-card" style={{
              opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${i*0.055}s, transform 0.5s ease ${i*0.055}s, border-color 0.2s, box-shadow 0.2s`,
            }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"0.7rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.55rem" }}>
                  <span style={{ fontSize:"1.25rem", lineHeight:1 }}>{sk.icon}</span>
                  <span style={{ fontWeight:700, fontSize:"var(--tx-sm)", color:"var(--clr-text)" }}>{sk.name}</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  <span style={{ fontSize:"0.62rem", fontWeight:700, padding:"0.12rem 0.5rem", borderRadius:"var(--r-full)", background:"var(--clr-cyan-dim)", color:"var(--clr-cyan)", border:"1px solid var(--clr-cyan-border)" }}>{sk.category}</span>
                  <span style={{ fontWeight:800, fontSize:"var(--tx-sm)", color:"var(--clr-cyan)" }}>{sk.level}%</span>
                </div>
              </div>
              <div className="skill-track">
                <div className="skill-fill" style={{ width: v ? `${sk.level}%` : "0%", transitionDelay:`${i*0.055+0.12}s` }} />
              </div>
            </div>
          ))}
        </div>

        <div ref={cRef} className="text-center">
          <p style={{ color:"var(--clr-muted)", fontSize:"var(--tx-xs)", letterSpacing:"0.13em", textTransform:"uppercase", marginBottom:"1rem" }}>Also comfortable with</p>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"0.45rem" }}>
            {EXTRAS.map(t => <span key={t} className="tech-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
