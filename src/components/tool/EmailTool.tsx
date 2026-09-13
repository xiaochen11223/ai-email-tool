"use client";

/**
 * EmailTool — client container for /tool. Owns the generate → display →
 * copy/regenerate state machine (PRD §3.2 flow) and calls POST /api/generate.
 *
 * GA4 funnel events (PRD §8.2): generate_click, generate_success, copy_click.
 * All status changes are announced via an aria-live region (WCAG 2.1 AA).
 */

import { useState } from "react";
import { EmailForm } from "./EmailForm";
import { EmailResult } from "./EmailResult";
import type { GenerateEmailInput } from "@/lib/validation";
import type { GenerateEmailResponse, GeneratedEmail } from "@/types";
import { MESSAGES } from "@/lib/i18n/british-english";
import { trackEvent } from "@/lib/analytics/gtag";

export function EmailTool() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<GeneratedEmail | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Last submitted values — reused by "Try Another Tone".
  const [lastInput, setLastInput] = useState<GenerateEmailInput | null>(null);

  async function generate(values: GenerateEmailInput) {
    setLoading(true);
    setError(null);
    trackEvent("generate_click", { tone: values.tone ?? "formal" });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as GenerateEmailResponse;

      if (!res.ok || !json.success || !json.data) {
        setError(json.error?.message ?? MESSAGES.genericError);
        // Surface the remaining count even on rate-limit responses.
        if (typeof json.remaining === "number") setRemaining(json.remaining);
        return;
      }

      setEmail(json.data);
      setLastInput(values);
      if (typeof json.remaining === "number") setRemaining(json.remaining);
      trackEvent("generate_success", { tone: json.data.tone, word_count: json.data.wordCount });
    } catch {
      setError(MESSAGES.genericError);
    } finally {
      setLoading(false);
    }
  }

  const handleRegenerate = () => {
    if (lastInput) void generate(lastInput);
  };

  const showForm = !email || loading || !!error;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Screen-reader status announcements */}
      <div aria-live="polite" className="sr-only">
        {loading ? "Generating your email, please wait." : ""}
        {email && !loading ? "Your email is ready." : ""}
        {error ? `Error: ${error}` : ""}
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-card border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      {showForm ? (
        <EmailForm onSubmit={generate} loading={loading} />
      ) : (
        email && (
          <EmailResult
            email={email}
            remaining={remaining ?? 0}
            loading={loading}
            onRegenerate={handleRegenerate}
            onBackToEdit={() => setEmail(null)}
          />
        )
      )}

      {/* Loading skeleton while the AI writes */}
      {loading && (
        <div className="mt-8 animate-pulse space-y-3" aria-hidden="true">
          <div className="h-4 w-1/3 rounded bg-mist" />
          <div className="h-4 w-full rounded bg-mist" />
          <div className="h-4 w-full rounded bg-mist" />
          <div className="h-4 w-2/3 rounded bg-mist" />
        </div>
      )}

      {!showForm && remaining !== null && remaining > 0 && null}
    </div>
  );
}
