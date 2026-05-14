"use client";

import { useLanguage } from "@/lib/language-context";
import { useFadeIn } from "@/lib/use-fade-in";

export default function Reviews() {
  const { t } = useLanguage();
  const r = t.reviews;
  const ref = useFadeIn();

  return (
    <section
      id="reviews"
      className="section"
      style={{ background: "#1A0D07", position: "relative", overflow: "hidden" }}
      ref={ref}
    >
      {/* Background texture dots */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 15% 50%, rgba(217,119,87,0.12) 0%, transparent 50%), radial-gradient(circle at 85% 20%, rgba(245,158,11,0.08) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div
            className="fade-up"
            style={{
              display: "inline-block",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              background: "rgba(217,119,87,0.15)",
              padding: "0.3rem 0.85rem",
              borderRadius: "999px",
              marginBottom: "1rem",
              border: "1px solid rgba(217,119,87,0.25)",
            }}
          >
            {r.heading}
          </div>
          <h2
            className="fade-up delay-100"
            style={{
              fontFamily: "var(--font-fraunces, var(--font-serif))",
              fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#FFFFFF",
              marginTop: "0.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            What My Students Say
          </h2>
          <p
            className="fade-up delay-200"
            style={{ color: "rgba(255,255,255,0.5)", marginTop: "0.75rem", fontSize: "1rem" }}
          >
            {r.rating}
          </p>
        </div>

        {/* Cards */}
        <div
          className="fade-up delay-200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
          id="reviews-grid"
        >
          {r.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.25rem",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(217,119,87,0.4)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Giant quote mark */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: "0.75rem",
                  right: "1.25rem",
                  fontFamily: "Georgia, serif",
                  fontSize: "5rem",
                  lineHeight: 1,
                  color: "rgba(217,119,87,0.18)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div style={{ display: "flex", gap: "0.2rem" }}>
                {[...Array(5)].map((_, s) => (
                  <span key={s} style={{ color: "var(--color-accent)", fontSize: "0.9rem" }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontSize: "0.975rem",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.82)",
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
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "1.25rem",
                }}
              >
                <div
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    borderRadius: "50%",
                    background: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#FFFFFF" }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", marginTop: "0.1rem" }}>
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
