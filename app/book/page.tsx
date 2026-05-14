import BookingWidget from "@/components/booking/BookingWidget";
import { TUTOR } from "@/lib/config";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Book a Lesson — Spanish with ${TUTOR.name}`,
  description: "Book your personalized Spanish lesson with Sofía Martínez. Free 30-minute trial available.",
};

export default function BookPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", paddingTop: "2rem", paddingBottom: "5rem" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Page header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>Online Booking</div>
          <h1
            style={{
              fontFamily: "var(--font-fraunces, var(--font-serif))",
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--color-secondary)",
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Book a Lesson with Sofía
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--color-muted)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
            Choose your lesson type and pick a time that works for you. All times shown in Los Angeles time (GMT-8).
          </p>
        </div>

        {/* Widget card */}
        <div
          style={{
            background: "var(--color-white)",
            borderRadius: "1.25rem",
            boxShadow: "var(--shadow-lg)",
            padding: "clamp(1.5rem, 4vw, 2.5rem)",
          }}
        >
          <BookingWidget />
        </div>

        {/* Reassurance row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
          id="reassurance-grid"
        >
          {[
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              label: "No payment required to book",
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
              label: "Free cancellation 24h before",
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
              label: "Confirmation sent to your email",
            },
          ].map((item, i) => (
            <div key={i} className="reassurance-card">
              <div style={{ marginBottom: "0.5rem" }}>{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
