"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useFadeIn } from "@/lib/use-fade-in";

export default function FAQ() {
  const { t } = useLanguage();
  const f = t.faq;
  const ref = useFadeIn();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section" style={{ background: "var(--color-bg)" }} ref={ref}>
      <div className="container">
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div className="section-label fade-up" style={{ justifyContent: "center" }}>{f.heading}</div>
            <h2
              className="fade-up delay-100"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--color-secondary)",
                marginTop: "0.5rem",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              {f.heading}
            </h2>
          </div>

          <div className="fade-up delay-200" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {f.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  style={{
                    background: "var(--color-white)",
                    border: "1.5px solid var(--color-border)",
                    borderLeft: `3px solid ${isOpen ? "var(--color-primary)" : "transparent"}`,
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    transition: "border-left-color 0.25s",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    style={{
                      width: "100%",
                      padding: "1.25rem 1.5rem",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: isOpen ? "var(--color-primary)" : "var(--color-secondary)",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      fontFamily: "var(--font-sans)",
                      transition: "color 0.2s",
                    }}
                    aria-expanded={isOpen}
                  >
                    <span style={{ paddingRight: "1rem", lineHeight: 1.4 }}>{item.question}</span>
                    <span
                      style={{
                        flexShrink: 0,
                        width: "1.6rem",
                        height: "1.6rem",
                        borderRadius: "50%",
                        background: isOpen ? "var(--color-primary)" : "var(--color-surface)",
                        color: isOpen ? "white" : "var(--color-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: 400,
                        transition: "background 0.25s, color 0.25s, transform 0.3s",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? "600px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div
                      style={{
                        padding: "0 1.5rem 1.5rem",
                        paddingTop: "0.875rem",
                        fontSize: "0.95rem",
                        lineHeight: 1.85,
                        color: "var(--color-muted)",
                        borderTop: "1px solid var(--color-border)",
                      }}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
