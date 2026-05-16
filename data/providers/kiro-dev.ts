import type { Provider } from "@/types/provider";

export const kiroDev: Provider = {
  slug: "kiro-dev",
  name: "Kiro Dev",
  website: "https://kiro.dev",
  docsUrl: "https://kiro.dev/docs",
  signupUrl: "https://kiro.dev",
  logo: "/logos/kiro.png",
  description:
    "AI coding IDE/agent dari AWS yang menyediakan akses Claude dan model lain dengan kuota free pada tier gratis.",
  accessType: "free-tier",
  requiresSignup: true,
  requiresPayment: false,
  requiresCard: false,
  apiKeyRequired: false,
  openaiCompatible: false,
  pricingModel: "credit-based",
  quota: {
    resetPolicy: "calendar",
    windows: [
      {
        amount: 50,
        unit: "actions",
        windowLabel: "per bulan",
        notes: "Estimasi free tier saat preview — angka dapat berubah saat GA.",
      },
    ],
    notes:
      "Free tier diukur per agent action / interaction, bukan per request atau token. Detail kuota presisi belum final saat masih preview.",
  },
  models: [
    {
      id: "claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      contextWindow: 200000,
      modalities: ["chat", "text", "code", "reasoning"],
    },
    {
      id: "glm-5",
      name: "GLM-5",
      contextWindow: 128000,
      modalities: ["chat", "text", "code"],
    },
    {
      id: "deepseek-3.2",
      name: "DeepSeek 3.2",
      contextWindow: 128000,
      modalities: ["chat", "text", "code", "reasoning"],
    },
    {
      id: "minimax-m2.5",
      name: "MiniMax M2.5",
      contextWindow: 1000000,
      modalities: ["chat", "text"],
    },
  ],
  pros: [
    "Spec-driven workflow built-in",
    "Akses Claude tanpa Anthropic API key",
    "Punya hooks & agent steering",
  ],
  cons: [
    "Bukan API umum — pakainya lewat IDE/agent",
    "Kuota free tier dapat berubah",
  ],
  tags: ["ide", "agent", "claude"],
  signup: {
    authMethods: ["google", "github", "email"],
    blocksFreeEmail: false,
    phoneVerification: false,
    notes: "Login lewat AWS Builder ID. Saat preview, free tier bisa berubah ketika GA.",
  },
  clientSupport: {
    claudeCode: "no",
    claudeCodeNotes:
      "Kiro Dev sendiri adalah coding agent berbasis Claude — bukan API umum, jadi tidak bisa dipakai sebagai backend Claude Code.",
    cline: false,
    codexOpenai: false,
    cursor: false,
    hermesAgent: false,
    notes: "Kiro Dev adalah IDE/agent, bukan provider API.",
  },
  lastVerified: "2026-05-16",
};
