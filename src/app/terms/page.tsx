/**
 * Terms of Service (/terms) — P0 legal page.
 * Covers acceptable use, the AI-generated-content disclaimer, liability
 * limits and the age requirement (PRD §5.2 — not directed at under-16s).
 */

import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of EmailWriterAI.co.uk, the free AI email writer for UK professionals.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="bg-paper py-16">
      <div className="container-site max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Terms of Service</h1>
        <p className="mt-3 text-sm text-ink-mute">Last updated: 11/09/2026</p>

        <div className="legal-prose mt-8">
          <h2>1. The service</h2>
          <p>
            EmailWriterAI.co.uk provides a free AI-assisted email drafting tool. By using the site
            you agree to these terms. If you do not agree, please do not use the service.
          </p>

          <h2>2. Free usage allowance</h2>
          <p>
            Each visitor may generate up to 3 emails per day, free of charge, with no account
            required. We may adjust this allowance to keep the service sustainable; the current
            limit is always shown on the tool page.
          </p>

          <h2>3. Acceptable use</h2>
          <ul>
            <li>Do not use the service to generate unlawful, misleading, harassing or fraudulent content, including phishing or scam emails.</li>
            <li>Do not attempt to circumvent rate limits, scrape the service, or interfere with its operation.</li>
            <li>Do not submit personal data belonging to third parties without their knowledge.</li>
          </ul>

          <h2>4. AI-generated content</h2>
          <p>
            Emails are drafted by an AI model. While we tune it carefully for British English and
            professional etiquette, output may occasionally contain errors or inappropriate
            phrasing. <strong>You are responsible for reviewing every email before sending
            it.</strong> The service does not provide legal, financial or professional advice, and
            sending an AI-drafted email does not create any warranty that it is fit for your
            particular purpose.
          </p>

          <h2>5. Intellectual property</h2>
          <p>
            The emails generated for you are yours to use. The site, brand and underlying software
            remain our property and may not be copied or resold.
          </p>

          <h2>6. Availability and changes</h2>
          <p>
            The service is provided &ldquo;as is&rdquo;. We may modify, suspend or withdraw it at
            any time, and we do not guarantee uninterrupted availability.
          </p>

          <h2>7. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, we exclude liability for any loss or damage
            arising from your use of the service, including reliance on generated content. Nothing
            in these terms excludes liability that cannot be excluded by law.
          </p>

          <h2>8. Age requirement</h2>
          <p>
            The service is intended for users aged 16 and over.
          </p>

          <h2>9. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales, and the courts of England
            and Wales have exclusive jurisdiction.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
