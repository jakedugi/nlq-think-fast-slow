# Quick Setup Guide

## 1. Add Your Groq API Key

Edit `.env.local` and replace the placeholder with your actual Groq API key:

```bash
GROQ_API_KEY=gsk-your-actual-groq-key-here
```

Get your Groq API key from: https://console.groq.com/keys

## 2. Start the Servers

**Terminal 1 - Backend (LangGraph Agent):**
```bash
cd /Users/jakedugan/Projects/nlq-think-fast-slow/packages/agent-js
npx @langchain/langgraph-cli dev --host localhost --port 8000
```

**Terminal 2 - Frontend (Next.js UI):**
```bash
cd /Users/jakedugan/Projects/nlq-think-fast-slow/apps/ui-research-state-slow-mono
pnpm exec next dev
```

## 3. Access the App

Open your browser to: http://localhost:3000 (or http://localhost:3001 if port 3000 is in use)

## Model Switcher

The model switcher at the bottom-left will dynamically load available Groq models from their API.
All processing happens locally except for the Groq API calls for model inference.

## Troubleshooting

- **Invalid API Key Error**: Make sure you've added your real Groq API key to `.env.local`
- **Port Already in Use**: Kill the process using the port or use the alternate port shown
- **Backend Not Responding**: Ensure the agent server is running on port 8000
