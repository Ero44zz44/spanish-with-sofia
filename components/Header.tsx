"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";

const { nav, brand } = siteConfig;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(253,248,243,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4.25rem" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", flexShrink: 0 }} />
            <span style={{
              fontFamily: "var(--font-fraunces, var(--font-serif))",
              fontWeight: 700,
              fontSize: "1.15rem",
              color: "var(--color-secondary)",
              letterSpacing: "-0.01em",
            }}>
              {brand.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden-mobile">
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{ fontWeight: 500, fontSize: "0.95rem", color: "var(--color-secondary)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href={nav.cta.href}
              className="btn-primary hidden-mobile"
              style={{ padding: "0.6rem 1.25rem", fontSize: "0.9rem" }}
            >
              {nav.cta.label}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--color-secondary)", display: "flex" }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "var(--color-bg)",
              borderTop: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
              padding: "1rem 1.5rem 1.5rem",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "0.875rem 0", fontSize: "1rem", fontWeight: 500, color: "var(--color-secondary)", textDecoration: "none", borderBottom: "1px solid var(--color-border)" }}
              >
                {l.label}
              </a>
            ))}
            <Link
              href={nav.cta.href}
              className="btn-primary"
              style={{ marginTop: "1.25rem", fontSize: "0.95rem", width: "100%", justifyContent: "center" }}
              onClick={() => setMenuOpen(false)}
            >
              {nav.cta.label}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
