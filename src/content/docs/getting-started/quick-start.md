---
title: Quick Start
description: Get up and running with Yokai in minutes.
---

## First Launch

After installing, simply run:

```bash
yokai
```

On first launch, Yokai will:

1. **Create config** at `~/.config/yokai/config.json`
2. **Start the daemon** in the background (manages SSH tunnels and metrics)
3. **Open the TUI dashboard** — your command center for everything

## Add Your First Device

Press `d` to open the device manager, then `a` to add a new device.

Yokai supports three discovery methods:

- **LAN Scan** — Auto-discover GPU machines on your local network
- **Tailscale** — Pull devices from your Tailscale mesh
- **Manual** — Enter hostname/IP and SSH credentials directly

Yokai will SSH into the device, install the Yokai agent automatically, and verify GPU access.

## Deploy Your First Model

Press `n` to launch the deployment wizard:

1. **Choose workload type** — vLLM, llama.cpp, or ComfyUI
2. **Select target device** — Pick from your connected GPU machines
3. **Pick a model** — Browse popular models or enter a HuggingFace model ID
4. **Configure** — Set quantization, context length, GPU layers, etc.
5. **Deploy** — Yokai pulls the container image, downloads the model, and starts serving

Within seconds, your model is live and accessible.

## Monitor Everything

The main dashboard shows all running services with live metrics:

- **GPU utilization** with sparkline history
- **VRAM usage** per device and per service
- **Temperature and power draw**
- **Service status** (running, stopped, error)

Press `g` to open the Grafana dashboard for detailed historical metrics.

## Next Steps

- [Configuration](/yokai-docs/getting-started/configuration/) — Customize Yokai settings
- [Adding Devices](/yokai-docs/guides/adding-devices/) — Connect more GPU machines
- [Deploying Models](/yokai-docs/guides/deploying-models/) — Learn about all workload types
