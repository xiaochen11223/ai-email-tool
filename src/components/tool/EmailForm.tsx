"use client";

/**
 * EmailForm — the /tool input form (PRD §3.2).
 * Fields: purpose (required, 10–500 chars, live counter), recipient, tone,
 * sender name, company. Client-side validation via react-hook-form + Zod
 * mirrors the server schema exactly.
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateEmailSchema, type GenerateEmailInput } from "@/lib/validation";
import { RECIPIENT_OPTIONS, type Recipient } from "@/types";
import { RECIPIENT_LABELS } from "@/lib/constants";
import { CTA } from "@/lib/i18n/british-english";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { ToneSelector } from "./ToneSelector";

interface EmailFormProps {
  onSubmit: (values: GenerateEmailInput) => void;
  loading: boolean;
}

export function EmailForm({ onSubmit, loading }: EmailFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GenerateEmailInput>({
    resolver: zodResolver(generateEmailSchema),
    defaultValues: { recipient: "unknown", tone: "formal" },
    mode: "onBlur",
  });

  const purpose = watch("purpose") ?? "";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Purpose — the only required field */}
      <div>
        <div className="flex items-baseline justify-between">
          <Label htmlFor="purpose">
            What should this email achieve? <span className="text-brand-600">*</span>
          </Label>
          <span
            className="text-xs tabular-nums text-ink-mute"
            aria-live="polite"
          >
            {purpose.length}/500
          </span>
        </div>
        <Textarea
          id="purpose"
          rows={4}
          maxLength={500}
          placeholder='e.g. "Ask my supplier for a 10% discount because the last shipment arrived two weeks late."'
          aria-invalid={!!errors.purpose}
          aria-describedby={errors.purpose ? "purpose-error" : "purpose-hint"}
          disabled={loading}
          {...register("purpose")}
        />
        <p id="purpose-hint" className="mt-1.5 text-xs text-ink-mute">
          10–500 characters. Plain English is fine — the AI handles the polish.
        </p>
        {errors.purpose && (
          <p id="purpose-error" role="alert" className="mt-1.5 text-sm font-medium text-red-600">
            {errors.purpose.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Recipient */}
        <div>
          <Label htmlFor="recipient">Who are you writing to?</Label>
          <Select id="recipient" disabled={loading} {...register("recipient")}>
            {RECIPIENT_OPTIONS.map((value: Recipient) => (
              <option key={value} value={value}>
                {RECIPIENT_LABELS[value]}
              </option>
            ))}
          </Select>
        </div>

        {/* Sender name */}
        <div>
          <Label htmlFor="senderName">Your name (optional)</Label>
          <Input
            id="senderName"
            type="text"
            maxLength={100}
            placeholder="Used for the sign-off"
            disabled={loading}
            {...register("senderName")}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Company */}
        <div>
          <Label htmlFor="companyName">Company name (optional)</Label>
          <Input
            id="companyName"
            type="text"
            maxLength={100}
            placeholder="Included below your name"
            disabled={loading}
            {...register("companyName")}
          />
        </div>

        {/* Tone */}
        <div>
          <Label id="tone-label">Tone of voice</Label>
          <ToneSelector watch={watch} setValue={setValue} disabled={loading} />
        </div>
      </div>

      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? CTA.generating : CTA.generate}
      </button>
    </form>
  );
}
