/**
 * Generic client-side helpers.
 */

/** Tiny className joiner (no external dependency). */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Count words in a block of text (whitespace-separated). */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
