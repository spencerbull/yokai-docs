---
title: Configuration
description: Yokai configuration reference.
---

Yokai stores its configuration at `~/.config/yokai/config.json`. This file is created automatically on first run.

## Config File Structure

```json
{
  "devices": [
    {
      "name": "gpu-box-01",
      "host": "192.168.1.100",
      "port": 22,
      "user": "ubuntu",
      "key_path": "~/.ssh/id_rsa",
      "tags": ["production"]
    }
  ],
  "services": [],
  "preferences": {
    "theme": "tokyo-night",
    "refresh_interval": 2,
    "default_workload": "vllm"
  },
  "huggingface_token": "",
  "tailscale": {
    "enabled": false,
    "tag_filter": "gpu"
  }
}
```

## Devices

Each device entry represents a GPU machine in your fleet:

| Field      | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `name`    | string   | Display name for the device          |
| `host`    | string   | Hostname or IP address               |
| `port`    | number   | SSH port (default: 22)               |
| `user`    | string   | SSH username                         |
| `key_path`| string   | Path to SSH private key              |
| `tags`    | string[] | Optional tags for organizing devices |

## Services

Services are managed automatically by Yokai when you deploy through the TUI. Each service entry tracks the container, model, ports, and target device.

## Preferences

| Field               | Type   | Default        | Description                       |
|--------------------|--------|----------------|-----------------------------------|
| `theme`            | string | `tokyo-night`  | TUI color theme                   |
| `refresh_interval` | number | `2`            | Dashboard refresh in seconds      |
| `default_workload` | string | `vllm`         | Default workload type for deploy  |

## HuggingFace Token

Set your HuggingFace token for accessing gated models:

```bash
# Set via environment variable
export HF_TOKEN=hf_xxxxx

# Or set in config directly
```

The TUI will prompt you if a token is needed during model deployment.

## Tailscale Integration

When Tailscale is enabled, Yokai auto-discovers devices on your mesh:

| Field        | Type    | Description                              |
|-------------|---------|------------------------------------------|
| `enabled`   | boolean | Enable Tailscale device discovery        |
| `tag_filter`| string  | Only discover devices with this tag      |

## Environment Variables

| Variable         | Description                         |
|-----------------|-------------------------------------|
| `YOKAI_CONFIG`  | Override config file path           |
| `HF_TOKEN`      | HuggingFace API token               |
| `YOKAI_LOG`     | Log level (debug, info, warn, error)|
