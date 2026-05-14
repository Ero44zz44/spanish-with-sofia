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
    <section id="lessons" className="section" style={{ background: "var(--color-bg)" }} ref={ref}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div className="section-label fade-up">{l.heading}</div>
          <h2
            className="fade-up delay-100"
            style={{
              fontFamily: "var(--font-fraunces, var(--font-serif))",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-secondary)",
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
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
            gap: "1.5rem",
          }}
          id="lessons-grid"
        >
          {l.services.map((svc, i) => {
            const isPopular = i === POPULAR_INDEX;
            return (
              <div
                key={i}
                style={{
                  background: isPopular ? "var(--color-secondary)" : "var(--color-white)",
                  border: isPopular ? "none" : "1.5px solid var(--color-border)",
                  borderRadius: "1.25rem",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isPopular
                    ? "0 16px 48px rgba(31,41,55,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = isPopular
                    ? "0 24px 64px rgba(31,41,55,0.35)"
                    : "0 8px 28px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = isPopular
                    ? "0 16px 48px rgba(31,41,55,0.25)"
                    : "0 2px 8px rgba(0,0,0,0.05)";
                }}
              >
                {/* Decorative circle in dark card */}
                {isPopular && (
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "-3rem",
                      right: "-3rem",
                      width: "10rem",
                      height: "10rem",
                      borderRadius: "50%",
                      background: "rgba(217,119,87,0.15)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                {/* Popular badge */}
                {isPopular && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      background: "var(--color-primary)",
                      color: "white",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      marginBottom: "1.25rem",
                      width: "fit-content",
                    }}
                  >
                    ★ Most Popular
                  </div>
                )}

                <div style={{ fontSize: "2.25rem", marginBottom: "1rem" }}>{svc.icon}</div>

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
                      fontFamily: "var(--font-fraunces, var(--font-serif))",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      color: isPopular ? "#FFFFFF" : "var(--color-secondary)",
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.name}
                  </h3>
                  <span
                    style={{
                      fontWeight: 800,
                      fontSize: "1.2rem",
                      color: isPopular ? "var(--color-primary)" : "var(--color-primary)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {svc.price}
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        color: isPopular ? "rgba(255,255,255,0.5)" : "var(--color-muted)",
                      }}
                    >
                      {l.perHour}
                    </span>
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.75,
                    color: isPopular ? "rgba(255,255,255,0.65)" : "var(--color-muted)",
                    marginBottom: "1.25rem",
                    flex: 1,
                  }}
                >
                  {svc.description}
                </p>

                <div
                  style={{
                    background: isPopular ? "rgba(217,119,87,0.15)" : "rgba(217,119,87,0.07)",
                    borderRadius: "0.5rem",
                    padding: "0.65rem 0.9rem",
                    marginBottom: "1.5rem",
                    fontSize: "0.85rem",
                    color: isPopular ? "rgba(255,255,255,0.75)" : "var(--color-secondary)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{l.bestFor}: </span>
                  {svc.bestFor}
                </div>

                <Link
                  href="/book"
                  className={isPopular ? "btn-primary" : "btn-outline"}
                  style={{
                    textAlign: "center",
                    fontSize: "0.9rem",
                    padding: "0.7rem 1.25rem",
                    ...(isPopular ? {} : { borderColor: "var(--color-border)" }),
                  }}
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
