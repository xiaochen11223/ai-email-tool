/**
 * Input / Textarea / Select — form controls with consistent styling.
 * Every control expects an associated <Label> (WCAG 2.1 AA).
 */

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-card border border-ink/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-mute transition-colors focus:border-brand-500 disabled:opacity-50";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(baseField, className)} {...props} />
  )
);
Input.displayName = "Input";
