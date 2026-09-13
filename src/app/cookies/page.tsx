/**
 * Cookie Policy (/cookies) — P0 legal page.
 * Lists every cookie/storage item, its purpose and retention, and explains
 * the consent banner mechanism (PRD §5.2).
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Which cookies EmailWriterAI.co.uk uses, why, and how to control them.",
  alternates: { canonical: "/cookies" },
};

const COOKIES = [
  {
    name: "ewai_consent",
    type: "Strictly necessary",
    purpose: "Remembers your cookie consent choice (accept or reject analytics).",
    duration: "1 year",
  },
  {
    name: "_ga, _ga_*",
    type: "Analytics (consent required)",
    purpose: "Google Analytics 4 — anonymised usage statistics. Set only if you click “Accept” on the cookie banner.",
    duration: "Up to 2 years",
  },
] as const;

export default function CookiesPage() {
  return (
    <div className="bg-paper py-16">
      <div className="container-site max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Cookie Policy</h1>
        <p className="mt-3 text-sm text-ink-mute">Last updated: 11/09/2026</p>

        <div className="legal-prose mt-8">
          <h2>1. What cookies we use</h2>
          <p>
            We keep cookies to an absolute minimum. Analytics cookies are <strong>off by
            default</strong> and are only set after you explicitly accept them on the consent
            banner.
          </p>

          <div className="overflow-x-auto">
            <table className="mb-4 w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left">
                  <th className="py-2 pr-4 font-semibold text-ink">Cookie</th>
                  <th className="py-2 pr-4 font-semibold text-ink">Type</th>
                  <th className="py-2 pr-4 font-semibold text-ink">Purpose</th>
                  <th className="py-2 font-semibold text-ink">Duration</th>
                </tr>
              </thead>
              <tbody>
                {COOKIES.map((c) => (
                  <tr key={c.name} className="border-b border-ink/5 align-top">
                    <td className="py-2 pr-4 font-mono text-xs text-ink">{c.name}</td>
                    <td className="py-2 pr-4 text-ink-soft">{c.type}</td>
                    <td className="py-2 pr-4 text-ink-soft">{c.purpose}</td>
                    <td className="py-2 text-ink-soft">{c.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>2. How consent works</h2>
          <p>
            When you first visit, Google Analytics runs in consent mode with analytics storage
            denied — no analytics cookies are written and only anonymous, cookieless pings are
            sent. Clicking <strong>Accept</strong> enables analytics cookies; clicking
            <strong> Reject</strong> keeps them off. Your choice is remembered for one year.
          </p>

          <h2>3. Changing your mind</h2>
          <p>
            To change your choice, clear this site&apos;s cookies in your browser settings and
            reload the page — the banner will appear again. You can also block cookies entirely in
            your browser; the email tool will still work.
          </p>

          <h2>4. Other storage</h2>
          <p>
            We use your browser&apos;s local storage only to mirror your consent choice. We do not
            use local storage for tracking.
          </p>

          <h2>5. Contact</h2>
          <p>
            Cookie questions: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
