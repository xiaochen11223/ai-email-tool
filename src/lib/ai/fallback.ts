/**
 * Provider orchestration with automatic fallback (tech spec §6.1):
 *   1. Trae (TRAE_API_KEY) — preferred provider.
 *   2. OpenAI GPT-4o-mini (OPENAI_API_KEY) — fallback on any Trae failure.
 *
 * Also owns response parsing: extracts Subject/Body and computes word count.
 * Distinguishes AI_PROVIDER_UNAVAILABLE (both providers down → HTTP 503) from
 * GENERATION_FAILED (unparseable output → HTTP 500) per PRD §3.3.4.
 */

import { callChatCompletion, ProviderError } from "./client";
import { buildEmailPrompt } from "./prompts";
import { countWords } from "@/lib/utils";
import type { GenerateEmailRequest, GeneratedEmail, Tone } from "@/types";

export class GenerationFailedError extends Error {
  name = "GenerationFailedError";
}
export class ProvidersUnavailableError extends Error {
  name = "ProvidersUnavailableError";
}

/** Parse "Subject: ...\n\nBody:\n..." into a GeneratedEmail. */
function parseCompletion(raw: string, tone: Tone): GeneratedEmail {
  const subjectMatch = raw.match(/Subject:\s*(.+)/i);
  const bodyMatch = raw.match(/Body:\s*([\s\S]+)/i);

  if (!subjectMatch || !bodyMatch) {
    throw new GenerationFailedError("AI output did not match the expected format");
  }

  const subject = subjectMatch[1].trim();
  const body = bodyMatch[1].trim();
  if (!subject || !body) {
    throw new GenerationFailedError("AI output was missing subject or body");
  }

  return { subject, body, tone, wordCount: countWords(body) };
}

export async function generateEmail(params: GenerateEmailRequest): Promise<GeneratedEmail> {
  const prompt = buildEmailPrompt(params);
  const tone = (params.tone ?? "formal") as Tone;

  const traeModel = process.env.TRAE_MODEL ?? "glm-4-flash-250414";
  const traeFallbackModel = process.env.TRAE_FALLBACK_MODEL ?? "glm-4-flash-250414";

  const providers = [
    process.env.TRAE_API_KEY
      ? {
          name: "trae",
          baseUrl: process.env.TRAE_API_BASE_URL ?? "https://open.bigmodel.cn/api/paas/v4",
          apiKey: process.env.TRAE_API_KEY,
          model: traeModel,
        }
      : null,
    // Same-provider model fallback: if the preferred model is overloaded (429),
    // retry with a different model before giving up on this provider entirely.
    process.env.TRAE_API_KEY && traeFallbackModel !== traeModel
      ? {
          name: "trae-fallback",
          baseUrl: process.env.TRAE_API_BASE_URL ?? "https://open.bigmodel.cn/api/paas/v4",
          apiKey: process.env.TRAE_API_KEY,
          model: traeFallbackModel,
        }
      : null,
    process.env.OPENAI_API_KEY
      ? {
          name: "openai",
          baseUrl: "https://api.openai.com/v1",
          apiKey: process.env.OPENAI_API_KEY,
          model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
        }
      : null,
  ].filter((p): p is NonNullable<typeof p> => p !== null);

  if (providers.length === 0) {
    throw new ProvidersUnavailableError("No AI provider configured");
  }

  let lastError: unknown = null;

  for (const provider of providers) {
    try {
      const raw = await callChatCompletion(provider, prompt);
      return parseCompletion(raw, tone);
    } catch (err) {
      // Log provider name + error class only — never the prompt or response.
      console.warn(
        `[ai] provider ${provider.name} failed:`,
        err instanceof Error ? err.message : "unknown"
      );
      lastError = err;
      // A parse error means the provider worked but returned garbage —
      // still worth trying the next provider before giving up.
    }
  }

  // All providers exhausted: distinguish transport failure from bad output.
  if (lastError instanceof GenerationFailedError) throw lastError;
  if (lastError instanceof ProviderError || lastError instanceof Error) {
    throw new ProvidersUnavailableError("All AI providers are unavailable");
  }
  throw new ProvidersUnavailableError("AI generation failed");
}
