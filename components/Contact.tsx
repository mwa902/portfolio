"use client";

import { useEffect, useRef, useState } from "react";
import { personal } from "@/lib/data";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle } from "lucide-react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}s`;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return ref;
}

type Status = "idle" | "sending" | "success" | "error";

const SOCIALS = [
  { Icon: Github,   label: "GitHub",   href: personal.github,   hoverColor: "#e2e8f0" },
  { Icon: Linkedin, label: "LinkedIn", href: personal.linkedin, hoverColor: "#0a66c2" },
  { Icon: Twitter,  label: "Twitter",  href: personal.twitter,  hoverColor: "#1d9bf0" },
];

export default function Contact() {
  const leftRef  = useReveal(0);
  const rightRef = useReveal(0.15);

  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="section bg-contact">
      <div className="section-divider" />
      <div className="container">

        {/* Heading */}
        <div className="text-center" style={{ marginBottom: "3.5rem" }}>
          <span className="section-tag section-tag--cyan">LET&apos;S TALK</span>
          <h2 className="section-title gradient-text">Get In Touch</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? My inbox is always open.
          </p>
        </div>

        <div className="contact-grid">

          {/* LEFT */}
          <div ref={leftRef} className="reveal">
            <h3 style={{ fontSize: "var(--text-2xl)", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.3 }}>
              Let&apos;s build something{" "}
              <span className="gradient-text">amazing</span> together
            </h3>
            <p style={{ color: "var(--clr-muted)", lineHeight: 1.8, marginBottom: "2rem", fontSize: "var(--text-sm)" }}>
              I&apos;m available for freelance projects and full-time roles.
              Whether you have a question, an idea, or just want to say hi — feel free to reach out.
            </p>

            {/* Contact rows */}
            <div style={{ marginBottom: "1.75rem" }}>
              {[
                { Icon: Mail,   label: "Email",    value: personal.email,    href: `mailto:${personal.email}` },
                { Icon: Phone,  label: "Phone",    value: personal.phone,    href: `tel:${personal.phone}`    },
                { Icon: MapPin, label: "Location", value: personal.location, href: "#"                        },
              ].map(({ Icon, label, value, href }) => (
                <a key={label} href={href} className="contact-info-item">
                  <div className="contact-icon">
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="contact-info-label">{label}</div>
                    <div className="contact-info-value">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Socials */}
            <p style={{ color: "var(--clr-muted)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.875rem" }}>
              Follow me
            </p>
            <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}>
              {SOCIALS.map(({ Icon, label, href, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color       = hoverColor;
                    el.style.borderColor = hoverColor + "55";
                    el.style.background  = hoverColor + "18";
                    el.style.transform   = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color       = "var(--clr-muted)";
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background  = "var(--clr-faint)";
                    el.style.transform   = "translateY(0)";
                  }}
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div ref={rightRef} className="reveal">
            <form onSubmit={onSubmit} className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input className="form-input" name="name" value={form.name} onChange={onChange}
                    placeholder="Wahad Ahmed" required />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input className="form-input" name="email" type="email" value={form.email} onChange={onChange}
                    placeholder="ahmed.wahad49@gmail.com" required />
                </div>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label className="form-label">Subject</label>
                <input className="form-input" name="subject" value={form.subject} onChange={onChange}
                  placeholder="Project Collaboration" required />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label className="form-label">Message</label>
                <textarea
                  className="form-input"
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your project or idea…"
                  required
                  rows={5}
                  style={{ resize: "vertical", minHeight: 120 }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "0.8rem", fontSize: "var(--text-base)" }}
              >
                {status === "sending" ? (
                  <><div className="spinner" /> Sending…</>
                ) : status === "success" ? (
                  <><CheckCircle size={17} /> Sent Successfully!</>
                ) : status === "error" ? (
                  <><AlertCircle size={17} /> Failed — Try Again</>
                ) : (
                  <><Send size={17} /> Send Message</>
                )}
              </button>

              {status === "success" && (
                <div className="alert-success">
                  🎉 Thanks! I&apos;ll reply within 24 hours.
                </div>
              )}
              {status === "error" && (
                <div className="alert-error">
                  Something went wrong. Please email me directly at{" "}
                  <a href="mailto:ahmed.wahad49@gmail.com" style={{ color: "inherit", textDecoration: "underline" }}>
                    ahmed.wahad49@gmail.com
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
