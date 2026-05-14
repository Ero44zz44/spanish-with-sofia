"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useFadeIn } from "@/lib/use-fade-in";

export default function HowItWorks() {
  const { t } = useLanguage();
  const h = t.howItWorks;
  const ref = useFadeIn();

  return (
    <section
      className="section"
      style={{ background: "var(--color-secondary)", position: "relative", overflow: "hidden" }}
      ref={ref}
    >
      {/* Subtle warm glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-8rem",
          left: "-8rem",
          width: "36rem",
          height: "36rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,90,53,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            className="fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.65rem",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-primary-light)",
              marginBottom: "1.1rem",
            }}
          >
            <span style={{ display: "inline-block", width: "1.75rem", height: "1.5px", background: "var(--color-primary)", flexShrink: 0 }} />
            {h.heading}
          </div>
          <h2
            className="fade-up delay-100"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-white)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            {h.heading}
          </h2>
          <p className="fade-up delay-200" style={{ color: "rgba(255,255,255,0.5)", fontSize: "1.05rem", marginTop: "0.75rem" }}>
            {h.subheading}
          </p>
        </div>

        <div
          className="fade-up delay-200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          id="steps-grid"
        >
          {h.steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s, background 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(192,90,53,0.3)";
                el.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              {/* Faded giant step number */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: "-1rem",
                  right: "0.75rem",
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "8rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {step.number}
              </div>

              <div
                style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginBottom: "1.5rem",
                }}
              >
                {i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-white)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "0.925rem", lineHeight: 1.75, color: "rgba(255,255,255,0.55)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="fade-up delay-300" style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/book" className="btn-primary" style={{ fontSize: "1rem", padding: "0.95rem 2rem" }}>
            {t.nav.bookTrial} →
          </Link>
        </div>
      </div>
    </section>
  );
}
