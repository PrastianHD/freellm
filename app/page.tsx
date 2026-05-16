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
        <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-8">
            <div className="inline-block -rotate-1 rounded-sm border-2 border-border bg-primary px-3 py-1 text-xs font-black uppercase tracking-wider text-primary-foreground shadow-brutal-sm">
              LLM untuk AI Agent & Coding CLI
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Otak gratis buat
              <br />
              <span className="font-display italic font-normal text-primary tracking-normal">
                Claude Code
              </span>{" "}
              & agent
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Provider LLM yang bisa di-plug ke Claude Code, Cline, Cursor, atau
              agent custom. Lengkap dengan rate limit, syarat sign-up,
              kompatibilitas klien, dan kebijakan data.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:col-span-4 md:grid-cols-1">
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
              label="OpenAI-compatible"
              tone="dark"
              rotate={-1}
            />
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-10">
        <ProviderExplorer providers={providers} />
      </main>
    </>
  );
}

function Sticker({
  value,
  label,
  tone,
  rotate,
}: {
  value: string;
  label: string;
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
      className={`flex items-baseline justify-between gap-3 rounded-md border-2 border-border px-4 py-3 shadow-brutal ${tones[tone]}`}
    >
      <div className="text-4xl font-black tabular-nums leading-none md:text-5xl">
        {value}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest opacity-90">
        {label}
      </div>
    </div>
  );
}
