/**
 * About (/about) — P1 trust page: what the tool is, who it's for, and how it
 * handles data. Static.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/lib/i18n/british-english";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why we built EmailWriterAI.co.uk — a free, privacy-first AI email writer tuned for British English.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-paper py-16">
      <div className="container-site max-w-prose">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          About EmailWriterAI.co.uk
        </h1>

        <div className="legal-prose mt-8">
          <p className="text-lg">
            Writing a good business email shouldn&apos;t take twenty minutes of drafting,
            deleting and second-guessing. We built EmailWriterAI.co.uk so that UK professionals,
            sales teams and freelancers can turn a rough idea into a polished, properly British
            email in seconds.
          </p>

          <h2>Why British English matters</h2>
          <p>
            Most AI writing tools default to American English. &ldquo;Vacation&rdquo; instead of
            &ldquo;holiday&rdquo;, &ldquo;zip code&rdquo; instead of &ldquo;postcode&rdquo; — small
            tells that quietly undermine a professional email sent to a British reader. Our writer
            is constrained to British spelling, vocabulary, date formats and business etiquette,
            and every release is spot-checked against a 50-email quality checklist.
          </p>

          <h2>Privacy-first by design</h2>
          <p>
            There are no accounts, no databases of your writing, and no training on your words.
            Your prompt travels to our AI providers, your email comes back, and nothing is kept.
            We think that&apos;s how a writing tool should behave.
          </p>

          <h2>Who it&apos;s for</h2>
          <ul>
            <li>UK professionals who want every email to land with the right tone.</li>
            <li>B2B and export sales teams writing outreach and follow-ups to British inboxes.</li>
            <li>Freelancers and small business owners without a copywriter on call.</li>
            <li>Anyone writing in English as a second language who wants cultural reassurance.</li>
          </ul>

          <h2>Get in touch</h2>
          <p>
            Feedback, corrections and ideas are always welcome via our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>

        <Link href="/tool" className="btn-primary mt-10">
          {CTA.primary}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
