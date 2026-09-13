"use client";

/**
 * Hero — homepage top section.
 * H1 is the globally-unique PRD §3.1 headline; the primary CTA routes to /tool
 * and fires the `cta_click` GA4 event (PRD §8.2 funnel metric).
 */

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CTA } from "@/lib/i18n/british-english";
import { trackEvent } from "@/lib/analytics/gtag";

export function Hero() {
  return (
    <section className="bg-paper">
      <div className="container-site flex flex-col items-center py-20 text-center sm:py-28">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Free · No sign-up · British English
        </p>

        {/* PRD §3.1 — the one and only H1 on the page */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl">
          Best AI Email Writer Tools for the UK: Free Generators, Cold Email
          Templates &amp; Writing Guides
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Turn a few keywords into a polished, professional email in seconds —
          written in natural British English, with the right tone for every
          recipient. No account, no cost, no fuss.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/tool"
            onClick={() => trackEvent("cta_click", { location: "hero" })}
            className="btn-primary"
          >
            {CTA.primary}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/guides" className="btn-secondary">
            Browse Writing Guides
          </Link>
        </div>

        <p className="mt-6 text-sm text-ink-mute">
          3 free emails per day · We never store your email content
        </p>
      </div>
    </section>
  );
}
