/**
 * Root layout — applies global styles, semantic <header>/<main>/<footer>,
 * the cookie consent banner, CookieYes (when configured) and GA4 with
 * Consent Mode defaulted to denied.
 */

import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { CookieYesLoader } from "@/components/layout/CookieYesLoader";
import { GoogleAnalytics } from "@/components/layout/GoogleAnalytics";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.homeTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.homeDescription,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#274be3",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-screen flex-col font-sans">
        <GoogleAnalytics />
        <CookieYesLoader />

        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
