import type { Provider } from "@/types/provider";

export const poixe: Provider = {
  slug: "poixe",
  name: "Poixe",
  website: "https://poixe.com",
  docsUrl: "https://poixe.com/products/free",
  signupUrl: "https://poixe.com/i/3qxlub",
  apiBaseUrl: "https://api.poixe.com/v1",
  logo: "/logos/poixe.png",
  description:
    "Aggregator free-tier dengan akses ke flagship model (Claude 4.6/4.5, GPT-5.3 Codex, Gemini 3 Pro/Flash, Grok-4, Qwen3 Coder) lewat satu endpoint OpenAI-compatible.",
  accessType: "free-tier",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "rate-limited",
  globalRateLimit: {
    rpm: 10,
    rpd: 200,
    tpm: 100_000,
    tpd: 2_000_000,
    notes:
      "Limit free tier: 10 RPM / 200 RPD / 100k TPM / 2M TPD shared di semua model.",
  },
  models: [
    {
      id: "cli2api/claude-sonnet-4.6:free",
      name: "Claude Sonnet 4.6 (free)",
      contextWindow: 200000,
      modalities: ["chat", "text", "code", "reasoning"],
    },
    {
      id: "cli2api/claude-haiku-4.5-20251001:free",
      name: "Claude Haiku 4.5 (free)",
      contextWindow: 200000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "cli2api/gpt-5.3-codex:free",
      name: "GPT-5.3 Codex (free)",
      contextWindow: 400000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "qwen3-coder-480b-a35b-instruct:free",
      name: "Qwen3 Coder 480B A35B Instruct (free)",
      contextWindow: 262144,
      modalities: ["chat", "code"],
    },
    {
      id: "grok-4:free",
      name: "Grok 4 (free)",
      contextWindow: 256000,
      modalities: ["chat", "text", "reasoning"],
    },
    {
      id: "gemini-3-pro-preview:free",
      name: "Gemini 3 Pro Preview (free)",
      contextWindow: 1000000,
      modalities: ["chat", "text", "vision", "reasoning"],
    },
    {
      id: "gemini-3-flash-preview:free",
      name: "Gemini 3 Flash Preview (free)",
      contextWindow: 1000000,
      modalities: ["chat", "text", "vision"],
    },
    {
      id: "gpt-4o-mini:free",
      name: "GPT-4o mini (free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "vision"],
    },
  ],
  pros: [
    "Akses flagship model (Claude, GPT, Gemini, Grok) di free tier",
    "OpenAI-compatible — drop-in pakai SDK OpenAI",
    "TPD 2 juta token/hari cukup buat agent loop reguler",
  ],
  cons: [
    "RPM 10 ketat untuk parallel tool calls",
    "Status preview/beta — model bisa berubah sewaktu-waktu",
    "Free tier shared limit, gampang kena throttle saat traffic tinggi",
  ],
  tags: ["aggregator", "openai-compatible", "many-models", "free-tier"],
  signup: {
    authMethods: ["email", "google", "github"],
    blocksFreeEmail: false,
    phoneVerification: false,
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "OpenAI-compatible base URL → pakai claude-code-router atau set ANTHROPIC_BASE_URL. Model cli2api/claude-* paling natural di Claude Code.",
    cline: true,
    codexOpenai: true,
    cursor: true,
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
    promptCaching: false,
    notes:
      "Capabilities tergantung model upstream (Claude/GPT/Gemini/Grok). Vision aktif untuk Gemini 3, GPT-4o mini, dan Claude Sonnet 4.6.",
  },
  lastVerified: "2026-05-16",
};
