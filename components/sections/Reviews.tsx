"use client";

import { useLanguage } from "@/lib/language-context";
import { useFadeIn } from "@/lib/use-fade-in";
import { TUTOR } from "@/lib/config";

export default function Reviews() {
  const { t } = useLanguage();
  const r = t.reviews;
  const ref = useFadeIn();

  return (
    <section
      id="reviews"
      className="section"
      style={{ background: "var(--color-secondary)", position: "relative", overflow: "hidden" }}
      ref={ref}
    >
      {/* Warm radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-6rem",
          right: "-6rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,90,53,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div
            className="fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
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
            {r.heading}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <h2
              className="fade-up delay-100"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.9rem, 4vw, 2.75rem)",
                fontWeight: 800,
                color: "var(--color-white)",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                maxWidth: "480px",
              }}
            >
              What My Students Say
            </h2>
            <div className="fade-up delay-200" style={{ textAlign: "right" }}>
              <div style={{ color: "var(--color-accent)", fontSize: "1rem", letterSpacing: "0.05em" }}>★★★★★</div>
              <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-white)", lineHeight: 1 }}>
                {TUTOR.reviewScore} / 5
              </div>
              <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" }}>
                {TUTOR.reviewCount} reviews
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div
          className="fade-up delay-200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          id="reviews-grid"
        >
          {r.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "1rem",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(192,90,53,0.3)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Giant quote mark */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "1.25rem",
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "6rem",
                  fontWeight: 900,
                  lineHeight: 1,
                  color: "rgba(192,90,53,0.12)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div style={{ color: "var(--color-accent)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>★★★★★</div>

              {/* Quote */}
              <p
                style={{
                  fontSize: "0.975rem",
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.78)",
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.85rem",
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--color-white)" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginTop: "0.1rem" }}>
                    {item.country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
