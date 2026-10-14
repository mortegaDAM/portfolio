// Contact form endpoint. Sends the message through Resend (https://resend.com).
// Needs RESEND_API_KEY in the environment; CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL are optional.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Light per-instance throttle: 5 messages per IP every 10 minutes
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = String(body?.name ?? "").trim().slice(0, 100);
  const from = String(body?.email ?? "").trim().slice(0, 200);
  const message = String(body?.message ?? "").trim().slice(0, 5000);

  // Honeypot field that people never see: bots fill it, so pretend it worked
  if (body?.company) return Response.json({ ok: true });

  if (!name || !EMAIL.test(from) || message.length < 10) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= 5) return Response.json({ error: "rate" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "unavailable" }, { status: 503 });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "mario98.mo@gmail.com"],
      reply_to: from,
      subject: `Portfolio: ${name}`,
      text: `${name} <${from}>\n\n${message}`,
    }),
  }).catch(() => null);

  if (!res?.ok) return Response.json({ error: "failed" }, { status: 502 });
  return Response.json({ ok: true });
}
