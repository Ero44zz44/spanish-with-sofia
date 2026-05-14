"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { TUTOR } from "@/lib/config";
import { useFadeIn } from "@/lib/use-fade-in";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const ref = useFadeIn();

  return (
    <section id="about" className="section" style={{ background: "var(--color-white)" }} ref={ref}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "5rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Photo */}
          <div className="fade-up" style={{ position: "relative" }}>
            {/* Decorative ring */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-1rem",
                borderRadius: "2rem",
                background: "linear-gradient(135deg, rgba(217,119,87,0.15) 0%, rgba(245,158,11,0.1) 100%)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "1.75rem",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                zIndex: 1,
              }}
            >
              <Image
                src="/sofia-about.jpg"
                alt={`${TUTOR.name} — About`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
            {/* Floating years card */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "-1.5rem",
                background: "var(--color-primary)",
                color: "var(--color-white)",
                borderRadius: "1.25rem",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 12px 32px rgba(217,119,87,0.4)",
                zIndex: 2,
                minWidth: "8rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 900,
                  fontFamily: "var(--font-fraunces, var(--font-serif))",
                  lineHeight: 1,
                }}
              >
                {TUTOR.yearsExperience}+
              </div>
              <div style={{ fontSize: "0.8rem", opacity: 0.85, marginTop: "0.3rem", fontWeight: 500 }}>
                years teaching
              </div>
            </div>

            {/* Countries badge */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "-1rem",
                background: "var(--color-white)",
                borderRadius: "1rem",
                padding: "0.75rem 1.1rem",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid var(--color-border)",
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>🌎</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-secondary)", lineHeight: 1 }}>
                  {TUTOR.countryCount} countries
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>students from</div>
              </div>
            </div>
          </div>

          {/* Story */}
          <div>
            <div className="section-label fade-up">{a.label}</div>
            <h2
              className="fade-up delay-100"
              style={{
                fontFamily: "var(--font-fraunces, var(--font-serif))",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "var(--color-secondary)",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {a.heading}
            </h2>

            <div className="fade-up delay-200" style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
              {a.story.slice(0, 3).map((para, i) => (
                <p key={i} style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--color-muted)" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Credential pills */}
            <div className="fade-up delay-300" style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {a.credentials.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.7rem 1rem",
                      background: "rgba(217,119,87,0.06)",
                      borderRadius: "0.625rem",
                      border: "1px solid rgba(217,119,87,0.1)",
                    }}
                  >
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{c.split(" ")[0]}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--color-secondary)", lineHeight: 1.4 }}>
                      {c.split(" ").slice(1).join(" ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up delay-400">
              <Link href="/book" className="btn-primary">
                {a.cta} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
