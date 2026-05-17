import Link from "next/link";
import { Trophy, ExternalLink } from "lucide-react";
import { SWE_BENCH_URL } from "@/data/swe-bench-rankings";
import { withBasePath } from "@/lib/asset-path";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-14 items-center justify-between gap-2 px-3 sm:px-4">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-md border-2 border-border bg-white shadow-brutal-sm">
            <img
              src={withBasePath("/logos/logo.png")}
              alt="FreeLLM logo"
              className="h-6 w-6 object-contain"
            />
          </span>
          <span className="truncate font-black tracking-tight">
            FreeLLM<span className="text-primary">.</span>
            <span className="text-muted-foreground">dir</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-bold">
          <Link
            href="/"
            className="hidden rounded-md px-3 py-1.5 hover:bg-accent sm:inline-block"
          >
            Providers
          </Link>
          <a
            href="https://github.com/PrastianHD/freellm"
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md px-2.5 py-1.5 hover:bg-accent sm:px-3"
          >
            GitHub
          </a>
          <a
            href={SWE_BENCH_URL}
            target="_blank"
            rel="noreferrer noopener"
            title="SWE-bench Verified leaderboard di llm-stats.com"
            aria-label="SWE-bench Verified leaderboard"
            className="inline-flex items-center gap-1.5 rounded-md border-2 border-border bg-amber-300 px-2.5 py-1.5 text-amber-950 shadow-brutal-sm transition-transform hover:-translate-y-0.5 hover:translate-x-0 sm:px-3"
          >
            <Trophy className="h-3.5 w-3.5" />
            <span className="hidden xs:inline sm:inline">SWE Rank</span>
            <span className="xs:hidden sm:hidden">SWE</span>
            <ExternalLink className="hidden h-3 w-3 opacity-70 sm:inline" />
          </a>
        </nav>
      </div>
    </header>
  );
}
