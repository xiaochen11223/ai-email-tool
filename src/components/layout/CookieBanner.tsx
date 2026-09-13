"use client";

/**
 * CookieBanner — lightweight, self-hosted consent banner.
 *
 * Used by default. If NEXT_PUBLIC_COOKIEYES_SITE_CODE is configured, the
 * CookieYes banner is loaded in layout.tsx instead and this component renders
 * nothing (CookieYes then owns consent and Google Consent Mode updates).
 *
 * Behaviour: hidden until mounted (avoids hydration flash), blocks nothing on
 * the page, and persists the choice for a year. Links to /cookies (PRD §5.2).
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/hooks/useCookieConsent";

export function CookieBanner() {
  const { consent, accept, reject } = useCookieConsent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // CookieYes owns the banner when configured.
  if (process.env.NEXT_PUBLIC_COOKIEYES_SITE_CODE) return null;
  if (!mounted || consent !== "pending") return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-card border border-ink/10 bg-paper p-5 shadow-lift sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          We use strictly necessary cookies to run this site, and we&apos;d like
          to use analytics cookies to understand how it&apos;s used. Analytics
          cookies stay off unless you accept. Read our{" "}
          <Link
            href="/cookies"
            className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
          >
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="rounded-card border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-mist"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-card bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
