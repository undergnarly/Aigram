import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Lead submissions write one row each; persist at request time.
export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // Prisma needs Node, not Edge.

const RATE_LIMIT_MAX = 5; // requests per window per IP
const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_NAME = 120;
const MAX_EMAIL = 200;
const MAX_PHONE = 32;
const MAX_MESSAGE = 4000;
const MAX_SOURCE = 80;

// In-memory rate-limit. Resets on cold start — acceptable for a small
// landing. For higher traffic swap for Upstash/Redis.
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, e] of hits) if (e.resetAt < now) hits.delete(ip);
}, 5 * 60_000).unref?.();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(s: string): boolean {
  return s.length > 0 && s.length <= MAX_EMAIL && EMAIL_RE.test(s);
}

function clamp(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function requireAdmin(req: NextRequest): boolean {
  // /admin pages are gated by middleware.ts at the edge, but /api/* is not
  // in that matcher. Re-validate Basic Auth here so this endpoint isn't open.
  const header = req.headers.get("authorization");
  if (!header || !header.toLowerCase().startsWith("basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return false;
  }
  const colon = decoded.indexOf(":");
  if (colon === -1) return false;
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);
  const expectedUser = process.env.ADMIN_USER || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "gramfleet-2026";
  return user === expectedUser && pass === expectedPass;
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  const rl = rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: hidden form field "website" that humans never fill. If a bot
  // fills it, we 200 silently so the bot moves on, but write nothing.
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = clamp(body.email, MAX_EMAIL).toLowerCase() || null;
  const phone = clamp(body.phone, MAX_PHONE) || null;
  if (!email && !phone) {
    return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  const name = clamp(body.name, MAX_NAME) || null;
  const message = clamp(body.message, MAX_MESSAGE) || null;
  const source = clamp(body.source, MAX_SOURCE) || null;
  const lang = clamp(body.lang, 8) || null;

  let preferredAt: Date | null = null;
  if (typeof body.preferredAt === "string" && body.preferredAt.trim().length > 0) {
    const d = new Date(body.preferredAt);
    if (!Number.isNaN(d.getTime())) preferredAt = d;
  }

  try {
    await db.lead.create({
      data: { name, email: email ?? null, phone, preferredAt, message, source, lang, status: "new" },
    });
  } catch (err) {
    console.error("[/api/leads] create failed", err);
    return NextResponse.json({ error: "Could not save lead" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="GramFleet Admin"' },
    });
  }
  const rows = await db.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ leads: rows });
}
