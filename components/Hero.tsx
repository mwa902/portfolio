"use client";

import { useEffect, useRef, useState } from "react";
import { orbitItems, personal } from "@/lib/data";
import { Github, Linkedin, Twitter, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

/* ══════════════════════════════════════════════════════════
   PARTICLES
══════════════════════════════════════════════════════════ */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* more particles, varying sizes for depth */
    const pts = Array.from({ length: 110 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2 + 0.3,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      a: Math.random() * 0.5 + 0.06,
      hue: Math.random() > 0.7 ? 280 : 195, /* mix cyan + purple */
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 195
          ? `rgba(0,229,255,${p.a})`
          : `rgba(124,58,237,${p.a * 0.7})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={ref} aria-hidden style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

/* ══════════════════════════════════════════════════════════
   ORBIT ICON
══════════════════════════════════════════════════════════ */
function OrbitIcon({ icon, label, size, radius, speed, delay }: {
  icon: string; label: string; size: number;
  radius: number; speed: number; delay: number;
}) {
  const half = size / 2;
  return (
    <div className="orbit-icon" style={{
      width: size, height: size,
      marginTop: -half, marginLeft: -half,
      animation: `orbit ${speed}s linear ${delay}s infinite`,
      "--r": `${radius}px`,
    } as React.CSSProperties}>
      <div className="orbit-icon-inner" style={{ width: size, height: size, fontSize: size * 0.42 }} title={label}>
        {icon}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DEV CHARACTER
══════════════════════════════════════════════════════════ */
function DevChar() {
  return (
    <div className="anim-float" style={{ position: "relative" }}>
      <div className="char-glow" />
      <svg viewBox="0 0 200 270" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: 220, display: "block", margin: "0 auto" }}>
        <rect x="54" y="118" width="92" height="92" rx="22" fill="#141430" />
        <rect x="54" y="118" width="92" height="92" rx="22" fill="url(#bGrad)" opacity="0.9" />
        <path d="M54 140 Q48 112 70 108 Q100 98 130 108 Q152 112 146 140 Z" fill="#0e0e28" />
        <text x="71" y="162" fill="#00e5ff" fontSize="11" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
        <text x="82" y="177" fill="rgba(0,229,255,0.45)" fontSize="7.5" fontFamily="monospace">wahad()</text>
        <rect x="28" y="124" width="29" height="15" rx="7.5" fill="#141430" />
        <rect x="18" y="131" width="18" height="12" rx="6" fill="#f0b98a" />
        <rect x="143" y="124" width="29" height="15" rx="7.5" fill="#141430" />
        <rect x="164" y="131" width="18" height="12" rx="6" fill="#f0b98a" />
        <rect x="66" y="200" width="30" height="52" rx="13" fill="#0e0e28" />
        <rect x="104" y="200" width="30" height="52" rx="13" fill="#0e0e28" />
        <ellipse cx="81" cy="252" rx="17" ry="9" fill="#00e5ff" opacity="0.9" />
        <ellipse cx="119" cy="252" rx="17" ry="9" fill="#7c3aed" opacity="0.9" />
        <ellipse cx="100" cy="88" rx="43" ry="45" fill="#f0b98a" />
        <ellipse cx="100" cy="50" rx="43" ry="22" fill="#150a00" />
        <rect x="57" y="50" width="86" height="16" rx="5" fill="#150a00" />
        <ellipse cx="84" cy="88" rx="6.5" ry="7.5" fill="#fff" />
        <ellipse cx="116" cy="88" rx="6.5" ry="7.5" fill="#fff" />
        <ellipse cx="85" cy="89" rx="3.8" ry="4.2" fill="#141430" />
        <ellipse cx="117" cy="89" rx="3.8" ry="4.2" fill="#141430" />
        <circle cx="87" cy="87" r="1.3" fill="#fff" />
        <circle cx="119" cy="87" r="1.3" fill="#fff" />
        <path d="M87 104 Q100 116 113 104" stroke="#b8703a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="75" y="82" width="19" height="13" rx="5" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.75" />
        <rect x="106" y="82" width="19" height="13" rx="5" fill="none" stroke="#00e5ff" strokeWidth="1.5" opacity="0.75" />
        <line x1="94" y1="88" x2="106" y2="88" stroke="#00e5ff" strokeWidth="1.5" opacity="0.75" />
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

/* ══════════════════════════════════════════════════════════
   TYPING TEXT
══════════════════════════════════════════════════════════ */
const ROLES = [
  "Full-Stack Web Developer",
  "React & Next.js Engineer",
  "Node.js Backend Developer",
  "Open-Source Contributor",
];

function TypingText() {
  const [idx, setIdx]   = useState(0);
  const [text, setText] = useState("");
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const cur = ROLES[idx];
    const t = setTimeout(() => {
      if (!del) {
        const next = cur.slice(0, text.length + 1);
        setText(next);
        if (next === cur) setTimeout(() => setDel(true), 1800);
      } else {
        const next = cur.slice(0, text.length - 1);
        setText(next);
        if (next === "") { setDel(false); setIdx(i => (i + 1) % ROLES.length); }
      }
    }, del ? 36 : 72);
    return () => clearTimeout(t);
  }, [text, del, idx]);

  return (
    <span style={{ color: "var(--clr-cyan)", fontWeight: 700 }}>
      {text}<span className="cursor" />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO  — new cinematic layout
   ┌──────────────────────────────────────┐
   │  [badge]                             │
   │  WAHAD AHMED          [orbit char]   │
   │  role typing…                        │
   │  ─── centre line ───                 │
   │  [btn] [btn]         social icons    │
   │  desc text                           │
   └──────────────────────────────────────┘
══════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section className="hero-section bg-hero" style={{ overflow: "hidden" }}>
      <Particles />

      {/* ── giant blurred gradient blobs ── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute", top: "-20%", left: "-10%",
          width: "55%", height: "70%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", right: "-5%",
          width: "50%", height: "65%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,229,255,0.14) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", top: "30%", left: "40%",
          width: "30%", height: "40%", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(236,72,153,0.09) 0%, transparent 70%)",
          filter: "blur(50px)",
        }} />
      </div>

      {/* ── thin top accent line ── */}
      <div aria-hidden style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 2,
        background: "linear-gradient(90deg, transparent 0%, var(--clr-cyan) 30%, var(--clr-purple) 70%, transparent 100%)",
        opacity: 0.6,
      }} />

      {/* ════════════════════════════════
          MAIN CONTENT — split layout
          LEFT: text stack  |  RIGHT: orbit
          ════════════════════════════════ */}
      <div className="container hero-outer" style={{ position: "relative", zIndex: 1 }}>

        {/* ── LEFT COLUMN ── */}
        <div className="hero-left anim-fadeup">

          {/* Available badge */}
          <div className="hero-badge" style={{ marginBottom: "1.75rem" }}>
            <span className="dot-pulse" />
            Available for work · Lahore 🇵🇰
          </div>

          {/* Big name */}
          <div className="hero-name-block">
            <p className="hero-greeting">Hello, I&apos;m</p>
            <h1 className="hero-name">
              <span className="hero-name-first">Wahad</span>
              <span className="hero-name-last gradient-text">Ahmed</span>
            </h1>
          </div>

          {/* Role typing */}
          <div className="hero-role-line">
            <span className="hero-role-slash">{"// "}</span>
            <TypingText />
          </div>

          {/* ── DIVIDER + BUTTONS centred on it ── */}
          <div className="hero-cta-row">
            <div className="hero-divider-line" />
            <div className="hero-btns">
              <Link href="/projects" className="btn btn-primary btn-lg hero-btn-glow">
                View Projects <ArrowRight size={18} />
              </Link>
              <a href="/#contact" className="btn btn-outline btn-lg">
                <Mail size={18} /> Hire Me
              </a>
            </div>
            <div className="hero-divider-line" />
          </div>

          {/* Description */}
          <p className="hero-desc" style={{ marginBottom: "2rem" }}>
            Crafting fast, scalable, production-ready web apps with React,{" "}
            Next.js &amp; Node.js. Studying at{" "}
            <span className="text-cyan" style={{ fontWeight: 600 }}>UOL Lahore</span>.
          </p>

          {/* Socials */}
          <div className="hero-socials">
            <span style={{ fontSize: "0.78rem", color: "var(--clr-muted)", letterSpacing: "0.06em" }}>
              FIND ME ON
            </span>
            {[
              { href: personal.github,   Icon: Github,   label: "GitHub"   },
              { href: personal.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: personal.twitter,  Icon: Twitter,  label: "Twitter"  },
            ].map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                aria-label={label} className="hero-social-btn">
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* XP chips */}
          <div className="hero-chips">
            {[
              { n: "2+",  l: "Years"    },
              { n: "20+", l: "Projects" },
              { n: "10+", l: "Tech"     },
            ].map(({ n, l }) => (
              <div key={l} className="hero-chip">
                <span className="hero-chip-n">{n}</span>
                <span className="hero-chip-l">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — orbit stage ── */}
        <div className="hero-right anim-fadeup" style={{ animationDelay: "0.15s" }}>
          <div className="orbit-stage">
            {/* Decorative rings */}
            {([
              { r: 35, dir: "anim-spin-cw",  op: 0.10, dash: "none" },
              { r: 46, dir: "anim-spin-ccw", op: 0.07, dash: "4 6"  },
              { r: 56, dir: "anim-spin-cw",  op: 0.05, dash: "none" },
            ] as { r: number; dir: string; op: number; dash: string }[]).map(({ r, dir, op, dash }, i) => (
              <div key={i} className={`orbit-ring ${dir}`} style={{
                width: `${r * 2}%`, height: `${r * 2}%`,
                border: `1px ${dash !== "none" ? "dashed" : "solid"} rgba(0,229,255,${op})`,
                transform: "translate(-50%,-50%)",
              }} />
            ))}

            {/* Glow core */}
            <div className="orbit-glow" style={{ width: "52%", height: "52%" }} />

            {/* Orbiting icons */}
            {orbitItems.map((item) => (
              <OrbitIcon key={item.label} {...item} />
            ))}

            {/* Character */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)", zIndex: 2, width: "40%",
            }}>
              <DevChar />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="scroll-cue">
        <span>Scroll</span>
        <div className="scroll-mouse"><div className="scroll-dot" /></div>
      </div>

      {/* ── scoped styles ── */}
      <style>{`
        /* ── Outer wrapper ─────────────────────────── */
        .hero-outer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
          min-height: calc(100dvh - 80px);
          padding-block: 2rem;
        }

        /* ── Left column ───────────────────────────── */
        .hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ── Name block ────────────────────────────── */
        .hero-name-block { margin-bottom: 0.75rem; }

        .hero-greeting {
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          font-weight: 500;
          color: var(--clr-muted);
          letter-spacing: 0.06em;
          margin-bottom: 0.25rem;
        }

        .hero-name {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4em;
          font-size: clamp(3rem, 7.5vw, 6rem);
          font-weight: 900;
          line-height: 1.0;
          letter-spacing: -0.045em;
          margin-bottom: 0;
        }

        .hero-name-first {
          color: var(--clr-text);
        }

        /* ── Role line ─────────────────────────────── */
        .hero-role-line {
          font-size: clamp(1rem, 2.2vw, 1.35rem);
          font-weight: 600;
          min-height: 2rem;
          margin-bottom: 2.25rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .hero-role-slash {
          color: var(--clr-purple);
          font-family: monospace;
          font-size: 1.1em;
          opacity: 0.75;
          user-select: none;
        }

        /* ── CTA row — buttons in the visual centre ─ */
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .hero-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg,
            transparent,
            var(--clr-cyan-border) 40%,
            var(--clr-purple) 70%,
            transparent
          );
          border-radius: 1px;
          min-width: 0;
        }

        .hero-btns {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Extra glow on primary button */
        .hero-btn-glow {
          box-shadow: 0 0 28px rgba(0,229,255,0.25), 0 0 60px rgba(124,58,237,0.15);
        }
        .hero-btn-glow:hover {
          box-shadow: 0 0 40px rgba(0,229,255,0.45), 0 0 80px rgba(124,58,237,0.25);
        }

        /* ── Socials ───────────────────────────────── */
        .hero-socials {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
        }

        /* ── XP chips ──────────────────────────────── */
        .hero-chips {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .hero-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0.6rem 1.1rem;
          border-radius: var(--r-md, 12px);
          background: var(--clr-card);
          border: 1px solid var(--clr-border);
          backdrop-filter: blur(12px);
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
          min-width: 70px;
        }
        .hero-chip:hover {
          transform: translateY(-3px);
          border-color: var(--clr-cyan);
          box-shadow: 0 6px 24px rgba(0,132,199,0.18);
        }
        .hero-chip-n {
          font-size: 1.4rem;
          font-weight: 900;
          background: linear-gradient(135deg, var(--clr-cyan), var(--clr-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
        }
        .hero-chip-l {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--clr-muted);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── Right column ──────────────────────────── */
        .hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Responsive ────────────────────────────── */
        @media (max-width: 1024px) {
          .hero-outer {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-right { order: -1; }
          .orbit-stage { max-width: 360px !important; }
          .hero-name { font-size: clamp(2.6rem, 8vw, 4rem); }
          .hero-cta-row { gap: 0.75rem; }
          .hero-divider-line { display: none; }
          .hero-btns { justify-content: flex-start; }
        }

        @media (max-width: 640px) {
          .hero-name { font-size: clamp(2.2rem, 10vw, 3.2rem); }
          .orbit-stage { max-width: 280px !important; }
          .hero-btns { flex-direction: column; width: 100%; }
          .hero-btns .btn { width: 100%; justify-content: center; }
          .hero-chips { gap: 0.5rem; }
          .hero-chip { padding: 0.5rem 0.85rem; min-width: 62px; }
        }

        @media (max-width: 380px) {
          .hero-name { font-size: 2rem; }
        }
      `}</style>
    </section>
  );
}
