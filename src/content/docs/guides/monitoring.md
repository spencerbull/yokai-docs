---
title: Monitoring
description: Dashboard overview, Grafana integration, and metrics.
---

## TUI Dashboard

The main Yokai screen is a btop-style dashboard showing real-time fleet metrics:

- **Services table** — All deployed models with device, GPU, VRAM, and status
- **GPU utilization sparklines** — Rolling history of GPU usage across the fleet
- **VRAM usage bar** — Total and per-device memory consumption
- **Temperature chart** — GPU temperatures with color-coded thresholds
- **Power draw chart** — Wattage across all GPUs

Metrics refresh every 2 seconds (configurable via `preferences.refresh_interval`).

## Grafana Integration

Yokai auto-deploys Prometheus and Grafana for persistent, detailed monitoring.

### Setup

Press `g` from the dashboard. On first use, Yokai will:

1. Deploy a Prometheus container on your local machine
2. Deploy a Grafana container with pre-configured dashboards
3. Configure Prometheus to scrape all Yokai agents
4. Open Grafana in your browser

### Pre-built Dashboards

Yokai ships Grafana dashboards for:

- **Fleet Overview** — All devices, GPU utilization, VRAM, temperatures
- **Per-Device Detail** — Deep dive into a single machine's metrics
- **Service Metrics** — Inference throughput, latency, request queue depth
- **Historical Trends** — Long-term GPU utilization and resource patterns

### Metrics Collected

| Metric                    | Source       | Description                       |
|--------------------------|-------------|-----------------------------------|
| `gpu_utilization`        | nvidia-smi  | GPU compute utilization %         |
| `gpu_memory_used`        | nvidia-smi  | VRAM used in MB                   |
| `gpu_memory_total`       | nvidia-smi  | Total VRAM in MB                  |
| `gpu_temperature`        | nvidia-smi  | GPU temperature in Celsius        |
| `gpu_power_draw`         | nvidia-smi  | Current power draw in Watts       |
| `service_status`         | agent       | Running/stopped/error state       |
| `service_uptime`         | agent       | Time since service started        |
| `container_cpu_usage`    | Docker      | Container CPU utilization         |
| `container_memory_usage` | Docker      | Container memory utilization      |

### Custom Dashboards

Prometheus is accessible at `http://localhost:9090` and Grafana at `http://localhost:3000`. You can create custom dashboards using standard PromQL queries against the collected metrics.
