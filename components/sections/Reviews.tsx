"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

const c = siteConfig.testimonials;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

export default function Reviews() {
  return (
    <section
      id="reviews"
      style={{ background: "var(--color-white)", padding: "7rem 0", position: "relative", overflow: "hidden" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem", marginBottom: "4rem", flexWrap: "wrap" }}
        >
          <div>
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
              <span style={{ width: "1.75rem", height: "1.5px", background: "var(--color-primary)", display: "inline-block" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)" }}>
                {c.eyebrow}
              </span>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                color: "var(--color-secondary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {c.headline}
            </motion.h2>
          </div>
          <motion.div variants={fadeUp} style={{ textAlign: "right" }}>
            <div style={{ color: "var(--color-accent)", fontSize: "1rem", letterSpacing: "0.08em" }}>★★★★★</div>
            <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.6rem", fontWeight: 800, color: "var(--color-secondary)", lineHeight: 1 }}>
              {c.ratingScore} / 5
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--color-muted)", marginTop: "0.2rem" }}>{c.ratingCount}</div>
          </motion.div>
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          id="reviews-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", alignItems: "start" }}
        >
          {c.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{
                background: "var(--color-bg)",
                borderRadius: "1rem",
                padding: "1.75rem",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Stars */}
              <div style={{ color: "var(--color-accent)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>★★★★★</div>

              {/* Quote */}
              <p style={{ fontSize: "0.925rem", lineHeight: 1.85, color: "var(--color-secondary)", flex: 1, fontStyle: "italic" }}>
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}>
                <div style={{
                  width: "2.25rem",
                  height: "2.25rem",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "var(--color-primary)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "white",
                  position: "relative",
                }}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--color-secondary)", lineHeight: 1.2 }}>{item.name}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.1rem" }}>{item.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
