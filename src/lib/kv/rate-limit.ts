/**
 * IP-based rate limiting on Vercel KV (PRD §3.4, tech spec §7).
 *
 * KV schema:
 *   rate_limit:{ip}      — counter, emails generated today (TTL 24h)
 *   rate_limit_last:{ip} — 10s lock key (TTL 10s, NX-set atomically)
 *
 * Privacy: only the IP and counters are stored — never email content.
 * Security log: IPs exceeding 10 calls/day are logged with IP + timestamp +
 * endpoint only (data minimisation, PRD §3.4).
 *
 * H2 fix: acquireSlot uses atomic SET NX + INCR to eliminate the TOCTOU race
 *         (concurrent requests can no longer all read count=0).
 * M3 fix: production fails closed when KV is unavailable or throws.
 * M4 fix: the counter is incremented BEFORE AI generation (inside acquireSlot);
 *         releaseSlot decrements it on failure, closing the "free retry" hole.
 */

import { getKV } from "./client";
import { RATE_LIMIT } from "@/lib/constants";

export type RateLimitResult =
  | { allowed: true; remaining: number }
  | { allowed: false; reason: "TOO_FREQUENT" | "RATE_LIMIT_EXCEEDED" | "RATE_LIMIT_UNAVAILABLE"; remaining: number };

/**
 * Atomically acquire a rate-limit slot: 10s lock (SET NX) + daily INCR.
 * On rejection the counter and lock are rolled back so the caller doesn't lose quota.
 */
export async function acquireSlot(ip: string, endpoint: string): Promise<RateLimitResult> {
  const kv = getKV();

  // --- M3: KV not configured ---
  if (!kv) {
    if (process.env.NODE_ENV === "production") {
      console.error("[rate-limit] KV not configured in production — failing closed");
      return { allowed: false, reason: "RATE_LIMIT_UNAVAILABLE", remaining: 0 };
    }
    return { allowed: true, remaining: RATE_LIMIT.dailyMax };
  }

  const countKey = `rate_limit:${ip}`;
  const lastKey = `rate_limit_last:${ip}`;
  const now = Date.now();

  try {
    // --- H2: atomic 10-second lock (SET key value PX ms NX) ---
    const lockAcquired = await kv.set(lastKey, String(now), {
      px: RATE_LIMIT.minIntervalMs,
      nx: true,
    });
    if (lockAcquired === null) {
      // Lock exists — someone called within the last 10s.
      const count = await kv.get<number>(countKey).then((v) => Number(v ?? 0));
      return { allowed: false, reason: "TOO_FREQUENT", remaining: Math.max(0, RATE_LIMIT.dailyMax - count) };
    }

    // --- H2: atomic daily counter increment ---
    const count = await kv.incr(countKey);

    // First call of the day — set the 24h TTL.
    if (count === 1) {
      await kv.expire(countKey, RATE_LIMIT.ttlSeconds);
    }

    // --- Daily allowance check ---
    if (count > RATE_LIMIT.dailyMax) {
      // Rollback: release the counter and the 10s lock (request not processed).
      await kv.decr(countKey);
      await kv.del(lastKey);

      // Anomaly monitoring: heavy abusers (IP + time + endpoint ONLY — never content).
      if (count >= 10) {
        console.warn(`[security] heavy usage: ip=${ip} endpoint=${endpoint} at=${new Date(now).toISOString()}`);
      }
      return { allowed: false, reason: "RATE_LIMIT_EXCEEDED", remaining: 0 };
    }

    return { allowed: true, remaining: Math.max(0, RATE_LIMIT.dailyMax - count) };
  } catch (err) {
    // --- M3: KV operation failed — fail closed in production ---
    console.error("[rate-limit] KV operation failed:", err instanceof Error ? err.message : "unknown");
    if (process.env.NODE_ENV === "production") {
      return { allowed: false, reason: "RATE_LIMIT_UNAVAILABLE", remaining: 0 };
    }
    return { allowed: true, remaining: RATE_LIMIT.dailyMax };
  }
}

/**
 * M4: Rollback the daily counter when AI generation fails, so the user
 * doesn't burn quota on a provider outage. The 10s lock is intentionally
 * NOT released — the user must still wait before trying again.
 */
export async function releaseSlot(ip: string): Promise<void> {
  const kv = getKV();
  if (!kv) return;

  const countKey = `rate_limit:${ip}`;

  try {
    const after = await kv.decr(countKey);
    // Defensive: never let the counter go negative.
    if (after < 0) {
      await kv.set(countKey, "0");
    }
  } catch (err) {
    console.error("[rate-limit] KV rollback failed:", err instanceof Error ? err.message : "unknown");
  }
}
