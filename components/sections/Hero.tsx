"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { VideoPlayer } from "@/components/VideoPlayer";

const c = siteConfig.hero;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.1 } }),
};

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        background: "var(--color-bg)",
        padding: "5rem 0 6rem",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Right-half warm surface — hidden mobile */}
      <div
        aria-hidden
        className="hero-surface-panel"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "47%",
          height: "100%",
          background: "var(--color-surface)",
          clipPath: "polygon(6% 0, 100% 0, 100% 100%, 0% 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative" }}>
        <div
          className="hero-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}
        >
          {/* ── Left: copy ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}
            >
              <span style={{ width: "2rem", height: "1.5px", background: "var(--color-primary)", flexShrink: 0, display: "inline-block" }} />
              <span className="hero-label" style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-primary)",
              }}>
                {c.eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.04,
                color: "var(--color-secondary)",
                letterSpacing: "-0.035em",
                marginBottom: "0.5rem",
                whiteSpace: "pre-line",
              }}
            >
              {c.headline}
            </motion.h1>
            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 900,
                lineHeight: 1.04,
                color: "var(--color-primary)",
                letterSpacing: "-0.035em",
                marginBottom: "2rem",
                fontStyle: "italic",
              }}
            >
              {c.headlineSuffix}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              style={{
                fontSize: "1.1rem",
                lineHeight: 1.8,
                color: "var(--color-muted)",
                marginBottom: "2.5rem",
                maxWidth: "420px",
              }}
            >
              {c.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="hero-buttons"
              style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}
            >
              <Link href={c.primaryCta.href} className="btn-primary" style={{ fontSize: "1rem", padding: "1rem 2rem", gap: "0.5rem" }}>
                {c.primaryCta.label} <ArrowRight size={16} />
              </Link>
              <a href={c.secondaryCta.href} style={{
                display: "inline-flex",
                alignItems: "center",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--color-secondary)",
                textDecoration: "none",
                padding: "1rem 0",
                gap: "0.4rem",
                borderBottom: "1.5px solid var(--color-border)",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.color = "var(--color-primary)"; el.style.borderColor = "var(--color-primary)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.color = "var(--color-secondary)"; el.style.borderColor = "var(--color-border)"; }}
              >
                {c.secondaryCta.label}
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="hero-stats"
              style={{
                display: "flex",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.75rem",
              }}
            >
              {c.stats.map((stat, i) => (
                <div
                  key={i}
                  className="hero-stat"
                  style={{
                    flex: 1,
                    paddingRight: i < c.stats.length - 1 ? "1.5rem" : 0,
                    borderRight: i < c.stats.length - 1 ? "1px solid var(--color-border)" : "none",
                    marginRight: i < c.stats.length - 1 ? "1.5rem" : 0,
                  }}
                >
                  <div style={{
                    fontFamily: "var(--font-fraunces)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "var(--color-secondary)",
                    lineHeight: 1,
                  }}>
                    {stat.number}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: "0.3rem", fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: image / video ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" as const, delay: 0.2 }}
            className="hero-photo-col"
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            {/* Offset shadow shape */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-2rem",
                right: "-1rem",
                width: "72%",
                height: "80%",
                borderRadius: "1.5rem",
                background: "rgba(192,90,53,0.15)",
                zIndex: 0,
              }}
            />

            <div
              className="hero-photo-wrap"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "440px",
                aspectRatio: "3/4",
                borderRadius: "1.5rem",
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(22,12,7,0.18), 0 8px 24px rgba(22,12,7,0.1)",
                zIndex: 1,
              }}
            >
              {c.videoSrc ? (
                <VideoPlayer
                  src={c.videoSrc}
                  poster={c.videoPoster}
                  aspectRatio="3/4"
                />
              ) : (
                <>
                  <Image
                    src={c.image}
                    alt={`${siteConfig.brand.tutorName} — Native Mexican Spanish Tutor`}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    priority
                    sizes="(max-width: 768px) 100vw, 440px"
                  />

                  {/* Rating badge */}
                  <div style={{
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "1.5rem",
                    background: "rgba(250,246,239,0.97)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "0.875rem",
                    padding: "0.875rem 1.25rem",
                    boxShadow: "0 8px 32px rgba(22,12,7,0.16)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}>
                    <div style={{ color: "var(--color-accent)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>★★★★★</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-secondary)", lineHeight: 1 }}>
                        {siteConfig.brand.reviewScore} / 5
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "var(--color-muted)", marginTop: "0.15rem" }}>
                        {siteConfig.brand.reviewCount} verified reviews
                      </div>
                    </div>
                  </div>

                  {/* Students badge */}
                  <div style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    background: "var(--color-secondary)",
                    borderRadius: "0.75rem",
                    padding: "0.6rem 1rem",
                    textAlign: "center",
                  }}>
                    <div style={{ fontWeight: 800, fontSize: "1.05rem", color: "white", lineHeight: 1 }}>
                      {siteConfig.brand.studentCount}
                    </div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.65)", marginTop: "0.1rem" }}>
                      students
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
