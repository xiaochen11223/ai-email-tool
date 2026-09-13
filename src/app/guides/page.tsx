/**
 * Writing Guides (/guides) — P2 content hub.
 * MVP scope: a static index that anchors the homepage's content links. Guides
 * marked "Coming soon" will be published in weeks 2–4 post-launch (PRD §4.1).
 */

import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CTA } from "@/lib/i18n/british-english";

export const metadata: Metadata = {
  title: "British Business Email Writing Guides",
  description:
    "Practical guides to writing professional British business emails: cold outreach, follow-ups, apologies, complaints and more.",
  alternates: { canonical: "/guides" },
};

const GUIDES = [
  {
    title: "How to write a cold email that actually gets replies",
    description:
      "Openers, subject lines and calls to action tuned for British inboxes.",
  },
  {
    title: "The art of the polite follow-up",
    description:
      "How to nudge without nagging — timing, phrasing and when to stop.",
  },
  {
    title: "Formal vs friendly: choosing the right tone",
    description:
      "A practical framework for matching tone to recipient, every time.",
  },
  {
    title: "Complaint emails that get results",
    description:
      "Firm, courteous and effective — how to complain like a professional.",
  },
] as const;

export default function GuidesPage() {
  return (
    <div className="bg-paper py-16">
      <div className="container-site">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            British Business Email Writing Guides
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Short, practical guides to writing emails that sound natural,
            professional and unmistakably British.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {GUIDES.map((guide) => (
            <Card key={guide.title} className="flex flex-col">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-ink">{guide.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {guide.description}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-mute">
                Coming soon
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-14 rounded-card bg-mist p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">
            Can&apos;t wait? Let the AI write it for you.
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-ink-soft">
            Our free email writer already applies everything these guides teach.
          </p>
          <Link href="/tool" className="btn-primary mt-6">
            {CTA.primary}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
