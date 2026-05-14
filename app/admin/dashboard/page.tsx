"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format, isToday, isTomorrow, addDays, startOfDay, endOfDay } from "date-fns";

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  country: string | null;
  spanish_level: string | null;
  start_time: string;
  end_time: string;
  status: string;
  notes: string | null;
  services: { name: string } | null;
}

export default function AdminDashboard() {
  const supabase = createClient();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    const { data } = await supabase
      .from("bookings")
      .select("*, services(name)")
      .gte("start_time", new Date().toISOString())
      .order("start_time", { ascending: true })
      .limit(50);
    setBookings(data ?? []);
    setLoading(false);
  }

  useEffect(() => { loadBookings(); }, []);

  async function updateStatus(id: string, status: string) {
    await supabase.from("bookings").update({ status }).eq("id", id);
    loadBookings();
  }

  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const tomorrowStart = startOfDay(addDays(now, 1));
  const tomorrowEnd = endOfDay(addDays(now, 1));
  const weekEnd = endOfDay(addDays(now, 7));

  const todayCount = bookings.filter((b) => {
    const d = new Date(b.start_time);
    return d >= todayStart && d <= todayEnd && b.status !== "cancelled";
  }).length;
  const tomorrowCount = bookings.filter((b) => {
    const d = new Date(b.start_time);
    return d >= tomorrowStart && d <= tomorrowEnd && b.status !== "cancelled";
  }).length;
  const weekCount = bookings.filter((b) => {
    const d = new Date(b.start_time);
    return d <= weekEnd && b.status !== "cancelled";
  }).length;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "1.75rem" }}>
        Dashboard
      </h1>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { label: "Today", value: todayCount, color: "var(--color-primary)" },
          { label: "Tomorrow", value: tomorrowCount, color: "var(--color-accent)" },
          { label: "This Week", value: weekCount, color: "#6366f1" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: "var(--color-white)",
              borderRadius: "var(--radius)",
              padding: "1.25rem 1.5rem",
              boxShadow: "var(--shadow-sm)",
              borderLeft: `4px solid ${stat.color}`,
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "0.875rem", color: "var(--color-muted)", fontWeight: 500, marginTop: "0.15rem" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming bookings */}
      <div style={{ background: "var(--color-white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid var(--color-border)" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-secondary)", margin: 0 }}>
            Upcoming Lessons
          </h2>
        </div>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-muted)" }}>Loading…</div>
        ) : bookings.length === 0 ? (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-muted)" }}>No upcoming lessons.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F9FAFB" }}>
                {["Date & Time", "Student", "Lesson", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => {
                const start = new Date(b.start_time);
                const dateLabel = isToday(start) ? "Today" : isTomorrow(start) ? "Tomorrow" : format(start, "MMM d");
                const timeLabel = format(start, "h:mm a");
                const statusColor: Record<string, string> = {
                  confirmed: "#10b981",
                  pending: "#f59e0b",
                  cancelled: "#ef4444",
                };
                return (
                  <tr key={b.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.875rem", color: "var(--color-secondary)", whiteSpace: "nowrap" }}>
                      <div style={{ fontWeight: 600 }}>{dateLabel}</div>
                      <div style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}>{timeLabel}</div>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.875rem" }}>
                      <div style={{ fontWeight: 600, color: "var(--color-secondary)" }}>{b.customer_name}</div>
                      <div style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}>{b.email}</div>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", fontSize: "0.875rem", color: "var(--color-secondary)" }}>
                      {b.services?.name ?? "—"}
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <span style={{
                        display: "inline-block",
                        padding: "0.2rem 0.65rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        background: `${statusColor[b.status] ?? "#6b7280"}20`,
                        color: statusColor[b.status] ?? "#6b7280",
                      }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {b.status !== "confirmed" && (
                          <button
                            onClick={() => updateStatus(b.id, "confirmed")}
                            style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem", fontWeight: 600, background: "#d1fae5", color: "#065f46", border: "none", borderRadius: "0.375rem", cursor: "pointer" }}
                          >
                            Confirm
                          </button>
                        )}
                        {b.status !== "cancelled" && (
                          <button
                            onClick={() => updateStatus(b.id, "cancelled")}
                            style={{ padding: "0.3rem 0.65rem", fontSize: "0.75rem", fontWeight: 600, background: "#fee2e2", color: "#991b1b", border: "none", borderRadius: "0.375rem", cursor: "pointer" }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
