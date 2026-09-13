/**
 * Vercel KV client factory.
 *
 * Supports both the official @vercel/kv env names (KV_REST_API_URL /
 * KV_REST_API_TOKEN, set automatically when you connect KV in Vercel) and the
 * tech-spec aliases (VERCEL_KV_URL / VERCEL_KV_TOKEN).
 *
 * Returns null when KV is not configured (e.g. local development), so callers
 * can degrade gracefully.
 */

import { createClient, type VercelKV } from "@vercel/kv";

let client: VercelKV | null | undefined;

export function getKV(): VercelKV | null {
  if (client !== undefined) return client;

  const url = process.env.KV_REST_API_URL ?? process.env.VERCEL_KV_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.VERCEL_KV_TOKEN;

  if (!url || !token) {
    console.warn("[kv] KV env vars not configured — rate limiting disabled (local dev mode).");
    client = null;
    return client;
  }

  client = createClient({ url, token });
  return client;
}
