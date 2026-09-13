/**
 * 404 — custom not-found page (PRD §4.2).
 * Exact copy from the PRD; the primary CTA routes lost visitors to /tool.
 */

import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { CTA } from "@/lib/i18n/british-english";

export default function NotFound() {
  return (
    <div className="bg-mist py-24 sm:py-32">
      <div className="container-site max-w-prose text-center">
        <p className="text-6xl font-bold tracking-tight text-brand-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Oops! This page has flown the coop.
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          We can&apos;t find the page you&apos;re looking for. But we can still
          help you write the perfect email.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/tool" className="btn-primary">
            {CTA.primary}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
          <Link href="/" className="btn-secondary">
            <Home className="h-5 w-5" aria-hidden="true" />
            {CTA.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
