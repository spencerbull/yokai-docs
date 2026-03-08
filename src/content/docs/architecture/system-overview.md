---
title: System Overview
description: Yokai's three-tier architecture.
---

Yokai uses a three-tier architecture: **TUI**, **Daemon**, and **Agent**.

## Architecture Diagram

```
┌──────────────────┐
│   TUI (Bubbletea) │  ← You interact here
│   Terminal UI      │
└────────┬─────────┘
         │ HTTP REST (localhost:7473)
┌────────▼─────────┐
│   Daemon          │  ← Runs on your machine
│   - SSH tunnels   │
│   - Metrics agg   │
│   - Service mgmt  │
└────────┬─────────┘
         │ SSH tunnels
    ┌────┴──────────────────┐
    │                       │
┌───▼───┐            ┌─────▼──┐
│ Agent  │            │ Agent  │  ← Runs on GPU machines
│ :7474  │            │ :7474  │
│ gpu-01 │            │ gpu-02 │
└────────┘            └────────┘
```

## TUI (Terminal User Interface)

The TUI is what you see when you run `yokai`. Built with [Bubbletea](https://github.com/charmbracelet/bubbletea), it provides:

- Real-time dashboard with GPU metrics
- Deployment wizard
- Device management
- Service control (start, stop, restart, logs)
- AI tool configuration

The TUI communicates with the daemon via HTTP REST on `localhost:7473`. It renders at your terminal's refresh rate with responsive layouts.

## Daemon

The daemon runs on your local machine and acts as the control plane:

- **SSH Tunnel Management** — Maintains persistent SSH tunnels to all connected devices
- **Metrics Aggregation** — Collects metrics from all agents and provides a unified view
- **Service Orchestration** — Coordinates deployments, restarts, and teardowns across devices
- **Prometheus/Grafana** — Manages the local monitoring stack

The daemon starts automatically when you launch the TUI and runs in the background. It persists between TUI sessions so tunnels stay alive.

## Agent

The agent runs on each GPU machine in your fleet:

- **REST API on port 7474** — Receives commands from the daemon
- **Docker Operations** — Pulls images, starts/stops containers, streams logs
- **GPU Monitoring** — Polls `nvidia-smi` for utilization, VRAM, temperature, power
- **Health Checks** — Reports device status and service health

The agent is a single binary with no dependencies. When you add a device, Yokai automatically SCPs the agent binary and starts it.

## Data Flow

1. **User action** → TUI sends command to daemon
2. **Daemon** → Routes command to appropriate agent via SSH tunnel
3. **Agent** → Executes Docker/GPU operations, returns result
4. **Metrics** → Agents push metrics → Daemon aggregates → TUI renders
5. **Prometheus** → Scrapes agent endpoints → Grafana visualizes
