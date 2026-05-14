"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import type { Language } from "@/lib/translations";

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#lessons", label: t.nav.lessons },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(253,248,243,0.95)" : "var(--color-bg)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow: scrolled ? "var(--shadow-sm)" : "none",
      }}
    >
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "var(--color-primary)", flexShrink: 0, display: "inline-block" }} />
            <span
              style={{
                fontFamily: "var(--font-fraunces, var(--font-serif))",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "var(--color-secondary)",
                letterSpacing: "-0.01em",
              }}
            >
              Sofía Martínez
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            className="hidden-mobile"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "var(--color-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Language switcher */}
            <div
              style={{
                display: "flex",
                border: "1.5px solid var(--color-border)",
                borderRadius: "999px",
                overflow: "hidden",
              }}
              className="hidden-mobile"
            >
              {(["en", "es"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: lang === l ? "var(--color-primary)" : "transparent",
                    color: lang === l ? "var(--color-white)" : "var(--color-muted)",
                    transition: "background 0.2s, color 0.2s",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link href="/book" className="btn-primary hidden-mobile" style={{ padding: "0.6rem 1.25rem", fontSize: "0.9rem" }}>
              {t.nav.bookTrial}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="show-mobile"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem",
                color: "var(--color-secondary)",
              }}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                {menuOpen ? (
                  <>
                    <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-bg)",
            borderTop: "1px solid var(--color-border)",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                fontSize: "1rem",
                fontWeight: 500,
                color: "var(--color-secondary)",
                textDecoration: "none",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {l.label}
            </a>
          ))}
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Link href="/book" className="btn-primary" style={{ fontSize: "0.9rem", padding: "0.65rem 1.25rem" }} onClick={() => setMenuOpen(false)}>
              {t.nav.bookTrial}
            </Link>
            <div style={{ display: "flex", border: "1.5px solid var(--color-border)", borderRadius: "999px", overflow: "hidden" }}>
              {(["en", "es"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMenuOpen(false); }}
                  style={{
                    padding: "0.3rem 0.75rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    background: lang === l ? "var(--color-primary)" : "transparent",
                    color: lang === l ? "var(--color-white)" : "var(--color-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </header>
  );
}
