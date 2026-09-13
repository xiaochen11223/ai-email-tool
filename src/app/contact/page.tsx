/**
 * Contact (/contact) — P1 page. MVP uses a simple mailto channel (PRD §6
 * rules out a database-backed contact form); the email address doubles as the
 * GDPR contact point.
 */

import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the EmailWriterAI.co.uk team — feedback, questions, privacy requests.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-mist py-16 sm:py-24">
      <div className="container-site max-w-prose text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Contact Us</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Questions, feedback, a typo that&apos;s bothering you, or a privacy
          request — we read everything.
        </p>

        <div className="mx-auto mt-10 max-w-md rounded-card border border-ink/5 bg-paper p-8 shadow-soft">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <Mail className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-ink">Email us directly</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            The fastest way to reach us. We aim to reply within two working days.
          </p>
          <a
            href={`mailto:${SITE.contactEmail}`}
            className="btn-primary mt-6 w-full"
          >
            {SITE.contactEmail}
          </a>
        </div>

        <p className="mt-8 text-sm text-ink-mute">
          For privacy or data requests, please mention &ldquo;GDPR&rdquo; in
          your subject line so we can prioritise it.
        </p>
      </div>
    </div>
  );
}
