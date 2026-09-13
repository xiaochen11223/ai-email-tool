/**
 * Footer — site-wide footer with navigation, legal links and contact email.
 * Legal links (privacy/terms/cookies) are required for UK GDPR transparency.
 */

import Link from "next/link";
import { Mail } from "lucide-react";
import { FOOTER_LEGAL_LINKS, NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/5 bg-mist">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Mail className="h-4 w-4" aria-hidden="true" />
            </span>
            EmailWriter<span className="text-brand-600">AI</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Free AI email writer for UK professionals. Professional British
            English emails in seconds — no sign-up, no fuss.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink">Legal</h2>
          <ul className="mt-4 space-y-2.5">
            {FOOTER_LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">
            Contact:{" "}
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="text-brand-600 underline underline-offset-2 hover:text-brand-700"
            >
              {SITE.contactEmail}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-ink/5 py-5 text-center text-xs text-ink-mute">
        © {year} {SITE.name}. All rights reserved. Made for British English.
      </div>
    </footer>
  );
}
