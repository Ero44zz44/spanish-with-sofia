"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Share2 } from "lucide-react";
import { siteConfig } from "@/lib/config";

const c = siteConfig.contact;
const brand = siteConfig.brand;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, country: "", level: "" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" style={{ background: "var(--color-surface)", padding: "7rem 0" }}>
      <div className="container">
        <div
          className="contact-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "start" }}
        >
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem" }}>
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
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}>
              {c.headline}
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "var(--color-muted)", marginBottom: "2.5rem" }}>
              {c.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                {
                  Icon: Mail,
                  label: brand.email,
                  href: `mailto:${brand.email}`,
                },
                {
                  Icon: MessageSquare,
                  label: `${brand.phone} (WhatsApp)`,
                  href: brand.whatsapp,
                },
                {
                  Icon: Share2,
                  label: brand.instagramHandle,
                  href: brand.instagram,
                },
              ].map(({ Icon, label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{ display: "flex", alignItems: "center", gap: "0.875rem", color: "var(--color-secondary)", textDecoration: "none", fontWeight: 500, fontSize: "0.95rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-secondary)")}
                >
                  <span style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "rgba(192,90,53,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color="var(--color-primary)" strokeWidth={1.75} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {status === "success" ? (
              <div style={{
                background: "rgba(192,90,53,0.06)",
                border: "1px solid var(--color-primary)",
                borderRadius: "var(--radius)",
                padding: "3rem",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: "var(--font-fraunces)", fontSize: "1.5rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "0.75rem" }}>
                  Message sent.
                </div>
                <p style={{ fontSize: "1rem", color: "var(--color-muted)" }}>{c.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    className="form-input"
                    type="text"
                    required
                    placeholder="Sarah Johnson"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    required
                    placeholder="Tell me a bit about your Spanish goals..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#e53e3e", fontSize: "0.9rem" }}>{c.errorMsg}</p>
                )}

                <button
                  type="submit"
                  className="btn-primary contact-submit"
                  disabled={status === "loading"}
                  style={{ alignSelf: "flex-start" }}
                >
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
