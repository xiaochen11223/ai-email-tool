/**
 * Zod schema for POST /api/generate (tech spec §4.3).
 * Shared by the API route (authoritative server-side validation) and the
 * client form (instant feedback). Rules come from PRD §3.2/§3.3.2.
 */

import { z } from "zod";
import { RECIPIENT_OPTIONS, TONE_OPTIONS } from "@/types";

export const generateEmailSchema = z.object({
  purpose: z
    .string({ required_error: "Please describe the purpose of your email." })
    .trim()
    .min(10, "Please describe your email purpose in 10–500 characters.")
    .max(500, "Please describe your email purpose in 10–500 characters.")
    // Strip HTML tags defensively — the output is plain text only.
    .transform((v) => v.replace(/<[^>]*>/g, "").trim())
    .pipe(z.string().min(10).max(500)),
  recipient: z.enum(RECIPIENT_OPTIONS).optional(),
  tone: z.enum(TONE_OPTIONS).optional(),
  senderName: z
    .string()
    .trim()
    .max(100, "Name must be 100 characters or fewer.")
    .optional()
    .or(z.literal("")),
  companyName: z
    .string()
    .trim()
    .max(100, "Company name must be 100 characters or fewer.")
    .optional()
    .or(z.literal("")),
});

export type GenerateEmailInput = z.input<typeof generateEmailSchema>;
