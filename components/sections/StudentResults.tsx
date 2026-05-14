"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.results;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

export default function StudentResults() {
  return (
    <section
      id="results"
      style={{ background: "var(--color-secondary)", padding: "7rem 0", position: "relative", overflow: "hidden" }}
    >
      {/* Warm radial glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-8rem",
          right: "-8rem",
          width: "40rem",
          height: "40rem",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,90,53,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ marginBottom: "4rem" }}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
            <span style={{ width: "1.75rem", height: "1.5px", background: "var(--color-primary)", display: "inline-block" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary-light)" }}>
              {c.eyebrow}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-white)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {c.headline}
          </motion.h2>
        </motion.div>

        {/* Transformation cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          id="reviews-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}
        >
          {c.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "1.25rem",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Student */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{
                  width: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "var(--color-primary)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "white",
                }}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-white)", lineHeight: 1.2 }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", marginTop: "0.15rem" }}>{item.context}</div>
                </div>
                <div style={{
                  marginLeft: "auto",
                  background: "rgba(192,90,53,0.2)",
                  color: "var(--color-primary-light)",
                  borderRadius: "999px",
                  padding: "0.25rem 0.75rem",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}>
                  {item.timeframe}
                </div>
              </div>

              {/* Before → After */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "0.625rem",
                  padding: "0.875rem 1rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "0.35rem" }}>
                    Before
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item.before}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ArrowRight size={16} color="var(--color-primary)" style={{ transform: "rotate(90deg)" }} />
                </div>

                <div style={{
                  background: "rgba(192,90,53,0.12)",
                  borderRadius: "0.625rem",
                  padding: "0.875rem 1rem",
                  border: "1px solid rgba(192,90,53,0.2)",
                }}>
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-primary-light)", marginBottom: "0.35rem" }}>
                    After
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, fontWeight: 500 }}>{item.after}</div>
                </div>
              </div>

              {/* Quote */}
              <p style={{ fontSize: "0.875rem", fontStyle: "italic", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "1rem" }}>
                &ldquo;{item.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
