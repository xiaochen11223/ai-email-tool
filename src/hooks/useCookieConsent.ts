"use client";

/**
 * useCookieConsent — manages the analytics-consent lifecycle.
 *
 * GDPR/PECR model (PRD §5.2): analytics cookies are OFF by default. We store
 * the user's choice in a first-party cookie + localStorage mirror, and update
 * Google Consent Mode accordingly. Only after an explicit "Accept" do we set
 * `analytics_storage: granted`.
 */

import { useCallback, useEffect, useState } from "react";
import { grantConsent, denyConsent } from "@/lib/analytics/gtag";

export type ConsentState = "pending" | "accepted" | "rejected";

const CONSENT_COOKIE = "ewai_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function readStoredConsent(): ConsentState {
  if (typeof document === "undefined") return "pending";
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(\\w+)`));
  if (match?.[1] === "accepted" || match?.[1] === "rejected") return match[1];
  return "pending";
}

function persistConsent(state: Exclude<ConsentState, "pending">) {
  document.cookie = `${CONSENT_COOKIE}=${state}; max-age=${ONE_YEAR_SECONDS}; path=/; SameSite=Lax; Secure`;
  try {
    localStorage.setItem(CONSENT_COOKIE, state);
  } catch {
    /* storage unavailable — cookie is the source of truth */
  }
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>("pending");

  // Read the stored choice on mount and apply it to Consent Mode.
  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    if (stored === "accepted") grantConsent();
    if (stored === "rejected") denyConsent();
  }, []);

  const accept = useCallback(() => {
    persistConsent("accepted");
    grantConsent();
    setConsent("accepted");
  }, []);

  const reject = useCallback(() => {
    persistConsent("rejected");
    denyConsent();
    setConsent("rejected");
  }, []);

  return { consent, accept, reject };
}
