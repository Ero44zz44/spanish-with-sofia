import { Resend } from "resend";
import { TUTOR } from "@/lib/config";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const FROM = () => process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

export async function sendCustomerConfirmation(params: {
  to: string;
  customer_name: string;
  serviceName: string;
  dateLabel: string;
  timeLabel: string;
  price: string;
}) {
  return getResend().emails.send({
    from: `Spanish with Sofía <${FROM()}>`,
    to: [params.to],
    subject: `Your Spanish lesson is confirmed — ${params.dateLabel}`,
    html: buildStudentEmail(params),
  });
}

export async function sendTutorNotification(params: {
  customer_name: string;
  email: string;
  phone?: string;
  country?: string;
  spanish_level?: string;
  serviceName: string;
  dateLabel: string;
  timeLabel: string;
  notes?: string;
}) {
  const tutorEmail = process.env.TUTOR_NOTIFY_EMAIL ?? "vibiewebarm@gmail.com";
  return getResend().emails.send({
    from: `Spanish with Sofía <${FROM()}>`,
    to: [tutorEmail],
    subject: `New booking: ${params.serviceName} with ${params.customer_name} on ${params.dateLabel}`,
    html: buildTutorEmail({ ...params }),
  });
}

function buildStudentEmail({
  customer_name,
  serviceName,
  dateLabel,
  timeLabel,
  price,
}: {
  customer_name: string;
  serviceName: string;
  dateLabel: string;
  timeLabel: string;
  price: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr><td style="background:#D97757;padding:36px 40px;">
        <p style="color:rgba(255,255,255,0.9);margin:0 0 6px;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;">Spanish with Sofía</p>
        <h1 style="color:#ffffff;margin:0;font-size:26px;font-weight:700;line-height:1.2;">Lesson confirmed! 🎉</h1>
        <p style="color:rgba(255,255,255,0.85);margin:10px 0 0;font-size:16px;">See you soon, ${customer_name}!</p>
      </td></tr>

      <!-- Booking details -->
      <tr><td style="padding:36px 40px 24px;">
        <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.6;">Here are your lesson details:</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF8F3;border-radius:8px;overflow:hidden;border:1px solid #E5DDD5;">
          <tr>
            <td style="padding:14px 20px;border-bottom:1px solid #E5DDD5;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.05em;width:100px;">Lesson</td>
            <td style="padding:14px 20px;border-bottom:1px solid #E5DDD5;font-size:15px;color:#1F2937;font-weight:600;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;border-bottom:1px solid #E5DDD5;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.05em;">Date</td>
            <td style="padding:14px 20px;border-bottom:1px solid #E5DDD5;font-size:15px;color:#1F2937;">${dateLabel}</td>
          </tr>
          <tr>
            <td style="padding:14px 20px;border-bottom:1px solid #E5DDD5;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.05em;">Time</td>
            <td style="padding:14px 20px;border-bottom:1px solid #E5DDD5;font-size:15px;color:#1F2937;">${timeLabel} <span style="color:#6B7280;font-size:13px;">(Los Angeles time)</span></td>
          </tr>
          <tr>
            <td style="padding:14px 20px;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.05em;">Price</td>
            <td style="padding:14px 20px;font-size:15px;color:#D97757;font-weight:700;">${price}</td>
          </tr>
        </table>
      </td></tr>

      <!-- Message -->
      <tr><td style="padding:0 40px 32px;">
        <p style="color:#374151;line-height:1.75;font-size:15px;margin:0 0 12px;">You'll receive a Zoom link before your lesson. If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
        <p style="color:#374151;line-height:1.75;font-size:15px;margin:0 0 20px;">Looking forward to speaking Spanish with you! 🇲🇽</p>
        <p style="color:#D97757;font-weight:700;font-size:15px;margin:0;">— Sofía Martínez</p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:20px 40px;background:#FDF8F3;border-top:1px solid #E5DDD5;">
        <p style="margin:0;font-size:13px;color:#9CA3AF;">Spanish with Sofía · Mexico City, Mexico · <a href="mailto:${TUTOR.email}" style="color:#D97757;text-decoration:none;">${TUTOR.email}</a></p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildTutorEmail({
  customer_name,
  email,
  phone,
  country,
  spanish_level,
  serviceName,
  dateLabel,
  timeLabel,
  notes,
}: {
  customer_name: string;
  email: string;
  phone?: string;
  country?: string;
  spanish_level?: string;
  serviceName: string;
  dateLabel: string;
  timeLabel: string;
  notes?: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:32px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr><td style="background:#1F2937;padding:28px 40px;">
        <p style="color:rgba(255,255,255,0.6);margin:0 0 4px;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;">Spanish with Sofía</p>
        <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;">New Booking 📅</h1>
      </td></tr>

      <!-- Details -->
      <tr><td style="padding:32px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;width:110px;">Student</td>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1F2937;font-weight:600;">${customer_name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Email</td>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;"><a href="mailto:${email}" style="color:#D97757;text-decoration:none;">${email}</a></td>
          </tr>
          ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1F2937;">${phone}</td></tr>` : ""}
          ${country ? `<tr><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Country</td><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1F2937;">${country}</td></tr>` : ""}
          ${spanish_level ? `<tr><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Level</td><td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1F2937;">${spanish_level}</td></tr>` : ""}
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Lesson</td>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1F2937;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Date</td>
            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1F2937;">${dateLabel}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;${notes ? "border-bottom:1px solid #F3F4F6;" : ""}font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Time</td>
            <td style="padding:10px 0;${notes ? "border-bottom:1px solid #F3F4F6;" : ""}font-size:15px;color:#1F2937;">${timeLabel} (Los Angeles)</td>
          </tr>
          ${notes ? `<tr><td style="padding:10px 0;font-weight:700;font-size:13px;color:#9CA3AF;text-transform:uppercase;">Notes</td><td style="padding:10px 0;font-size:15px;color:#1F2937;">${notes}</td></tr>` : ""}
        </table>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:20px 40px;background:#F9FAFB;border-top:1px solid #E5E7EB;">
        <p style="margin:0;font-size:13px;color:#9CA3AF;">Spanish with Sofía admin notification</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
