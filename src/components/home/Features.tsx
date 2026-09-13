/**
 * Features — homepage selling-point cards (PRD §3.1 step 2).
 * H2 #1: "Fast, Reliable AI Email Writers for UK Professionals".
 */

import { Clock, ShieldCheck, Languages, MousePointerClick } from "lucide-react";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Clock,
    title: "From blank page to sent in seconds",
    body: "Describe what you need in plain words and get a complete, ready-to-send email — subject line included — in under ten seconds.",
  },
  {
    icon: Languages,
    title: "Genuinely British English",
    body: "Colour, organise, centre. Our writer uses British spelling, vocabulary and date formats — never Americanisms that undermine your credibility.",
  },
  {
    icon: MousePointerClick,
    title: "No sign-up, ever",
    body: "Open the page, write your email, copy it, done. No accounts, no passwords, no onboarding flows standing between you and a sent email.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    body: "Your prompts are used only to generate your email and are never stored or used for training. Fully aligned with UK GDPR.",
  },
] as const;

export function Features() {
  return (
    <section className="bg-mist py-20">
      <div className="container-site">
        {/* PRD §3.1 — H2 #1 */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Fast, Reliable AI Email Writers for UK Professionals
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink-soft">
          Built for busy inboxes: client follow-ups, supplier negotiations,
          internal updates and everything in between.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lift">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
