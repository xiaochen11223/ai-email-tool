/**
 * CookieYesLoader — optional third-party consent banner.
 * Rendered only when NEXT_PUBLIC_COOKIEYES_SITE_CODE is set; in that case the
 * built-in CookieBanner stays hidden (single source of consent).
 */

import Script from "next/script";

export function CookieYesLoader() {
  const siteCode = process.env.NEXT_PUBLIC_COOKIEYES_SITE_CODE;
  if (!siteCode) return null;

  return (
    <Script
      id="cookieyes"
      src={`https://cdn.cookieyes.com/client_data/${siteCode}/script.js`}
      strategy="beforeInteractive"
    />
  );
}
