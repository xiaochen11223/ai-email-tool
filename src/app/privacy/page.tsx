/**
 * Privacy Policy (/privacy) — UK GDPR transparency page (P0).
 * Content requirements per PRD §5.2: who we are, what we collect, why,
 * third-party processors (named), retention, user rights, cookies, contact.
 * Static page — review the legal copy before launch.
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How EmailWriterAI.co.uk handles your data: what we collect, why, who we share it with, and your rights under UK GDPR.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper py-16">
      <div className="container-site max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-ink-mute">Last updated: 11/09/2026</p>

        <div className="legal-prose mt-8">
          <h2>1. Who we are</h2>
          <p>
            EmailWriterAI.co.uk (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a free AI email writing tool
            for UK professionals. We are the data controller for the limited data described in
            this policy. You can reach us at any time at{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>

          <h2>2. What data we collect</h2>
          <ul>
            <li>
              <strong>Email prompts you type in.</strong> The purpose, recipient, tone, name and
              company details you enter are sent to our AI providers solely to generate your email.
              They are <strong>never stored</strong> on our servers and <strong>never used to
              train models</strong>.
            </li>
            <li>
              <strong>IP address.</strong> Used only to enforce the free usage limit (3 emails per
              day) and to protect the service from abuse. Stored as an anonymous counter with a
              24-hour expiry.
            </li>
            <li>
              <strong>Usage statistics.</strong> If you accept analytics cookies, Google Analytics
              4 collects anonymised usage data (pages visited, button clicks). This is off by
              default until you consent.
            </li>
          </ul>

          <h2>3. Why we process this data</h2>
          <ul>
            <li>
              <strong>Generating your email</strong> — performed at your request (your action of
              clicking &ldquo;Generate&rdquo; is the legal basis).
            </li>
            <li>
              <strong>Preventing abuse</strong> — rate limiting by IP address is in our legitimate
              interest to keep the free service available and affordable.
            </li>
            <li>
              <strong>Improving the service</strong> — anonymised analytics, only with your
              explicit consent.
            </li>
          </ul>

          <h2>4. Who we share data with (third-party processors)</h2>
          <ul>
            <li>
              <strong>Trae (TRAE)</strong> — primary AI provider that generates email text from
              your prompt.
            </li>
            <li>
              <strong>OpenAI (GPT-4o-mini)</strong> — fallback AI provider, used only if the
              primary provider is unavailable. Training on API data is disabled.
            </li>
            <li>
              <strong>Vercel, Inc.</strong> — hosting and edge computing platform; processes
              requests and stores the 24-hour IP rate-limit counter (Vercel KV).
            </li>
            <li>
              <strong>Google LLC (Google Analytics 4)</strong> — anonymised usage analytics,
              loaded only after you accept analytics cookies.
            </li>
            <li>
              <strong>CookieYes / Osano</strong> — if enabled, manages your cookie consent
              preferences.
            </li>
          </ul>

          <h2>5. How long we keep data</h2>
          <ul>
            <li>Email prompts and generated content: <strong>not retained</strong> — processed in memory and discarded.</li>
            <li>IP rate-limit counters: <strong>24 hours</strong>, then automatically deleted.</li>
            <li>Security logs (IP, timestamp, endpoint only — never email content): up to <strong>7 days</strong>.</li>
            <li>Analytics data: per Google Analytics default retention settings.</li>
          </ul>

          <h2>6. Your rights under UK GDPR</h2>
          <p>
            You have the right to access, rectify, erase, restrict or object to processing of your
            personal data, and the right to data portability. Because we do not store your email
            content or maintain accounts, most requests are satisfied by design — there is simply
            nothing held about you beyond a short-lived anonymous counter. To exercise any right,
            email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>. You also have the
            right to complain to the Information Commissioner&apos;s Office (ICO) at{" "}
            <a href="https://ico.org.uk/" rel="noopener noreferrer" target="_blank">ico.org.uk</a>.
          </p>

          <h2>7. Cookies</h2>
          <p>
            We use a small number of strictly necessary cookies and, with your consent, analytics
            cookies. Full details are in our <a href="/cookies">Cookie Policy</a>.
          </p>

          <h2>8. Security</h2>
          <p>
            All traffic is encrypted in transit (HTTPS/TLS 1.2+). API keys are held only in
            server-side environment variables and are never exposed to the browser.
          </p>

          <h2>9. Children</h2>
          <p>
            This service is a business tool and is not directed at anyone under 16. We do not
            knowingly collect data from children.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            If we change how we handle data, we will update this page and revise the
            &ldquo;last updated&rdquo; date above.
          </p>
        </div>
      </div>
    </div>
  );
}
