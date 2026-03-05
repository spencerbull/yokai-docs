---
title: Deploying Models
description: Deploy vLLM, llama.cpp, and ComfyUI workloads through the Yokai wizard.
---

Press `n` from the dashboard to launch the deployment wizard.

## Workload Types

### vLLM

High-throughput LLM inference server. Best for:
- Production API serving
- Multi-user chat applications
- Batched inference workloads

Yokai deploys the official `vllm/vllm-openai` Docker image with your chosen model.

### llama.cpp

Lightweight inference with GGUF quantized models. Best for:
- Consumer GPUs with limited VRAM
- Experimentation and development
- CPU+GPU hybrid inference

Yokai deploys a llama.cpp server container with configurable GPU layers and context length.

### ComfyUI

Node-based image generation workflow. Best for:
- Stable Diffusion / Flux workflows
- Image generation pipelines
- Creative tooling

Yokai deploys ComfyUI with GPU passthrough and exposes the web interface.

## Deployment Wizard

The wizard walks you through each step:

### 1. Select Workload Type
Choose between vLLM, llama.cpp, or ComfyUI.

### 2. Choose Target Device
Select from your connected devices. Yokai shows available VRAM and current utilization for each.

### 3. Pick a Model
- **Browse popular models** — Curated list of well-tested models
- **Search HuggingFace** — Find any model by name
- **Enter model ID** — Directly specify a HuggingFace model ID

For gated models (e.g., Llama, Gemma), Yokai will prompt for your HuggingFace token.

### 4. Configure Options

| Option             | vLLM | llama.cpp | ComfyUI |
|--------------------|------|-----------|---------|
| Quantization       | AWQ, GPTQ | Q4_K_M, Q5_K_M, Q8_0, etc. | N/A |
| Context length     | Yes  | Yes       | N/A     |
| GPU layers         | N/A  | Yes       | N/A     |
| Tensor parallelism | Yes  | N/A       | N/A     |
| Port               | Yes  | Yes       | Yes     |

### 5. Deploy

Yokai:
1. Pulls the container image on the target device
2. Downloads the model weights
3. Starts the container with GPU passthrough
4. Creates an SSH tunnel for local access
5. Verifies the service is healthy

## Managing Deployments

From the dashboard:
- `s` — Stop a running service
- `r` — Restart a service
- `l` — View live logs
- `j/k` — Navigate between services
