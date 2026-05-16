import type { Provider } from "@/types/provider";

export const nvidiaNim: Provider = {
  slug: "nvidia-nim",
  name: "NVIDIA NIM",
  website: "https://build.nvidia.com",
  docsUrl: "https://docs.api.nvidia.com",
  signupUrl: "https://build.nvidia.com",
  apiBaseUrl: "https://integrate.api.nvidia.com/v1",
  logo: "/logos/nvidia.png",
  description:
    "NVIDIA Build & API Catalog. Akses ratusan model open dan partner (Llama, DeepSeek, Mistral, Nemotron, Qwen, dll) lewat OpenAI-compatible endpoint dengan free credits saat sign up.",
  accessType: "free-credits",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "rate-limited",
  credit: {
    amountUsd: 0,
    conditions:
      "Free tier: 1.000 request/credit untuk personal akun. Akun dengan email organisasi bisa dapat 5.000 credit. Reset/top-up tergantung program saat ini.",
  },
  globalRateLimit: {
    rpm: 40,
    notes:
      "Default ~40 RPM untuk free tier. Limit per model bisa berbeda; lihat detail tiap model di build.nvidia.com.",
  },
  models: [
    {
      id: "minimaxai/minimax-m2.7",
      name: "MiniMax M2.7",
      contextWindow: 1000000,
      modalities: ["chat", "text"],
      rateLimit: { rpm: 40 },
      notes: "Preview NIM — cek build.nvidia.com untuk status terbaru.",
    },
    {
      id: "qwen/qwen3-coder-480b-a35b-instruct",
      name: "Qwen3 Coder 480B A35B Instruct",
      contextWindow: 262144,
      modalities: ["chat", "code"],
      rateLimit: { rpm: 40 },
    },
  ],
  pros: [
    "Katalog model luas (open-weights + partner enterprise)",
    "Bisa coba langsung dari UI sebelum pakai API",
    "OpenAI-compatible — sama seperti SDK OpenAI",
    "Cocok buat eval & benchmarking",
  ],
  cons: [
    "Kredit free terbatas, perlu top-up untuk produksi",
    "Latency tergantung region & antrian",
    "Limit per model bisa kurang transparan",
  ],
  tags: ["open-weights", "openai-compatible", "model-catalog", "enterprise"],
  signup: {
    authMethods: ["email", "google", "microsoft"],
    blocksFreeEmail: false,
    phoneVerification: false,
    notes: "Personal email dapat 1k credits, organization email dapat 5k credits.",
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "OpenAI-compatible base URL → bisa lewat claude-code-router/LiteLLM. Tool calling tergantung model.",
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
    structuredOutput: false,
    visionInput: false,
    systemPrompt: true,
    promptCaching: false,
    notes:
      "Tool calling tergantung model (Llama 3.3, Nemotron, Mixtral OK). Vision belum aktif untuk model di list ini.",
  },
  lastVerified: "2026-05-16",
};
