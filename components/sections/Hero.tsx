"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { TUTOR } from "@/lib/config";

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section
      id="home"
      style={{
        background: "var(--color-bg)",
        padding: "5rem 0 6rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Decorative blobs */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-8rem",
          right: "-8rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,119,87,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-4rem",
          left: "-6rem",
          width: "28rem",
          height: "28rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Text column */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
                background: "rgba(217,119,87,0.1)",
                padding: "0.35rem 1rem",
                borderRadius: "999px",
                marginBottom: "1.75rem",
                border: "1px solid rgba(217,119,87,0.2)",
              }}
            >
              {h.label}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-fraunces, var(--font-serif))",
                fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                fontWeight: 900,
                lineHeight: 1.08,
                color: "var(--color-secondary)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              {h.headline}
            </h1>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.75,
                color: "var(--color-muted)",
                marginBottom: "2.5rem",
                maxWidth: "480px",
              }}
            >
              {h.subheadline}
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              <Link href="/book" className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2rem" }}>
                {h.ctaPrimary} →
              </Link>
              <button
                className="btn-outline"
                style={{ fontSize: "1rem", padding: "0.9rem 1.75rem" }}
              >
                ▶ {h.ctaSecondary}
              </button>
            </div>

            {/* Trust badges */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                flexWrap: "wrap",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.75rem",
              }}
            >
              {[h.trust1, h.trust2, h.trust3].map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Photo column */}
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            {/* Decorative ring behind the photo */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-1.5rem",
                borderRadius: "2rem",
                background:
                  "linear-gradient(135deg, rgba(217,119,87,0.25) 0%, rgba(245,158,11,0.15) 100%)",
                zIndex: 0,
              }}
            />

            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "440px",
                aspectRatio: "4/5",
                borderRadius: "1.75rem",
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)",
                zIndex: 1,
              }}
            >
              <Image
                src="/sofia-hero.jpg"
                alt={`${TUTOR.name} — Native Mexican Spanish Tutor`}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, 440px"
              />

              {/* Rating badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "1rem",
                  padding: "0.85rem 1.25rem",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
              >
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                  }}
                >
                  ⭐
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--color-secondary)", lineHeight: 1 }}>
                    {TUTOR.reviewScore}/5
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-muted)", marginTop: "0.15rem" }}>
                    {TUTOR.reviewCount} verified reviews
                  </div>
                </div>
              </div>

              {/* Students badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  right: "1.5rem",
                  background: "var(--color-primary)",
                  borderRadius: "0.85rem",
                  padding: "0.65rem 1rem",
                  boxShadow: "0 8px 24px rgba(217,119,87,0.4)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "white", lineHeight: 1 }}>
                  {TUTOR.studentCount}
                </div>
                <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.85)", marginTop: "0.1rem" }}>
                  students
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
