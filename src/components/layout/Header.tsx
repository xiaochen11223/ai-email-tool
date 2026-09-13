"use client";

/**
 * Header — sticky site header with primary navigation and the main CTA.
 * Mobile menu collapses behind an accessible toggle button.
 */

import Link from "next/link";
import { useState } from "react";
import { Mail, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { CTA } from "@/lib/i18n/british-english";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-ink"
          aria-label={`${SITE.name} home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
          </span>
          EmailWriter<span className="text-brand-600">AI</span>
          <span className="hidden text-sm font-medium text-ink-mute sm:inline">.co.uk</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tool"
            className="rounded-card bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lift"
          >
            {CTA.primary}
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="rounded-lg p-2 text-ink md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav className="border-t border-ink/5 bg-paper px-5 pb-6 pt-2 md:hidden" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/tool"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 w-full"
          >
            {CTA.primary}
          </Link>
        </nav>
      )}
    </header>
  );
}
