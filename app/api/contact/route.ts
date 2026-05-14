import { NextResponse } from "next/server";
import { Resend } from "resend";
import { TUTOR } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { name, email, country, level, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Spanish with Sofía <onboarding@resend.dev>",
      to: [TUTOR.email],
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <tr><td style="background:#D97757;padding:24px 32px;">
            <h1 style="color:#ffffff;margin:0;font-size:22px;">New Contact Message</h1>
          </td></tr>
          <tr><td style="padding:32px;background:#ffffff;">
            <table width="100%" cellpadding="8" cellspacing="0">
              <tr><td style="font-weight:bold;color:#6B7280;width:120px;">Name</td><td style="color:#1F2937;">${name}</td></tr>
              <tr><td style="font-weight:bold;color:#6B7280;">Email</td><td style="color:#1F2937;"><a href="mailto:${email}">${email}</a></td></tr>
              ${country ? `<tr><td style="font-weight:bold;color:#6B7280;">Country</td><td style="color:#1F2937;">${country}</td></tr>` : ""}
              ${level ? `<tr><td style="font-weight:bold;color:#6B7280;">Level</td><td style="color:#1F2937;">${level}</td></tr>` : ""}
            </table>
            <hr style="border:none;border-top:1px solid #E5DDD5;margin:16px 0;">
            <p style="color:#1F2937;line-height:1.6;white-space:pre-wrap;">${message}</p>
          </td></tr>
          <tr><td style="padding:16px 32px;background:#FDF8F3;color:#6B7280;font-size:13px;">Spanish with Sofía · ${TUTOR.city}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
