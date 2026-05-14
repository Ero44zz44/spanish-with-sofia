import BookingWidget from "@/components/booking/BookingWidget";
import { TUTOR } from "@/lib/config";
import type { Metadata } from "next";

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
            Book a Lesson with Sofía 🇲🇽
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
            { icon: "🔒", text: "No payment required to book" },
            { icon: "🔄", text: "Free cancellation 24h before" },
            { icon: "✉️", text: "Confirmation sent to your email" },
          ].map((item) => (
            <div key={item.icon} className="reassurance-card">
              <div style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>{item.icon}</div>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
