"use client";

/**
 * EmailResult — renders the generated email with P0 actions
 * (PRD §3.2 result area): copy, regenerate ("Try Another Tone"), back/edit,
 * plus the P1 "Written in British English" badge and remaining-count notice.
 */

import { Check, Copy, PenLine, RefreshCw } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CTA, MESSAGES } from "@/lib/i18n/british-english";
import { TONE_LABELS } from "@/lib/constants";
import type { GeneratedEmail } from "@/types";
import { trackEvent } from "@/lib/analytics/gtag";

interface EmailResultProps {
  email: GeneratedEmail;
  remaining: number;
  onRegenerate: () => void;
  onBackToEdit: () => void;
  loading: boolean;
}

export function EmailResult({
  email,
  remaining,
  onRegenerate,
  onBackToEdit,
  loading,
}: EmailResultProps) {
  const { copied, copy } = useCopyToClipboard();

  const fullText = `Subject: ${email.subject}\n\n${email.body}`;

  const handleCopy = async () => {
    const ok = await copy(fullText);
    if (ok) trackEvent("copy_click", { tone: email.tone });
  };

  return (
    <section aria-label="Generated email" className="space-y-5">
      {/* Status row: tone, word count, British English badge (PRD P1) */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">
          Tone: {TONE_LABELS[email.tone]}
        </span>
        <span className="rounded-full bg-mist px-3 py-1 text-ink-soft">
          {email.wordCount} words
        </span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
          {MESSAGES.britishBadge}
        </span>
      </div>

      {/* Subject */}
      <div className="rounded-card border border-ink/10 bg-mist px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-mute">Subject</p>
        <p className="mt-1 font-semibold text-ink">{email.subject}</p>
      </div>

      {/* Body — preserves AI paragraph breaks */}
      <div className="rounded-card border border-ink/10 bg-paper p-5 shadow-soft">
        <p className="whitespace-pre-wrap leading-relaxed text-ink">{email.body}</p>
      </div>

      {/* Actions (all P0) */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={handleCopy} className="btn-primary flex-1" disabled={loading}>
          {copied ? (
            <Check className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Copy className="h-5 w-5" aria-hidden="true" />
          )}
          {copied ? CTA.copied : CTA.copy}
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          className="btn-secondary flex-1"
          disabled={loading || remaining <= 0}
          title={remaining <= 0 ? MESSAGES.rateLimited : undefined}
        >
          <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
          {CTA.regenerate}
        </button>
        <button type="button" onClick={onBackToEdit} className="btn-secondary flex-1" disabled={loading}>
          <PenLine className="h-5 w-5" aria-hidden="true" />
          {CTA.backToEdit}
        </button>
      </div>

      <p className="text-center text-sm text-ink-mute">{MESSAGES.remaining(remaining)}</p>

      {/* Copied toast (aria-live handled by the polite region in EmailTool) */}
      {copied && (
        <p className="text-center text-sm font-medium text-emerald-600">
          Copied to your clipboard — paste it straight into your email client.
        </p>
      )}
    </section>
  );
}
