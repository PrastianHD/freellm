# FreeLLM.dir

> Direktori provider LLM gratis yang bisa di-plug ke Claude Code, Cline, Cursor, Codex, dan AI agent custom — lengkap dengan rate limit, kuota, kompatibilitas klien, dan ranking SWE-bench Verified.

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Site live: **[freellm.dir](#)** · Source: [github.com/PrastianHD/freellm](https://github.com/PrastianHD/freellm)

---

## Contents

- [Why this exists](#why-this-exists)
- [Provider matrix](#provider-matrix)
- [Provider APIs](#provider-apis)
  - [OpenRouter](#openrouter)
  - [Poixe](#poixe)
  - [Freemodel](#freemodel)
  - [AIHubMix](#aihubmix)
  - [Airforce](#airforce)
  - [Google AI Studio](#google-ai-studio)
  - [Ollama Cloud](#ollama-cloud)
  - [NVIDIA NIM](#nvidia-nim)
  - [Kiro Dev](#kiro-dev)
- [SWE-bench Verified ranks](#swe-bench-verified-ranks)
- [Glossary](#glossary)
- [Running locally](#running-locally)
- [Contributing](#contributing)

---

## Why this exists

Dokumentasi free-tier LLM tersebar di banyak situs, sering ngga jelas:

- Angka RPM/RPD vs USD-budget vs message-cap dicampur tanpa konteks.
- Kompatibilitas klien (Claude Code, Cline, Cursor, Codex) jarang disebut eksplisit.
- "Gratis" sering berarti kartu kredit wajib atau email perusahaan only.
- Skor benchmark model (SWE-bench Verified) ngga pernah ditampilin di samping rate limit.

Repo ini adalah **direktori yang menampilkan semuanya di satu tempat** — sebagai website Next.js dan juga sebagai daftar di README ini.

---

## Provider matrix

| Provider | Tipe pricing | Akses | OpenAI-compat | Claude Code | Models |
|---|---|---|---|---|---|
| [OpenRouter](#openrouter) | Rate-limited | Sign-up | ✅ | Proxy | 5 free |
| [Poixe](#poixe) | Rate-limited | Sign-up | ✅ | Proxy | 8 free |
| [Freemodel](#freemodel) | Credit-based | Sign-up | ❌ (Anthropic-compat) | **Native** | 5 free |
| [AIHubMix](#aihubmix) | Rate-limited | Sign-up | ✅ | Proxy | 10 free |
| [Airforce](#airforce) | Rate-limited | Sign-up | ✅ | Proxy | 6 free |
| [Google AI Studio](#google-ai-studio) | Rate-limited | Google account | ✅ | Proxy | 2 free |
| [Ollama Cloud](#ollama-cloud) | Credit-based | Sign-up | ✅ | Proxy | 5 free |
| [NVIDIA NIM](#nvidia-nim) | Rate-limited | Sign-up | ✅ | Proxy | 2+ free |
| [Kiro Dev](#kiro-dev) | Credit-based | AWS Builder ID | — | IDE only | 4 free |

---

## Provider APIs

### [OpenRouter](https://openrouter.ai/sign-in) 🇺🇸

Aggregator API yang routing ke ratusan model dari banyak provider. Punya banyak varian gratis (suffix `:free`) dengan rate limit harian. Top-up min $10 (lifetime) → naik ke 1000 RPD untuk model `:free`.

`Base URL: https://openrouter.ai/api/v1`

| Model | Context | Modality | Rate Limit |
|---|---|---|---|
| `deepseek/deepseek-v4-flash:free` | 128K | Text + Code | 20 RPM, 50 RPD |
| `nvidia/nemotron-3-super-120b-a12b:free` | 128K | Text (reasoning) | 20 RPM, 50 RPD |
| `minimax/minimax-m2.5:free` | 1M | Text | 20 RPM, 50 RPD |
| `google/gemma-4-31b-it:free` | 128K | Text | 20 RPM, 50 RPD |
| `qwen/qwen3-coder:free` | 256K | Text + Code | 20 RPM, 50 RPD |

---

### [Poixe](https://poixe.com/i/3qxlub) 🌐

Aggregator free-tier dengan akses flagship (Claude 4.6/4.5, GPT-5.3 Codex, Gemini 3 Pro/Flash, Grok-4, Qwen3 Coder) lewat satu endpoint OpenAI-compatible. Limit free tier shared di semua model.

`Base URL: https://api.poixe.com/v1`

| Model | Context | Modality | Rate Limit |
|---|---|---|---|
| `cli2api/claude-sonnet-4.6:free` | 200K | Text + Code (reasoning) | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `cli2api/claude-haiku-4.5-20251001:free` | 200K | Text + Code | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `cli2api/gpt-5.3-codex:free` | 400K | Text + Code | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `qwen3-coder-480b-a35b-instruct:free` | 256K | Text + Code | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `grok-4:free` | 256K | Text (reasoning) | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `gemini-3-pro-preview:free` | 1M | Text + Vision (reasoning) | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `gemini-3-flash-preview:free` | 1M | Text + Vision | 10 RPM, 200 RPD, 100K TPM, 2M TPD |
| `gpt-4o-mini:free` | 128K | Text + Vision | 10 RPM, 200 RPD, 100K TPM, 2M TPD |

---

### [Freemodel](https://freemodel.dev/invite/FRE-518ef2e3) 🌐

Akses gratis flagship Claude (Opus 4.7/4.6, Sonnet 4.6, Haiku 4.5) + GPT-5.5 dengan **budget USD per window** — bukan RPM/RPD. Anthropic-compatible, jadi langsung jalan di Claude Code tanpa router.

| Model | Context | Modality | Quota |
|---|---|---|---|
| `claude-opus-4.7` | 200K | Text + Vision (reasoning, code) | $10 / 5h, $66.67 / 7d (rolling) |
| `claude-opus-4.6` | 200K | Text + Vision (reasoning, code) | $10 / 5h, $66.67 / 7d (rolling) |
| `claude-sonnet-4.6` | 200K | Text + Vision (reasoning, code) | $10 / 5h, $66.67 / 7d (rolling) |
| `gpt-5.5` | 400K | Text + Code (reasoning) | $10 / 5h, $66.67 / 7d (rolling) |
| `claude-haiku-4.5-20251001` | 200K | Text + Code | $10 / 5h, $66.67 / 7d (rolling) |

> **Catatan**: Budget habis = throttled sampai window berikutnya. Opus paling cepat habis; Haiku paling tahan lama.

---

### [AIHubMix](https://aihubmix.com/?aff=6cKF) 🌐

Aggregator OpenAI-compatible yang nyediain coding-tuned variants (GLM, MiniMax, Kimi) plus GPT-4o/4.1 family lewat satu endpoint.

`Base URL: https://aihubmix.com/v1`

| Model | Context | Modality | Rate Limit |
|---|---|---|---|
| `coding-minimax-m2.7-free` | 1M | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `coding-minimax-m2.5-free` | 1M | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `coding-glm-5.1-free` | 128K | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `coding-glm-5-turbo-free` | 128K | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `coding-glm-5-free` | 128K | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `coding-glm-4.7-free` | 128K | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `kimi-for-coding-free` | 256K | Text + Code | 5 RPM, 500 RPD, 1M TPD |
| `gpt-4o-free` | 128K | Text + Vision | 5 RPM, 500 RPD, 1M TPD |
| `gpt-4.1-nano-free` | 1M | Text | 5 RPM, 500 RPD, 1M TPD |
| `gpt-4.1-free` | 1M | Text + Vision | 5 RPM, 500 RPD, 1M TPD |

---

### [Airforce](https://api.airforce/signup?ref=sL4VaqpbVO4KYVLu) 🌐

Aggregator gratis dengan token harian unlimited tapi RPM ketat (1). Cocok buat batch/eval, bukan agent loop intens.

`Base URL: https://api.airforce/v1`

| Model | Context | Modality | Rate Limit |
|---|---|---|---|
| `claude-sonnet-4.6` | 33K | Text + Vision (reasoning, code) | 1 RPM, 1000 RPD, ∞ TPD |
| `deepseek-v3.2` | 33K | Text + Code (reasoning) | 1 RPM, 1000 RPD, ∞ TPD |
| `glm-4.7-flash` | 33K | Text + Code | 1 RPM, 1000 RPD, ∞ TPD |
| `grok-4.20-beta` | 33K | Text (reasoning) | 1 RPM, 1000 RPD, ∞ TPD |
| `kimi-k2.6-thinking` | 33K | Text + Code (reasoning) | 1 RPM, 1000 RPD, ∞ TPD |
| `minimax-m2.5` | 33K | Text | 1 RPM, 1000 RPD, ∞ TPD |

> **Catatan**: Semua model di Airforce di-cap 33K context regardless of upstream model.

---

### [Google AI Studio](https://aistudio.google.com/apikey) 🇺🇸

Akses Gemini family lewat Google AI Studio. Free tier kuota harian generous, multimodal native (vision, audio, video), tool use reliable, OpenAI-compatible mode tersedia.

`Base URL: https://generativelanguage.googleapis.com/v1beta`

| Model | Context | Modality | Rate Limit |
|---|---|---|---|
| `gemini-3.1-flash-lite` | 1M | Text + Vision | 15 RPM, 1000 RPD, 250K TPM |
| `gemini-2.5-flash` | 1M | Text + Image + Audio + Video (reasoning) | 10 RPM, 250 RPD, 250K TPM |

> **Catatan**: Data free tier dipakai untuk training (paid/Vertex tidak).

---

### [Ollama Cloud](https://ollama.com/signup) 🇺🇸

Cloud-hosted Ollama yang menjalankan model open-source besar tanpa harus self-host. Kompatibel dengan Ollama CLI dan OpenAI API.

`Base URL: https://ollama.com/api`

| Model | Context | Modality | Quota |
|---|---|---|---|
| `gemma4:31b-cloud` | 128K | Text | 50 msg/h, 200 msg/d (rolling) |
| `nemotron-3-super:cloud` | 128K | Text (reasoning) | 50 msg/h, 200 msg/d (rolling) |
| `minimax-m2.5:cloud` | 1M | Text | 50 msg/h, 200 msg/d (rolling) |
| `qwen3-coder-next:cloud` | 256K | Text + Code | 50 msg/h, 200 msg/d (rolling) |
| `qwen3-coder:480b-cloud` | 256K | Text + Code | 50 msg/h, 200 msg/d (rolling) |

---

### [NVIDIA NIM](https://build.nvidia.com) 🇺🇸

NVIDIA Build & API Catalog. Akses ratusan model open dan partner lewat OpenAI-compatible endpoint dengan free credits saat sign up (1k personal, 5k organization email).

`Base URL: https://integrate.api.nvidia.com/v1`

| Model | Context | Modality | Rate Limit |
|---|---|---|---|
| `minimaxai/minimax-m2.7` | 1M | Text | 40 RPM |
| `qwen/qwen3-coder-480b-a35b-instruct` | 256K | Text + Code | 40 RPM |

---

### [Kiro Dev](https://kiro.dev) 🇺🇸

AI coding IDE/agent dari AWS dengan akses Claude dan model lain pada tier gratis. Bukan API umum — pakainya lewat IDE/agent, jadi tidak bisa dipakai sebagai backend Claude Code.

| Model | Context | Modality | Quota |
|---|---|---|---|
| `claude-sonnet-4.5` | 200K | Text + Code (reasoning) | 50 actions/bulan |
| `glm-5` | 128K | Text + Code | 50 actions/bulan |
| `deepseek-3.2` | 128K | Text + Code (reasoning) | 50 actions/bulan |
| `minimax-m2.5` | 1M | Text | 50 actions/bulan |

---

## SWE-bench Verified ranks

Setiap model di direktori dipetakan ke rank-nya di [llm-stats.com SWE-bench Verified leaderboard](https://llm-stats.com/benchmarks/swe-bench-verified) (15 model populer 2026):

| Rank | Model | Score | Tersedia di |
|---|---|---|---|
| #2 | Claude Opus 4.7 | 87.6% | Freemodel |
| #3 | Claude Opus 4.5 | 80.9% | — |
| #4 | Claude Opus 4.6 | 80.8% | Freemodel |
| #5 | DeepSeek V4 Pro Max | 80.6% | — |
| #5 | Gemini 3.1 Pro | 80.6% | — |
| #7 | MiniMax M2.5 | 80.2% | OpenRouter, Ollama Cloud, AIHubMix, Airforce, Kiro Dev |
| #7 | Kimi K2.6 | 80.2% | AIHubMix (kimi-for-coding), Airforce |
| #9 | GPT-5.2 | 80.0% | — |
| #10 | Claude Sonnet 4.6 | 79.6% | Poixe, Freemodel, Airforce |
| #11 | DeepSeek V4 Flash Max | 79.0% | OpenRouter |
| #12 | Qwen3.6 Plus | 78.8% | — |
| #13 | Gemini 3 Flash | 78.0% | — |
| #15 | GLM-5 | 77.8% | AIHubMix, Kiro Dev |
| #20 | Qwen3.5-397B-A17B | 76.4% | OpenRouter, Poixe, Ollama Cloud, NVIDIA NIM |
| #21 | GPT-5.1 | 76.3% | — |
| #24 | Gemini 3 Pro | 76.2% | — |
| #27 | Claude Opus 4.1 | 74.5% | — |
| #30 | GLM-4.7 | 73.8% | AIHubMix, Airforce |

---

## Glossary

| Abbreviation | Meaning |
|---|---|
| **RPM** | Requests per minute |
| **RPD** | Requests per day |
| **TPM** | Tokens per minute |
| **TPD** | Tokens per day |
| **Context** | Maximum input context window (in tokens) |
| **OpenAI-compat** | Endpoint OpenAI API-compatible — drop-in pakai SDK OpenAI |
| **Anthropic-compat** | Endpoint Anthropic API-compatible — set `ANTHROPIC_BASE_URL` |
| **Proxy (Claude Code)** | Bisa dipakai di Claude Code via `claude-code-router` / LiteLLM |
| **Native (Claude Code)** | Bisa dipakai di Claude Code tanpa router (Anthropic-compat) |
| **Credit-based** | Dibatasi USD-budget / message-count, bukan RPM/RPD |
| **Rate-limited** | Dibatasi request count per window |

---

## Running locally

```bash
git clone https://github.com/PrastianHD/freellm.git
cd freellm
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

**Stack**: Next.js 14 · React 18 · TypeScript 5.5 · Tailwind CSS · Radix UI · Lucide icons.

**Scripts:**
- `npm run dev` — start dev server
- `npm run build` — build production
- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint

---

## Contributing

PR welcome buat:

- Provider baru — tambah file di `data/providers/<slug>.ts`, daftarkan di `data/providers/index.ts`.
- Update rate limit / context window — pastikan ada link ke docs resmi.
- Pattern matcher SWE-bench baru — edit `data/swe-bench-rankings.ts`.
- Field provider baru — extend `types/provider.ts` + UI di `app/providers/[slug]/page.tsx` & `components/providers/provider-card.tsx`.

**Ngga diterima:** trial credits, paid-only tiers, atau provider yang berhenti gratis.

Setiap PR harus include:

- Slug provider, base URL, sign-up URL.
- Rate limit / quota dengan link docs resmi.
- Daftar model + context window + modalities.
- `lastVerified: YYYY-MM-DD`.

---

## License

MIT © [PrastianHD](https://github.com/PrastianHD)

Inspired by [awesome-free-llm-apis](https://github.com/mnfst/awesome-free-llm-apis).
