"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useFadeIn } from "@/lib/use-fade-in";

const POPULAR_INDEX = 0;

export default function Lessons() {
  const { t } = useLanguage();
  const l = t.lessons;
  const ref = useFadeIn();

  return (
    <section id="lessons" className="section" style={{ background: "var(--color-surface)" }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="section-label fade-up" style={{ justifyContent: "center" }}>{l.heading}</div>
          <h2
            className="fade-up delay-100"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-secondary)",
              marginTop: "0.5rem",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            {l.heading}
          </h2>
          <p className="fade-up delay-200" style={{ color: "var(--color-muted)", fontSize: "1.05rem", marginTop: "0.75rem" }}>
            {l.subheading}
          </p>
        </div>

        <div
          className="fade-up delay-200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
          id="lessons-grid"
        >
          {l.services.map((svc, i) => {
            const isPopular = i === POPULAR_INDEX;
            return (
              <div
                key={i}
                style={{
                  background: isPopular ? "rgba(192,90,53,0.07)" : "var(--color-white)",
                  border: "1.5px solid var(--color-border)",
                  borderTop: `3px solid ${isPopular ? "var(--color-primary)" : "var(--color-border)"}`,
                  borderRadius: "1rem",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: isPopular ? "0 8px 32px rgba(192,90,53,0.1)" : "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 16px 48px rgba(22,12,7,0.12)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = isPopular ? "0 8px 32px rgba(192,90,53,0.1)" : "none";
                }}
              >
                {isPopular && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-primary)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    ★ Most Popular
                  </div>
                )}

                <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{svc.icon}</div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "0.75rem",
                    gap: "1rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontWeight: 700,
                      fontSize: "1.25rem",
                      color: "var(--color-secondary)",
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.name}
                  </h3>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 900, fontSize: "1.5rem", color: "var(--color-primary)" }}>
                      {svc.price}
                    </span>
                    <span style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--color-muted)", marginLeft: "0.2rem" }}>
                      {l.perHour}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.925rem",
                    lineHeight: 1.8,
                    color: "var(--color-muted)",
                    marginBottom: "1.25rem",
                    flex: 1,
                  }}
                >
                  {svc.description}
                </p>

                <div
                  style={{
                    borderTop: "1px solid var(--color-border)",
                    paddingTop: "1rem",
                    marginBottom: "1.5rem",
                    fontSize: "0.85rem",
                    color: "var(--color-muted)",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "var(--color-secondary)" }}>{l.bestFor}: </span>
                  {svc.bestFor}
                </div>

                <Link
                  href="/book"
                  className={isPopular ? "btn-primary" : "btn-outline"}
                  style={{ textAlign: "center", fontSize: "0.9rem", padding: "0.7rem 1.25rem" }}
                >
                  {l.bookBtn}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
