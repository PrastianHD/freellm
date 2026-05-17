import Link from "next/link";
import { Gauge, KeyRound, CreditCard, ArrowUpRight, Zap, Wrench, Wallet, Clock } from "lucide-react";
import { AccessBadge, ModalityBadge } from "@/components/providers/badges";
import { Badge } from "@/components/ui/badge";
import { formatRate, formatQuotaAmount } from "@/lib/format";
import { cn } from "@/lib/utils";
import { withBasePath } from "@/lib/asset-path";
import { AUTH_METHOD_LABEL } from "@/lib/labels";
import type { ClientSupportLevel, Modality, Provider } from "@/types/provider";

const VARIANTS = [
  { bg: "bg-card", stripe: "bg-primary", chip: "bg-primary text-primary-foreground" },
  { bg: "bg-[hsl(36_60%_92%)]", stripe: "bg-[hsl(22_30%_14%)]", chip: "bg-foreground text-background" },
  { bg: "bg-[hsl(22_70%_90%)]", stripe: "bg-amber-400", chip: "bg-amber-400 text-amber-950" },
  { bg: "bg-card", stripe: "bg-emerald-400", chip: "bg-emerald-400 text-emerald-950" },
] as const;

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

export function ProviderCard({
  provider,
  variantIndex = 0,
  featured = false,
}: {
  provider: Provider;
  variantIndex?: number;
  featured?: boolean;
}) {
  const v = VARIANTS[variantIndex % VARIANTS.length]!;
  const modalities = Array.from(
    new Set(provider.models.flatMap((m) => m.modalities))
  ).slice(0, featured ? 6 : 3) as Modality[];

  const isCreditBased = provider.pricingModel === "credit-based";
  const rpm = provider.globalRateLimit?.rpm;
  const rpd = provider.globalRateLimit?.rpd;
  const primaryQuota = provider.quota?.windows[0];
  const secondaryQuota = provider.quota?.windows[1];

  return (
    <Link
      href={`/providers/${provider.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-md border-2 border-border shadow-brutal shadow-brutal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        v.bg
      )}
    >
      <div className={cn("h-2 w-full border-b-2 border-border", v.stripe)} />

      <div className={cn("p-4 sm:p-5", featured && "p-5 sm:p-6 md:p-7")}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={cn(
                "grid shrink-0 place-items-center overflow-hidden rounded-sm border-2 border-border font-black shadow-brutal-sm",
                provider.logo ? "bg-white" : v.chip,
                featured ? "h-12 w-12 text-xl sm:h-14 sm:w-14 sm:text-2xl" : "h-10 w-10 text-sm"
              )}
            >
              {provider.logo ? (
                <img
                  src={withBasePath(provider.logo)}
                  alt={`${provider.name} logo`}
                  className={cn(
                    "object-contain",
                    featured ? "h-9 w-9 sm:h-10 sm:w-10" : "h-7 w-7"
                  )}
                />
              ) : (
                initials(provider.name)
              )}
            </span>
            <div className="min-w-0">
              <h3
                className={cn(
                  "font-black tracking-tight leading-none truncate",
                  featured ? "text-xl sm:text-2xl md:text-3xl" : "text-lg"
                )}
              >
                {provider.name}
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <AccessBadge type={provider.accessType} />
                <ClaudeCodeChip level={provider.clientSupport?.claudeCode} />
                {provider.agentCapabilities?.toolCalling && (
                  <Badge variant="info" className="gap-1 text-[10px]">
                    <Wrench className="h-3 w-3" /> Tools
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <ArrowUpRight
            className={cn(
              "shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
              featured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5"
            )}
          />
        </div>

        <p
          className={cn(
            "mt-3 text-muted-foreground sm:mt-4",
            featured ? "text-sm sm:text-base md:text-lg max-w-2xl" : "line-clamp-2 text-sm"
          )}
        >
          {provider.description}
        </p>

        <div
          className={cn(
            "mt-4 grid gap-2 sm:mt-5 sm:gap-3",
            featured ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4" : "grid-cols-2"
          )}
        >
          {isCreditBased ? (
            <>
              <Stat
                label={primaryQuota ? primaryQuota.windowLabel.toUpperCase() : "QUOTA"}
                value={
                  primaryQuota
                    ? formatQuotaAmount(primaryQuota.amount, primaryQuota.unit)
                    : "—"
                }
                icon={<Wallet className="h-3 w-3" />}
              />
              <Stat
                label={secondaryQuota ? secondaryQuota.windowLabel.toUpperCase() : "RESET"}
                value={
                  secondaryQuota
                    ? formatQuotaAmount(secondaryQuota.amount, secondaryQuota.unit)
                    : provider.quota?.resetPolicy === "rolling"
                    ? "ROLLING"
                    : "—"
                }
                icon={<Clock className="h-3 w-3" />}
              />
            </>
          ) : (
            <>
              <Stat label="RPM" value={formatRate(rpm)} icon={<Gauge className="h-3 w-3" />} />
              <Stat label="RPD" value={formatRate(rpd)} icon={<Gauge className="h-3 w-3" />} />
            </>
          )}
          {featured && (
            <Stat
              label="MODELS"
              value={String(provider.models.length)}
            />
          )}
          <Stat
            label="ACCESS"
            value={provider.apiKeyRequired ? "KEY" : "OPEN"}
            icon={<KeyRound className="h-3 w-3" />}
          />
          {featured && (
            <Stat
              label="CARD"
              value={provider.requiresCard ? "REQ" : "NO"}
              icon={<CreditCard className="h-3 w-3" />}
            />
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 sm:mt-5">
          {modalities.map((m, i) => (
            <span
              key={m}
              style={{
                ["--card-rot" as string]: `${(i % 2 === 0 ? -1 : 1) * 1.5}deg`,
              }}
              className="inline-block sm:[transform:rotate(var(--card-rot))]"
            >
              <ModalityBadge modality={m} />
            </span>
          ))}
          {provider.openaiCompatible && (
            <span className="inline-block sm:[transform:rotate(-2deg)]">
              <Badge variant="info">OpenAI-compat</Badge>
            </span>
          )}
          {isCreditBased && (
            <span className="inline-block sm:[transform:rotate(2deg)]">
              <Badge variant="warning" className="gap-1">
                <Wallet className="h-3 w-3" /> Credits
              </Badge>
            </span>
          )}
        </div>

        {provider.signup && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px]">
            {provider.signup.authMethods?.slice(0, 3).map((m) => (
              <Badge key={m} variant="outline">
                {AUTH_METHOD_LABEL[m]}
              </Badge>
            ))}
            {provider.signup.blocksFreeEmail && (
              <Badge variant="destructive">No gmail</Badge>
            )}
            {provider.signup.requiresCorporateEmail && (
              <Badge variant="warning">Corp email</Badge>
            )}
            {provider.signup.phoneVerification && (
              <Badge variant="warning">Phone OTP</Badge>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border-2 border-border bg-background/60 p-2">
      <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 font-black text-lg leading-none tabular-nums">
        {value}
      </div>
    </div>
  );
}

function ClaudeCodeChip({ level }: { level?: ClientSupportLevel }) {
  if (!level || level === "no") return null;
  const variant = level === "native" ? "success" : "warning";
  const label = level === "native" ? "Claude Code: Native" : "Claude Code: Proxy";
  return (
    <Badge variant={variant} className="gap-1 text-[10px]">
      <Zap className="h-3 w-3" />
      {label}
    </Badge>
  );
}
