/**
 * OpenAI-compatible chat completions client (Edge-safe, fetch-based).
 * Used for both providers: Trae (preferred, OpenAI-compatible endpoint) and
 * OpenAI GPT-4o-mini (fallback). No SDK dependency keeps the Edge bundle lean.
 *
 * Keys come from server-side env vars only — never exposed to the browser.
 */

export interface ChatProviderConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "ProviderError";
  }
}

const DEFAULT_TIMEOUT_MS = Number(process.env.AI_TIMEOUT_MS ?? 10_000);
const DEFAULT_MAX_TOKENS = Number(process.env.AI_MAX_TOKENS ?? 800);

export async function callChatCompletion(
  config: ChatProviderConfig,
  prompt: string
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${config.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: DEFAULT_MAX_TOKENS,
        temperature: 0.7,
        messages: [{ role: "user", content: prompt }],
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      // Never log response bodies — they may echo the user's prompt.
      throw new ProviderError(`Provider responded ${res.status}`, res.status);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) throw new ProviderError("Empty completion");
    return text;
  } finally {
    clearTimeout(timeout);
  }
}
