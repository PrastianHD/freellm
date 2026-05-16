import { Check, X, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ClientSupport, ClientSupportLevel, Provider } from "@/types/provider";

const CLIENTS: Array<{
  key: keyof ClientSupport;
  label: string;
  hint?: string;
}> = [
  { key: "cline", label: "Cline", hint: "VS Code agent" },
  { key: "codexOpenai", label: "Codex (OpenAI)", hint: "OpenAI coding CLI" },
  { key: "cursor", label: "Cursor", hint: "Custom OpenAI base" },
  { key: "hermesAgent", label: "Hermes Agent", hint: "Agent framework" },
];

const CLAUDE_CODE_LABEL: Record<ClientSupportLevel, string> = {
  native: "Native",
  proxy: "Proxy / Router",
  no: "Tidak didukung",
};

const CLAUDE_CODE_VARIANT: Record<
  ClientSupportLevel,
  "success" | "warning" | "destructive"
> = {
  native: "success",
  proxy: "warning",
  no: "destructive",
};

export function ClientSupportSection({ provider }: { provider: Provider }) {
  const c = provider.clientSupport;
  const cc = c?.claudeCode ?? "no";

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <Card className="bg-[hsl(22_70%_90%)]">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <CardTitle className="text-base">Claude Code</CardTitle>
          </div>
          <CardDescription>
            Bisa dipakai sebagai backend Claude Code?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Badge variant={CLAUDE_CODE_VARIANT[cc]} className="text-xs">
            {CLAUDE_CODE_LABEL[cc]}
          </Badge>
          {c?.claudeCodeNotes && (
            <p className="text-sm text-muted-foreground">{c.claudeCodeNotes}</p>
          )}
          {provider.anthropicCompatible && (
            <Badge variant="info">Anthropic-compatible endpoint</Badge>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Client / IDE lain</CardTitle>
          <CardDescription>
            Tool yang bisa langsung di-arahin ke provider ini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {CLIENTS.map(({ key, label, hint }) => {
              const ok = c?.[key] === true;
              return (
                <li
                  key={key}
                  className={cn(
                    "flex items-start gap-2 rounded-sm border-2 border-border p-2 text-sm",
                    ok ? "bg-card" : "bg-muted/50 opacity-70"
                  )}
                >
                  {ok ? (
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <div className="min-w-0">
                    <div className="font-bold leading-tight">{label}</div>
                    {hint && (
                      <div className="text-[11px] text-muted-foreground">
                        {hint}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          {c?.notes && (
            <p className="mt-3 text-xs text-muted-foreground">{c.notes}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
