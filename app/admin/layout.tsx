"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin/dashboard", label: "📅 Dashboard" },
  { href: "/admin/bookings", label: "📋 Bookings" },
  { href: "/admin/calendar", label: "🗓 Calendar" },
  { href: "/admin/services", label: "🎓 Services" },
  { href: "/admin/settings", label: "⚙️ Settings" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  if (pathname === "/admin/login") return <>{children}</>;

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          background: "var(--color-secondary)",
          color: "rgba(255,255,255,0.9)",
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 0",
        }}
      >
        <div style={{ padding: "0 1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ fontSize: "1rem" }}>🇲🇽</div>
          <div style={{ fontFamily: "var(--font-fraunces, var(--font-serif))", fontWeight: 700, fontSize: "0.95rem", color: "var(--color-white)", marginTop: "0.25rem" }}>
            Sofía Martínez
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: "0.15rem" }}>Admin Panel</div>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {NAV.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "0.65rem 1.25rem",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: isActive ? "var(--color-white)" : "rgba(255,255,255,0.6)",
                  background: isActive ? "rgba(217,119,87,0.25)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--color-primary)" : "3px solid transparent",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Link href="/" style={{ display: "block", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: "0.5rem" }}>
            ← View site
          </Link>
          <button
            onClick={signOut}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: "0.8rem",
              padding: 0,
              textDecoration: "underline",
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}
