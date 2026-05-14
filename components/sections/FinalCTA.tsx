"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useFadeIn } from "@/lib/use-fade-in";
import { TUTOR } from "@/lib/config";

export default function FinalCTA() {
  const { t } = useLanguage();
  const f = t.finalCta;
  const ref = useFadeIn();

  return (
    <section
      className="section"
      style={{
        background: "var(--color-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
      ref={ref}
    >
      {/* Warm gradient accents */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse at 10% 50%, rgba(217,119,87,0.2) 0%, transparent 55%),
            radial-gradient(ellipse at 90% 10%, rgba(245,158,11,0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 70% 90%, rgba(217,119,87,0.1) 0%, transparent 40%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Decorative large circle */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-8rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "30rem",
          height: "30rem",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-5rem",
          top: "50%",
          transform: "translateY(-50%)",
          width: "20rem",
          height: "20rem",
          borderRadius: "50%",
          border: "1px solid rgba(217,119,87,0.08)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        {/* Label */}
        <div
          className="fade-up"
          style={{
            display: "inline-block",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-primary)",
            background: "rgba(217,119,87,0.15)",
            padding: "0.3rem 1rem",
            borderRadius: "999px",
            marginBottom: "1.5rem",
            border: "1px solid rgba(217,119,87,0.25)",
          }}
        >
          🎁 Free First Lesson
        </div>

        <h2
          className="fade-up delay-100"
          style={{
            fontFamily: "var(--font-fraunces, var(--font-serif))",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            lineHeight: 1.1,
          }}
        >
          {f.heading}
        </h2>

        <p
          className="fade-up delay-200"
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "520px",
            margin: "0 auto 2.75rem",
            lineHeight: 1.75,
          }}
        >
          {f.subheading}
        </p>

        {/* CTA buttons */}
        <div
          className="fade-up delay-300"
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/book" className="btn-primary" style={{ fontSize: "1.05rem", padding: "1rem 2.5rem" }}>
            {f.btn} →
          </Link>
          <a
            href={`mailto:${TUTOR.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2rem",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "1rem",
              borderRadius: "var(--radius)",
              border: "1.5px solid rgba(255,255,255,0.15)",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.4)";
              el.style.color = "rgba(255,255,255,0.95)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.15)";
              el.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            ✉ Send a Message
          </a>
        </div>

        {/* Social proof below button */}
        <p
          className="fade-up delay-400"
          style={{
            marginTop: "2.5rem",
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          ⭐ {TUTOR.reviewScore}/5 from {TUTOR.reviewCount} reviews · No credit card needed · Cancel anytime
        </p>
      </div>
    </section>
  );
}
