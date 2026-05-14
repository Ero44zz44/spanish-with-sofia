"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Service {
  id: string;
  name: string;
  name_es: string;
  price_usd: number;
  duration_minutes: number;
  icon: string;
  is_active: boolean;
  sort_order: number;
}

export default function AdminServices() {
  const supabase = createClient();
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Record<string, Partial<Service>>>({});
  const [saving, setSaving] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data ?? []);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  function edit(id: string, field: keyof Service, value: string | number | boolean) {
    setEditing((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  }

  async function save(svc: Service) {
    const patch = editing[svc.id];
    if (!patch) return;
    setSaving(svc.id);
    await supabase.from("services").update(patch).eq("id", svc.id);
    setSaving(null);
    setEditing((prev) => { const n = { ...prev }; delete n[svc.id]; return n; });
    load();
  }

  async function toggleActive(svc: Service) {
    await supabase.from("services").update({ is_active: !svc.is_active }).eq("id", svc.id);
    load();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontSize: "1.75rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "1.5rem" }}>
        Services
      </h1>

      <div style={{ background: "var(--color-white)", borderRadius: "var(--radius)", boxShadow: "var(--shadow-sm)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["", "Service Name", "ES Name", "Price", "Duration", "Active", ""].map((h, i) => (
                <th key={i} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((svc) => {
              const patch = editing[svc.id] ?? {};
              const isDirty = Object.keys(patch).length > 0;
              return (
                <tr key={svc.id} style={{ borderTop: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "0.75rem 1rem", fontSize: "1.25rem" }}>{svc.icon}</td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <input
                      style={{ border: "1px solid var(--color-border)", borderRadius: "0.375rem", padding: "0.35rem 0.6rem", fontSize: "0.9rem", width: "100%", color: "var(--color-secondary)" }}
                      value={(patch.name ?? svc.name) as string}
                      onChange={(e) => edit(svc.id, "name", e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <input
                      style={{ border: "1px solid var(--color-border)", borderRadius: "0.375rem", padding: "0.35rem 0.6rem", fontSize: "0.9rem", width: "100%", color: "var(--color-secondary)" }}
                      value={(patch.name_es ?? svc.name_es) as string}
                      onChange={(e) => edit(svc.id, "name_es", e.target.value)}
                    />
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <span style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>$</span>
                      <input
                        type="number"
                        style={{ border: "1px solid var(--color-border)", borderRadius: "0.375rem", padding: "0.35rem 0.6rem", fontSize: "0.9rem", width: "70px", color: "var(--color-secondary)" }}
                        value={(patch.price_usd ?? svc.price_usd) as number}
                        onChange={(e) => edit(svc.id, "price_usd", parseFloat(e.target.value))}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 0.5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <input
                        type="number"
                        style={{ border: "1px solid var(--color-border)", borderRadius: "0.375rem", padding: "0.35rem 0.6rem", fontSize: "0.9rem", width: "70px", color: "var(--color-secondary)" }}
                        value={(patch.duration_minutes ?? svc.duration_minutes) as number}
                        onChange={(e) => edit(svc.id, "duration_minutes", parseInt(e.target.value, 10))}
                      />
                      <span style={{ color: "var(--color-muted)", fontSize: "0.8rem" }}>min</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <button
                      onClick={() => toggleActive(svc)}
                      style={{
                        padding: "0.2rem 0.65rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        border: "none",
                        cursor: "pointer",
                        background: svc.is_active ? "#d1fae5" : "#fee2e2",
                        color: svc.is_active ? "#065f46" : "#991b1b",
                      }}
                    >
                      {svc.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    {isDirty && (
                      <button
                        onClick={() => save(svc)}
                        disabled={saving === svc.id}
                        style={{
                          padding: "0.35rem 0.85rem",
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          background: "var(--color-primary)",
                          color: "var(--color-white)",
                          border: "none",
                          borderRadius: "0.375rem",
                          cursor: "pointer",
                        }}
                      >
                        {saving === svc.id ? "Saving…" : "Save"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
