"use client";

/**
 * ToneSelector — segmented control for the five PRD tones.
 * Implemented as a radio-style button group for fast, keyboard-accessible
 * selection; wired into react-hook-form via setValue.
 */

import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TONE_OPTIONS, type Tone } from "@/types";
import { TONE_LABELS } from "@/lib/constants";
import type { GenerateEmailInput } from "@/lib/validation";
import { cn } from "@/lib/utils";

interface ToneSelectorProps {
  watch: UseFormWatch<GenerateEmailInput>;
  setValue: UseFormSetValue<GenerateEmailInput>;
  disabled?: boolean;
}

export function ToneSelector({ watch, setValue, disabled }: ToneSelectorProps) {
  const current = (watch("tone") ?? "formal") as Tone;

  return (
    <div
      role="radiogroup"
      aria-label="Tone of voice"
      className="flex flex-wrap gap-2"
    >
      {TONE_OPTIONS.map((tone) => {
        const active = current === tone;
        return (
          <button
            key={tone}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={disabled}
            onClick={() => setValue("tone", tone, { shouldDirty: true })}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150",
              active
                ? "border-brand-600 bg-brand-600 text-white shadow-soft"
                : "border-ink/15 bg-paper text-ink-soft hover:border-brand-400 hover:text-ink",
              disabled && "opacity-50"
            )}
          >
            {TONE_LABELS[tone]}
          </button>
        );
      })}
    </div>
  );
}
