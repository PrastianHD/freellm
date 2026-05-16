export type AccessType =
  | "fully-free"
  | "free-credits"
  | "freemium"
  | "free-tier"
  | "open-source-self-hosted";

export type Modality =
  | "text"
  | "chat"
  | "code"
  | "vision"
  | "image-generation"
  | "embedding"
  | "audio"
  | "video"
  | "reasoning";

export type RateLimit = {
  rpm?: number | null;
  rpd?: number | null;
  tpm?: number | null;
  tpd?: number | null;
  concurrentRequests?: number | null;
  notes?: string;
};

export type PricingModel = "rate-limited" | "credit-based";

export type QuotaUnit =
  | "usd"
  | "tokens"
  | "requests"
  | "actions"
  | "messages"
  | "credits";

export type QuotaWindow = {
  amount: number;
  unit: QuotaUnit;
  windowLabel: string;
  rolling?: boolean;
  notes?: string;
};

export type CreditQuota = {
  windows: QuotaWindow[];
  resetPolicy?: "rolling" | "calendar" | "one-time";
  notes?: string;
};

export type ModelInfo = {
  id: string;
  name: string;
  contextWindow?: number;
  maxOutputTokens?: number;
  modalities: Modality[];
  rateLimit?: RateLimit;
  pricing?: {
    inputPerMTokens?: number;
    outputPerMTokens?: number;
    notes?: string;
  };
  notes?: string;
};

export type CreditOffer = {
  amountUsd?: number;
  durationDays?: number;
  recurring?: boolean;
  conditions?: string;
};

export type AuthMethod = "google" | "github" | "email" | "phone" | "microsoft" | "sso";

export type SignupRequirements = {
  authMethods?: AuthMethod[];
  blocksFreeEmail?: boolean;
  requiresCorporateEmail?: boolean;
  phoneVerification?: boolean;
  countryBlocks?: string[];
  ageRestriction?: number;
  notes?: string;
};

export type ClientSupportLevel = "native" | "proxy" | "no";

export type ClientSupport = {
  claudeCode?: ClientSupportLevel;
  claudeCodeNotes?: string;
  cline?: boolean;
  codexOpenai?: boolean;
  cursor?: boolean;
  hermesAgent?: boolean;
  rooCode?: boolean;
  continueDev?: boolean;
  aider?: boolean;
  openWebUI?: boolean;
  langchain?: boolean;
  llamaIndex?: boolean;
  vercelAiSdk?: boolean;
  notes?: string;
};

export type AgentCapabilities = {
  toolCalling?: boolean;
  parallelToolCalls?: boolean;
  streaming?: boolean;
  jsonMode?: boolean;
  structuredOutput?: boolean;
  visionInput?: boolean;
  systemPrompt?: boolean;
  promptCaching?: boolean;
  notes?: string;
};

export type DataPolicy = {
  trainsOnFreeData?: "yes" | "no" | "opt-out" | "unknown";
  logRetentionDays?: number | null;
  commercialUseAllowed?: boolean;
  notes?: string;
  policyUrl?: string;
};

export type Provider = {
  slug: string;
  name: string;
  website: string;
  docsUrl?: string;
  signupUrl?: string;
  apiBaseUrl?: string;
  logo?: string;
  description: string;
  accessType: AccessType;
  requiresSignup: boolean;
  requiresPayment: boolean;
  requiresCard: boolean;
  apiKeyRequired: boolean;
  openaiCompatible?: boolean;
  anthropicCompatible?: boolean;
  pricingModel?: PricingModel;
  credit?: CreditOffer;
  quota?: CreditQuota;
  globalRateLimit?: RateLimit;
  models: ModelInfo[];
  signup?: SignupRequirements;
  clientSupport?: ClientSupport;
  agentCapabilities?: AgentCapabilities;
  dataPolicy?: DataPolicy;
  pros?: string[];
  cons?: string[];
  tags?: string[];
  lastVerified?: string;
};
