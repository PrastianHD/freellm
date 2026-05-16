import type { Provider } from "@/types/provider";

export const openrouter: Provider = {
  slug: "openrouter",
  name: "OpenRouter",
  website: "https://openrouter.ai",
  docsUrl: "https://openrouter.ai/docs",
  signupUrl: "https://openrouter.ai/sign-in",
  apiBaseUrl: "https://openrouter.ai/api/v1",
  logo: "/logos/openrouter.png",
  description:
    "Aggregator API yang routing request ke ratusan model dari banyak provider. Punya banyak varian gratis (suffix :free) dengan rate limit harian.",
  accessType: "freemium",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "rate-limited",
  credit: {
    amountUsd: 0,
    conditions:
      "Tanpa top-up: 50 RPD untuk model :free. Top-up min $10 (lifetime) → naik ke 1000 RPD.",
  },
  globalRateLimit: {
    rpm: 20,
    rpd: 50,
    notes:
      "Untuk model :free. Setelah top-up min $10 (akumulasi), free RPD jadi 1000. Free model selalu butuh akun.",
  },
  models: [
    {
      id: "deepseek/deepseek-v4-flash:free",
      name: "DeepSeek V4 Flash (free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "code"],
      rateLimit: { rpm: 20, rpd: 50 },
    },
    {
      id: "nvidia/nemotron-3-super-120b-a12b:free",
      name: "Nemotron 3 Super 120B A12B (free)",
      contextWindow: 128000,
      modalities: ["chat", "text", "reasoning"],
      rateLimit: { rpm: 20, rpd: 50 },
    },
    {
      id: "minimax/minimax-m2.5:free",
      name: "MiniMax M2.5 (free)",
      contextWindow: 1000000,
      modalities: ["chat", "text"],
      rateLimit: { rpm: 20, rpd: 50 },
    },
    {
      id: "google/gemma-4-31b-it:free",
      name: "Gemma 4 31B IT (free)",
      contextWindow: 128000,
      modalities: ["chat", "text"],
      rateLimit: { rpm: 20, rpd: 50 },
    },
    {
      id: "qwen/qwen3-coder:free",
      name: "Qwen3 Coder (free)",
      contextWindow: 262144,
      modalities: ["chat", "code"],
      rateLimit: { rpm: 20, rpd: 50 },
    },
  ],
  pros: [
    "Akses banyak model dengan satu API key",
    "Banyak varian :free",
    "OpenAI-compatible",
  ],
  cons: [
    "Free model sering rate-limit ketat",
    "Beberapa free model di-throttle saat traffic tinggi",
  ],
  tags: ["aggregator", "openai-compatible", "many-models"],
  signup: {
    authMethods: ["google", "github", "email"],
    blocksFreeEmail: false,
    phoneVerification: false,
    notes: "Sign-up cepat, free email diterima. Top-up min $10 (lifetime) buat naik ke 1000 RPD model :free.",
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "Pakai claude-code-router atau set ANTHROPIC_BASE_URL ke OpenRouter (model dengan tag :free yang support tools).",
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
    promptCaching: true,
    notes:
      "Capabilities tergantung model: cek tag 'tools' & 'multimodal' di OpenRouter. Prompt caching diteruskan untuk model Anthropic & Gemini yang mendukung.",
  },
  lastVerified: "2026-05-16",
};
