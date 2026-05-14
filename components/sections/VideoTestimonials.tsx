"use client";

import { motion } from "framer-motion";
import { VideoPlayer } from "@/components/VideoPlayer";
import { siteConfig } from "@/lib/config";

const c = siteConfig.videoTestimonials;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function VideoTestimonials() {
  return (
    <section style={{ background: "var(--color-surface)", padding: "7rem 0" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
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

        {/* Video cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}
          id="reviews-grid"
        >
          {c.items.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
            >
              {/* Video player */}
              <div style={{ borderRadius: "1rem", overflow: "hidden", boxShadow: "var(--shadow-md)", background: "var(--color-secondary)" }}>
                <VideoPlayer
                  src={item.videoSrc}
                  poster={item.poster}
                  aspectRatio="16/9"
                />
              </div>

              {/* Caption */}
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-secondary)" }}>{item.name}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--color-muted)", marginTop: "0.2rem", lineHeight: 1.5 }}>{item.caption}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
