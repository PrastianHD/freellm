import { providers } from "@/data/providers";
import { ProviderExplorer } from "@/components/providers/provider-explorer";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  const totalModels = providers.reduce((acc, p) => acc + p.models.length, 0);
  const openaiCompat = providers.filter((p) => p.openaiCompatible).length;

  return (
    <>
      <SiteHeader />

      {/* Editorial hero — asymmetric, oversized headline + sticker stats */}
      <section className="border-b-2 border-border bg-[hsl(36_60%_92%)]">
        <div className="container mx-auto grid grid-cols-1 gap-7 py-9 sm:py-12 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-8">
            <div className="inline-block -rotate-1 rounded-sm border-2 border-border bg-primary px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-primary-foreground shadow-brutal-sm sm:px-3 sm:text-xs">
              LLM untuk AI Agent & Coding CLI
            </div>
            <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-tight xs:text-[2.75rem] sm:text-5xl md:mt-5 md:text-7xl">
              Otak gratis buat
              <br />
              <span className="font-display italic font-normal text-primary tracking-normal">
                Claude Code
              </span>{" "}
              & agent
            </h1>
            <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base md:mt-5 md:text-lg">
              Provider LLM yang bisa di-plug ke Claude Code, Cline, Cursor, atau
              agent custom. Lengkap dengan rate limit, syarat sign-up,
              kompatibilitas klien, dan kebijakan data.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 md:col-span-4 md:grid-cols-1 md:gap-3">
            <Sticker
              value={String(providers.length)}
              label="Providers"
              tone="primary"
              rotate={-2}
            />
            <Sticker
              value={String(totalModels)}
              label="Models"
              tone="accent"
              rotate={1.5}
            />
            <Sticker
              value={String(openaiCompat)}
              label="OpenAI"
              fullLabel="OpenAI-compatible"
              tone="dark"
              rotate={-1}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto py-8 md:py-10">
        <ProviderExplorer providers={providers} />
      </main>
    </>
  );
}

function Sticker({
  value,
  label,
  fullLabel,
  tone,
  rotate,
}: {
  value: string;
  label: string;
  fullLabel?: string;
  tone: "primary" | "accent" | "dark";
  rotate: number;
}) {
  const tones = {
    primary: "bg-primary text-primary-foreground",
    accent: "bg-amber-300 text-amber-950",
    dark: "bg-foreground text-background",
  } as const;
  return (
    <div
      style={{ transform: `rotate(${rotate}deg)` }}
      className={`flex flex-col items-start justify-between gap-0.5 rounded-md border-2 border-border px-3 py-2.5 shadow-brutal sm:flex-row sm:items-baseline sm:gap-3 sm:px-4 sm:py-3 ${tones[tone]}`}
    >
      <div className="text-3xl font-black tabular-nums leading-none sm:text-4xl md:text-5xl">
        {value}
      </div>
      <div className="text-[9px] font-black uppercase tracking-widest opacity-90 sm:text-[10px]">
        <span className="md:hidden">{label}</span>
        <span className="hidden md:inline">{fullLabel ?? label}</span>
      </div>
    </div>
  );
}
