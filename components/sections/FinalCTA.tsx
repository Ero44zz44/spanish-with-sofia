"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.finalCta;

export default function FinalCTA() {
  return (
    <section
      style={{
        background: "var(--color-primary)",
        padding: "7rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Texture overlays */}
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.08) 0%, transparent 55%), radial-gradient(ellipse at 10% 100%, rgba(22,12,7,0.12) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", right: "-10rem", top: "50%", transform: "translateY(-50%)", width: "34rem", height: "34rem", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", right: "-6rem", top: "50%", transform: "translateY(-50%)", width: "22rem", height: "22rem", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem", justifyContent: "center" }}>
            <span style={{ display: "inline-block", width: "1.75rem", height: "1.5px", background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
            {c.eyebrow}
          </div>

          {/* Headline */}
          <h2 style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "var(--color-white)",
            letterSpacing: "-0.025em",
            marginBottom: "1.25rem",
            lineHeight: 1.06,
          }}>
            {c.headline}
          </h2>

          {/* Subheadline */}
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", maxWidth: "520px", margin: "0 auto 2.75rem", lineHeight: 1.75 }}>
            {c.subheadline}
          </p>

          {/* CTAs */}
          <div className="cta-buttons" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href={c.primaryCta.href} className="btn-white" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem", gap: "0.5rem" }}>
              {c.primaryCta.label} <ArrowRight size={16} />
            </Link>
            <a
              href={c.secondaryCta.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1rem 2rem",
                background: "transparent",
                color: "rgba(255,255,255,0.8)",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "var(--radius)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                textDecoration: "none",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.55)"; el.style.color = "rgba(255,255,255,1)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.25)"; el.style.color = "rgba(255,255,255,0.8)"; }}
            >
              {c.secondaryCta.label}
            </a>
          </div>

          {/* Trust line */}
          <p style={{ marginTop: "2.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
            {c.trustLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
