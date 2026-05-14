"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from "date-fns";

interface Booking {
  id: string;
  customer_name: string;
  email: string;
  start_time: string;
  end_time: string;
  status: string;
  services: { name: string } | null;
}

interface BlockedSlot {
  id: string;
  start_time: string;
  end_time: string;
  reason: string | null;
}

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8); // 8am–6pm

function getLocalHour(dateStr: string): number {
  const d = new Date(dateStr);
  const localStr = d.toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "numeric",
    hour12: false,
  });
  const h = parseInt(localStr, 10);
  return h === 24 ? 0 : h;
}

function getLocalDay(dateStr: string): Date {
  const d = new Date(dateStr);
  const localStr = d.toLocaleString("en-CA", { timeZone: "America/Los_Angeles" });
  return new Date(localStr.split(",")[0]);
}

function getLocalOffsetStr(date: Date): string {
  const year = date.getFullYear();
  const marchFirst = new Date(year, 2, 1);
  const dstStart = new Date(marchFirst);
  dstStart.setDate(1 + ((7 - marchFirst.getDay()) % 7) + 7);
  const novFirst = new Date(year, 10, 1);
  const dstEnd = new Date(novFirst);
  dstEnd.setDate(1 + ((7 - novFirst.getDay()) % 7));
  return date >= dstStart && date < dstEnd ? "-07:00" : "-08:00";
}

export default function AdminCalendar() {
  const supabase = createClient();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blocked, setBlocked] = useState<BlockedSlot[]>([]);
  const [loading, setLoading] = useState(true);

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  async function load() {
    setLoading(true);
    const start = weekStart.toISOString();
    const end = addDays(weekStart, 7).toISOString();

    const [{ data: b }, { data: bl }] = await Promise.all([
      supabase
        .from("bookings")
        .select("*, services(name)")
        .gte("start_time", start)
        .lt("start_time", end)
        .neq("status", "cancelled"),
      supabase
        .from("blocked_slots")
        .select("*")
        .gte("start_time", start)
        .lt("start_time", end),
    ]);
    setBookings(b ?? []);
    setBlocked(bl ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, [weekStart]);

  function getBookingsInSlot(day: Date, hour: number): Booking[] {
    return bookings.filter((b) => {
      return isSameDay(getLocalDay(b.start_time), day) &&
        getLocalHour(b.start_time) === hour;
    });
  }

  function getBlockInSlot(day: Date, hour: number): BlockedSlot | undefined {
    return blocked.find((bl) => {
      const blDay = getLocalDay(bl.start_time);
      const blStart = getLocalHour(bl.start_time);
      const blEnd = getLocalHour(bl.end_time);
      return isSameDay(blDay, day) && blStart <= hour && hour < (blEnd === 0 ? 24 : blEnd);
    });
  }

  function isDayBlocked(day: Date): boolean {
    return blocked.some((bl) => isSameDay(getLocalDay(bl.start_time), day));
  }

  async function blockSlot(day: Date, hour: number) {
    const dateStr = format(day, "yyyy-MM-dd");
    const tz = getLocalOffsetStr(day);
    const hStr = String(hour).padStart(2, "0");
    const h2Str = String(hour + 1).padStart(2, "0");
    const start = new Date(`${dateStr}T${hStr}:00:00${tz}`);
    const end = new Date(`${dateStr}T${h2Str}:00:00${tz}`);
    await supabase.from("blocked_slots").insert({
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      reason: null,
    });
    load();
  }

  async function unblockSlot(id: string) {
    await supabase.from("blocked_slots").delete().eq("id", id);
    load();
  }

  async function blockDay(day: Date) {
    const reason = prompt("Reason for blocking this day? (optional — press OK to skip)");
    if (reason === null) return;
    const dateStr = format(day, "yyyy-MM-dd");
    const tz = getLocalOffsetStr(day);
    const start = new Date(`${dateStr}T09:00:00${tz}`);
    const end = new Date(`${dateStr}T18:00:00${tz}`);
    await supabase.from("blocked_slots").insert({
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      reason: reason || null,
    });
    load();
  }

  async function unblockDay(day: Date) {
    const dateStr = format(day, "yyyy-MM-dd");
    const tz = getLocalOffsetStr(day);
    const start = new Date(`${dateStr}T00:00:00${tz}`);
    const end = new Date(`${dateStr}T23:59:59${tz}`);
    await supabase
      .from("blocked_slots")
      .delete()
      .gte("start_time", start.toISOString())
      .lte("start_time", end.toISOString());
    load();
  }

  return (
    <div style={{ padding: "2rem" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <h1 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-secondary)", margin: 0 }}>
          Calendar
        </h1>
        <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto", alignItems: "center" }}>
          <button onClick={() => setWeekStart(subWeeks(weekStart, 1))} className="btn-outline" style={{ padding: "0.4rem 0.85rem", fontSize: "0.85rem" }}>← Prev</button>
          <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--color-secondary)", minWidth: "160px", textAlign: "center" }}>
            {format(weekStart, "MMM d")} – {format(addDays(weekStart, 6), "MMM d, yyyy")}
          </span>
          <button onClick={() => setWeekStart(addWeeks(weekStart, 1))} className="btn-outline" style={{ padding: "0.4rem 0.85rem", fontSize: "0.85rem" }}>Next →</button>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem", fontSize: "0.78rem", fontWeight: 500, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "2px", background: "rgba(217,119,87,0.3)", borderLeft: "3px solid var(--color-primary)", display: "inline-block" }} />
          Booked
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "2px", background: "rgba(239,68,68,0.2)", borderLeft: "3px solid #ef4444", display: "inline-block" }} />
          Blocked slot
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-muted)" }}>
          Click empty cell to block it · Click blocked cell to unblock
        </span>
      </div>

      <div style={{ background: "var(--color-white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "var(--color-muted)" }}>Loading calendar…</div>
        ) : (
          <>
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "54px repeat(7, 1fr)", borderBottom: "2px solid var(--color-border)", minWidth: "600px" }}>
              <div style={{ borderRight: "1px solid var(--color-border)" }} />
              {days.map((day) => {
                const isToday = isSameDay(day, new Date());
                const dayBlocked = isDayBlocked(day);
                return (
                  <div
                    key={day.toISOString()}
                    style={{
                      padding: "0.6rem 0.4rem",
                      textAlign: "center",
                      borderLeft: "1px solid var(--color-border)",
                      background: dayBlocked
                        ? "rgba(239,68,68,0.06)"
                        : isToday
                        ? "rgba(217,119,87,0.06)"
                        : "transparent",
                    }}
                  >
                    <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {format(day, "EEE")}
                    </div>
                    <div style={{
                      fontSize: "1rem",
                      fontWeight: isToday ? 700 : 400,
                      color: isToday ? "var(--color-primary)" : "var(--color-secondary)",
                      marginTop: "0.1rem",
                    }}>
                      {format(day, "d")}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time grid */}
            <div style={{ minWidth: "600px" }}>
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "54px repeat(7, 1fr)",
                    borderBottom: "1px solid var(--color-border)",
                    minHeight: "52px",
                  }}
                >
                  <div style={{
                    padding: "0 6px",
                    fontSize: "0.68rem",
                    color: "var(--color-muted)",
                    textAlign: "right",
                    paddingTop: "4px",
                    borderRight: "1px solid var(--color-border)",
                    whiteSpace: "nowrap",
                  }}>
                    {hour % 12 || 12}{hour < 12 ? "am" : "pm"}
                  </div>

                  {days.map((day) => {
                    const slotBookings = getBookingsInSlot(day, hour);
                    const block = getBlockInSlot(day, hour);
                    const isEmpty = slotBookings.length === 0 && !block;

                    return (
                      <div
                        key={day.toISOString()}
                        className={isEmpty ? "cal-cell-empty" : undefined}
                        onClick={() => {
                          if (isEmpty) blockSlot(day, hour);
                        }}
                        style={{
                          borderLeft: "1px solid var(--color-border)",
                          padding: "2px 3px",
                          background: block ? "rgba(239,68,68,0.06)" : "transparent",
                          position: "relative",
                        }}
                      >
                        {/* Customer booking */}
                        {slotBookings.map((b) => (
                          <div
                            key={b.id}
                            title={`${b.customer_name} (${b.email}) — ${b.services?.name ?? "Lesson"}`}
                            style={{
                              background: "rgba(217,119,87,0.18)",
                              borderLeft: "3px solid var(--color-primary)",
                              borderRadius: "3px",
                              padding: "3px 5px",
                              fontSize: "0.68rem",
                              color: "var(--color-secondary)",
                              fontWeight: 600,
                              lineHeight: 1.3,
                              overflow: "hidden",
                              cursor: "default",
                            }}
                          >
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {b.customer_name}
                            </div>
                            <div style={{ color: "var(--color-muted)", fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {b.services?.name ?? "Lesson"}
                            </div>
                          </div>
                        ))}

                        {/* Blocked slot */}
                        {block && (
                          <div
                            onClick={(e) => { e.stopPropagation(); unblockSlot(block.id); }}
                            title="Click to unblock this slot"
                            style={{
                              background: "rgba(239,68,68,0.15)",
                              borderLeft: "3px solid #ef4444",
                              borderRadius: "3px",
                              padding: "3px 5px",
                              fontSize: "0.68rem",
                              color: "#b91c1c",
                              fontWeight: 600,
                              lineHeight: 1.3,
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "2px",
                            }}
                          >
                            <span>Blocked</span>
                            <span style={{ fontSize: "0.75rem", lineHeight: 1 }}>×</span>
                          </div>
                        )}

                        {/* Hover hint on empty cells */}
                        {isEmpty && (
                          <div className="cal-block-hint">+ block</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Block / Unblock whole day controls */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "54px repeat(7, 1fr)",
              borderTop: "2px solid var(--color-border)",
              background: "#F9FAFB",
              minWidth: "600px",
            }}>
              <div style={{ padding: "0.5rem 6px", fontSize: "0.65rem", color: "var(--color-muted)", textAlign: "right", borderRight: "1px solid var(--color-border)" }}>
                Day
              </div>
              {days.map((day) => {
                const dayBlocked = isDayBlocked(day);
                return (
                  <div key={day.toISOString()} style={{ borderLeft: "1px solid var(--color-border)", padding: "0.35rem 3px", textAlign: "center" }}>
                    {dayBlocked ? (
                      <button
                        onClick={() => unblockDay(day)}
                        style={{
                          fontSize: "0.65rem",
                          padding: "0.2rem 0.4rem",
                          background: "#fee2e2",
                          color: "#b91c1c",
                          border: "1px solid #fca5a5",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Unblock all
                      </button>
                    ) : (
                      <button
                        onClick={() => blockDay(day)}
                        style={{
                          fontSize: "0.65rem",
                          padding: "0.2rem 0.4rem",
                          background: "transparent",
                          border: "1px dashed var(--color-border)",
                          borderRadius: "0.25rem",
                          cursor: "pointer",
                          color: "var(--color-muted)",
                        }}
                      >
                        Block day
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
