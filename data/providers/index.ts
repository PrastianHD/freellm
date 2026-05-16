import type { Provider } from "@/types/provider";
import { ollamaCloud } from "@/data/providers/ollama-cloud";
import { openrouter } from "@/data/providers/openrouter";
import { kiroDev } from "@/data/providers/kiro-dev";
import { googleAiStudio } from "@/data/providers/google-ai-studio";
import { nvidiaNim } from "@/data/providers/nvidia-nim";
import { poixe } from "@/data/providers/poixe";
import { freemodel } from "@/data/providers/freemodel";
import { aihubmix } from "@/data/providers/aihubmix";
import { airforce } from "@/data/providers/airforce";

export const providers: Provider[] = [
  openrouter,
  ollamaCloud,
  googleAiStudio,
  nvidiaNim,
  poixe,
  freemodel,
  aihubmix,
  airforce,
  kiroDev,
];

export function getProvider(slug: string): Provider | undefined {
  return providers.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return providers.map((p) => p.slug);
}
