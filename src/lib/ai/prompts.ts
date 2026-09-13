/**
 * Prompt builder (PRD §3.5, tech spec §6.2).
 * Hard constraints baked into every request: British English, Subject/Body
 * format, tone, recipient-appropriate greeting, 150–250 word body, no
 * invented facts (placeholders instead), no over-apologising.
 */

import type { GenerateEmailRequest } from "@/types";

const RECIPIENT_MAP: Record<string, string> = {
  boss: "my manager or boss",
  client: "a client or customer",
  supplier: "a supplier or vendor",
  colleague: "a colleague",
  unknown: "the recipient",
  other: "the recipient",
};

export function buildEmailPrompt(params: GenerateEmailRequest): string {
  const { purpose, recipient = "unknown", tone = "formal", senderName, companyName } = params;

  return `You are a professional British English email writing assistant. Write a complete business email using British English conventions.

Requirements:
- Output must include a "Subject:" line and a "Body:" section.
- Use British English spelling, vocabulary and date formats (DD/MM/YYYY).
- Tone: ${tone}.
- Recipient: ${RECIPIENT_MAP[recipient] ?? RECIPIENT_MAP.unknown}.
- Purpose: ${purpose}.
- Keep the body between 150–250 words.
- Do not over-apologise.
- If information is missing, use placeholders like [Order Number] instead of inventing facts.
${senderName ? `- Sign off with the sender name: ${senderName}.` : "- Use a generic sign-off with no invented name."}
${companyName ? `- Include company name: ${companyName}.` : ""}

Format your reply exactly as:
Subject: [subject line]

Body:
[email body]`;
}
