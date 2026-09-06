"use client";

import { useEffect, useRef, useState } from "react";
import { orbitItems } from "@/lib/data";
import { Github, Linkedin, Twitter, ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

/* ─── Particle background ──────────────────────────────────── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const pts = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.45 + 0.08,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.a})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
      aria-hidden
    />
  );
}

/* ─── Orbiting icon ────────────────────────────────────────── */
function OrbitIcon({
  icon, label, size, radius, speed, delay,
}: {
  icon: string; label: string;
  size: number; radius: number; speed: number; delay: number;
}) {
  const half = size / 2;
  return (
    <div
      className="orbit-icon"
      style={{
        width: size, height: size,
        marginTop: -half, marginLeft: -half,
        animation: `orbit ${speed}s linear ${delay}s infinite`,
        "--r": `${radius}px`,
      } as React.CSSProperties}
    >
      <div
        className="orbit-icon-inner"
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        title={label}
      >
        {icon}
      </div>
    </div>
  );
}

/* ─── Developer SVG character ──────────────────────────────── */
function DevChar() {
  return (
    <div className="anim-float" style={{ position: "relative" }}>
      <div className="char-glow" />
      <svg
        viewBox="0 0 200 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: 220, display: "block", margin: "0 auto" }}
      >
        {/* Body */}
        <rect x="54" y="118" width="92" height="92" rx="22" fill="#141430" />
        <rect x="54" y="118" width="92" height="92" rx="22" fill="url(#bGrad)" opacity="0.9" />
        {/* Hood */}
        <path d="M54 140 Q48 112 70 108 Q100 98 130 108 Q152 112 146 140 Z" fill="#0e0e28" />
        {/* Code on hoodie */}
        <text x="71" y="162" fill="#00e5ff" fontSize="11" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
        <text x="82" y="177" fill="rgba(0,229,255,0.45)" fontSize="7.5" fontFamily="monospace">wahad()</text>
        {/* Arms */}
        <rect x="28" y="124" width="29" height="15" rx="7.5" fill="#141430" />
        <rect x="18" y="131" width="18" height="12" rx="6" fill="#f0b98a" />
        <rect x="143" y="124" width="29" height="15" rx="7.5" fill="#141430" />
        <rect x="164" y="131" width="18" height="12" rx="6" fill="#f0b98a" />
        {/* Legs */}
        <rect x="66"  y="200" width="30" height="52" rx="13" fill="#0e0e28" />
        <rect x="104" y="200" width="30" height="52" rx="13" fill="#0e0e28" />
        {/* Shoes */}
        <ellipse cx="81"  cy="252" rx="17" ry="9" fill="#00e5ff" opacity="0.9" />
        <ellipse cx="119" cy="252" rx="17" ry="9" fill="#7c3aed" opacity="0.9" />
        {/* Head */}
        <ellipse cx="100" cy="88" rx="43" ry="45" fill="#f0b98a" />
        {/* Hair */}
        <ellipse cx="100" cy="50" rx="43" ry="22" fill="#150a00" />
        <rect x="57" y="50" width="86" height="16" rx="5" fill="#150a00" />
        {/* Eyes */}
        <ellipse cx="84"  cy="88" rx="6.5" ry="7.5" fill="#fff" />
        <ellipse cx="116" cy="88" rx="6.5" ry="7.5" fill="#fff" />
        <ellipse cx="85"  cy="89" rx="3.8" ry="4.2" fill="#141430" />
        <ellipse cx="117" cy="89" rx="3.8" ry="4.2" fill="#141430" />
        <circle cx="87"  cy="87" r="1.3" fill="#fff" />
        <circle cx="119" cy="87" r="1.3" fill="#fff" />
        {/* Smile */}
        <path d="M87 104 Q100 116 113 104" stroke="#b8703a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Glasses */}
        <rect x="75" y="82" width="19" height="13" rx="5" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.75" />
        <rect x="106" y="82" width="19" height="13" rx="5" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.75" />
        <line x1="94" y1="88" x2="106" y2="88" stroke="#00e5ff" strokeWidth="1.5" opacity="0.75" />
        {/* Laptop */}
        <rect x="40" y="190" width="120" height="74" rx="9" fill="#0c0c26" stroke="rgba(0,229,255,0.38)" strokeWidth="1.5" />
        <rect x="46" y="196" width="108" height="58" rx="5" fill="#070714" />
        <rect x="46" y="196" width="108" height="58" rx="5" fill="url(#sGrad)" opacity="0.35" />
        <text x="54" y="213" fill="#00e5ff" fontSize="7.5" fontFamily="monospace">const wahad = &#123;</text>
        <text x="54" y="225" fill="#7c3aed" fontSize="7.5" fontFamily="monospace">  role: &apos;dev&apos;,</text>
        <text x="54" y="237" fill="#ec4899" fontSize="7.5" fontFamily="monospace">  uni: &apos;UOL&apos;,</text>
        <text x="54" y="249" fill="rgba(0,229,255,0.55)" fontSize="7.5" fontFamily="monospace">&#125;</text>
        <rect x="28" y="262" width="144" height="8" rx="4" fill="#0c0c26" stroke="rgba(0,229,255,0.25)" strokeWidth="1" />
        <defs>
          <linearGradient id="bGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="sGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ─── Typing text ──────────────────────────────────────────── */
const ROLES = [
  "Full-Stack Web Developer",
  "React & Next.js Engineer",
  "Node.js Backend Developer",
  "Open-Source Contributor",
];

function TypingText() {
  const [idx, setIdx]     = useState(0);
  const [text, setText]   = useState("");
  const [del, setDel]     = useState(false);

  useEffect(() => {
    const cur = ROLES[idx];
    const t = setTimeout(() => {
      if (!del) {
        const next = cur.slice(0, text.length + 1);
        setText(next);
        if (next === cur) setTimeout(() => setDel(true), 1600);
      } else {
        const next = cur.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx((i) => (i + 1) % ROLES.length); }
      }
    }, del ? 38 : 76);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span style={{ color: "var(--clr-cyan)", fontWeight: 700 }}>
      {text}<span className="cursor" />
    </span>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="hero-section bg-hero">
      <Particles />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingBlock: "2rem" }}>
        <div className="hero-grid">

          {/* LEFT */}
          <div className="anim-fadeup">
            <div className="hero-badge">
              <span className="dot-pulse" />
              Available for work · Lahore, Pakistan 🇵🇰
            </div>

            <h1 className="hero-title">
              Hi, I&apos;m{" "}
              <span className="gradient-text">Wahad Ahmed</span>
            </h1>

            <div className="hero-role">
              <TypingText />
            </div>

            <p className="hero-desc">
              Crafting fast, scalable, and production-ready web applications
              with modern technologies. Studying at{" "}
              <span className="text-cyan" style={{ fontWeight: 600 }}>
                University of Lahore (UOL)
              </span>{" "}
              and shipping things I&apos;m proud of.
            </p>

            <div className="hero-actions">
              <Link href="/projects" className="btn btn-primary btn-lg">
                View Projects <ArrowRight size={18} />
              </Link>
              <a href="/#contact" className="btn btn-outline btn-lg">
                <FileText size={18} /> Download CV
              </a>
            </div>

            <div className="hero-socials">
              <span style={{ fontSize: "0.8rem", color: "var(--clr-muted)" }}>Find me on</span>
              {[
                { href: "https://github.com/wahad-ahmed",      Icon: Github,   label: "GitHub"   },
                { href: "https://linkedin.com/in/wahad-ahmed", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://twitter.com/wahad_ahmed",     Icon: Twitter,  label: "Twitter"  },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hero-social-btn"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — orbit stage */}
          <div
            className="anim-fadeup"
            style={{ animationDelay: "0.18s", display: "flex", justifyContent: "center" }}
          >
            <div className="orbit-stage">
              {/* Decorative rings */}
              {([
                { r: 36, dur: 24, dir: "anim-spin-cw",  op: 0.10 },
                { r: 46, dur: 18, dir: "anim-spin-ccw", op: 0.08 },
                { r: 56, dur: 30, dir: "anim-spin-cw",  op: 0.06 },
              ] as { r: number; dur: number; dir: string; op: number }[]).map(({ r, dir, op }, i) => (
                <div
                  key={i}
                  className={`orbit-ring ${dir}`}
                  style={{
                    width: `${r * 2}%`, height: `${r * 2}%`,
                    border: `1px solid rgba(0,229,255,${op})`,
                    transform: "translate(-50%,-50%)",
                  }}
                />
              ))}

              {/* Background glow */}
              <div
                className="orbit-glow"
                style={{ width: "55%", height: "55%" }}
              />

              {/* Orbiting tech icons */}
              {orbitItems.map((item) => {
                /* scale radius as % of stage width so it's truly responsive */
                const rPct = item.radius / 580 * 100;
                return (
                  <OrbitIcon
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    size={item.size}
                    radius={item.radius}
                    speed={item.speed}
                    delay={item.delay}
                  />
                );
                void rPct;
              })}

              {/* Character */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 2, width: "42%" }}>
                <DevChar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  );
}
