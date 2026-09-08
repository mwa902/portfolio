"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.classList.add("reveal"); el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } }, { threshold:0.07 }
    );
    io.observe(el); return () => io.disconnect();
  }, [delay]);
  return ref;
}

export default function FeaturedProjects() {
  const hRef  = useReveal(0);
  const gRef  = useRef<HTMLDivElement>(null);
  const ctaRef = useReveal(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = gRef.current; if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } }, { threshold:0.04 }
    );
    io.observe(el); return () => io.disconnect();
  }, []);

  const featured = projects.filter(p => p.featured);

  return (
    <section id="projects-preview" className="section bg-projects">
      <div className="section-sep" style={{ background:"linear-gradient(90deg, transparent, rgba(236,72,153,0.22), transparent)" }} />
      <div className="container">

        <div ref={hRef} className="text-center" style={{ marginBottom:"3.5rem" }}>
          <span className="eyebrow eyebrow--pink">What I&apos;ve Built</span>
          <h2 className="section-title gradient-text">Featured Projects</h2>
          <p className="section-subtitle">A selection of work I&apos;m proud of. Each one solved a real problem.</p>
        </div>

        <div ref={gRef} className="projects-grid" style={{ marginBottom:"3rem" }}>
          {featured.map((p, i) => <ProjectCard key={p.id} project={p} index={i} visible={visible} />)}
        </div>

        <div ref={ctaRef} className="text-center">
          <Link href="/projects" className="btn btn-primary btn-lg">
            View All Projects <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
