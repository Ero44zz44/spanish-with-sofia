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
      className="hero-section"
      style={{
        background: "var(--color-bg)",
        padding: "5rem 0 7rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Warm surface panel — right half background */}
      <div
        aria-hidden
        className="hero-surface-panel"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "48%",
          height: "100%",
          background: "var(--color-surface)",
          clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0% 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
        >
          {/* Text column */}
          <div>
            {/* Editorial label */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <div style={{ width: "2rem", height: "1.5px", background: "var(--color-primary)", flexShrink: 0 }} />
              <span style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
              }}>
                {h.label}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2.75rem, 5.5vw, 4rem)",
                fontWeight: 900,
                lineHeight: 1.06,
                color: "var(--color-secondary)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.03em",
              }}
            >
              {h.headline}
            </h1>

            <p style={{
              fontSize: "1.075rem",
              lineHeight: 1.8,
              color: "var(--color-muted)",
              marginBottom: "2.5rem",
              maxWidth: "440px",
            }}>
              {h.subheadline}
            </p>

            <div className="hero-buttons" style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "3.25rem" }}>
              <Link href="/book" className="btn-primary" style={{ fontSize: "1rem", padding: "0.95rem 2rem" }}>
                {h.ctaPrimary} →
              </Link>
              <a href="#reviews" className="btn-outline" style={{ fontSize: "1rem", padding: "0.95rem 1.75rem" }}>
                See reviews
              </a>
            </div>

            {/* Trust stats — editorial row */}
            <div className="hero-stats" style={{
              display: "flex",
              gap: "0",
              borderTop: "1px solid var(--color-border)",
              paddingTop: "1.75rem",
            }}>
              {[
                { num: `${TUTOR.reviewScore}/5`, label: "student rating" },
                { num: TUTOR.studentCount, label: "students taught" },
                { num: `${TUTOR.countryCount}`, label: "countries" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="hero-stat"
                  style={{
                    flex: 1,
                    paddingRight: i < 2 ? "1.5rem" : 0,
                    borderRight: i < 2 ? "1px solid var(--color-border)" : "none",
                    marginRight: i < 2 ? "1.5rem" : 0,
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--color-secondary)",
                    lineHeight: 1,
                  }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "var(--color-muted)", marginTop: "0.25rem", fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo column */}
          <div className="hero-photo-col" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Offset terracotta shadow shape */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-2.5rem",
                right: "-1.5rem",
                width: "75%",
                height: "82%",
                borderRadius: "1.5rem",
                background: "rgba(192,90,53,0.14)",
                zIndex: 0,
              }}
            />

            <div
              className="hero-photo-wrap"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "3/4",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(22,12,7,0.18), 0 8px 24px rgba(22,12,7,0.1)",
                zIndex: 1,
              }}
            >
              <Image
                src="/sofia-hero.jpg"
                alt={`${TUTOR.name} — Native Mexican Spanish Tutor`}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, 420px"
              />

              {/* Rating badge */}
              <div style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                background: "rgba(250,246,239,0.96)",
                backdropFilter: "blur(10px)",
                borderRadius: "0.875rem",
                padding: "0.875rem 1.25rem",
                boxShadow: "0 8px 32px rgba(22,12,7,0.16)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}>
                <div style={{ color: "var(--color-accent)", fontSize: "0.875rem", letterSpacing: "0.05em" }}>★★★★★</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-secondary)", lineHeight: 1 }}>
                    {TUTOR.reviewScore} / 5
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-muted)", marginTop: "0.15rem" }}>
                    {TUTOR.reviewCount} verified reviews
                  </div>
                </div>
              </div>

              {/* Students pill */}
              <div style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "var(--color-secondary)",
                borderRadius: "0.75rem",
                padding: "0.6rem 1rem",
                boxShadow: "0 8px 24px rgba(22,12,7,0.3)",
                textAlign: "center",
              }}>
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "white", lineHeight: 1 }}>
                  {TUTOR.studentCount}
                </div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.65)", marginTop: "0.1rem" }}>
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
