import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().trim().email("Please provide a valid email address"),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5, "Message must be at least 5 characters").max(5000, "Message exceeds limit"),
  // Honeypot field (hidden from genuine users)
  honeypot: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  company_website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
});

// In-memory rate limiter: 5 requests per hour (3,600,000 ms) per IP
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "anonymous-client";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Rate limit reached. Maximum 5 transmissions per hour." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const parseResult = contactSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Validation failed";
      return NextResponse.json(
        { ok: false, error: firstError },
        { status: 422 }
      );
    }

    const { name, email, subject, message, honeypot, company_website } = parseResult.data;

    // Honeypot check: silently accept bots without dispatching
    if ((honeypot && honeypot.length > 0) || (company_website && company_website.length > 0)) {
      return NextResponse.json({ ok: true });
    }

    const endpoint = process.env.FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.error("FORMSPREE_ENDPOINT environment variable is missing.");
      return NextResponse.json(
        { ok: false, error: "Server transmission gateway is unconfigured." },
        { status: 500 }
      );
    }

    const forwardRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || "Portfolio Transmission",
        message,
      }),
    });

    if (!forwardRes.ok) {
      const errData = await forwardRes.json().catch(() => ({}));
      const errMsg =
        errData?.error || "Mail gateway encountered an error. Please try direct email.";
      return NextResponse.json(
        { ok: false, error: errMsg },
        { status: forwardRes.status || 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Contact API route exception:", err);
    return NextResponse.json(
      { ok: false, error: "Internal transmission dispatch failure. Please use direct email." },
      { status: 500 }
    );
  }
}
