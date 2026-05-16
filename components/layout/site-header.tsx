import Link from "next/link";
import { Trophy, ExternalLink } from "lucide-react";
import { SWE_BENCH_URL } from "@/data/swe-bench-rankings";
import { withBasePath } from "@/lib/asset-path";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-md border-2 border-border bg-white shadow-brutal-sm">
            <img
              src={withBasePath("/logos/logo.png")}
              alt="FreeLLM logo"
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="font-black tracking-tight">
            FreeLLM<span className="text-primary">.</span>
            <span className="text-muted-foreground">dir</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 hover:bg-accent"
          >
            Providers
          </Link>
          <a
            href="https://github.com/PrastianHD/freellm"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md px-3 py-1.5 hover:bg-accent"
          >
            GitHub
          </a>
          <a
            href={SWE_BENCH_URL}
            target="_blank"
            rel="noreferrer noopener"
            title="SWE-bench Verified leaderboard di llm-stats.com"
            className="inline-flex items-center gap-1.5 rounded-md border-2 border-border bg-amber-300 px-3 py-1.5 text-amber-950 shadow-brutal-sm hover:-translate-y-0.5 hover:translate-x-0 transition-transform"
          >
            <Trophy className="h-3.5 w-3.5" />
            SWE Rank
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </nav>
      </div>
    </header>
  );
}
