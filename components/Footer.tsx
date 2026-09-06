import { personal } from "@/lib/data";
import { Github, Linkedin, Twitter, Heart, Code2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,229,255,0.1)",
        padding: "48px 0 24px",
        position: "relative",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "linear-gradient(135deg,#00e5ff,#7c3aed)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Code2 size={18} className="text-white" />
              </div>
              <span className="font-extrabold text-lg">
                <span style={{ color: "#00e5ff" }}>Wahad</span>
                <span className="text-white">.dev</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 260 }}>
              Full-stack web developer from Lahore, Pakistan. Building modern experiences one component at a time.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p style={{ fontWeight: 700, marginBottom: 16, color: "#00e5ff" }}>
              Quick Links
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home",     href: "/"         },
                { label: "About",    href: "/#about"   },
                { label: "Skills",   href: "/#skills"  },
                { label: "Projects", href: "/projects" },
                { label: "Contact",  href: "/#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="nav-link text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontWeight: 700, marginBottom: 16, color: "#00e5ff" }}>
              Connect
            </p>
            <div className="flex flex-col gap-3">
              {[
                { Icon: Github,   label: "GitHub",   href: personal.github   },
                { Icon: Linkedin, label: "LinkedIn", href: personal.linkedin },
                { Icon: Twitter,  label: "Twitter",  href: personal.twitter  },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 nav-link text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem" }}>
            © {year} Wahad Ahmed · All rights reserved.
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.82rem",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            Made with <Heart size={13} style={{ color: "#ec4899" }} /> in{" "}
            <span style={{ color: "#00e5ff" }}>Lahore, Pakistan 🇵🇰</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
