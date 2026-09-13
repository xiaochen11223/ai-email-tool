/**
 * British English microcopy and conventions used across the UI.
 * Centralised so the whole product speaks consistent British English
 * (tech spec §9).
 */

export const CTA = {
  primary: "Write My First Email for Free",
  generate: "Generate My Professional Email",
  generating: "Writing your email…",
  copy: "Copy to Clipboard",
  copied: "Copied!",
  regenerate: "Try Another Tone",
  backToEdit: "Back / Edit",
  backHome: "Back to Home",
} as const;

export const MESSAGES = {
  remaining: (n: number) =>
    `You have ${n} free ${n === 1 ? "email" : "emails"} left today.`,
  rateLimited: "You've used your 3 free emails today. Come back tomorrow!",
  tooFrequent: "Please wait 10 seconds before generating again.",
  genericError: "Something went wrong. Please try again in a few seconds.",
  providerBusy: "Our AI writer is temporarily busy. Please try again later.",
  invalidInput: "Please describe your email purpose in 10–500 characters.",
  britishBadge: "Written in British English",
} as const;

/** British formatting conventions (dates, currency) for content authors. */
export const BRITISH_CONVENTIONS = {
  dateFormat: "DD/MM/YYYY",
  currency: "£",
  examples: ["colour", "organise", "centre", "travelling", "postcode", "flat"],
} as const;
