import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { format, parseISO, addMinutes } from "date-fns";
import { sendCustomerConfirmation, sendTutorNotification } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    service_id, date, time, customer_name, email, phone,
    country, spanish_level, notes, duration,
  } = body;

  if (!service_id || !date || !time || !customer_name || !email || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createClient();

  const parsedDate = parseISO(date);
  const tzOffset = getLAOffset(parsedDate);
  const offsetStr = tzOffset === 7 ? "-07:00" : "-08:00";

  const startTime = new Date(`${date}T${time}:00${offsetStr}`);
  const endTime = addMinutes(startTime, duration ?? 60);

  // Check for conflicts
  const { data: conflicts } = await supabase
    .from("bookings")
    .select("id")
    .lt("start_time", endTime.toISOString())
    .gt("end_time", startTime.toISOString())
    .neq("status", "cancelled");

  if (conflicts && conflicts.length > 0) {
    return NextResponse.json({ error: "This slot is no longer available" }, { status: 409 });
  }

  // Get service details
  const { data: service } = await supabase
    .from("services")
    .select("name, price_usd")
    .eq("id", service_id)
    .single();

  // Create booking
  const { data: booking, error } = await supabase
    .from("bookings")
    .insert({
      service_id,
      customer_name,
      email,
      phone,
      country: country || null,
      spanish_level: spanish_level || null,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      status: "confirmed",
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Booking insert error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }

  const dateLabel = format(startTime, "EEEE, MMMM d, yyyy");
  const timeLabel = format(startTime, "h:mm a") + " (Los Angeles time)";
  const serviceName = service?.name ?? "Lesson";
  const price = service?.price_usd === 0 ? "Free" : `$${service?.price_usd}`;

  // Customer confirmation — separate try-catch
  try {
    const result = await sendCustomerConfirmation({
      to: email,
      customer_name,
      serviceName,
      dateLabel,
      timeLabel,
      price,
    });
    if (result.error) {
      console.error("Customer email error:", JSON.stringify(result.error));
    } else {
      console.log("Customer email sent, id:", result.data?.id);
    }
  } catch (e) {
    console.error("Customer email exception:", e);
  }

  // Tutor notification — separate try-catch
  try {
    const result = await sendTutorNotification({
      customer_name,
      email,
      phone,
      country,
      spanish_level,
      serviceName,
      dateLabel,
      timeLabel,
      notes,
    });
    if (result.error) {
      console.error("Tutor email error:", JSON.stringify(result.error));
    } else {
      console.log("Tutor email sent, id:", result.data?.id);
    }
  } catch (e) {
    console.error("Tutor email exception:", e);
  }

  return NextResponse.json({ ok: true, booking_id: booking.id });
}

function getLAOffset(date: Date): number {
  const year = date.getFullYear();
  const dstStart = getNthSundayOfMonth(year, 3, 2);
  const dstEnd = getNthSundayOfMonth(year, 11, 1);
  return date >= dstStart && date < dstEnd ? 7 : 8;
}

function getNthSundayOfMonth(year: number, month: number, n: number): Date {
  const firstDay = new Date(year, month - 1, 1);
  const firstSunday = new Date(firstDay);
  firstSunday.setDate(1 + ((7 - firstDay.getDay()) % 7));
  firstSunday.setDate(firstSunday.getDate() + (n - 1) * 7);
  return firstSunday;
}
