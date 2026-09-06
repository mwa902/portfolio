"use client";

import { useEffect, useRef, useState } from "react";
import { orbitItems } from "@/lib/data";
import { Github, Linkedin, Twitter, Download, ArrowRight } from "lucide-react";
import Link from "next/link";

/* ── Particle canvas ─────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width)  p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Orbiting icon ──────────────────────────────────────────── */
function OrbitItem({
  icon, label, size, radius, speed, delay, index,
}: {
  icon: string; label: string; size: number;
  radius: number; speed: number; delay: number; index: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        animation: `orbit ${speed}s linear ${delay}s infinite`,
        ["--radius" as string]: `${radius}px`,
        transformOrigin: "0 0",
        top: "50%",
        left: "50%",
        marginTop: -(size / 2),
        marginLeft: -(size / 2),
      }}
    >
      <div
        title={label}
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0,229,255,0.08)",
          border: "1px solid rgba(0,229,255,0.3)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.45,
          backdropFilter: "blur(8px)",
          cursor: "default",
          boxShadow: "0 0 12px rgba(0,229,255,0.2)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.2)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 24px rgba(0,229,255,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 12px rgba(0,229,255,0.2)";
        }}
      >
        {icon}
      </div>
    </div>
  );
}

/* ── Developer character (SVG) ──────────────────────────────── */
function DevCharacter() {
  return (
    <div
      style={{ animation: "float 4s ease-in-out infinite" }}
      className="relative"
    >
      {/* Glow base */}
      <div
        style={{
          position: "absolute",
          bottom: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 30,
          background: "radial-gradient(ellipse, rgba(0,229,255,0.4) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <svg
        width="200"
        height="260"
        viewBox="0 0 200 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Body / hoodie */}
        <rect x="55" y="120" width="90" height="90" rx="20" fill="#1a1a3e" />
        <rect x="55" y="120" width="90" height="90" rx="20"
          fill="url(#bodyGrad)" opacity="0.8" />
        {/* Hood */}
        <path d="M55 140 Q50 115 70 110 Q100 100 130 110 Q150 115 145 140 Z"
          fill="#12122e" />
        {/* Code text on hoodie */}
        <text x="72" y="165" fill="#00e5ff" fontSize="10" fontFamily="monospace"
          fontWeight="bold">
          &lt;/&gt;
        </text>
        <text x="85" y="180" fill="rgba(0,229,255,0.5)" fontSize="7"
          fontFamily="monospace">
          code()
        </text>
        {/* Left arm */}
        <rect x="30" y="125" width="28" height="14" rx="7" fill="#1a1a3e" />
        <rect x="20" y="132" width="18" height="12" rx="6" fill="#f5c6a0" />
        {/* Right arm */}
        <rect x="142" y="125" width="28" height="14" rx="7" fill="#1a1a3e" />
        <rect x="162" y="132" width="18" height="12" rx="6" fill="#f5c6a0" />
        {/* Legs */}
        <rect x="68"  y="200" width="28" height="50" rx="12" fill="#12122e" />
        <rect x="104" y="200" width="28" height="50" rx="12" fill="#12122e" />
        {/* Shoes */}
        <ellipse cx="82"  cy="250" rx="16" ry="8" fill="#00e5ff" opacity="0.9" />
        <ellipse cx="118" cy="250" rx="16" ry="8" fill="#7c3aed" opacity="0.9" />
        {/* Head */}
        <ellipse cx="100" cy="90" rx="42" ry="44" fill="#f5c6a0" />
        {/* Hair */}
        <ellipse cx="100" cy="53" rx="42" ry="20" fill="#1a0a00" />
        <rect x="58" y="53" width="84" height="15" rx="5" fill="#1a0a00" />
        {/* Eyes */}
        <ellipse cx="85"  cy="90" rx="6" ry="7" fill="white" />
        <ellipse cx="115" cy="90" rx="6" ry="7" fill="white" />
        <ellipse cx="86"  cy="91" rx="3.5" ry="4" fill="#1a1a3e" />
        <ellipse cx="116" cy="91" rx="3.5" ry="4" fill="#1a1a3e" />
        {/* Eye shine */}
        <circle cx="88"  cy="89" r="1.2" fill="white" />
        <circle cx="118" cy="89" r="1.2" fill="white" />
        {/* Smile */}
        <path d="M88 105 Q100 116 112 105" stroke="#c0724a" strokeWidth="2.5"
          fill="none" strokeLinecap="round" />
        {/* Laptop */}
        <rect x="42" y="192" width="116" height="72" rx="8"
          fill="#0d0d2b" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" />
        <rect x="48" y="198" width="104" height="56" rx="4" fill="#0a0a1a" />
        {/* Screen glow */}
        <rect x="48" y="198" width="104" height="56" rx="4"
          fill="url(#screenGrad)" opacity="0.4" />
        {/* Code on screen */}
        <text x="56" y="215" fill="#00e5ff" fontSize="7" fontFamily="monospace">
          const wahad = {"{}"}
        </text>
        <text x="56" y="227" fill="#7c3aed" fontSize="7" fontFamily="monospace">
          &nbsp;&nbsp;role: &apos;dev&apos;,
        </text>
        <text x="56" y="239" fill="#ec4899" fontSize="7" fontFamily="monospace">
          &nbsp;&nbsp;city: &apos;lahore&apos;
        </text>
        <text x="56" y="251" fill="rgba(0,229,255,0.6)" fontSize="7" fontFamily="monospace">
          {"};"}
        </text>
        {/* Laptop base */}
        <rect x="30" y="262" width="140" height="8" rx="4"
          fill="#0d0d2b" stroke="rgba(0,229,255,0.3)" strokeWidth="1" />
        {/* Glasses */}
        <rect x="76" y="84" width="18" height="13" rx="5"
          fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />
        <rect x="106" y="84" width="18" height="13" rx="5"
          fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />
        <line x1="94" y1="90" x2="106" y2="90"
          stroke="#00e5ff" strokeWidth="1.5" opacity="0.7" />

        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Typing animation ────────────────────────────────────────── */
const roles = [
  "Full-Stack Web Developer",
  "React & Next.js Engineer",
  "Node.js Backend Developer",
  "Open-Source Contributor",
];

function TypingText() {
  const [index, setIndex]   = useState(0);
  const [text, setText]     = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % roles.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  return (
    <span style={{ color: "#00e5ff", fontWeight: 700 }}>
      {text}
      <span
        style={{
          borderRight: "2px solid #00e5ff",
          marginLeft: 2,
          animation: "blink 0.8s step-end infinite",
        }}
      />
    </span>
  );
}

/* ── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: 80,
        background:
          "radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.12) 0%, transparent 60%)," +
          "radial-gradient(ellipse at 80% 20%, rgba(0,229,255,0.1) 0%, transparent 60%)",
      }}
    >
      <ParticleCanvas />

      <div className="max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* ── LEFT: text ─────────────────────────────────────── */}
        <div style={{ animation: "fadeInUp 0.9s ease forwards" }}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium"
            style={{
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.3)",
              color: "#00e5ff",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for work · Lahore, Pakistan 🇵🇰
          </div>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">Wahad Ahmed</span>
          </h1>

          <div
            style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              marginBottom: "1.5rem",
              minHeight: "2.2rem",
            }}
          >
            <TypingText />
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.05rem",
              lineHeight: 1.75,
              maxWidth: 520,
              marginBottom: "2.5rem",
            }}
          >
            Crafting fast, scalable, and production-ready web applications with
            modern technologies. Currently studying at{" "}
            <span style={{ color: "#00e5ff" }}>University of Lahore (UOL)</span> and
            shipping things I&apos;m proud of.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Link href="/projects" className="btn-primary inline-flex items-center gap-2 px-7 py-3 text-base">
              View Projects <ArrowRight size={18} />
            </Link>
            <a
              href="/#contact"
              className="btn-outline inline-flex items-center gap-2 px-7 py-3 text-base"
            >
              <Download size={18} /> Download CV
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>
              Find me on
            </span>
            {[
              { href: "https://github.com/wahad-ahmed",   Icon: Github,   label: "GitHub"   },
              { href: "https://linkedin.com/in/wahad-ahmed", Icon: Linkedin, label: "LinkedIn" },
              { href: "https://twitter.com/wahad_ahmed",  Icon: Twitter,  label: "Twitter"  },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(0,229,255,0.15)";
                  (e.currentTarget as HTMLElement).style.color = "#00e5ff";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,229,255,0.6)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-secondary)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(0,229,255,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: animated character + orbits ──────────── */}
        <div
          className="flex items-center justify-center"
          style={{
            position: "relative",
            height: 620,
            animation: "fadeInUp 1.1s ease 0.2s both",
          }}
        >
          {/* Orbit rings (decorative) */}
          {[170, 215, 260].map((r, i) => (
            <div
              key={r}
              style={{
                position: "absolute",
                width: r * 2,
                height: r * 2,
                borderRadius: "50%",
                border: `1px solid rgba(0,229,255,${0.07 + i * 0.04})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                animation: i % 2 === 0
                  ? `rotate-slow ${22 + i * 5}s linear infinite`
                  : `rotate-reverse ${18 + i * 5}s linear infinite`,
              }}
            />
          ))}

          {/* Orbiting icons */}
          {orbitItems.map((item, i) => (
            <OrbitItem key={item.label} {...item} index={i} />
          ))}

          {/* Character */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <DevCharacter />
          </div>

          {/* Glow behind character */}
          <div
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(0,229,255,0.15) 0%, transparent 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              filter: "blur(20px)",
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "var(--text-secondary)",
          fontSize: "0.75rem",
          animation: "fadeInUp 1.5s ease 1s both",
        }}
      >
        <span>Scroll down</span>
        <div
          style={{
            width: 24,
            height: 38,
            border: "2px solid rgba(0,229,255,0.4)",
            borderRadius: 12,
            display: "flex",
            justifyContent: "center",
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              background: "#00e5ff",
              borderRadius: 2,
              animation: "float 1.5s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
