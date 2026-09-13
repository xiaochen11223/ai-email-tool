/**
 * Global TypeScript types shared across the app and the API route.
 * Field rules mirror the PRD §3.2 form spec and the tech spec §4.2.
 */

/** Allowed recipient roles for the generated email. */
export const RECIPIENT_OPTIONS = [
  "boss",
  "client",
  "supplier",
  "colleague",
  "unknown",
  "other",
] as const;
export type Recipient = (typeof RECIPIENT_OPTIONS)[number];

/** Allowed tone styles. */
export const TONE_OPTIONS = [
  "formal",
  "friendly",
  "persuasive",
  "apologetic",
  "neutral",
] as const;
export type Tone = (typeof TONE_OPTIONS)[number];

/** POST /api/generate request body. */
export interface GenerateEmailRequest {
  purpose: string; // required, 10–500 characters
  recipient?: Recipient;
  tone?: Tone;
  senderName?: string; // optional, 0–100 characters
  companyName?: string; // optional, 0–100 characters
}

/** Generated email payload returned by the AI layer. */
export interface GeneratedEmail {
  subject: string;
  body: string;
  tone: Tone;
  wordCount: number;
}

/** Standard API error codes (PRD §3.3.4). */
export type ApiErrorCode =
  | "INVALID_INPUT"
  | "RATE_LIMIT_EXCEEDED"
  | "TOO_FREQUENT"
  | "RATE_LIMIT_UNAVAILABLE"
  | "GENERATION_FAILED"
  | "AI_PROVIDER_UNAVAILABLE";

/** POST /api/generate response envelope. */
export interface GenerateEmailResponse {
  success: boolean;
  data?: GeneratedEmail;
  remaining?: number;
  error?: {
    code: ApiErrorCode;
    message: string;
  };
}
