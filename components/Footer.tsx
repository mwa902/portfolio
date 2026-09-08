import { personal } from "@/lib/data";
import { Github, Linkedin, Twitter, Heart, Code2 } from "lucide-react";
import Link from "next/link";

const NAV = [
  { label:"Home",     href:"/"         },
  { label:"About",    href:"/#about"   },
  { label:"Skills",   href:"/#skills"  },
  { label:"Projects", href:"/projects" },
  { label:"Contact",  href:"/#contact" },
];
const SOCIAL = [
  { Icon:Github,   label:"GitHub",   href:personal.github   },
  { Icon:Linkedin, label:"LinkedIn", href:personal.linkedin },
  { Icon:Twitter,  label:"Twitter",  href:personal.twitter  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop:"1px solid var(--clr-border)", paddingTop:"3.25rem", paddingBottom:"1.75rem", background:"var(--clr-bg)", transition:"background 0.35s" }}>
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", marginBottom:"1rem" }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg, var(--clr-cyan), var(--clr-purple))", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Code2 size={16} style={{ color:"#fff" }} />
              </div>
              <span style={{ fontWeight:800, fontSize:"1rem", letterSpacing:"-0.02em" }}>
                <span style={{ color:"var(--clr-cyan)" }}>Wahad</span>
                <span style={{ color:"var(--clr-text)" }}>.dev</span>
              </span>
            </Link>
            <p style={{ color:"var(--clr-muted)", fontSize:"var(--tx-sm)", lineHeight:1.75, maxWidth:250 }}>
              Full-stack web developer from Lahore, Pakistan. Building modern web experiences one component at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontWeight:700, fontSize:"var(--tx-sm)", color:"var(--clr-cyan)", marginBottom:"1rem", letterSpacing:"0.04em" }}>Quick Links</p>
            <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.55rem" }}>
              {NAV.map(({ label, href }) => (
                <li key={label}><Link href={href} className="nav-link" style={{ fontSize:"var(--tx-sm)" }}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontWeight:700, fontSize:"var(--tx-sm)", color:"var(--clr-cyan)", marginBottom:"1rem", letterSpacing:"0.04em" }}>Connect</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
              {SOCIAL.map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="nav-link" style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", fontSize:"var(--tx-sm)" }}>
                  <Icon size={13} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:"1px solid var(--clr-faint)", paddingTop:"1.4rem", display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"0.6rem" }}>
          <p style={{ color:"var(--clr-muted)", fontSize:"var(--tx-xs)" }}>© {year} Wahad Ahmed · All rights reserved.</p>
          <p style={{ color:"var(--clr-muted)", fontSize:"var(--tx-xs)", display:"flex", alignItems:"center", gap:"0.3rem" }}>
            Made with <Heart size={11} style={{ color:"var(--clr-pink)" }} /> in <span style={{ color:"var(--clr-cyan)" }}>Lahore, Pakistan 🇵🇰</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
