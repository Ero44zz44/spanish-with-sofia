"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.faq;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: "var(--color-bg)", padding: "7rem 0" }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
            <span style={{ width: "1.75rem", height: "1.5px", background: "var(--color-primary)", display: "inline-block" }} />
            <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-primary)" }}>
              {c.eyebrow}
            </span>
          </div>
          <h2 style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "clamp(2rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "var(--color-secondary)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
          }}>
            {c.headline}
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--color-muted)", maxWidth: "480px", margin: "0 auto" }}>
            {c.subheadline}
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ maxWidth: "700px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {c.items.map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: "0.875rem",
                border: "1.5px solid",
                borderColor: open === i ? "var(--color-primary)" : "var(--color-border)",
                background: open === i ? "rgba(192,90,53,0.03)" : "var(--color-white)",
                overflow: "hidden",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontWeight: 600, fontSize: "1rem", color: "var(--color-secondary)", lineHeight: 1.4 }}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0 }}
                >
                  <Plus size={18} color={open === i ? "var(--color-primary)" : "var(--color-muted)"} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 1.5rem 1.5rem" }}>
                      <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "1rem" }} />
                      <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "var(--color-muted)" }}>
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Bottom email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <p style={{ fontSize: "0.95rem", color: "var(--color-muted)", marginBottom: "0.5rem" }}>{c.bottomText}</p>
          <a
            href={`mailto:${c.bottomEmail}`}
            style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--color-primary)", textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {c.bottomEmail}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
