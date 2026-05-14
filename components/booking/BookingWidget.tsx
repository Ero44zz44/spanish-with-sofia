"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { format, addDays, parseISO, isWeekend } from "date-fns";
import { useLanguage } from "@/lib/language-context";

interface Service {
  id: string;
  name: string;
  name_es: string;
  description: string;
  description_es: string;
  duration_minutes: number;
  price_usd: number;
  icon: string;
}

interface BookingState {
  service: Service | null;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  level: string;
  notes: string;
}

const STEPS = ["service", "date", "time", "details", "confirm"] as const;
type Step = (typeof STEPS)[number];

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Spain", "Netherlands", "Sweden", "Norway", "Switzerland",
  "Japan", "South Korea", "Brazil", "Argentina", "Italy", "Poland",
  "Mexico", "New Zealand", "Ireland", "Other",
];

export default function BookingWidget() {
  const { t, lang } = useLanguage();
  const tb = t.booking;
  const supabase = createClient();

  const [step, setStep] = useState<Step>("service");
  const [services, setServices] = useState<Service[]>([]);
  const [state, setState] = useState<BookingState>({
    service: null, date: "", time: "", name: "", email: "", phone: "",
    country: "", level: "", notes: "",
  });
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [apiError, setApiError] = useState<string>("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => setServices(data ?? []));
  }, []);

  // Load slots when date + service are set
  useEffect(() => {
    if (!state.date || !state.service) return;
    setLoadingSlots(true);
    setSlots([]);
    fetch(`/api/availability?date=${state.date}&duration=${state.service.duration_minutes}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? []);
        setLoadingSlots(false);
      })
      .catch(() => setLoadingSlots(false));
  }, [state.date, state.service]);

  const stepIndex = STEPS.indexOf(step);
  const canGoBack = stepIndex > 0 && status !== "success";

  function goBack() {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1]);
  }

  async function handleConfirm() {
    if (!state.service || !state.date || !state.time || !state.name || !state.email || !state.phone) return;
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: state.service.id,
          date: state.date,
          time: state.time,
          customer_name: state.name,
          email: state.email,
          phone: state.phone,
          country: state.country,
          spanish_level: state.level,
          notes: state.notes,
          duration: state.service.duration_minutes,
        }),
      });
      if (res.status === 409) {
        setState({ ...state, time: "" });
        setStep("time");
        setApiError(lang === "es"
          ? "Ese horario acaba de ser reservado. Por favor elige otro."
          : "That slot was just taken by someone else. Please pick a different time.");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setApiError(data.error || (lang === "es" ? "Algo salió mal. Inténtalo de nuevo." : "Something went wrong. Please try again."));
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setApiError(lang === "es" ? "Algo salió mal. Inténtalo de nuevo." : "Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  // Generate next 14 days
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = addDays(today, i + 1);
    return { date: format(d, "yyyy-MM-dd"), day: format(d, "EEE"), num: format(d, "d"), month: format(d, "MMM"), isWeekend: isWeekend(d) };
  });

  const serviceName = state.service
    ? (lang === "es" ? state.service.name_es : state.service.name)
    : "";

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
        <h2 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontSize: "2rem", fontWeight: 800, color: "var(--color-secondary)", marginBottom: "1rem" }}>
          {tb.successHeading}
        </h2>
        <p style={{ fontSize: "1.1rem", color: "var(--color-muted)", lineHeight: 1.7, maxWidth: "480px", margin: "0 auto" }}>
          {tb.successMsg}
        </p>
        <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--color-bg)", borderRadius: "var(--radius)", maxWidth: "420px", margin: "2rem auto 0", textAlign: "left" }}>
          <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-secondary)", lineHeight: 2 }}>
            <strong>{tb.summary.lesson}:</strong> {serviceName}<br />
            <strong>{tb.summary.date}:</strong> {state.date ? format(parseISO(state.date), "EEEE, MMMM d, yyyy") : ""}<br />
            <strong>{tb.summary.time}:</strong> {state.time} (Los Angeles time)
          </p>
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--color-muted)" }}>
          📧 A confirmation email is being sent to <strong>{state.email}</strong>.<br />
          Please also check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Progress steps */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
        {STEPS.map((s, i) => {
          const isDone = i < stepIndex;
          const isCurrent = s === step;
          return (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "999px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: isDone ? "rgba(217,119,87,0.12)" : isCurrent ? "var(--color-primary)" : "transparent",
                  color: isDone ? "var(--color-primary)" : isCurrent ? "var(--color-white)" : "var(--color-muted)",
                  border: `1.5px solid ${isDone || isCurrent ? "var(--color-primary)" : "var(--color-border)"}`,
                }}
              >
                {isDone ? "✓" : i + 1} {tb.steps[s]}
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: "1.5rem", height: "1.5px", background: i < stepIndex ? "var(--color-primary)" : "var(--color-border)" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step: Service */}
      {step === "service" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {services.map((svc) => {
              const name = lang === "es" ? svc.name_es : svc.name;
              const desc = lang === "es" ? svc.description_es : svc.description;
              const isSelected = state.service?.id === svc.id;
              return (
                <button
                  key={svc.id}
                  onClick={() => {
                    setState({ ...state, service: svc, date: "", time: "" });
                    setStep("date");
                  }}
                  style={{
                    textAlign: "left",
                    padding: "1.5rem",
                    borderRadius: "var(--radius)",
                    border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                    background: isSelected ? "rgba(217,119,87,0.05)" : "var(--color-white)",
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-primary)"; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.borderColor = "var(--color-border)"; }}
                >
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{svc.icon}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-secondary)" }}>{name}</span>
                    <span style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "0.95rem", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
                      {svc.price_usd === 0 ? tb.free : `$${svc.price_usd}`}
                      {svc.price_usd > 0 && <span style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--color-muted)" }}>{tb.perHour}</span>}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--color-muted)" }}>
                    {svc.duration_minutes} {tb.minutes}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step: Date */}
      {step === "date" && (
        <div>
          <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem", textAlign: "center" }}>
            {serviceName} · {state.service?.price_usd === 0 ? tb.free : `$${state.service?.price_usd}${tb.perHour}`} · {state.service?.duration_minutes} {tb.minutes}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem" }}>
            {days.map((d) => {
              const isSelected = state.date === d.date;
              return (
                <button
                  key={d.date}
                  onClick={() => {
                    setState({ ...state, date: d.date, time: "" });
                    setStep("time");
                  }}
                  style={{
                    padding: "0.75rem 0.25rem",
                    borderRadius: "var(--radius)",
                    border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                    background: isSelected ? "var(--color-primary)" : d.isWeekend ? "var(--color-bg)" : "var(--color-white)",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "border-color 0.2s",
                    opacity: d.isWeekend ? 0.5 : 1,
                  }}
                  disabled={d.isWeekend}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 600, color: isSelected ? "rgba(255,255,255,0.8)" : "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {d.day}
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700, color: isSelected ? "var(--color-white)" : "var(--color-secondary)", marginTop: "0.2rem" }}>
                    {d.num}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: isSelected ? "rgba(255,255,255,0.8)" : "var(--color-muted)" }}>{d.month}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step: Time */}
      {step === "time" && (
        <div>
          {apiError && (
            <div style={{ background: "#fff1f0", border: "1px solid #ffccc7", borderRadius: "var(--radius)", padding: "0.75rem 1rem", marginBottom: "1.25rem", color: "#c0392b", fontSize: "0.9rem", textAlign: "center" }}>
              ⚠️ {apiError}
            </div>
          )}
          <p style={{ color: "var(--color-muted)", marginBottom: "1.5rem", textAlign: "center" }}>
            {state.date ? format(parseISO(state.date), "EEEE, MMMM d") : ""} — {serviceName}
          </p>
          {loadingSlots ? (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--color-muted)" }}>Loading available times…</div>
          ) : slots.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <p style={{ color: "var(--color-muted)", marginBottom: "1rem" }}>{tb.noSlots}</p>
              <button className="btn-outline" onClick={() => setStep("date")}>← {tb.backBtn}</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "0.75rem" }}>
              {slots.map((slot) => {
                const isSelected = state.time === slot;
                const hour = parseInt(slot.split(":")[0], 10);
                const ampm = hour >= 12 ? "PM" : "AM";
                const hour12 = hour % 12 || 12;
                const min = slot.split(":")[1];
                return (
                  <button
                    key={slot}
                    onClick={() => { setState({ ...state, time: slot }); setApiError(""); setStep("details"); }}
                    style={{
                      padding: "0.75rem",
                      borderRadius: "var(--radius)",
                      border: `2px solid ${isSelected ? "var(--color-primary)" : "var(--color-border)"}`,
                      background: isSelected ? "var(--color-primary)" : "var(--color-white)",
                      color: isSelected ? "var(--color-white)" : "var(--color-secondary)",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "0.95rem",
                    }}
                  >
                    {hour12}:{min} {ampm}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Step: Details */}
      {step === "details" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "520px", margin: "0 auto" }}>
          {/* Name + Email */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
            <div>
              <label className="form-label">{tb.nameLabel} *</label>
              <input
                className="form-input"
                type="text"
                autoComplete="name"
                required
                value={state.name}
                onChange={(e) => setState({ ...state, name: e.target.value })}
              />
            </div>
            <div>
              <label className="form-label">{tb.emailLabel} *</label>
              <input
                className="form-input"
                type="email"
                autoComplete="email"
                required
                value={state.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
              />
            </div>
          </div>

          {/* Phone (full width) */}
          <div>
            <label className="form-label">{tb.phoneLabel} *</label>
            <input
              className="form-input"
              type="tel"
              autoComplete="tel"
              placeholder={tb.phonePlaceholder}
              required
              value={state.phone}
              onChange={(e) => setState({ ...state, phone: e.target.value })}
            />
          </div>

          {/* Country + Level */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
            <div>
              <label className="form-label">{tb.countryLabel}</label>
              <select
                className="form-input"
                value={state.country}
                onChange={(e) => setState({ ...state, country: e.target.value })}
              >
                <option value="">— Select —</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">{tb.levelLabel}</label>
              <select
                className="form-input"
                value={state.level}
                onChange={(e) => setState({ ...state, level: e.target.value })}
              >
                <option value="">— Select —</option>
                {tb.levels.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">{tb.notesLabel}</label>
            <textarea
              className="form-input"
              rows={3}
              value={state.notes}
              onChange={(e) => setState({ ...state, notes: e.target.value })}
              style={{ resize: "vertical" }}
            />
          </div>

          <button
            className="btn-primary"
            disabled={!state.name || !state.email || !state.phone}
            onClick={() => setStep("confirm")}
          >
            {tb.nextBtn} →
          </button>
        </div>
      )}

      {/* Step: Confirm */}
      {step === "confirm" && (
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "1.75rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontWeight: 700, fontSize: "1.15rem", color: "var(--color-secondary)", marginBottom: "1.25rem" }}>
              Booking Summary
            </h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  [tb.summary.lesson, serviceName],
                  [tb.summary.date, state.date ? format(parseISO(state.date), "EEEE, MMMM d, yyyy") : ""],
                  [tb.summary.time, `${state.time} (Los Angeles time)`],
                  [tb.summary.name, state.name],
                  [tb.summary.email, state.email],
                  [tb.summary.phone, state.phone],
                  ...(state.country ? [[tb.summary.country, state.country]] : []),
                  ...(state.level ? [[tb.summary.level, state.level]] : []),
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ padding: "0.5rem 0", fontWeight: 600, fontSize: "0.875rem", color: "var(--color-muted)", width: "90px", verticalAlign: "top" }}>
                      {label}
                    </td>
                    <td style={{ padding: "0.5rem 0 0.5rem 1rem", fontSize: "0.95rem", color: "var(--color-secondary)", borderBottom: "1px solid var(--color-border)" }}>
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {status === "error" && (
            <div style={{ background: "#fff1f0", border: "1px solid #ffccc7", borderRadius: "var(--radius)", padding: "0.75rem 1rem", marginBottom: "1rem", color: "#c0392b", fontSize: "0.9rem", textAlign: "center" }}>
              ⚠️ {apiError || tb.errorMsg}
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? "Confirming…" : tb.confirmBtn}
          </button>
        </div>
      )}

      {/* Back button */}
      {canGoBack && step !== "service" && (
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button
            onClick={goBack}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-muted)",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 500,
              textDecoration: "underline",
            }}
          >
            ← {tb.backBtn}
          </button>
        </div>
      )}
    </div>
  );
}
