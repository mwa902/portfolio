"use client";

import { useEffect, useRef, useState } from "react";
import { personal } from "@/lib/data";
import {
  Mail, Phone, MapPin, Github, Linkedin, Twitter,
  Send, CheckCircle, AlertCircle,
} from "lucide-react";

function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
}

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const leftRef  = useReveal(0);
  const rightRef = useReveal(0.2);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
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

  const socialLinks = [
    { icon: <Github size={20} />,   label: "GitHub",   href: personal.github,   color: "#f0f0f0" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: personal.linkedin, color: "#0a66c2" },
    { icon: <Twitter size={20} />,  label: "Twitter",  href: personal.twitter,  color: "#1d9bf0" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(0,229,255,0.2)",
    borderRadius: 10,
    padding: "12px 16px",
    color: "#f0f0f0",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "120px 0 80px",
        position: "relative",
        background:
          "radial-gradient(ellipse at 50% 80%, rgba(124,58,237,0.1) 0%, transparent 60%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-sm font-semibold tracking-widest mb-3 px-4 py-1 rounded-full"
            style={{
              color: "#00e5ff",
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.2)",
              letterSpacing: "0.15em",
            }}
          >
            LET&apos;S TALK
          </span>
          <h2 className="section-heading gradient-text">Get In Touch</h2>
          <p
            style={{
              color: "var(--text-secondary)",
              maxWidth: 480,
              margin: "1rem auto 0",
              lineHeight: 1.7,
            }}
          >
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            My inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT – info + socials */}
          <div ref={leftRef}>
            <h3
              style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "1.5rem" }}
            >
              Let&apos;s build something{" "}
              <span className="gradient-text">amazing</span> together
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              I&apos;m currently available for freelance work and full-time opportunities.
              Whether you have a question, a project idea, or just want to say hi —
              feel free to reach out!
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-4 mb-8">
              {[
                { icon: <Mail size={18} />,    label: "Email",    value: personal.email,    href: `mailto:${personal.email}` },
                { icon: <Phone size={18} />,   label: "Phone",    value: personal.phone,    href: `tel:${personal.phone}` },
                { icon: <MapPin size={18} />,  label: "Location", value: personal.location, href: "#" },
              ].map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: "rgba(0,229,255,0.05)",
                    border: "1px solid rgba(0,229,255,0.12)",
                    transition: "all 0.2s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(0,229,255,0.1)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,229,255,0.4)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(6px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(0,229,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(0,229,255,0.12)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "rgba(0,229,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#00e5ff",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-secondary)",
                        marginBottom: 2,
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontWeight: 600, color: "#f0f0f0" }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Follow me
              </p>
              <div className="flex gap-4">
                {socialLinks.map(({ icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "var(--text-secondary)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = color;
                      (e.currentTarget as HTMLElement).style.borderColor = color + "60";
                      (e.currentTarget as HTMLElement).style.background = color + "15";
                      (e.currentTarget as HTMLElement).style.transform =
                        "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color =
                        "var(--text-secondary)";
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT – contact form */}
          <div ref={rightRef}>
            <form
              onSubmit={handleSubmit}
              className="glass-card p-8"
              style={{ position: "relative" }}
            >
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Wahad Ahmed"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#00e5ff";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,229,255,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      marginBottom: 6,
                      fontWeight: 600,
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ahmed.wahad49@gmail.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#00e5ff";
                      e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(0,229,255,0.2)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div className="mb-5">
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00e5ff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0,229,255,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div className="mb-6">
                <label
                  style={{
                    display: "block",
                    fontSize: "0.82rem",
                    color: "var(--text-secondary)",
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#00e5ff";
                    e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(0,229,255,0.2)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full btn-primary flex items-center justify-center gap-3 py-3 text-base"
                style={{
                  opacity: status === "sending" ? 0.8 : 1,
                  cursor: status === "sending" ? "wait" : "pointer",
                }}
              >
                {status === "sending" ? (
                  <>
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "rotate-slow 0.7s linear infinite",
                      }}
                    />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={18} /> Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={18} /> Try Again
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <div
                  style={{
                    marginTop: 16,
                    padding: "12px 16px",
                    borderRadius: 10,
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    color: "#10b981",
                    fontSize: "0.9rem",
                    textAlign: "center",
                  }}
                >
                  🎉 Thanks! I&apos;ll get back to you within 24 hours.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
