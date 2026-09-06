"use client";

import { Github, ExternalLink } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  featured: boolean;
  category: string;
  color: string;
}

const ICONS: Record<string, string> = {
  "Full Stack":     "⚡",
  "Frontend":       "🎨",
  "AI / Full Stack":"🤖",
};

export default function ProjectCard({
  project,
  index,
  visible,
}: {
  project: Project;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className="project-card"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ease ${index * 0.09}s,
                     transform 0.55s ease ${index * 0.09}s,
                     box-shadow 0.28s, border-color 0.28s, transform 0.28s`,
        "--c": project.color,
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform    = "translateY(-7px)";
        el.style.boxShadow    = `0 20px 55px ${project.color}28`;
        el.style.borderColor  = `${project.color}45`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform    = "translateY(0)";
        el.style.boxShadow    = "none";
        el.style.borderColor  = "var(--clr-border)";
      }}
    >
      {/* Accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, var(--clr-purple))` }} />

      {/* Thumbnail */}
      <div
        className="project-thumbnail"
        style={{ background: `linear-gradient(135deg, ${project.color}14, rgba(124,58,237,0.10))` }}
      >
        {/* Decorative lines */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 16 + i * 18,
              top:  18 + i * 32,
              height: 2,
              width: 48 + i * 22,
              background: `${project.color}22`,
              borderRadius: 2,
            }}
          />
        ))}

        <div
          className="project-icon"
          style={{
            background: `${project.color}18`,
            border: `2px solid ${project.color}38`,
          }}
        >
          {ICONS[project.category] ?? "💻"}
        </div>

        {project.featured && (
          <div
            className="project-badge"
            style={{ background: `linear-gradient(135deg, ${project.color}, var(--clr-purple))` }}
          >
            ★ Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="project-body">
        <span className="project-cat" style={{ color: project.color }}>
          {project.category}
        </span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Tech tags */}
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t} className="project-tech-tag">{t}</span>
          ))}
        </div>

        {/* Links */}
        <div className="project-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link project-link-code"
          >
            <Github size={13} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            style={{
              background: `${project.color}18`,
              border: `1px solid ${project.color}38`,
              color: project.color,
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background  = `${project.color}2e`;
              (e.currentTarget as HTMLElement).style.boxShadow   = `0 4px 18px ${project.color}38`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background  = `${project.color}18`;
              (e.currentTarget as HTMLElement).style.boxShadow   = "none";
            }}
          >
            <ExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
