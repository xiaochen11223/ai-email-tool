"use client";

/**
 * useCopyToClipboard — copies text and exposes a transient "copied" flag
 * for toast/tick feedback. Falls back to the legacy execCommand path for
 * older browsers (PRD §5.5 browser support).
 */

import { useCallback, useRef, useState } from "react";

export function useCopyToClipboard(resetDelayMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        // Legacy fallback (e.g. older Safari / non-secure contexts).
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          ok = document.execCommand("copy");
        } catch {
          ok = false;
        }
        document.body.removeChild(ta);
      }

      if (ok) {
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), resetDelayMs);
      }
      return ok;
    },
    [resetDelayMs]
  );

  return { copied, copy };
}
