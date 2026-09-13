/**
 * GoogleAnalytics — loads gtag.js with Consent Mode v2 defaulted to "denied".
 *
 * The inline bootstrap snippet requires the 'unsafe-inline' CSP allowance
 * declared in vercel.json. Analytics cookies are never written until the user
 * explicitly accepts via the cookie banner (see useCookieConsent).
 */

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics/gtag";

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-consent-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
