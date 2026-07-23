// Spoonacular quota monitor — fires once per day when usage crosses SPOONACULAR_ALERT_THRESHOLD.
//
// Environment variables:
//   SPOONACULAR_ALERT_THRESHOLD  — points used that trigger the alert (default: 160 = 80% of 200)
//   SPOONACULAR_PLAN_LIMIT       — your current plan's daily points (default: 200 = Starter)
//   RESEND_API_KEY               — from resend.com (free tier, no domain verification needed)

import { createClient } from "@supabase/supabase-js";

const ALERT_EMAIL     = "sean.a.protho1@gmail.com";
const PLAN_LIMIT      = parseInt(process.env.SPOONACULAR_PLAN_LIMIT       ?? "200");
const ALERT_THRESHOLD = parseInt(process.env.SPOONACULAR_ALERT_THRESHOLD  ?? "160");

export async function checkAndAlertSpoonacularQuota(
  pointsUsed: number,
  pointsLeft: number
): Promise<void> {
  if (pointsUsed < ALERT_THRESHOLD) return;

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[spoonacular-usage] RESEND_API_KEY not set — skipping alert");
    return;
  }

  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const today = new Date().toISOString().slice(0, 10);

    // Only send one alert per day
    const { data } = await admin
      .from("app_settings")
      .select("value")
      .eq("key", "spoonacular_alert_sent_date")
      .maybeSingle();

    if (data?.value === today) return;

    await sendAlert(resendKey, pointsUsed, pointsLeft);

    // Record that the alert fired today
    await admin.from("app_settings").upsert(
      { key: "spoonacular_alert_sent_date", value: today, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );
  } catch (err) {
    console.error("[spoonacular-usage] Alert failed:", err);
  }
}

async function sendAlert(
  resendKey: string,
  pointsUsed: number,
  pointsLeft: number
): Promise<void> {
  const percent = Math.round((pointsUsed / PLAN_LIMIT) * 100);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Toeta Alerts <onboarding@resend.dev>",
      to: ALERT_EMAIL,
      subject: "TOETA - Action Required. Upgrade Spoonacular plan",
      html: buildHtml(pointsUsed, pointsLeft, percent),
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[spoonacular-usage] Resend error:", res.status, body);
  }
}

function buildHtml(pointsUsed: number, pointsLeft: number, percent: number): string {
  const barWidth = Math.min(percent, 100);
  const barColor = percent >= 90 ? "#dc2626" : percent >= 80 ? "#f59e0b" : "#16a34a";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:system-ui,-apple-system,sans-serif">
<div style="max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">

  <!-- Header -->
  <div style="background:#ff6b35;padding:24px 32px">
    <div style="font-size:22px;font-weight:800;color:#ffffff">⚠️ Toeta — Spoonacular Alert</div>
    <div style="font-size:13px;color:#ffe0d4;margin-top:4px">Daily API usage has crossed your alert threshold</div>
  </div>

  <!-- Body -->
  <div style="padding:32px">

    <!-- Usage bar -->
    <div style="margin-bottom:24px">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px">
        <span style="font-size:14px;font-weight:600;color:#374151">Daily usage</span>
        <span style="font-size:14px;font-weight:700;color:${barColor}">${pointsUsed} / ${PLAN_LIMIT} pts (${percent}%)</span>
      </div>
      <div style="background:#f3f4f6;border-radius:99px;height:10px;overflow:hidden">
        <div style="background:${barColor};width:${barWidth}%;height:100%;border-radius:99px"></div>
      </div>
      <div style="font-size:12px;color:#6b7280;margin-top:6px">${pointsLeft} points remaining today · Resets at midnight UTC</div>
    </div>

    <!-- Stats table -->
    <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;font-size:14px;margin-bottom:24px">
      <tr style="background:#fef3c7">
        <td style="padding:12px 16px;font-weight:600;color:#92400e">Points used</td>
        <td style="padding:12px 16px;text-align:right;font-weight:700;color:#92400e">${pointsUsed}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:500;color:#374151;border-top:1px solid #f3f4f6">Points remaining</td>
        <td style="padding:12px 16px;text-align:right;font-weight:600;color:#374151;border-top:1px solid #f3f4f6">${pointsLeft}</td>
      </tr>
      <tr style="background:#f9fafb">
        <td style="padding:12px 16px;font-weight:500;color:#374151;border-top:1px solid #f3f4f6">Alert threshold</td>
        <td style="padding:12px 16px;text-align:right;color:#6b7280;border-top:1px solid #f3f4f6">${ALERT_THRESHOLD} pts</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:500;color:#374151;border-top:1px solid #f3f4f6">Current plan</td>
        <td style="padding:12px 16px;text-align:right;color:#6b7280;border-top:1px solid #f3f4f6">Starter · ${PLAN_LIMIT} pts/day · $9/mo</td>
      </tr>
    </table>

    <!-- Upgrade table -->
    <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:12px">Upgrade options</div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px">
      <thead>
        <tr style="background:#f3f4f6">
          <th style="padding:10px 12px;text-align:left;font-weight:600;color:#374151">Plan</th>
          <th style="padding:10px 12px;text-align:left;font-weight:600;color:#374151">Price</th>
          <th style="padding:10px 12px;text-align:left;font-weight:600;color:#374151">Pts/day</th>
          <th style="padding:10px 12px;text-align:left;font-weight:600;color:#374151">Est. capacity</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background:#fef3c7">
          <td style="padding:10px 12px;color:#92400e;border-top:1px solid #fde68a">Starter (current)</td>
          <td style="padding:10px 12px;color:#92400e;border-top:1px solid #fde68a">$9/mo</td>
          <td style="padding:10px 12px;color:#92400e;border-top:1px solid #fde68a">200</td>
          <td style="padding:10px 12px;color:#92400e;border-top:1px solid #fde68a">~15 daily active</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;font-weight:700;color:#111827;border-top:1px solid #f3f4f6">Cook ← upgrade to this</td>
          <td style="padding:10px 12px;font-weight:700;color:#111827;border-top:1px solid #f3f4f6">$29/mo</td>
          <td style="padding:10px 12px;font-weight:700;color:#111827;border-top:1px solid #f3f4f6">1,500</td>
          <td style="padding:10px 12px;font-weight:700;color:#111827;border-top:1px solid #f3f4f6">~100 daily active</td>
        </tr>
        <tr style="background:#f9fafb">
          <td style="padding:10px 12px;color:#6b7280;border-top:1px solid #f3f4f6">Culinarian</td>
          <td style="padding:10px 12px;color:#6b7280;border-top:1px solid #f3f4f6">$79/mo</td>
          <td style="padding:10px 12px;color:#6b7280;border-top:1px solid #f3f4f6">4,500</td>
          <td style="padding:10px 12px;color:#6b7280;border-top:1px solid #f3f4f6">~300 daily active</td>
        </tr>
      </tbody>
    </table>

    <!-- CTA -->
    <a href="https://spoonacular.com/food-api/pricing"
       style="display:inline-block;background:#ff6b35;color:#ffffff;padding:13px 28px;border-radius:8px;font-weight:700;font-size:15px;text-decoration:none">
      Upgrade on Spoonacular →
    </a>

    <!-- After upgrade instructions -->
    <div style="margin-top:28px;padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
      <div style="font-size:13px;font-weight:700;color:#15803d;margin-bottom:8px">After upgrading</div>
      <ol style="margin:0;padding-left:20px;font-size:13px;color:#166534;line-height:1.8">
        <li>Go to Vercel → Project Settings → Environment Variables</li>
        <li>Update <code style="background:#dcfce7;padding:1px 5px;border-radius:3px">SPOONACULAR_PLAN_LIMIT</code> to your new daily points (e.g. <strong>1500</strong>)</li>
        <li>Update <code style="background:#dcfce7;padding:1px 5px;border-radius:3px">SPOONACULAR_ALERT_THRESHOLD</code> to 80% of new limit (e.g. <strong>1200</strong>)</li>
        <li>Redeploy Toeta</li>
      </ol>
    </div>
  </div>

  <!-- Footer -->
  <div style="padding:16px 32px;background:#f9fafb;border-top:1px solid #f3f4f6">
    <p style="margin:0;font-size:11px;color:#9ca3af">
      This alert fires once per day when usage ≥ threshold. Sent from toeta.app via Resend.
    </p>
  </div>

</div>
</body>
</html>
  `.trim();
}
