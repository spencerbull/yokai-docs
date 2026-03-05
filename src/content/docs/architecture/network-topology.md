---
title: Network Topology
description: SSH tunnels, ports, and authentication in Yokai.
---

## Connection Model

Yokai uses SSH tunnels for all communication between the daemon and remote agents. No ports need to be opened on remote machines beyond SSH.

```
Your Machine                    GPU Machines
┌──────────┐                   ┌──────────┐
│  Daemon   │───SSH tunnel────▶│  Agent   │
│           │   port forward   │  :7474   │
│ localhost │                  │  gpu-01  │
│  :7474    │                  └──────────┘
│  :7475    │───SSH tunnel────▶┌──────────┐
│  :7476    │                  │  Agent   │
│  ...      │                  │  :7474   │
└──────────┘                   │  gpu-02  │
                               └──────────┘
```

## Ports

| Port   | Service             | Location       | Description                    |
|--------|--------------------|--------------|---------------------------------|
| 7474   | Yokai Agent        | Remote        | Agent REST API                  |
| 7474+n | Agent tunnels      | Local         | Local endpoints for each agent  |
| 8080+n | vLLM/llama.cpp     | Local         | Inference API tunnels           |
| 9090   | Prometheus         | Local         | Metrics database                |
| 3000   | Grafana            | Local         | Monitoring dashboards           |

## Authentication

Yokai uses SSH key-based authentication exclusively:

- **SSH keys** — Configured per device in your config file
- **No passwords** — Password auth is not supported for security
- **Agent auth** — The agent API is only accessible via SSH tunnel (not exposed to the network)
- **No API keys** — Since all communication is tunneled through SSH, no additional auth is needed

## Tailscale Integration

When using Tailscale, Yokai connects through the Tailscale mesh network:

1. Yokai queries the Tailscale API for devices
2. Connects via Tailscale IPs (100.x.y.z)
3. SSH tunnels are established over the Tailscale network
4. All traffic is encrypted end-to-end by WireGuard

## Firewall Requirements

### Your Machine (Control Plane)
- Outbound SSH (port 22) to GPU machines
- No inbound ports required

### GPU Machines (Agents)
- Inbound SSH (port 22) from your machine
- No other inbound ports required
- Docker network access for container image pulls
