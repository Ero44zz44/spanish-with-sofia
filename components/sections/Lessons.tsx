"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.offers;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function Lessons() {
  return (
    <section id="lessons" style={{ background: "var(--color-surface)", padding: "7rem 0" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
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
              marginBottom: "0.75rem",
            }}
          >
            {c.headline}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: "1.05rem", color: "var(--color-muted)", maxWidth: "480px", margin: "0 auto" }}>
            {c.subheadline}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          id="lessons-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", alignItems: "start" }}
        >
          {c.items.map((item, i) => {
            const isPopular = !!item.badge;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{
                  background: "var(--color-white)",
                  borderRadius: "1.25rem",
                  padding: "2rem",
                  border: isPopular ? "2px solid var(--color-primary)" : "1.5px solid var(--color-border)",
                  boxShadow: isPopular ? "0 12px 48px rgba(192,90,53,0.15)" : "var(--shadow-sm)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  marginTop: isPopular ? "-0.75rem" : 0,
                  paddingTop: isPopular ? "2.5rem" : "2rem",
                }}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div style={{
                    position: "absolute",
                    top: "-1px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--color-primary)",
                    color: "var(--color-white)",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 1rem",
                    borderRadius: "0 0 0.5rem 0.5rem",
                    whiteSpace: "nowrap",
                  }}>
                    {item.badge}
                  </div>
                )}

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "var(--color-secondary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.2,
                }}>
                  {item.title}
                </h3>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-fraunces)", fontWeight: 900, fontSize: "2rem", color: "var(--color-primary)", lineHeight: 1 }}>
                    {item.price}
                  </span>
                  <span style={{ fontSize: "0.82rem", color: "var(--color-muted)", fontWeight: 500 }}>
                    {item.priceSubtext}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "var(--color-muted)", marginBottom: "1.5rem" }}>
                  {item.description}
                </p>

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
                  {item.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", fontSize: "0.875rem", color: "var(--color-secondary)", fontWeight: 500 }}>
                      <Check size={14} color="var(--color-primary)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Best for */}
                <div style={{
                  borderTop: "1px solid var(--color-border)",
                  paddingTop: "1rem",
                  marginBottom: "1.5rem",
                  fontSize: "0.82rem",
                  color: "var(--color-muted)",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}>
                  Best for: {item.bestFor}
                </div>

                {/* CTA */}
                <Link
                  href={item.href}
                  className={isPopular ? "btn-primary" : "btn-outline"}
                  style={{ textAlign: "center", fontSize: "0.95rem" }}
                >
                  {item.cta}
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.875rem", color: "var(--color-muted)", fontStyle: "italic" }}
        >
          {c.guarantee}
        </motion.p>
      </div>
    </section>
  );
}
