import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { addMinutes, parseISO, startOfDay, endOfDay } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");
  const serviceDuration = parseInt(searchParams.get("duration") ?? "60", 10);

  if (!dateStr) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const supabase = createClient();

  // Parse date and build day-of-week (0=Sun)
  const date = parseISO(dateStr);
  const dayOfWeek = date.getDay();

  // Get working hours for this day
  const { data: wh } = await supabase
    .from("working_hours")
    .select("*")
    .eq("day_of_week", dayOfWeek)
    .eq("is_active", true)
    .single();

  if (!wh) {
    return NextResponse.json({ slots: [] });
  }

  const tzOffset = getLAOffset(date);

  const startHour = parseInt(wh.start_time.slice(0, 2), 10);
  const startMin = parseInt(wh.start_time.slice(3, 5), 10);
  const endHour = parseInt(wh.end_time.slice(0, 2), 10);
  const endMin = parseInt(wh.end_time.slice(3, 5), 10);

  // Build UTC timestamps for start/end of working day
  const workStart = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), startHour - tzOffset, startMin)
  );
  const workEnd = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), endHour - tzOffset, endMin)
  );

  // Get existing bookings for this day
  const dayStart = startOfDay(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), -tzOffset)));
  const dayEnd = endOfDay(new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23 - tzOffset, 59)));

  const { data: bookings } = await supabase
    .from("bookings")
    .select("start_time, end_time")
    .gte("start_time", dayStart.toISOString())
    .lte("start_time", dayEnd.toISOString())
    .neq("status", "cancelled");

  // Get blocked slots
  const { data: blocked } = await supabase
    .from("blocked_slots")
    .select("start_time, end_time")
    .gte("start_time", dayStart.toISOString())
    .lte("start_time", dayEnd.toISOString());

  const busySlots = [
    ...(bookings ?? []).map((b) => ({ start: new Date(b.start_time), end: new Date(b.end_time) })),
    ...(blocked ?? []).map((b) => ({ start: new Date(b.start_time), end: new Date(b.end_time) })),
  ];

  // Generate slots
  const slots: string[] = [];
  let cursor = new Date(workStart);

  while (addMinutes(cursor, serviceDuration) <= workEnd) {
    const slotEnd = addMinutes(cursor, serviceDuration);
    const isBusy = busySlots.some(
      (b) => cursor < b.end && slotEnd > b.start
    );

    // Don't show slots in the past
    const isPast = cursor <= new Date();

    if (!isBusy && !isPast) {
      // Return as local Los Angeles time label
      const localHour = (cursor.getUTCHours() + tzOffset + 24) % 24;
      const localMin = cursor.getUTCMinutes();
      const label = `${String(localHour).padStart(2, "0")}:${String(localMin).padStart(2, "0")}`;
      slots.push(label);
    }

    cursor = slotEnd;
  }

  return NextResponse.json({ slots });
}

function getLAOffset(date: Date): number {
  // Los Angeles: PST = UTC-8, PDT = UTC-7 (second Sun in March → first Sun in November)
  const year = date.getFullYear();
  const dstStart = getNthSundayOfMonth(year, 2, 2); // Second Sunday of March
  const dstEnd = getNthSundayOfMonth(year, 10, 1);  // First Sunday of November
  return date >= dstStart && date < dstEnd ? 7 : 8;
}

function getNthSundayOfMonth(year: number, month: number, n: number): Date {
  const firstDay = new Date(year, month - 1, 1);
  const firstSunday = new Date(firstDay);
  firstSunday.setDate(1 + ((7 - firstDay.getDay()) % 7));
  firstSunday.setDate(firstSunday.getDate() + (n - 1) * 7);
  return firstSunday;
}
