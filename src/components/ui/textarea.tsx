/**
 * Textarea — multi-line input styled to match <Input>.
 */

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "w-full rounded-card border border-ink/15 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink-mute transition-colors focus:border-brand-500 disabled:opacity-50",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
