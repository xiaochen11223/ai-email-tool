/**
 * /tool — the core product page (P0). Statically rendered shell; all
 * interactivity lives in the client-side EmailTool component.
 */

import type { Metadata } from "next";
import { EmailTool } from "@/components/tool/EmailTool";

export const metadata: Metadata = {
  title: "Free AI Email Writer — Professional British English Emails in Seconds",
  description:
    "Write professional business emails in perfect British English. Free AI email generator — no sign-up, 3 free emails a day.",
  alternates: { canonical: "/tool" },
};

export default function ToolPage() {
  return (
    <div className="bg-mist py-14 sm:py-20">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Free AI Email Writer
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Tell us what your email needs to achieve — we&apos;ll write it in
            polished British English. No sign-up, 3 free emails a day.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl rounded-card border border-ink/5 bg-paper p-6 shadow-soft sm:p-8">
          <EmailTool />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-ink-mute">
          Your input is used only to generate this email and is never stored or
          used for training. See our{" "}
          <a href="/privacy" className="text-brand-600 underline underline-offset-2 hover:text-brand-700">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
