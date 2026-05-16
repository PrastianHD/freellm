export const SWE_BENCH_URL =
  "https://llm-stats.com/benchmarks/swe-bench-verified";

export type SweBenchRanking = {
  rank: number;
  model: string;
  organization: string;
  score: number;
  match: string[];
};

// Subset model populer 2026 dari leaderboard llm-stats.com SWE-bench Verified.
// Bukan top 30 lengkap — hanya yang relevan dengan provider di direktori ini
// plus beberapa flagship sebagai konteks.
export const SWE_BENCH_RANKINGS: SweBenchRanking[] = [
  {
    rank: 2,
    model: "Claude Opus 4.7",
    organization: "Anthropic",
    score: 87.6,
    match: ["claude-opus-4.7"],
  },
  {
    rank: 3,
    model: "Claude Opus 4.5",
    organization: "Anthropic",
    score: 80.9,
    match: ["claude-opus-4.5"],
  },
  {
    rank: 4,
    model: "Claude Opus 4.6",
    organization: "Anthropic",
    score: 80.8,
    match: ["claude-opus-4.6"],
  },
  {
    rank: 5,
    model: "DeepSeek V4 Pro Max",
    organization: "DeepSeek",
    score: 80.6,
    match: ["deepseek-v4-pro"],
  },
  {
    rank: 5,
    model: "Gemini 3.1 Pro",
    organization: "Google",
    score: 80.6,
    match: ["gemini-3.1-pro"],
  },
  {
    rank: 7,
    model: "MiniMax M2.5",
    organization: "MiniMax",
    score: 80.2,
    match: ["minimax-m2.5", "coding-minimax-m2.5"],
  },
  {
    rank: 7,
    model: "Kimi K2.6",
    organization: "Moonshot AI",
    score: 80.2,
    match: ["kimi-k2.6", "kimi-for-coding"],
  },
  {
    rank: 9,
    model: "GPT-5.2",
    organization: "OpenAI",
    score: 80.0,
    match: ["gpt-5.2"],
  },
  {
    rank: 10,
    model: "Claude Sonnet 4.6",
    organization: "Anthropic",
    score: 79.6,
    match: ["claude-sonnet-4.6"],
  },
  {
    rank: 11,
    model: "DeepSeek V4 Flash Max",
    organization: "DeepSeek",
    score: 79.0,
    match: ["deepseek-v4-flash"],
  },
  {
    rank: 12,
    model: "Qwen3.6 Plus",
    organization: "Alibaba Qwen",
    score: 78.8,
    match: ["qwen3.6-plus"],
  },
  {
    rank: 13,
    model: "Gemini 3 Flash",
    organization: "Google",
    score: 78.0,
    match: ["gemini-3-flash"],
  },
  {
    rank: 15,
    model: "GLM-5",
    organization: "Zhipu AI",
    score: 77.8,
    match: ["glm-5-free", "glm-5-turbo", "glm-5", "coding-glm-5"],
  },
  {
    rank: 20,
    model: "Qwen3.5-397B-A17B",
    organization: "Alibaba Qwen",
    score: 76.4,
    match: ["qwen3-coder-480b", "qwen3.5-397b"],
  },
  {
    rank: 21,
    model: "GPT-5.1",
    organization: "OpenAI",
    score: 76.3,
    match: ["gpt-5.1"],
  },
  {
    rank: 24,
    model: "Gemini 3 Pro",
    organization: "Google",
    score: 76.2,
    match: ["gemini-3-pro"],
  },
  {
    rank: 27,
    model: "Claude Opus 4.1",
    organization: "Anthropic",
    score: 74.5,
    match: ["claude-opus-4.1"],
  },
  {
    rank: 30,
    model: "GLM-4.7",
    organization: "Zhipu AI",
    score: 73.8,
    match: ["glm-4.7", "coding-glm-4.7"],
  },
];

const SORTED = [...SWE_BENCH_RANKINGS].sort((a, b) => {
  const aMax = Math.max(...a.match.map((m) => m.length));
  const bMax = Math.max(...b.match.map((m) => m.length));
  return bMax - aMax;
});

export function getModelRanking(
  modelId: string,
  modelName: string
): SweBenchRanking | undefined {
  const haystack = `${modelId} ${modelName}`.toLowerCase();
  return SORTED.find((r) =>
    r.match.some((p) => haystack.includes(p.toLowerCase()))
  );
}
