import type { Provider } from "@/types/provider";

export const ollamaCloud: Provider = {
  slug: "ollama-cloud",
  name: "Ollama Cloud",
  website: "https://ollama.com/cloud",
  docsUrl: "https://docs.ollama.com/cloud",
  signupUrl: "https://ollama.com/signup",
  apiBaseUrl: "https://ollama.com/api",
  logo: "/logos/ollama.png",
  description:
    "Cloud-hosted Ollama yang menjalankan model open-source besar tanpa harus self-host. Kompatibel dengan Ollama CLI dan OpenAI API.",
  accessType: "free-tier",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "credit-based",
  quota: {
    resetPolicy: "rolling",
    windows: [
      {
        amount: 50,
        unit: "messages",
        windowLabel: "per jam",
        rolling: true,
        notes: "Hourly cap dari Ollama Cloud free tier.",
      },
      {
        amount: 200,
        unit: "messages",
        windowLabel: "per hari",
        rolling: true,
      },
    ],
    notes:
      "Free tier diukur per message/inference call, bukan token. Limit hourly/daily belum diumumkan resmi — verifikasi di dashboard.",
  },
  models: [
    {
      id: "gemma4:31b-cloud",
      name: "Gemma 4 31B (cloud)",
      contextWindow: 128000,
      modalities: ["chat", "text"],
    },
    {
      id: "nemotron-3-super:cloud",
      name: "Nemotron 3 Super (cloud)",
      contextWindow: 128000,
      modalities: ["chat", "text", "reasoning"],
    },
    {
      id: "minimax-m2.5:cloud",
      name: "MiniMax M2.5 (cloud)",
      contextWindow: 1000000,
      modalities: ["chat", "text"],
    },
    {
      id: "qwen3-coder-next:cloud",
      name: "Qwen3 Coder Next (cloud)",
      contextWindow: 262144,
      modalities: ["chat", "code"],
    },
    {
      id: "qwen3-coder:480b-cloud",
      name: "Qwen3 Coder 480B (cloud)",
      contextWindow: 262144,
      modalities: ["chat", "code"],
    },
  ],
  pros: [
    "Bisa pakai model besar tanpa GPU lokal",
    "Drop-in replacement untuk Ollama lokal",
    "OpenAI-compatible endpoint",
  ],
  cons: ["Free tier limit belum transparan", "Region terbatas"],
  tags: ["open-source-models", "openai-compatible", "cloud-inference"],
  signup: {
    authMethods: ["email", "google", "github"],
    blocksFreeEmail: false,
    phoneVerification: false,
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "OpenAI-compatible — set base URL via claude-code-router. Tool calling tergantung model.",
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
    structuredOutput: false,
    visionInput: false,
    systemPrompt: true,
    promptCaching: false,
    notes:
      "Tool calling pada model yang mendukung (gpt-oss, Qwen3 Coder, DeepSeek). Parallel tool calls bervariasi per model.",
  },
  lastVerified: "2026-05-16",
};
