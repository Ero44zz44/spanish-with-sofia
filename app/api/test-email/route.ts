import { NextResponse } from "next/server";
import { sendCustomerConfirmation, sendTutorNotification } from "@/lib/email";

export async function GET() {
  const testEmail = process.env.TUTOR_NOTIFY_EMAIL ?? "plusemotional@gmail.com";

  const customerResult = await sendCustomerConfirmation({
    to: testEmail,
    customer_name: "Test Student",
    serviceName: "Trial Lesson",
    dateLabel: "Wednesday, May 14, 2026",
    timeLabel: "11:00 AM",
    price: "Free",
  });

  const tutorResult = await sendTutorNotification({
    customer_name: "Test Student",
    email: "teststudent@example.com",
    phone: "+1 555 000 0000",
    country: "United States",
    spanish_level: "Beginner",
    serviceName: "Trial Lesson",
    dateLabel: "Wednesday, May 14, 2026",
    timeLabel: "11:00 AM",
    notes: "This is a test booking notification.",
  });

  return NextResponse.json({
    customer: customerResult.error ? { error: customerResult.error } : { id: customerResult.data?.id },
    tutor: tutorResult.error ? { error: tutorResult.error } : { id: tutorResult.data?.id },
  });
}
