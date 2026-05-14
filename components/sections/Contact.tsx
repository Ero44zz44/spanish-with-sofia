"use client";

import { useState, type FormEvent } from "react";
import { useLanguage } from "@/lib/language-context";
import { TUTOR } from "@/lib/config";
import { useFadeIn } from "@/lib/use-fade-in";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France",
  "Spain", "Mexico", "Netherlands", "Sweden", "Norway", "Denmark", "Switzerland",
  "Japan", "South Korea", "Brazil", "Argentina", "Italy", "Poland", "Other",
];

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const ref = useFadeIn();

  const [form, setForm] = useState({ name: "", email: "", country: "", level: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", country: "", level: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section" style={{ background: "var(--color-white)" }} ref={ref}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left info */}
          <div>
            <div className="section-label fade-up">{c.heading}</div>
            <h2
              className="fade-up delay-100"
              style={{
                fontFamily: "var(--font-fraunces, var(--font-serif))",
                fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--color-secondary)",
                marginTop: "0.5rem",
                marginBottom: "1.25rem",
                letterSpacing: "-0.02em",
              }}
            >
              {c.heading}
            </h2>
            <p className="fade-up delay-200" style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-muted)", marginBottom: "2rem" }}>
              {c.subheading}
            </p>

            <div className="fade-up delay-300" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a
                href={`mailto:${TUTOR.email}`}
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-secondary)", textDecoration: "none", fontWeight: 500 }}
              >
                <span style={{ fontSize: "1.25rem" }}>✉️</span>
                {TUTOR.email}
              </a>
              <a
                href={TUTOR.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-secondary)", textDecoration: "none", fontWeight: 500 }}
              >
                <span style={{ fontSize: "1.25rem" }}>💬</span>
                {TUTOR.phone} (WhatsApp)
              </a>
              <a
                href={TUTOR.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-secondary)", textDecoration: "none", fontWeight: 500 }}
              >
                <span style={{ fontSize: "1.25rem" }}>📸</span>
                {TUTOR.instagramHandle}
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "var(--color-muted)", fontSize: "0.95rem" }}>
                <span style={{ fontSize: "1.25rem" }}>🕐</span>
                {c.timezone}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="fade-up delay-200">
            {status === "success" ? (
              <div
                style={{
                  background: "rgba(217,119,87,0.08)",
                  border: "1px solid var(--color-primary)",
                  borderRadius: "var(--radius)",
                  padding: "2rem",
                  textAlign: "center",
                  color: "var(--color-secondary)",
                  fontSize: "1rem",
                  lineHeight: 1.7,
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✅</div>
                <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{c.successMsg}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label className="form-label">{c.nameLabel}</label>
                    <input
                      className="form-input"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="form-label">{c.emailLabel}</label>
                    <input
                      className="form-input"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
                  <div>
                    <label className="form-label">{c.countryLabel}</label>
                    <select
                      className="form-input"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                    >
                      <option value="">— Select —</option>
                      {COUNTRIES.map((co) => (
                        <option key={co} value={co}>{co}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">{c.levelLabel}</label>
                    <select
                      className="form-input"
                      value={form.level}
                      onChange={(e) => setForm({ ...form, level: e.target.value })}
                    >
                      <option value="">— Select —</option>
                      {c.levels.map((lv) => (
                        <option key={lv.value} value={lv.value}>{lv.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">{c.messageLabel}</label>
                  <textarea
                    className="form-input"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {status === "error" && (
                  <p style={{ color: "#e53e3e", fontSize: "0.9rem" }}>{c.errorMsg}</p>
                )}

                <button type="submit" className="btn-primary" disabled={status === "loading"} style={{ alignSelf: "flex-start" }}>
                  {status === "loading" ? "Sending…" : c.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
