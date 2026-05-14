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
          className="about-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.25fr", gap: "5rem", alignItems: "center" }}
        >
          {/* Photo */}
          <div className="fade-up" style={{ position: "relative" }}>
            {/* Terracotta background shape */}
            <div
              aria-hidden
              className="about-bg-shape"
              style={{
                position: "absolute",
                top: "2rem",
                left: "-1.5rem",
                width: "88%",
                height: "90%",
                borderRadius: "1.5rem",
                background: "var(--color-surface)",
                zIndex: 0,
              }}
            />
            <div
              className="about-photo-container"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 20px 56px rgba(22,12,7,0.14)",
                zIndex: 1,
              }}
            >
              <Image
                src="/sofia-about.jpg"
                alt={`${TUTOR.name} — About`}
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>

            {/* Years badge */}
            <div
              className="about-years-badge"
              style={{
                position: "absolute",
                bottom: "-1.75rem",
                right: "-1.75rem",
                background: "var(--color-primary)",
                color: "var(--color-white)",
                borderRadius: "1.25rem",
                padding: "1.25rem 1.5rem",
                boxShadow: "0 12px 36px rgba(192,90,53,0.4)",
                zIndex: 2,
                minWidth: "8.5rem",
                textAlign: "center",
              }}
            >
              <div className="about-years-num" style={{
                fontSize: "2.75rem",
                fontWeight: 900,
                fontFamily: "var(--font-fraunces)",
                lineHeight: 1,
              }}>
                {TUTOR.yearsExperience}+
              </div>
              <div style={{ fontSize: "0.78rem", opacity: 0.85, marginTop: "0.35rem", fontWeight: 500 }}>
                years teaching
              </div>
            </div>

            {/* Countries badge */}
            <div
              className="about-countries-badge"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "-1.25rem",
                background: "var(--color-white)",
                borderRadius: "0.875rem",
                padding: "0.75rem 1.1rem",
                boxShadow: "0 8px 28px rgba(22,12,7,0.1)",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "1px solid var(--color-border)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
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
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                color: "var(--color-secondary)",
                marginBottom: "1.75rem",
                letterSpacing: "-0.025em",
              }}
            >
              {a.heading}
            </h2>

            <div className="fade-up delay-200" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.25rem" }}>
              {a.story.slice(0, 3).map((para, i) => (
                <p key={i} style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--color-muted)" }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Credentials — 2-column grid */}
            <div className="fade-up delay-300" style={{ marginBottom: "2.25rem" }}>
              <div className="about-credentials" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.625rem" }}>
                {a.credentials.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.625rem",
                      padding: "0.875rem 1rem",
                      background: "var(--color-bg)",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-secondary)", lineHeight: 1.4 }}>
                      {c}
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
