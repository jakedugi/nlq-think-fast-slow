# NLQ DeepResearch

A multi-agent system for natural language queries with Fast/Think/Slow processing modes.

## Architecture

- **apps/ui-research-state-slow-mono**: Next.js frontend with CopilotKit chat interface and model selection
- **apps/server**: LangGraph host with API adapters (placeholder)
- **packages/tools**: Domain-level actions (StatsPerform API, web search, summarization) (placeholders)
- **packages/agent-js**: LangGraph workflows with research agent implementation
- **packages/shared**: Shared schemas and utilities (placeholder)

## Development

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Build all packages
pnpm build
```

## Agent Modes

- **Fast**: Quick responses with minimal reasoning (placeholder)
- **Think**: Balanced reasoning with moderate depth (placeholder)
- **DeepResearch**: Comprehensive analysis with extensive tool usage (implemented)


---

## Running the Agent

**These instructions assume you are in the `coagents-research-canvas/` directory**

## Running the Agent

First, install the backend dependencies:

### Quick Start

1. **Set up environment:**
   ```bash
   # Copy the template and add your API keys
   cp .env.example .env.local
   # Edit .env.local with your actual API keys
   ```

2. **Install and run:**
   ```bash
   pnpm install
   pnpm dev
   ```

### Environment Setup

**One .env.local at the root level** contains all secrets for local development. This keeps your monorepo simple and scalable.

**Required API Keys** (add these to `.env.local`):
- `OPENAI_API_KEY`: Your OpenAI API key
- `TAVILY_API_KEY`: Your Tavily search API key
- `LANGSMITH_API_KEY`: Your LangSmith API key (for tracing)
- `GROQ_API_KEY`: Your Groq API key (optional)
- `NEXT_PUBLIC_COPILOTKIT_API_KEY`: Your CopilotKit public key

**Optional Keys:**
- `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`: For observability
- `LGC_DEPLOYMENT_URL`: For LangGraph Cloud deployment

**Security Note:** Never commit `.env.local`. Only `.env.example` is version controlled.

**Future Scaling:** If you need app-specific secrets later, add individual `.env` files in app directories (e.g., `apps/server/.env`) for conflicting configurations.


Then, run the demo:

### Python

```sh
poetry run demo
```

## Running the UI

First, install the dependencies:

```sh
cd ./ui
pnpm i
```

Then, create a `.env` file inside `./ui` with the following:

```
OPENAI_API_KEY=...
```

Then, run the Next.js project:

```sh
pnpm run dev
```

⚠️ IMPORTANT:
If you're using the JS agent, follow the steps and uncomment the code inside the `app/api/copilotkit/route.ts`, `remoteEndpoints` action: 

```ts
//const runtime = new CopilotRuntime({
 // remoteEndpoints: [
    // Uncomment this if you want to use LangGraph JS, make sure to
    // remove the remote action url below too.
    //
    // langGraphPlatformEndpoint({
    //   deploymentUrl: "http://localhost:8123",
    //   langsmithApiKey: process.env.LANGSMITH_API_KEY || "", // only used in LangGraph Platform deployments
    //   agents: [{
    //       name: "research_agentt",
    //       description: "Research agent"
    //   }]
    // }),
 // ],
//});
```
**Next for JS run these commands:**
- Run this command to start your LangGraph server `npx @langchain/langgraph-cli dev --host localhost --port 8123`
- Run this command to connect your Copilot Cloud Tunnel to the LangGraph server `npx copilotkit@latest dev --port 8123`

## Usage

Navigate to [http://localhost:3000](http://localhost:3000).

# LangGraph Studio

Run LangGraph studio, then load the `./agent-py` folder into it.

# Troubleshooting

A few things to try if you are running into trouble:

1. Make sure there is no other local application server running on the 8000 port.
2. Under `/agent/research_canvas/demo.py`, change `0.0.0.0` to `127.0.0.1` or to `localhost`
