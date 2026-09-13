/**
 * POST /api/generate — AI email generation endpoint (PRD §3.3, tech spec §4).
 *
 * Runtime: Vercel Edge Function.
 * Flow: extract IP → acquire rate-limit slot (atomic INCR) → validate input
 * (Zod) → generate (Trae → OpenAI fallback) → respond. On any failure before
 * success, releaseSlot rolls back the counter (M4).
 *
 * Privacy: request bodies (email purposes) are NEVER logged. Error responses
 * never include stack traces or key material.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateEmailSchema } from "@/lib/validation";
import { acquireSlot, releaseSlot } from "@/lib/kv/rate-limit";
import { getClientIP } from "@/lib/utils/ip";
import {
  generateEmail,
  GenerationFailedError,
  ProvidersUnavailableError,
} from "@/lib/ai/fallback";
import { MESSAGES } from "@/lib/i18n/british-english";
import type { GenerateEmailResponse } from "@/types";

export const runtime = "edge";

function json(body: GenerateEmailResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIP(req);

    // --- Rate limiting: atomically acquire a slot (H2 + M4: counter incremented here) ---
    const limit = await acquireSlot(ip, "/api/generate");
    if (!limit.allowed) {
      return json(
        {
          success: false,
          remaining: limit.remaining,
          error: {
            code: limit.reason,
            message:
              limit.reason === "TOO_FREQUENT"
                ? MESSAGES.tooFrequent
                : limit.reason === "RATE_LIMIT_EXCEEDED"
                  ? MESSAGES.rateLimited
                  : MESSAGES.genericError,
          },
        },
        limit.reason === "RATE_LIMIT_UNAVAILABLE" ? 503 : 429
      );
    }

    // --- Input validation (M4: rollback slot on failure) ---
    let rawBody: unknown;
    try {
      rawBody = await req.json();
    } catch {
      await releaseSlot(ip);
      return json(
        {
          success: false,
          error: { code: "INVALID_INPUT", message: MESSAGES.invalidInput },
        },
        400
      );
    }

    const parsed = generateEmailSchema.safeParse(rawBody);
    if (!parsed.success) {
      await releaseSlot(ip);
      return json(
        {
          success: false,
          error: { code: "INVALID_INPUT", message: MESSAGES.invalidInput },
        },
        400
      );
    }

    // --- AI generation (M4: rollback slot on failure) ---
    let result;
    try {
      result = await generateEmail(parsed.data);
    } catch (genError) {
      await releaseSlot(ip);
      throw genError;
    }

    return json(
      {
        success: true,
        data: result,
        remaining: limit.remaining,
      },
      200
    );
  } catch (error) {
    if (error instanceof ProvidersUnavailableError) {
      return json(
        {
          success: false,
          error: { code: "AI_PROVIDER_UNAVAILABLE", message: MESSAGES.providerBusy },
        },
        503
      );
    }
    if (error instanceof GenerationFailedError) {
      return json(
        {
          success: false,
          error: { code: "GENERATION_FAILED", message: MESSAGES.genericError },
        },
        500
      );
    }
    // Unexpected error: log class only, return a safe generic message.
    console.error(
      "[generate] unexpected error:",
      error instanceof Error ? error.message : "unknown"
    );
    return json(
      {
        success: false,
        error: { code: "GENERATION_FAILED", message: MESSAGES.genericError },
      },
      500
    );
  }
}

// Explicitly reject non-POST methods.
export async function GET() {
  return json(
    {
      success: false,
      error: { code: "INVALID_INPUT", message: "Method not allowed." },
    },
    405
  );
}
