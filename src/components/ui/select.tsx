/**
 * Select — styled native select (best accessibility, works everywhere).
 */

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "w-full appearance-none rounded-card border border-ink/15 bg-paper px-4 py-3 text-base text-ink transition-colors focus:border-brand-500 disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Select.displayName = "Select";
