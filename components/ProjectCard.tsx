"use client";

import { Github, ExternalLink } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  image?: string;
  featured: boolean;
  category: string;
  color: string;
}

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
      className="glass-card overflow-hidden group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.3s ease`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${project.color}30`;
        (e.currentTarget as HTMLElement).style.borderColor = `${project.color}50`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(0,229,255,0.25)";
        (e.currentTarget as HTMLElement).style.transform = visible
          ? "translateY(0)"
          : "translateY(30px)";
      }}
    >
      {/* Color bar top */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${project.color}, #7c3aed)`,
        }}
      />

      {/* Image / placeholder */}
      <div
        style={{
          height: 180,
          background: `linear-gradient(135deg, ${project.color}18, rgba(124,58,237,0.12))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative code lines */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 20 + i * 15,
              top: 20 + i * 28,
              height: 2,
              width: 60 + Math.random() * 80,
              background: `${project.color}30`,
              borderRadius: 2,
            }}
          />
        ))}
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: `${project.color}20`,
            border: `2px solid ${project.color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            zIndex: 1,
          }}
        >
          {project.category.includes("AI")
            ? "🤖"
            : project.category === "Frontend"
            ? "🎨"
            : "⚡"}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: "3px 10px",
              borderRadius: 9999,
              fontSize: "0.7rem",
              fontWeight: 700,
              background: `linear-gradient(135deg, ${project.color}, #7c3aed)`,
              color: "#fff",
            }}
          >
            ★ Featured
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Category tag */}
        <span
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: project.color,
            marginBottom: 8,
            display: "block",
          }}
        >
          {project.category}
        </span>

        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: 800,
            marginBottom: 8,
            color: "#f0f0f0",
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            lineHeight: 1.65,
            marginBottom: 16,
          }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.72rem",
                padding: "3px 10px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-secondary)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--text-secondary)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,229,255,0.1)";
              (e.currentTarget as HTMLElement).style.color = "#00e5ff";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,229,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <Github size={15} /> Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}40`,
              color: project.color,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${project.color}30`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${project.color}40`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = `${project.color}15`;
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            <ExternalLink size={15} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
