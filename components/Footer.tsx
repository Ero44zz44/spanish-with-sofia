"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { siteConfig } from "@/lib/config";

const { footer, brand, nav } = siteConfig;

export default function Footer() {
  return (
    <footer style={{ background: "var(--color-secondary)", color: "rgba(255,255,255,0.75)", padding: "4rem 0 1.75rem" }}>
      <div className="container">
        <div
          className="footer-grid"
          style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", paddingBottom: "3rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ width: "0.45rem", height: "0.45rem", borderRadius: "50%", background: "var(--color-primary)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-white)" }}>
                {brand.name}
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "260px", marginBottom: "1.5rem" }}>
              {footer.tagline}
            </p>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
            >
              <Share2 size={16} /> {brand.instagramHandle}
            </a>
          </div>

          {/* Navigate */}
          <div>
            <h4 style={{ color: "var(--color-white)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {footer.columns.navigate.label}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footer.columns.navigate.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Lessons */}
          <div>
            <h4 style={{ color: "var(--color-white)", fontWeight: 600, marginBottom: "1rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {footer.columns.lessons.label}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {footer.columns.lessons.links.map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-white)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "1.5rem", gap: "1rem", flexWrap: "wrap" }}>
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            {footer.copyright} · Made in {footer.madeIn}
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a
              href={`mailto:${brand.email}`}
              style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
            >
              {brand.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
