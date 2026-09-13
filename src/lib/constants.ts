/**
 * Site-wide constants: metadata, navigation, form option labels.
 * All user-facing copy is British English.
 */

import type { Recipient, Tone } from "@/types";

export const SITE = {
  name: "EmailWriterAI.co.uk",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emailwriterai.co.uk",
  contactEmail: "tnga86892@gmail.com",
  /** PRD §3.1 — homepage SEO metadata (exact strings from the PRD). */
  homeTitle:
    "Best AI Email Writer Tools for UK Business | Free AI Email Generators",
  homeDescription:
    "Discover the top AI email writer tools for UK businesses. Find free AI email generators, cold email templates and expert guides to write professional emails that get more replies.",
} as const;

export const NAV_LINKS = [
  { href: "/tool", label: "Email Writer" },
  { href: "/guides", label: "Writing Guides" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
] as const;

/** Human-readable labels for the recipient select (PRD §3.2). */
export const RECIPIENT_LABELS: Record<Recipient, string> = {
  boss: "Boss",
  client: "Client",
  supplier: "Supplier",
  colleague: "Colleague",
  unknown: "Unknown",
  other: "Other",
};

/** Human-readable labels for the tone select (PRD §3.2). */
export const TONE_LABELS: Record<Tone, string> = {
  formal: "Formal",
  friendly: "Friendly",
  persuasive: "Persuasive",
  apologetic: "Apologetic",
  neutral: "Neutral",
};

/** Free usage allowance per IP (PRD §3.4). */
export const RATE_LIMIT = {
  dailyMax: 3,
  minIntervalMs: 10_000,
  ttlSeconds: 86_400,
} as const;
