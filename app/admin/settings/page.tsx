"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface WorkingHour {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AdminSettings() {
  const supabase = createClient();
  const [hours, setHours] = useState<WorkingHour[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function load() {
    const { data } = await supabase.from("working_hours").select("*").order("day_of_week");
    setHours(data ?? []);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  function update(dayOfWeek: number, field: keyof WorkingHour, value: string | boolean) {
    setHours((prev) =>
      prev.map((h) => h.day_of_week === dayOfWeek ? { ...h, [field]: value } : h)
    );
  }

  function getHour(dow: number) {
    return hours.find((h) => h.day_of_week === dow);
  }

  async function saveAll() {
    setSaving(true);
    for (const h of hours) {
      await supabase.from("working_hours").upsert({
        id: h.id,
        day_of_week: h.day_of_week,
        start_time: h.start_time,
        end_time: h.end_time,
        is_active: h.is_active,
      });
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "700px" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "1.5rem" }}>
        Settings
      </h1>

      <div style={{ background: "var(--color-white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", padding: "1.5rem", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-secondary)", marginBottom: "1.25rem" }}>
          Working Hours (Los Angeles time)
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {DAYS.map((dayName, dow) => {
            const h = getHour(dow);
            const isActive = h?.is_active ?? false;
            return (
              <div key={dow} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto auto", gap: "1rem", alignItems: "center" }}>
                <label style={{ fontWeight: 500, fontSize: "0.9rem", color: isActive ? "var(--color-secondary)" : "var(--color-muted)" }}>
                  {dayName}
                </label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input
                    type="time"
                    disabled={!isActive}
                    value={h?.start_time?.slice(0, 5) ?? "09:00"}
                    onChange={(e) => update(dow, "start_time", e.target.value + ":00")}
                    style={{ padding: "0.35rem 0.5rem", border: "1px solid var(--color-border)", borderRadius: "0.375rem", fontSize: "0.9rem", opacity: isActive ? 1 : 0.4 }}
                  />
                  <span style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>to</span>
                  <input
                    type="time"
                    disabled={!isActive}
                    value={h?.end_time?.slice(0, 5) ?? "18:00"}
                    onChange={(e) => update(dow, "end_time", e.target.value + ":00")}
                    style={{ padding: "0.35rem 0.5rem", border: "1px solid var(--color-border)", borderRadius: "0.375rem", fontSize: "0.9rem", opacity: isActive ? 1 : 0.4 }}
                  />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem", color: "var(--color-muted)" }}>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => {
                      if (h) {
                        update(dow, "is_active", e.target.checked);
                      } else {
                        setHours((prev) => [...prev, {
                          id: `new-${dow}`,
                          day_of_week: dow,
                          start_time: "09:00:00",
                          end_time: "18:00:00",
                          is_active: e.target.checked,
                        }]);
                      }
                    }}
                  />
                  On
                </label>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            onClick={saveAll}
            disabled={saving}
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", fontSize: "0.9rem" }}
          >
            {saving ? "Saving…" : "Save Working Hours"}
          </button>
          {saved && <span style={{ color: "#10b981", fontSize: "0.875rem", fontWeight: 600 }}>✓ Saved!</span>}
        </div>
      </div>

      <div style={{ background: "var(--color-white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", padding: "1.5rem" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-secondary)", marginBottom: "0.75rem" }}>
          Contact Info
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--color-muted)", lineHeight: 1.6 }}>
          To update contact details, edit <code style={{ background: "#F9FAFB", padding: "0.1rem 0.3rem", borderRadius: "0.25rem", fontFamily: "monospace" }}>lib/config.ts</code> in the codebase.
        </p>
      </div>
    </div>
  );
}
