# NgobrolEng 🦊🇬🇧

**Tempat Asyik Belajar Bahasa Inggris** — The fun place to learn English.

AI-powered English conversation practice for Indonesian students. Chat with a cheeky London fox and improve your English through fun, real-life scenarios.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI:** Anthropic Claude Sonnet
- **TTS:** ElevenLabs (optional, falls back to browser TTS)
- **Hosting:** Cloudflare Pages
- **Domain:** ngobroleng.com

## Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/ngobroleng.git
cd ngobroleng
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your keys:
- `ANTHROPIC_API_KEY` — get from console.anthropic.com (required)
- `ELEVENLABS_API_KEY` — get from elevenlabs.io (optional)

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

### 4. Deploy to Cloudflare Pages

1. Push code to GitHub
2. In Cloudflare dashboard → Pages → Create project → Connect to GitHub repo
3. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
4. Environment variables: add `ANTHROPIC_API_KEY` (and optionally `ELEVENLABS_API_KEY`)
5. Custom domain: add ngobroleng.com

## Project Structure

```
ngobroleng/
├── app/
│   ├── api/
│   │   ├── chat/route.js     # Claude AI conversation endpoint
│   │   └── tts/route.js      # Text-to-speech endpoint
│   ├── globals.css
│   ├── layout.js              # Root layout, SEO meta tags
│   └── page.js                # Main app (landing + chat)
├── public/                    # Static assets
├── .env.local.example         # Environment variables template
├── next.config.js
└── package.json
```

## Features

- 🦊 Cheeky London fox mascot
- 🇬🇧 Union Jack branded ENG badge with gold lettering
- 💬 AI conversation partner (Claude) that gently corrects grammar
- 🎤 Voice input (speech-to-text) for speaking practice
- 🔊 Listen button on AI messages (text-to-speech)
- 🎯 Scenario-based conversations (coffee shop, airport, job interview)
- 🏙️ London skyline decorative elements
- 📱 Mobile-first design

## License

© 2026 NgobrolEng. All rights reserved.
