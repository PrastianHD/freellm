import type { Provider } from "@/types/provider";

export const googleAiStudio: Provider = {
  slug: "google-ai-studio",
  name: "Google AI Studio",
  website: "https://aistudio.google.com",
  docsUrl: "https://ai.google.dev/gemini-api/docs",
  signupUrl: "https://aistudio.google.com/apikey",
  apiBaseUrl: "https://generativelanguage.googleapis.com/v1beta",
  logo: "/logos/gemini.png",
  description:
    "Akses Gemini family lewat Google AI Studio. Free tier punya kuota harian generous, mendukung multimodal (vision, audio, video) dan tool use, OpenAI-compatible mode tersedia.",
  accessType: "free-tier",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: true,
  openaiCompatible: true,
  pricingModel: "rate-limited",
  globalRateLimit: {
    notes:
      "Free tier per-model. Data di-input untuk training oleh Google (kalau pakai paid/Vertex tidak). Angka RPM/RPD per model di tabel di bawah.",
  },
  models: [
    {
      id: "gemini-3.1-flash-lite",
      name: "Gemini 3.1 Flash Lite",
      contextWindow: 1000000,
      modalities: ["chat", "text", "vision"],
      rateLimit: { rpm: 15, rpd: 1000, tpm: 250000 },
    },
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      modalities: ["chat", "text", "vision", "audio", "video", "reasoning"],
      contextWindow: 1048576,
      maxOutputTokens: 65536,
      rateLimit: { rpm: 10, rpd: 250, tpm: 250000 },
    },
  ],
  pros: [
    "Context window 1M token",
    "Multimodal: text/vision/audio/video native",
    "Free tier tanpa kartu, kuota RPD lumayan untuk Flash family",
    "OpenAI-compatible endpoint tersedia",
  ],
  cons: [
    "Data free tier dipakai untuk training",
    "Region terbatas untuk beberapa model",
    "RPM Gemini 2.5 Pro free sangat ketat",
  ],
  tags: ["multimodal", "long-context", "openai-compatible", "embedding", "image-generation"],
  signup: {
    authMethods: ["google"],
    blocksFreeEmail: false,
    phoneVerification: false,
    notes: "Hanya Google account. Workspace account juga bisa.",
  },
  clientSupport: {
    claudeCode: "proxy",
    claudeCodeNotes:
      "Pakai claude-code-router (preset gemini) atau LiteLLM. Tool calling Gemini 2.5+ reliable buat agent loop.",
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
      "Implicit caching aktif by default untuk Gemini 2.5; explicit caching tersedia. Vision/audio/video native.",
  },
  lastVerified: "2026-05-16",
};
