/**
 * Extract the client IP address from an incoming request.
 *
 * Behind Vercel/Cloudflare, `x-forwarded-for` is set by the trusted edge and the
 * first entry is the original client. We never trust deeper entries, which a
 * caller could spoof (PRD §3.4 — IP extraction safety).
 */

import type { NextRequest } from "next/server";

export function getClientIP(req: NextRequest): string {
  // Vercel injects x-real-ip at the trusted edge — clients cannot spoof it.
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  // Fallback: take the LAST x-forwarded-for entry (set by our edge proxy),
  // never the first (which is client-controllable and spoofable).
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((s) => s.trim());
    const last = parts[parts.length - 1];
    if (last) return last;
  }

  return "unknown";
}
