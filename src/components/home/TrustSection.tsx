/**
 * TrustSection — homepage trust signals (PRD §3.1 step 4).
 * H2 #3: "100% British English & GDPR-Compliant Email Practices".
 */

import { BadgeCheck, Lock, FileText } from "lucide-react";
import Link from "next/link";

const TRUST_POINTS = [
  {
    icon: BadgeCheck,
    title: "100% British English",
    body: "Every email is generated with British spelling, vocabulary, date formats (DD/MM/YYYY) and business etiquette — reviewed against a 50-sample quality checklist before launch.",
  },
  {
    icon: Lock,
    title: "GDPR-compliant by design",
    body: "We store no email content, run no user accounts and keep only a 24-hour anonymous usage counter to prevent abuse. Analytics cookies load only with your consent.",
  },
  {
    icon: FileText,
    title: "Transparent policies",
    body: "Our privacy, terms and cookie policies name every third-party processor we use — no vague clauses, no hidden data sharing.",
  },
] as const;

export function TrustSection() {
  return (
    <section className="bg-mist py-20">
      <div className="container-site">
        {/* PRD §3.1 — H2 #3 */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          100% British English &amp; GDPR-Compliant Email Practices
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="rounded-card bg-paper p-6 shadow-soft">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{point.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-soft">
          Read the details in our{" "}
          <Link href="/privacy" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookies" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
            Cookie Policy
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
