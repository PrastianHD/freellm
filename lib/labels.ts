import type { AccessType, AuthMethod, Modality } from "@/types/provider";

export const ACCESS_TYPE_LABEL: Record<AccessType, string> = {
  "fully-free": "Fully Free",
  "free-credits": "Free Credits",
  freemium: "Freemium",
  "free-tier": "Free Tier",
  "open-source-self-hosted": "Self-Hosted",
};

export const MODALITY_LABEL: Record<Modality, string> = {
  text: "Text",
  chat: "Chat",
  code: "Code",
  vision: "Vision",
  "image-generation": "Image Gen",
  embedding: "Embedding",
  audio: "Audio",
  video: "Video",
  reasoning: "Reasoning",
};

export const AUTH_METHOD_LABEL: Record<AuthMethod, string> = {
  google: "Google",
  github: "GitHub",
  email: "Email",
  phone: "Phone",
  microsoft: "Microsoft",
  sso: "SSO",
};
