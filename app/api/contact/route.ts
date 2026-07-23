import { NextRequest, NextResponse } from "next/server";

const TO_EMAIL = "sean.a.protho1@gmail.com";

export async function POST(req: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Email not configured" }, { status: 503 });
  }

  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (message.trim().length > 2000) {
    return NextResponse.json({ error: "Message too long (max 2000 characters)" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Toeta Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      reply_to: email.trim(),
      subject: `Toeta — Message from ${name.trim()}`,
      html: `
        <p><strong>From:</strong> ${escHtml(name)} &lt;${escHtml(email)}&gt;</p>
        <hr/>
        <p style="white-space:pre-wrap">${escHtml(message)}</p>
      `,
    }),
  });

  if (!res.ok) {
    console.error("[/api/contact] Resend error:", res.status, await res.text());
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
