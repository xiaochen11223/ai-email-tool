/**
 * Button — minimal, accessible button with brand/subtle variants.
 * Hover states include a gentle lift for tactile feedback.
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-card font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" &&
            "bg-brand-600 text-white shadow-soft hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lift active:translate-y-0",
          variant === "secondary" &&
            "border border-ink/10 bg-paper text-ink hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-soft active:translate-y-0",
          variant === "ghost" && "text-ink-soft hover:bg-mist hover:text-ink",
          size === "md" ? "px-5 py-2.5 text-sm" : "px-7 py-3.5 text-base",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
