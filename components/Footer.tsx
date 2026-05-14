"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { TUTOR } from "@/lib/config";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#about", label: t.nav.about },
    { href: "#lessons", label: t.nav.lessons },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#faq", label: t.nav.faq },
    { href: "/book", label: t.nav.bookTrial },
  ];

  return (
    <footer style={{ background: "var(--color-secondary)", color: "rgba(255,255,255,0.8)", padding: "3.5rem 0 1.5rem" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            paddingBottom: "2.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.2rem" }}>🇲🇽</span>
              <span style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-white)" }}>
                Sofía Martínez
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "240px" }}>
              {t.footer.description}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem" }}>
              <a
                href={TUTOR.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.85rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: "var(--color-white)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t.footer.quickLinks}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: "var(--color-white)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t.footer.contactInfo}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <a href={`mailto:${TUTOR.email}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                {TUTOR.email}
              </a>
              <a href={TUTOR.whatsapp} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                {TUTOR.phone}
              </a>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>🕐 {TUTOR.tzLabel}</span>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "1.5rem" }}>
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
