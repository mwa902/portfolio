"use client";

import { useEffect, useRef, useState } from "react";
import { orbitItems, personal } from "@/lib/data";
import { Github, Linkedin, Twitter, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

/* ── Particles ─────────────────────────────────────── */
function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let raf: number;
    const resize = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.42 + 0.06,
      cyan: Math.random() > 0.65,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan ? `rgba(0,229,255,${p.a})` : `rgba(124,58,237,${p.a * 0.65})`;
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} aria-hidden style={{ position:"fixed", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:0 }} />;
}

/* ── Orbit icon ─────────────────────────────────────── */
function OrbitIcon({ icon, label, size, radius, speed, delay }: {
  icon: string; label: string; size: number; radius: number; speed: number; delay: number;
}) {
  return (
    <div className="orbit-icon" style={{
      width: size, height: size,
      marginTop: -(size/2), marginLeft: -(size/2),
      animation: `orbit ${speed}s linear ${delay}s infinite`,
      "--r": `${radius}px`,
    } as React.CSSProperties}>
      <div className="orbit-icon-inner" style={{ width: size, height: size, fontSize: size * 0.42 }} title={label}>
        {icon}
      </div>
    </div>
  );
}

/* ── Dev character ──────────────────────────────────── */
function DevChar() {
  return (
    <div className="anim-float" style={{ position:"relative" }}>
      <div className="char-glow" />
      <svg viewBox="0 0 200 270" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width:"100%", maxWidth:210, display:"block", margin:"0 auto" }}>
        <rect x="54" y="118" width="92" height="92" rx="22" fill="#141430" />
        <rect x="54" y="118" width="92" height="92" rx="22" fill="url(#bG)" opacity="0.9" />
        <path d="M54 140 Q48 112 70 108 Q100 98 130 108 Q152 112 146 140 Z" fill="#0e0e28" />
        <text x="71" y="162" fill="#00e5ff" fontSize="11" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
        <text x="82" y="177" fill="rgba(0,229,255,0.4)" fontSize="7.5" fontFamily="monospace">wahad()</text>
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
        <rect x="40" y="190" width="120" height="74" rx="9" fill="#0c0c26" stroke="rgba(0,229,255,0.35)" strokeWidth="1.5" />
        <rect x="46" y="196" width="108" height="58" rx="5" fill="#070714" />
        <rect x="46" y="196" width="108" height="58" rx="5" fill="url(#sG)" opacity="0.32" />
        <text x="54" y="213" fill="#00e5ff" fontSize="7.5" fontFamily="monospace">const wahad = &#123;</text>
        <text x="54" y="225" fill="#7c3aed" fontSize="7.5" fontFamily="monospace">  role: &apos;dev&apos;,</text>
        <text x="54" y="237" fill="#ec4899" fontSize="7.5" fontFamily="monospace">  uni: &apos;UOL&apos;,</text>
        <text x="54" y="249" fill="rgba(0,229,255,0.5)" fontSize="7.5" fontFamily="monospace">&#125;</text>
        <rect x="28" y="262" width="144" height="8" rx="4" fill="#0c0c26" stroke="rgba(0,229,255,0.22)" strokeWidth="1" />
        <defs>
          <linearGradient id="bG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="sG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Typing text ────────────────────────────────────── */
const ROLES = ["Full-Stack Web Developer","React & Next.js Engineer","Node.js Backend Developer","Open-Source Contributor"];
function TypingText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = ROLES[idx];
    const t = setTimeout(() => {
      if (!del) {
        const n = cur.slice(0, text.length + 1); setText(n);
        if (n === cur) setTimeout(() => setDel(true), 1800);
      } else {
        const n = cur.slice(0, text.length - 1); setText(n);
        if (n === "") { setDel(false); setIdx(i => (i+1) % ROLES.length); }
      }
    }, del ? 36 : 72);
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return <span style={{ color:"var(--clr-cyan)", fontWeight:700 }}>{text}<span className="cursor" /></span>;
}

/* ── Hero ───────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="hero-section bg-hero" style={{ overflow:"hidden" }}>
      <Particles />

      {/* Background blobs */}
      <div aria-hidden style={{ position:"absolute", inset:0, zIndex:0, overflow:"hidden", pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-15%", left:"-8%", width:"52%", height:"68%", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(124,58,237,0.20) 0%, transparent 70%)", filter:"blur(70px)" }} />
        <div style={{ position:"absolute", bottom:"-12%", right:"-4%", width:"48%", height:"62%", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(0,229,255,0.14) 0%, transparent 70%)", filter:"blur(65px)" }} />
        <div style={{ position:"absolute", top:"28%", left:"38%", width:"28%", height:"36%", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(236,72,153,0.08) 0%, transparent 70%)", filter:"blur(48px)" }} />
      </div>

      {/* Top accent bar */}
      <div aria-hidden style={{ position:"absolute", top:0, left:0, right:0, height:2, zIndex:2, background:"linear-gradient(90deg, transparent 0%, var(--clr-cyan) 35%, var(--clr-purple) 65%, transparent 100%)", opacity:0.55 }} />

      <div className="container" style={{ position:"relative", zIndex:1 }}>
        <div className="hero-grid">

          {/* ── LEFT ── */}
          <div className="anim-fadeup" style={{ display:"flex", flexDirection:"column", justifyContent:"center" }}>

            <div className="hero-badge">
              <span className="dot-pulse" />
              Available for work · Lahore, Pakistan 🇵🇰
            </div>

            <p className="hero-greeting">Hello, I&apos;m</p>
            <h1 className="hero-name">
              <span className="hero-name-first">Wahad</span>
              <span className="hero-name-last gradient-text">Ahmed</span>
            </h1>

            <div className="hero-role-line">
              <span className="hero-role-prefix">// </span>
              <TypingText />
            </div>

            <p className="hero-desc">
              Building fast, scalable, production-ready web apps with React, Next.js &amp; Node.js.
              Currently at <span className="text-cyan" style={{ fontWeight:600 }}>University of Lahore (UOL)</span>.
            </p>

            {/* Buttons flanked by gradient lines */}
            <div className="hero-cta-wrap">
              <div className="hero-cta-line" />
              <div className="hero-cta-btns">
                <Link href="/projects" className="btn btn-primary btn-lg" style={{ boxShadow:"0 0 28px rgba(0,229,255,0.22), 0 0 55px rgba(124,58,237,0.14)" }}>
                  View Projects <ArrowRight size={17} />
                </Link>
                <a href="/#contact" className="btn btn-outline btn-lg">
                  <Mail size={17} /> Hire Me
                </a>
              </div>
              <div className="hero-cta-line hero-cta-line--r" />
            </div>

            {/* Socials */}
            <div className="hero-socials">
              <span className="hero-social-label">Find me on</span>
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
              {[{ n:"2+", l:"Years" }, { n:"20+", l:"Projects" }, { n:"10+", l:"Tech Stack" }].map(({ n, l }) => (
                <div key={l} className="hero-chip">
                  <span className="hero-chip-n">{n}</span>
                  <span className="hero-chip-l">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: orbit ── */}
          <div className="anim-fadeup" style={{ animationDelay:"0.16s", display:"flex", justifyContent:"center", alignItems:"center" }}>
            <div className="orbit-stage">
              {/* Rings */}
              {([
                { r:35, cls:"anim-spin-cw",  op:0.10, dashed:false },
                { r:46, cls:"anim-spin-ccw", op:0.07, dashed:true  },
                { r:56, cls:"anim-spin-cw",  op:0.05, dashed:false },
              ] as { r:number; cls:string; op:number; dashed:boolean }[]).map(({ r, cls, op, dashed }, i) => (
                <div key={i} className={`orbit-ring ${cls}`} style={{
                  width:`${r*2}%`, height:`${r*2}%`,
                  border:`1px ${dashed?"dashed":"solid"} rgba(0,229,255,${op})`,
                  transform:"translate(-50%,-50%)",
                }} />
              ))}

              <div className="orbit-glow" style={{ width:"50%", height:"50%" }} />

              {orbitItems.map(item => <OrbitIcon key={item.label} {...item} />)}

              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", zIndex:2, width:"40%" }}>
                <DevChar />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <span>scroll</span>
        <div className="scroll-mouse"><div className="scroll-dot" /></div>
      </div>
    </section>
  );
}
