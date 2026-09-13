/**
 * Google Analytics 4 helpers with Consent Mode v2.
 *
 * Default state is `denied` (set in the GA snippet in
 * src/components/layout/GoogleAnalytics.tsx): before the user interacts with
 * the cookie banner, GA sends only anonymous, cookieless pings. Only an
 * explicit accept flips `analytics_storage` to `granted` (PRD §5.2).
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Safe wrapper — no-ops until the gtag script has loaded. */
export function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

export function grantConsent() {
  gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied", // we never use advertising cookies
  });
}

export function denyConsent() {
  gtag("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
  });
}

/** Custom event helper used for the PRD §8.2 funnel metrics. */
export function trackEvent(
  eventName: "generate_click" | "generate_success" | "copy_click" | "cta_click",
  params?: Record<string, string | number>
) {
  gtag("event", eventName, params);
}
