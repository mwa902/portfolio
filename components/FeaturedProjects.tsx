"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="projects-preview"
      style={{
        padding: "120px 0",
        position: "relative",
        background:
          "radial-gradient(ellipse at 70% 30%, rgba(236,72,153,0.06) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-semibold tracking-widest mb-3 px-4 py-1 rounded-full"
            style={{
              color: "#ec4899",
              background: "rgba(236,72,153,0.08)",
              border: "1px solid rgba(236,72,153,0.2)",
              letterSpacing: "0.15em",
            }}
          >
            WHAT I&apos;VE BUILT
          </span>
          <h2 className="section-heading gradient-text">Featured Projects</h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 480,
              margin: "1rem auto 0",
              lineHeight: 1.7,
            }}
          >
            A selection of projects I&apos;m particularly proud of. Each one
            taught me something new.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-base"
          >
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
