"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Code2 } from "lucide-react";

const links = [
  { label: "Home",     href: "/"         },
  { label: "About",    href: "/#about"   },
  { label: "Skills",   href: "/#skills"  },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,10,26,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.15)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#00e5ff,#7c3aed)" }}>
            <Code2 size={20} className="text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight">
            <span style={{ color: "#00e5ff" }}>Wahad</span>
            <span className="text-white">.dev</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-link text-sm font-medium"
                style={{
                  color: pathname === l.href ? "#00e5ff" : undefined,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/#contact"
          className="hidden md:inline-flex btn-primary px-5 py-2 text-sm"
        >
          Hire Me
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: open ? "400px" : "0",
          background: "rgba(10,10,26,0.97)",
          borderBottom: open ? "1px solid rgba(0,229,255,0.15)" : "none",
        }}
      >
        <ul className="px-6 py-4 flex flex-col gap-5">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="nav-link text-base font-semibold"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href="/#contact" className="btn-primary inline-block px-6 py-2 text-sm text-center w-full"
              onClick={() => setOpen(false)}>
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
