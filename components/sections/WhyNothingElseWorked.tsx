"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Smartphone, Users, BookOpen } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.problem;

const iconMap = {
  Smartphone,
  Users,
  BookOpen,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function WhyNothingElseWorked() {
  return (
    <section style={{ background: "var(--color-surface)", padding: "6rem 0", position: "relative", overflow: "hidden" }}>
      {/* Subtle top border line */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60px", height: "3px", background: "var(--color-primary)", borderRadius: "2px" }} />

      <div className="container">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ maxWidth: "680px", marginBottom: "4rem" }}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.25rem" }}>
            <span style={{ width: "1.75rem", height: "1.5px", background: "var(--color-primary)", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)" }}>
              {c.eyebrow}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--color-secondary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              whiteSpace: "pre-line",
            }}
          >
            {c.headline}
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          id="steps-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "4rem" }}
        >
          {c.cards.map((card, i) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  background: "var(--color-white)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "0.625rem",
                  background: "rgba(192,90,53,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}>
                  <Icon size={18} color="var(--color-primary)" strokeWidth={1.75} />
                </div>
                <h3 style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: "var(--color-secondary)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.925rem", lineHeight: 1.8, color: "var(--color-muted)" }}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Transition line + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: "center" }}
        >
          <p style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
            fontStyle: "italic",
            color: "var(--color-secondary)",
            maxWidth: "600px",
            margin: "0 auto 2rem",
            lineHeight: 1.6,
          }}>
            {c.transitionLine}
          </p>
          <Link href={c.cta.href} className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}>
            {c.cta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
