---
title: AI Tool Setup
description: Configure VS Code Copilot, OpenCode, and OpenClaw to use your Yokai-managed models.
---

Press `c` from the dashboard to open the AI tool configuration wizard.

## Overview

Yokai can auto-configure your development tools to use the LLM inference endpoints you've deployed. This means your local coding assistants use your own GPU fleet instead of cloud APIs.

## VS Code Copilot

Yokai generates the VS Code settings to point GitHub Copilot at your self-hosted vLLM endpoint:

1. Press `c` and select **VS Code Copilot**
2. Choose which deployed vLLM service to use
3. Yokai writes the configuration to your VS Code `settings.json`

The generated config sets up the OpenAI-compatible endpoint that vLLM exposes, so Copilot sends requests to your local infrastructure.

## OpenCode

[OpenCode](https://github.com/opencode-ai/opencode) is a terminal-based AI coding assistant.

1. Press `c` and select **OpenCode**
2. Choose your vLLM service
3. Yokai generates the OpenCode configuration

OpenCode will connect to your self-hosted model through the SSH tunnel Yokai maintains.

## OpenClaw

[OpenClaw](https://github.com/spencerbull/OpenClaw) is a fleet-aware AI development tool.

1. Press `c` and select **OpenClaw**
2. Yokai automatically configures OpenClaw with all available endpoints
3. OpenClaw can load-balance across multiple models in your fleet

## Manual Configuration

All Yokai-deployed vLLM services expose an OpenAI-compatible API. You can configure any tool that supports custom OpenAI endpoints:

```bash
# Endpoint (via SSH tunnel)
OPENAI_API_BASE=http://localhost:<port>/v1

# No API key needed for self-hosted
OPENAI_API_KEY=not-needed

# Model name matches what you deployed
OPENAI_MODEL=<your-model-name>
```

Check the specific port for your service in the Yokai dashboard.
