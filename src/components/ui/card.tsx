/**
 * Card — soft-shadow, 16px-radius surface used across marketing and tool pages.
 */

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-card border border-ink/5 bg-paper p-6 shadow-soft", className)}
      {...props}
    />
  );
}
