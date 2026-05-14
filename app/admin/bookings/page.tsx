"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format, isToday, isTomorrow } from "date-fns";

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  spanish_level: string | null;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  services: { name: string } | null;
}

type Tab = "all" | "upcoming" | "cancelled";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  confirmed: { bg: "#d1fae5", color: "#065f46" },
  pending: { bg: "#fef3c7", color: "#92400e" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

export default function AdminBookings() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("upcoming");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("bookings")
      .select("*, services(name)")
      .order("start_time", { ascending: false });
    setBookings(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  const now = new Date();
  const filtered = bookings.filter((b) => {
    if (tab === "upcoming") return new Date(b.start_time) >= now && b.status !== "cancelled";
    if (tab === "cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "1.5rem" }}>
        All Bookings
      </h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0" }}>
        {(["upcoming", "all", "cancelled"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: "0.6rem 1.25rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              background: "transparent",
              border: "none",
              borderBottom: tab === t ? "2px solid var(--color-primary)" : "2px solid transparent",
              color: tab === t ? "var(--color-primary)" : "var(--color-muted)",
              cursor: "pointer",
              textTransform: "capitalize",
              marginBottom: "-1px",
              transition: "color 0.15s",
              fontFamily: "var(--font-sans)",
            }}
          >
            {t}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: "0.8rem", color: "var(--color-muted)", alignSelf: "center", paddingBottom: "4px" }}>
          {filtered.length} booking{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-muted)" }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-muted)" }}>No bookings found.</div>
      ) : (
        <div style={{ background: "var(--color-white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
          {filtered.map((b, i) => {
            const start = new Date(b.start_time);
            const isOpen = expanded === b.id;
            const dateLabel = isToday(start) ? "Today" : isTomorrow(start) ? "Tomorrow" : format(start, "EEE, MMM d, yyyy");
            const timeLabel = format(start, "h:mm a");
            const s = STATUS_STYLE[b.status] ?? { bg: "#f3f4f6", color: "#6b7280" };

            return (
              <div
                key={b.id}
                style={{
                  borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                }}
              >
                {/* Row */}
                <div
                  onClick={() => setExpanded(isOpen ? null : b.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr auto",
                    gap: "0.5rem",
                    padding: "0.9rem 1.25rem",
                    cursor: "pointer",
                    background: isOpen ? "rgba(217,119,87,0.04)" : "transparent",
                    transition: "background 0.15s",
                    alignItems: "center",
                  }}
                >
                  {/* Date/time */}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-secondary)" }}>{dateLabel}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>{timeLabel}</div>
                  </div>

                  {/* Student */}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-secondary)" }}>{b.customer_name}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>{b.email}</div>
                  </div>

                  {/* Service */}
                  <div style={{ fontSize: "0.875rem", color: "var(--color-secondary)" }}>
                    {b.services?.name ?? "—"}
                  </div>

                  {/* Status */}
                  <span style={{
                    display: "inline-block",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: s.bg,
                    color: s.color,
                    whiteSpace: "nowrap",
                  }}>
                    {b.status}
                  </span>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.25rem 1.25rem",
                      background: "rgba(217,119,87,0.04)",
                      borderTop: "1px solid rgba(217,119,87,0.1)",
                    }}
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                      {[
                        { label: "Phone", value: b.phone ?? "—" },
                        { label: "Country", value: b.country ?? "—" },
                        { label: "Spanish level", value: b.spanish_level ?? "—" },
                        { label: "Booked on", value: format(new Date(b.created_at), "MMM d, yyyy") },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-muted)", marginBottom: "0.2rem" }}>{label}</div>
                          <div style={{ fontSize: "0.875rem", color: "var(--color-secondary)" }}>{value}</div>
                        </div>
                      ))}
                      {b.notes && (
                        <div>
                          <div style={{ fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--color-muted)", marginBottom: "0.2rem" }}>Notes</div>
                          <div style={{ fontSize: "0.875rem", color: "var(--color-secondary)" }}>{b.notes}</div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      <a
                        href={`mailto:${b.email}`}
                        style={{
                          padding: "0.4rem 0.85rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          background: "rgba(217,119,87,0.1)",
                          color: "var(--color-primary)",
                          border: "1px solid rgba(217,119,87,0.2)",
                          borderRadius: "0.375rem",
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        ✉ Email student
                      </a>
                      {b.status !== "confirmed" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); updateStatus(b.id, "confirmed"); }}
                          style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", fontWeight: 600, background: "#d1fae5", color: "#065f46", border: "none", borderRadius: "0.375rem", cursor: "pointer" }}
                        >
                          ✓ Confirm
                        </button>
                      )}
                      {b.status !== "cancelled" && (
                        <button
                          onClick={(e) => { e.stopPropagation(); updateStatus(b.id, "cancelled"); }}
                          style={{ padding: "0.4rem 0.85rem", fontSize: "0.8rem", fontWeight: 600, background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "0.375rem", cursor: "pointer" }}
                        >
                          ✕ Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
