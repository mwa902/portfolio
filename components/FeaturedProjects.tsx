"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

export default function FeaturedProjects() {
  const headRef = useReveal(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef  = useReveal(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects-preview" className="section bg-projects">
      <div className="section-divider" style={{
        background: "linear-gradient(90deg, transparent, rgba(236,72,153,0.25), transparent)",
      }} />

      <div className="container">
        {/* Heading */}
        <div ref={headRef} className="reveal text-center" style={{ marginBottom: "3.5rem" }}>
          <span className="section-tag section-tag--pink">WHAT I&apos;VE BUILT</span>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of work I&apos;m proud of. Each one solved a real problem.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="projects-grid" style={{ marginBottom: "3rem" }}>
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} visible={visible} />
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="reveal text-center">
          <Link href="/projects" className="btn btn-primary btn-lg">
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
