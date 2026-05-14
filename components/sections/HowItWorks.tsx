"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Video, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.process;

const iconMap = { CalendarCheck, Video, TrendingUp };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

export default function HowItWorks() {
  return (
    <section style={{ background: "var(--color-bg)", padding: "7rem 0", position: "relative" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
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
            }}
          >
            {c.headline}
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          id="steps-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", position: "relative", marginBottom: "4rem" }}
        >
          {/* Dotted connector line (desktop only) */}
          <div
            aria-hidden
            className="hidden-mobile"
            style={{
              position: "absolute",
              top: "2.25rem",
              left: "calc(33.33% - 0rem)",
              right: "calc(33.33% - 0rem)",
              height: "1px",
              borderTop: "2px dashed var(--color-border)",
              zIndex: 0,
            }}
          />

          {c.steps.map((step, i) => {
            const Icon = iconMap[step.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{ textAlign: "center", position: "relative", zIndex: 1 }}
              >
                {/* Number circle */}
                <div style={{
                  width: "4.5rem",
                  height: "4.5rem",
                  borderRadius: "50%",
                  background: "var(--color-white)",
                  border: "2px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: "-0.5rem",
                    right: "-0.25rem",
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    background: "var(--color-white)",
                    padding: "0 0.25rem",
                    lineHeight: 1,
                  }}>
                    {step.number}
                  </div>
                  <Icon size={22} color="var(--color-primary)" strokeWidth={1.75} />
                </div>

                <h3 style={{
                  fontFamily: "var(--font-fraunces)",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "var(--color-secondary)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.25,
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.925rem", lineHeight: 1.75, color: "var(--color-muted)", maxWidth: "260px", margin: "0 auto" }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="howitworks-cta"
          style={{ textAlign: "center" }}
        >
          <Link href={c.cta.href} className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2.25rem" }}>
            {c.cta.label}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
