"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.about;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function About() {
  return (
    <section id="about" style={{ background: "var(--color-white)", padding: "7rem 0", overflow: "hidden" }}>
      <div className="container">
        <div
          className="about-grid"
          style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "6rem", alignItems: "center" }}
        >
          {/* ── Image column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ position: "relative" }}
          >
            {/* Background shape */}
            <div
              aria-hidden
              className="about-bg-shape"
              style={{
                position: "absolute",
                top: "2rem",
                left: "-1.5rem",
                width: "88%",
                height: "90%",
                borderRadius: "1.5rem",
                background: "var(--color-surface)",
                zIndex: 0,
              }}
            />

            {/* Main portrait */}
            <div
              className="about-photo-container"
              style={{
                position: "relative",
                aspectRatio: "3/4",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 20px 56px rgba(22,12,7,0.14)",
                zIndex: 1,
              }}
            >
              <Image
                src={c.portrait}
                alt={`${siteConfig.brand.tutorName} — About`}
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>

            {/* Secondary (polaroid-style) */}
            <div
              className="about-countries-badge"
              style={{
                position: "absolute",
                bottom: "2rem",
                right: "-2rem",
                width: "7rem",
                background: "var(--color-white)",
                borderRadius: "0.5rem",
                padding: "0.5rem 0.5rem 0.75rem",
                boxShadow: "0 8px 32px rgba(22,12,7,0.18)",
                transform: "rotate(3deg)",
                zIndex: 2,
                border: "1px solid var(--color-border)",
              }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "0.25rem", overflow: "hidden", marginBottom: "0.4rem", background: "var(--color-surface)" }}>
                <Image
                  src={c.secondaryImage}
                  alt="Sofía teaching"
                  fill
                  unoptimized={c.secondaryImage.includes("/placeholders/")}
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                />
              </div>
              <div style={{ fontSize: "0.6rem", fontWeight: 600, color: "var(--color-muted)", textAlign: "center", letterSpacing: "0.04em" }}>
                From Mexico City
              </div>
            </div>

            {/* Years badge */}
            <div
              className="about-years-badge"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "-1.5rem",
                background: "var(--color-primary)",
                color: "var(--color-white)",
                borderRadius: "1rem",
                padding: "1rem 1.25rem",
                boxShadow: "0 12px 36px rgba(192,90,53,0.4)",
                zIndex: 2,
                textAlign: "center",
              }}
            >
              <div className="about-years-num" style={{ fontFamily: "var(--font-fraunces)", fontSize: "2.25rem", fontWeight: 900, lineHeight: 1 }}>
                {siteConfig.brand.yearsExperience}+
              </div>
              <div style={{ fontSize: "0.72rem", opacity: 0.85, marginTop: "0.25rem", fontWeight: 500 }}>
                years teaching
              </div>
            </div>
          </motion.div>

          {/* ── Copy column ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
              <span style={{ width: "1.75rem", height: "1.5px", background: "var(--color-primary)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)" }}>
                {c.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(2rem, 4vw, 2.75rem)",
                fontWeight: 800,
                lineHeight: 1.12,
                color: "var(--color-secondary)",
                marginBottom: "1.75rem",
                letterSpacing: "-0.025em",
              }}
            >
              {c.headline}
            </motion.h2>

            {/* Story */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {[c.storyHook, c.paragraph2, c.paragraph3].map((para, i) => (
                <p key={i} style={{ fontSize: "1rem", lineHeight: 1.85, color: "var(--color-muted)" }}>
                  {para}
                </p>
              ))}
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              variants={fadeUp}
              style={{
                borderLeft: "3px solid var(--color-primary)",
                paddingLeft: "1.25rem",
                marginBottom: "2rem",
                fontFamily: "var(--font-fraunces)",
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: "var(--color-secondary)",
                lineHeight: 1.6,
              }}
            >
              {c.pullQuote}
            </motion.blockquote>

            {/* Credentials */}
            <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "2.25rem" }} className="about-credentials">
              {c.credentials.map((cred, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    padding: "0.75rem 0.875rem",
                    background: "var(--color-bg)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Check size={14} color="var(--color-primary)" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--color-secondary)", lineHeight: 1.4 }}>
                    {cred}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href={c.cta.href} className="btn-primary">
                {c.cta.label} →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
