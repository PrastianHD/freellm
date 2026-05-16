import { Check, X, Wrench, Boxes, Radio, Braces, FileJson, Image as ImageIcon, MessageSquare, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AgentCapabilities, Provider } from "@/types/provider";

const CAPS: Array<{
  key: keyof AgentCapabilities;
  label: string;
  hint: string;
  icon: React.ReactNode;
  critical?: boolean;
}> = [
  {
    key: "toolCalling",
    label: "Tool calling",
    hint: "Function/tool use — wajib buat agent loop",
    icon: <Wrench className="h-4 w-4" />,
    critical: true,
  },
  {
    key: "parallelToolCalls",
    label: "Parallel tool calls",
    hint: "Beberapa tool call dalam 1 turn",
    icon: <Boxes className="h-4 w-4" />,
  },
  {
    key: "streaming",
    label: "Streaming",
    hint: "SSE / chunked response",
    icon: <Radio className="h-4 w-4" />,
  },
  {
    key: "jsonMode",
    label: "JSON mode",
    hint: "Force valid JSON output",
    icon: <Braces className="h-4 w-4" />,
  },
  {
    key: "structuredOutput",
    label: "Structured output",
    hint: "Schema-constrained (response_format)",
    icon: <FileJson className="h-4 w-4" />,
  },
  {
    key: "visionInput",
    label: "Vision input",
    hint: "Image input ke endpoint",
    icon: <ImageIcon className="h-4 w-4" />,
  },
  {
    key: "systemPrompt",
    label: "System prompt",
    hint: "Custom system message",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    key: "promptCaching",
    label: "Prompt caching",
    hint: "Cache prefix → hemat token & latency",
    icon: <Database className="h-4 w-4" />,
  },
];

export function AgentCapabilitiesSection({ provider }: { provider: Provider }) {
  const a = provider.agentCapabilities;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Agent capabilities</CardTitle>
        <CardDescription>
          Fitur API yang dipakai agent loop. Ditandai per provider; perilaku
          spesifik bisa berbeda per model.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {CAPS.map(({ key, label, hint, icon, critical }) => {
            const ok = a?.[key] === true;
            return (
              <li
                key={key}
                className={cn(
                  "flex items-start gap-2 rounded-sm border-2 border-border p-3",
                  ok ? "bg-card" : "bg-muted/50",
                  critical && !ok && "border-destructive/60 bg-destructive/5"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-sm border-2 border-border",
                    ok ? "bg-emerald-300 text-emerald-950" : "bg-card text-muted-foreground"
                  )}
                >
                  {ok ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 font-bold leading-tight">
                    {icon}
                    {label}
                    {critical && (
                      <span className="rounded-sm border border-border bg-background px-1 text-[9px] font-black uppercase tracking-wider">
                        Wajib
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {hint}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {a?.notes && (
          <p className="mt-3 text-xs text-muted-foreground">{a.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
