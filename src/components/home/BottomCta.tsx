"use client";

/**
 * BottomCta — homepage closing section (PRD §3.1 step 5).
 * H2 #4: "Start Exploring Top Tools & Writing Guides" — routes traffic to the
 * tool and the guides collection.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/lib/i18n/british-english";
import { trackEvent } from "@/lib/analytics/gtag";

export function BottomCta() {
  return (
    <section className="bg-paper py-20">
      <div className="container-site text-center">
        {/* PRD §3.1 — H2 #4 */}
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Start Exploring Top Tools &amp; Writing Guides
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">
          Jump straight into the free email writer, or sharpen your skills with
          our British business writing guides first.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/tool"
            onClick={() => trackEvent("cta_click", { location: "bottom" })}
            className="btn-primary"
          >
            {CTA.primary}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/guides" className="btn-secondary">
            Read the Writing Guides
          </Link>
        </div>
      </div>
    </section>
  );
}
