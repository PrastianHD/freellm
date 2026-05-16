import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Trophy, Wallet } from "lucide-react";
import { getAllSlugs, getProvider } from "@/data/providers";
import {
  getModelRanking,
  SWE_BENCH_URL,
} from "@/data/swe-bench-rankings";
import { SiteHeader } from "@/components/layout/site-header";
import { AccessBadge, ModalityBadge } from "@/components/providers/badges";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { formatContext, formatRate, formatQuotaWindow } from "@/lib/format";
import { withBasePath } from "@/lib/asset-path";
import { SignupSection } from "@/components/providers/signup-section";
import { ClientSupportSection } from "@/components/providers/client-support-section";
import { AgentCapabilitiesSection } from "@/components/providers/agent-capabilities-section";
import type { Modality } from "@/types/provider";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default function ProviderDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const provider = getProvider(params.slug);
  if (!provider) notFound();

  const allModalities = Array.from(
    new Set(provider.models.flatMap((m) => m.modalities))
  ) as Modality[];

  const isCreditBased = provider.pricingModel === "credit-based";

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Semua provider
        </Link>

        <header className="mt-4 flex flex-col gap-3 border-b pb-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {provider.logo && (
                <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-md border-2 border-border bg-white shadow-brutal-sm">
                  <img
                    src={withBasePath(provider.logo)}
                    alt={`${provider.name} logo`}
                    className="h-9 w-9 object-contain"
                  />
                </span>
              )}
              <h1 className="text-3xl font-bold tracking-tight">
                {provider.name}
              </h1>
              <AccessBadge type={provider.accessType} />
              {provider.openaiCompatible && (
                <Badge variant="secondary">OpenAI-compatible</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              {provider.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {allModalities.map((m) => (
                <ModalityBadge key={m} modality={m} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={provider.website}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
            >
              Website <ExternalLink className="h-3 w-3" />
            </a>
            {provider.docsUrl && (
              <a
                href={provider.docsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-accent"
              >
                Docs <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {provider.signupUrl && (
              <a
                href={provider.signupUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Sign up <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </header>

        <Tabs defaultValue="clients" className="mt-6">
          <TabsList>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="models">Models</TabsTrigger>
            <TabsTrigger value="access">Access & Limits</TabsTrigger>
            <TabsTrigger value="signup">Sign-up</TabsTrigger>
            <TabsTrigger value="proscons">Pros / Cons</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <ClientSupportSection provider={provider} />
          </TabsContent>

          <TabsContent value="capabilities">
            <AgentCapabilitiesSection provider={provider} />
          </TabsContent>

          <TabsContent value="models">
            <div className="mb-3 flex items-center justify-between gap-3 text-xs">
              <p className="text-muted-foreground">
                Skor SWE-bench Verified diambil dari leaderboard publik.
              </p>
              <a
                href={SWE_BENCH_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 rounded-sm border-2 border-border bg-amber-300 px-2 py-1 font-bold text-amber-950 shadow-brutal-sm hover:-translate-y-0.5 transition-transform"
              >
                <Trophy className="h-3 w-3" />
                SWE-bench Verified
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5">Model</th>
                    <th className="px-4 py-2.5">Modalities</th>
                    <th className="px-4 py-2.5 text-right">Context</th>
                    {!isCreditBased && (
                      <>
                        <th className="px-4 py-2.5 text-right">RPM</th>
                        <th className="px-4 py-2.5 text-right">RPD</th>
                      </>
                    )}
                    <th className="px-4 py-2.5 text-right">SWE-bench</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {provider.models.map((m) => {
                    const ranking = getModelRanking(m.id, m.name);
                    return (
                      <tr key={m.id}>
                        <td className="px-4 py-3">
                          <div className="font-medium">{m.name}</div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {m.id}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {m.modalities.map((mod) => (
                              <ModalityBadge key={mod} modality={mod} />
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">
                          {formatContext(m.contextWindow)}
                        </td>
                        {!isCreditBased && (
                          <>
                            <td className="px-4 py-3 text-right tabular-nums">
                              {formatRate(
                                m.rateLimit?.rpm ?? provider.globalRateLimit?.rpm
                              )}
                            </td>
                            <td className="px-4 py-3 text-right tabular-nums">
                              {formatRate(
                                m.rateLimit?.rpd ?? provider.globalRateLimit?.rpd
                              )}
                            </td>
                          </>
                        )}
                        <td className="px-4 py-3 text-right tabular-nums">
                          {ranking ? (
                            <a
                              href={SWE_BENCH_URL}
                              target="_blank"
                              rel="noreferrer noopener"
                              title={`Rank #${ranking.rank} — ${ranking.model} (${ranking.score}%)`}
                              className="inline-flex items-center gap-1 rounded-sm border-2 border-border bg-amber-300 px-2 py-0.5 text-xs font-black text-amber-950 shadow-brutal-sm hover:-translate-y-0.5 transition-transform"
                            >
                              <Trophy className="h-3 w-3" />#{ranking.rank}
                              <span className="opacity-70">
                                {ranking.score.toFixed(1)}%
                              </span>
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="access" className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Akses</CardTitle>
                <CardDescription>Syarat untuk pakai provider ini.</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-y-2 text-sm">
                  <dt className="text-muted-foreground">Sign up</dt>
                  <dd>{provider.requiresSignup ? "Ya" : "Tidak"}</dd>
                  <dt className="text-muted-foreground">Bayar</dt>
                  <dd>{provider.requiresPayment ? "Ya" : "Tidak"}</dd>
                  <dt className="text-muted-foreground">Kartu kredit</dt>
                  <dd>{provider.requiresCard ? "Wajib" : "Tidak"}</dd>
                  <dt className="text-muted-foreground">API key</dt>
                  <dd>{provider.apiKeyRequired ? "Ya" : "Tidak"}</dd>
                  <dt className="text-muted-foreground">OpenAI-compatible</dt>
                  <dd>{provider.openaiCompatible ? "Ya" : "Tidak"}</dd>
                  {provider.apiBaseUrl && (
                    <>
                      <dt className="text-muted-foreground">API base</dt>
                      <dd className="font-mono text-xs break-all">
                        {provider.apiBaseUrl}
                      </dd>
                    </>
                  )}
                </dl>
              </CardContent>
            </Card>

            {isCreditBased ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-sm border-2 border-border bg-amber-300 text-amber-950 shadow-brutal-sm">
                      <Wallet className="h-3.5 w-3.5" />
                    </span>
                    <CardTitle className="text-base">Credit & Quota</CardTitle>
                  </div>
                  <CardDescription>
                    Provider ini pakai sistem credit/budget — bukan rate limit per request.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {provider.quota?.windows.length ? (
                    <ul className="space-y-2">
                      {provider.quota.windows.map((w, i) => (
                        <li
                          key={i}
                          className="flex items-baseline justify-between gap-3 rounded-md border-2 border-border bg-amber-50 px-3 py-2 dark:bg-amber-950/30"
                        >
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              {w.windowLabel}
                              {w.rolling ? " · rolling" : ""}
                            </span>
                            {w.notes && (
                              <span className="mt-0.5 text-xs text-muted-foreground">
                                {w.notes}
                              </span>
                            )}
                          </div>
                          <span className="font-black tabular-nums text-lg">
                            {formatQuotaWindow(w)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Detail kuota belum tersedia.
                    </p>
                  )}
                  {provider.quota?.resetPolicy && (
                    <div className="mt-3 text-xs">
                      <span className="text-muted-foreground">Reset: </span>
                      <Badge variant="outline">{provider.quota.resetPolicy}</Badge>
                    </div>
                  )}
                  {provider.quota?.notes && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {provider.quota.notes}
                    </p>
                  )}
                  {provider.credit && (
                    <div className="mt-4 rounded-md bg-muted/50 p-3 text-xs">
                      <div className="font-medium text-foreground">Sign-up credit</div>
                      {provider.credit.amountUsd != null && (
                        <div>Jumlah: ${provider.credit.amountUsd}</div>
                      )}
                      {provider.credit.durationDays != null && (
                        <div>Durasi: {provider.credit.durationDays} hari</div>
                      )}
                      {provider.credit.conditions && (
                        <div className="mt-1 text-muted-foreground">
                          {provider.credit.conditions}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Rate limit global</CardTitle>
                  <CardDescription>
                    Default jika model tidak override.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-muted-foreground">RPM</dt>
                    <dd className="tabular-nums">
                      {formatRate(provider.globalRateLimit?.rpm)}
                    </dd>
                    <dt className="text-muted-foreground">RPD</dt>
                    <dd className="tabular-nums">
                      {formatRate(provider.globalRateLimit?.rpd)}
                    </dd>
                    <dt className="text-muted-foreground">TPM</dt>
                    <dd className="tabular-nums">
                      {formatRate(provider.globalRateLimit?.tpm)}
                    </dd>
                    <dt className="text-muted-foreground">TPD</dt>
                    <dd className="tabular-nums">
                      {formatRate(provider.globalRateLimit?.tpd)}
                    </dd>
                  </dl>
                  {provider.globalRateLimit?.notes && (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {provider.globalRateLimit.notes}
                    </p>
                  )}
                  {provider.credit && (
                    <div className="mt-4 rounded-md bg-muted/50 p-3 text-xs">
                      <div className="font-medium text-foreground">Credits</div>
                      {provider.credit.amountUsd != null && (
                        <div>Jumlah: ${provider.credit.amountUsd}</div>
                      )}
                      {provider.credit.durationDays != null && (
                        <div>Durasi: {provider.credit.durationDays} hari</div>
                      )}
                      {provider.credit.conditions && (
                        <div className="mt-1 text-muted-foreground">
                          {provider.credit.conditions}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="signup">
            <SignupSection provider={provider} />
          </TabsContent>

          <TabsContent value="proscons" className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-emerald-600 dark:text-emerald-400">
                  Pros
                </CardTitle>
              </CardHeader>
              <CardContent>
                {provider.pros?.length ? (
                  <ul className="list-disc space-y-1.5 pl-5 text-sm">
                    {provider.pros.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-red-600 dark:text-red-400">
                  Cons
                </CardTitle>
              </CardHeader>
              <CardContent>
                {provider.cons?.length ? (
                  <ul className="list-disc space-y-1.5 pl-5 text-sm">
                    {provider.cons.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">—</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {provider.lastVerified && (
          <p className="mt-8 text-xs text-muted-foreground">
            Terakhir diverifikasi: {provider.lastVerified}
          </p>
        )}
      </main>
    </>
  );
}
