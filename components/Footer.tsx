import { personal } from "@/lib/data";
import { Github, Linkedin, Twitter, Heart, Code2 } from "lucide-react";
import Link from "next/link";

const NAV = [
  { label: "Home",     href: "/"         },
  { label: "About",    href: "/#about"   },
  { label: "Skills",   href: "/#skills"  },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/#contact" },
];

const SOCIAL = [
  { Icon: Github,   label: "GitHub",   href: personal.github   },
  { Icon: Linkedin, label: "LinkedIn", href: personal.linkedin },
  { Icon: Twitter,  label: "Twitter",  href: personal.twitter  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: "1px solid rgba(0,229,255,0.10)",
      paddingTop: "3.5rem",
      paddingBottom: "1.75rem",
      background: "var(--clr-bg)",
    }}>
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{
                width: 34, height: 34, borderRadius: 8,
                background: "linear-gradient(135deg, var(--clr-cyan), var(--clr-purple))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Code2 size={17} style={{ color: "#fff" }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.05rem", letterSpacing: "-0.02em" }}>
                <span style={{ color: "var(--clr-cyan)" }}>Wahad</span>
                <span style={{ color: "var(--clr-text)" }}>.dev</span>
              </span>
            </Link>
            <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-sm)", lineHeight: 1.75, maxWidth: 260 }}>
              Full-stack web developer from Lahore, Pakistan.
              Building modern web experiences one component at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--clr-cyan)", marginBottom: "1.1rem", letterSpacing: "0.04em" }}>
              Quick Links
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="nav-link" style={{ fontSize: "var(--text-sm)" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontWeight: 700, fontSize: "var(--text-sm)", color: "var(--clr-cyan)", marginBottom: "1.1rem", letterSpacing: "0.04em" }}>
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", fontSize: "var(--text-sm)" }}
                >
                  <Icon size={14} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}>
          <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-xs)" }}>
            © {year} Wahad Ahmed · All rights reserved.
          </p>
          <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-xs)", display: "flex", alignItems: "center", gap: "0.3rem" }}>
            Made with <Heart size={12} style={{ color: "var(--clr-pink)" }} /> in{" "}
            <span style={{ color: "var(--clr-cyan)" }}>Lahore, Pakistan 🇵🇰</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
