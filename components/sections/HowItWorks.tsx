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
      style={{ background: "var(--color-secondary)" }}
      ref={ref}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2
            className="fade-up"
            style={{
              fontFamily: "var(--font-fraunces, var(--font-serif))",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-white)",
              letterSpacing: "-0.02em",
            }}
          >
            {h.heading}
          </h2>
          <p className="fade-up delay-100" style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.05rem", marginTop: "0.75rem" }}>
            {h.subheading}
          </p>
        </div>

        <div
          className="fade-up delay-200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          id="steps-grid"
        >
          {h.steps.map((step, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--radius)",
                padding: "2rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Large number background */}
              <div
                style={{
                  position: "absolute",
                  top: "-0.5rem",
                  right: "1rem",
                  fontFamily: "var(--font-fraunces, var(--font-serif))",
                  fontSize: "5rem",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.05)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "50%",
                  background: "var(--color-primary)",
                  color: "var(--color-white)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: "1.25rem",
                }}
              >
                {i + 1}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-fraunces, var(--font-serif))",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-white)",
                  marginBottom: "0.75rem",
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="fade-up delay-300" style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/book" className="btn-accent">
            {t.nav.bookTrial}
          </Link>
        </div>
      </div>

    </section>
  );
}
