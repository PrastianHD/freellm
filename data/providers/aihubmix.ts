import type { Provider } from "@/types/provider";

export const aihubmix: Provider = {
  slug: "aihubmix",
  name: "AIHubMix",
  website: "https://aihubmix.com",
  docsUrl: "https://docs.aihubmix.com/en/quick-start",
  signupUrl: "https://aihubmix.com/?aff=6cKF",
  apiBaseUrl: "https://aihubmix.com/v1",
  logo: "/logos/aihubmix.png",
  description:
    "Aggregator OpenAI-compatible dengan free tier yang nyediain coding-tuned variants (GLM, MiniMax, Kimi) plus GPT-4o/GPT-4.1 family lewat satu endpoint.",
  accessType: "free-tier",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "rate-limited",
  globalRateLimit: {
    rpm: 5,
    rpd: 500,
    tpd: 1_000_000,
    notes:
      "Free tier: 5 RPM / 500 RPD / 1M TPD shared di semua model -free. Cocok buat dev/eval, ketat untuk parallel agent.",
  },
  models: [
    {
      id: "coding-minimax-m2.7-free",
      name: "MiniMax M2.7 (coding, free)",
      contextWindow: 1000000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "coding-minimax-m2.5-free",
      name: "MiniMax M2.5 (coding, free)",
      contextWindow: 1000000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "coding-glm-5.1-free",
      name: "GLM-5.1 (coding, free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "coding-glm-5-turbo-free",
      name: "GLM-5 Turbo (coding, free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "coding-glm-5-free",
      name: "GLM-5 (coding, free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "coding-glm-4.7-free",
      name: "GLM-4.7 (coding, free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "kimi-for-coding-free",
      name: "Kimi for Coding (free)",
      contextWindow: 256000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "gpt-4o-free",
      name: "GPT-4o (free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "vision"],
    },
    {
      id: "gpt-4.1-nano-free",
      name: "GPT-4.1 Nano (free)",
      contextWindow: 1000000,
      modalities: ["chat", "text"],
    },
    {
      id: "gpt-4.1-free",
      name: "GPT-4.1 (free)",
      contextWindow: 1000000,
      modalities: ["chat", "text", "vision"],
    },
  ],
  pros: [
    "Coding-tuned variants (GLM, MiniMax, Kimi) di tier gratis",
    "Akses GPT-4o & GPT-4.1 family tanpa kartu",
    "OpenAI-compatible — drop-in pakai SDK OpenAI",
    "TPD 1M token cukup buat eval & batch kecil",
  ],
  cons: [
    "RPM 5 sangat ketat — batasi parallel tool calls",
    "Free model bisa di-throttle saat traffic tinggi",
    "Suffix -free berbeda dari nama model upstream — perlu mapping manual",
  ],
  tags: ["aggregator", "openai-compatible", "coding-models", "free-tier"],
  signup: {
    authMethods: ["email", "google", "github"],
    blocksFreeEmail: false,
    phoneVerification: false,
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "OpenAI-compatible base URL → pakai claude-code-router/LiteLLM. RPM 5 berarti hindari parallel tool calls; pilih model coding-glm-5/MiniMax M2.7 buat agent loop.",
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
      "Tool calling tergantung model upstream. GPT-4o/4.1 reliable; GLM/MiniMax coding variants sudah di-tune untuk function calling.",
  },
  lastVerified: "2026-05-16",
};
