import type { Provider } from "@/types/provider";

export const airforce: Provider = {
  slug: "airforce",
  name: "Airforce",
  website: "https://api.airforce",
  docsUrl: "https://api.airforce/docs",
  signupUrl: "https://api.airforce/signup?ref=sL4VaqpbVO4KYVLu",
  apiBaseUrl: "https://api.airforce/v1",
  logo: "/logos/airforce.png",
  description:
    "Aggregator gratis dengan akses Claude Sonnet 4.6, DeepSeek, GLM, Grok, Kimi & MiniMax via OpenAI-compatible endpoint. Kuota harian generous (1000 RPD, token unlimited) tapi RPM ketat.",
  accessType: "free-tier",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "rate-limited",
  globalRateLimit: {
    rpm: 1,
    rpd: 1000,
    notes:
      "1 RPM / 1000 RPD / token harian unlimited. RPM 1 berarti hindari parallel tool calls — cocok buat batch/eval, bukan agent loop intens.",
  },
  models: [
    {
      id: "claude-sonnet-4.6",
      name: "Claude Sonnet 4.6",
      contextWindow: 33000,
      modalities: ["chat", "text", "code", "reasoning", "vision"],
    },
    {
      id: "deepseek-v3.2",
      name: "DeepSeek V3.2",
      contextWindow: 33000,
      modalities: ["chat", "text", "code", "reasoning"],
    },
    {
      id: "glm-4.7-flash",
      name: "GLM-4.7 Flash",
      contextWindow: 33000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "grok-4.20-beta",
      name: "Grok 4.20 Beta",
      contextWindow: 33000,
      modalities: ["chat", "text", "reasoning"],
    },
    {
      id: "kimi-k2.6-thinking",
      name: "Kimi K2.6 Thinking",
      contextWindow: 33000,
      modalities: ["chat", "text", "code", "reasoning"],
    },
    {
      id: "minimax-m2.5",
      name: "MiniMax M2.5",
      contextWindow: 33000,
      modalities: ["chat", "text"],
    },
  ],
  pros: [
    "Token harian unlimited — cocok buat long-context batch",
    "1000 RPD lumayan banyak buat eval",
    "Akses Claude Sonnet 4.6 & flagship lain di tier gratis",
    "OpenAI-compatible — drop-in pakai SDK OpenAI",
  ],
  cons: [
    "RPM 1 sangat ketat — gak cocok buat parallel agent",
    "Status & uptime aggregator pihak ketiga",
    "Tool calling reliability tergantung model upstream",
  ],
  tags: ["aggregator", "openai-compatible", "free-tier", "unlimited-tokens"],
  signup: {
    authMethods: ["email", "google", "github"],
    blocksFreeEmail: false,
    phoneVerification: false,
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "OpenAI-compatible base URL → pakai claude-code-router/LiteLLM. Karena RPM 1, set max parallel tool calls = 1 di Claude Code config.",
    cline: true,
    codexOpenai: true,
    cursor: true,
    hermesAgent: true,
  },
  agentCapabilities: {
    toolCalling: true,
    parallelToolCalls: false,
    streaming: true,
    jsonMode: true,
    structuredOutput: true,
    visionInput: true,
    systemPrompt: true,
    promptCaching: false,
    notes:
      "Parallel tool calls praktiknya di-disable RPM 1. Vision native di Claude Sonnet 4.6. Reasoning tracker untuk Kimi Thinking & DeepSeek.",
  },
  lastVerified: "2026-05-16",
};
