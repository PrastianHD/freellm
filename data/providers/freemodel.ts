import type { Provider } from "@/types/provider";

export const freemodel: Provider = {
  slug: "freemodel",
  name: "Freemodel",
  website: "https://freemodel.dev",
  docsUrl: "https://freemodel.dev/dashboard/docs",
  signupUrl: "https://freemodel.dev/invite/FRE-518ef2e3",
  logo: "/logos/freemodel.png",
  description:
    "Akses gratis flagship model (Claude Opus 4.7/4.6, Claude Sonnet 4.6, Claude Haiku 4.5, GPT-5.5) dengan budget USD-based per window — bukan RPM/RPD.",
  accessType: "free-credits",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: false,
  anthropicCompatible: true,
  pricingModel: "credit-based",
  quota: {
    resetPolicy: "rolling",
    windows: [
      {
        amount: 10,
        unit: "usd",
        windowLabel: "5 jam",
        rolling: true,
      },
      {
        amount: 66.67,
        unit: "usd",
        windowLabel: "7 hari",
        rolling: true,
      },
    ],
    notes:
      "Budget USD-based — habis budget = throttled sampai window berikutnya. Opus paling cepat habis, Haiku paling tahan lama.",
  },
  models: [
    {
      id: "claude-opus-4.7",
      name: "Claude Opus 4.7",
      contextWindow: 200000,
      modalities: ["chat", "text", "code", "reasoning", "vision"],
    },
    {
      id: "claude-opus-4.6",
      name: "Claude Opus 4.6",
      contextWindow: 200000,
      modalities: ["chat", "text", "code", "reasoning", "vision"],
    },
    {
      id: "claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      contextWindow: 200000,
      modalities: ["chat", "text", "code", "reasoning", "vision"],
    },
    {
      id: "gpt-5.5",
      name: "GPT-5.5",
      contextWindow: 400000,
      modalities: ["chat", "text", "code", "reasoning"],
    },
    {
      id: "claude-haiku-4.5-20251001",
      name: "Claude Haiku 4.5",
      contextWindow: 200000,
      modalities: ["chat", "text", "code"],
    },
  ],
  pros: [
    "Akses Claude Opus 4.7 & GPT-5.5 di tier gratis",
    "Budget USD lebih fleksibel daripada RPM/RPD untuk batch besar",
    "Anthropic-compatible — drop-in pakai SDK Anthropic atau Claude Code",
  ],
  cons: [
    "Opus 4.7 cepat habis budget — Sonnet/Haiku lebih reasonable",
    "Bukan OpenAI-compatible secara native (perlu router untuk klien OpenAI)",
    "Belum ada angka RPM/concurrent yang transparan",
  ],
  tags: ["claude", "anthropic-compatible", "credit-based", "flagship-models"],
  signup: {
    authMethods: ["google", "github", "email"],
    blocksFreeEmail: false,
    phoneVerification: false,
  },
  clientSupport: {
    claudeCode: "native",
    claudeCodeNotes:
      "Anthropic-compatible — set ANTHROPIC_BASE_URL ke Freemodel + API key, langsung jalan tanpa router. Cocok untuk Claude Code/Cline yang nge-call Anthropic API.",
    cline: true,
    codexOpenai: false,
    cursor: false,
    hermesAgent: true,
  },
  agentCapabilities: {
    toolCalling: true,
    parallelToolCalls: true,
    streaming: true,
    jsonMode: true,
    structuredOutput: true,
    visionInput: true,
    systemPrompt: true,
    promptCaching: true,
    notes:
      "Claude family: tool calling + prompt caching native. GPT-5.5 di-route lewat Freemodel — capabilities tergantung mapping mereka.",
  },
  lastVerified: "2026-05-16",
};
