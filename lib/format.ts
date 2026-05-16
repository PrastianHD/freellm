export function formatRate(n?: number | null): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return String(n);
}

export function formatContext(n?: number): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

import type { QuotaUnit, QuotaWindow } from "@/types/provider";

const UNIT_PREFIX: Record<QuotaUnit, string> = {
  usd: "$",
  tokens: "",
  requests: "",
  actions: "",
  messages: "",
  credits: "",
};

const UNIT_SUFFIX: Record<QuotaUnit, string> = {
  usd: "",
  tokens: " tokens",
  requests: " req",
  actions: " actions",
  messages: " msg",
  credits: " cr",
};

export function formatQuotaAmount(amount: number, unit: QuotaUnit): string {
  const compact =
    amount >= 1_000_000
      ? `${(amount / 1_000_000).toFixed(1)}M`
      : amount >= 1_000
      ? `${(amount / 1_000).toFixed(amount >= 10_000 ? 0 : 1)}k`
      : amount % 1 !== 0
      ? amount.toFixed(2)
      : String(amount);
  return `${UNIT_PREFIX[unit]}${compact}${UNIT_SUFFIX[unit]}`;
}

export function formatQuotaWindow(w: QuotaWindow): string {
  return `${formatQuotaAmount(w.amount, w.unit)} / ${w.windowLabel}`;
}
