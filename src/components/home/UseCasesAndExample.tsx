/**
 * UseCases + Example — scenario guidance and a before/after showcase
 * (PRD §3.1 steps 2–3).
 * H2 #2: "Find Your Perfect AI Email Tool: From Daily Comms to B2B Outreach".
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const SCENARIOS = [
  {
    title: "Daily workplace comms",
    body: "Meeting requests, status updates, leave requests and polite nudges to your boss or colleagues — pitched at exactly the right level of formality.",
  },
  {
    title: "B2B outreach & cold email",
    body: "Opening lines that earn replies. Persuasive, concise cold emails and follow-ups written for British inboxes and British business etiquette.",
  },
  {
    title: "Clients, suppliers & money",
    body: "Quotes, order chasing, refund requests and invoice reminders — firm but courteous, so you protect the relationship and get results.",
  },
] as const;

const EXAMPLE_BEFORE =
  "ask supplier for 10% discount due to delayed shipment";

const EXAMPLE_AFTER = `Subject: Request for Discount Following Delayed Shipment

Dear [Supplier Name],

I hope you are well. I am writing regarding our recent order [Order Number], which arrived two weeks later than the agreed delivery date.

We value our working relationship and understand that delays can occasionally be unavoidable. However, the delay caused meaningful disruption to our own production schedule, and we had to absorb additional costs as a result.

In light of this, we would like to request a 10% discount on this order as a gesture of goodwill. We believe this is a fair reflection of the inconvenience caused, and it would allow us to continue our partnership with confidence.

I would be grateful if you could confirm your agreement by return, or do give me a ring if you would prefer to discuss this directly.

Thank you for your understanding, and we look forward to your reply.

Kind regards,
Alex
[Company Name]`;

export function UseCasesAndExample() {
  return (
    <section className="bg-paper py-20">
      <div className="container-site">
        {/* PRD §3.1 — H2 #2 */}
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Find Your Perfect AI Email Tool: From Daily Comms to B2B Outreach
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-ink-soft">
          Whatever lands in your inbox, there is a tone and a template for it.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SCENARIOS.map((scenario) => (
            <Card key={scenario.title}>
              <h3 className="text-lg font-semibold text-ink">{scenario.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{scenario.body}</p>
            </Card>
          ))}
        </div>

        {/* Before / after showcase (PRD §3.1 step 3) */}
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          <Card className="flex flex-col bg-mist">
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-mute">
              What you type
            </p>
            <p className="mt-4 rounded-xl border border-dashed border-ink/20 bg-paper p-5 font-mono text-sm text-ink-soft">
              &ldquo;{EXAMPLE_BEFORE}&rdquo;
            </p>
            <p className="mt-auto pt-6 text-sm text-ink-mute">
              One line is all it takes.
            </p>
          </Card>

          <Card className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              What you get
            </p>
            <pre className="mt-4 max-h-96 overflow-y-auto whitespace-pre-wrap rounded-xl bg-mist p-5 font-sans text-sm leading-relaxed text-ink">
              {EXAMPLE_AFTER}
            </pre>
            <Link
              href="/tool"
              className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
            >
              Try it with your own email
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
