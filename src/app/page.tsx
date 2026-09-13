/**
 * Homepage (/) — statically generated landing page.
 * Structure follows PRD §3.1 exactly: Hero (H1) → Features (H2#1) →
 * Use cases & example (H2#2) → Trust (H2#3) → Bottom CTA (H2#4).
 * SEO title/description come from the root layout defaults (SITE constants).
 */

import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { UseCasesAndExample } from "@/components/home/UseCasesAndExample";
import { TrustSection } from "@/components/home/TrustSection";
import { BottomCta } from "@/components/home/BottomCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <UseCasesAndExample />
      <TrustSection />
      <BottomCta />
    </>
  );
}
