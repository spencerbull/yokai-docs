---
title: Agent API
description: REST API reference for the Yokai agent.
---

The Yokai agent runs on each GPU machine and exposes a REST API on port `7474`. This API is accessed by the daemon through SSH tunnels.

## Base URL

```
http://localhost:7474
```

## Endpoints

### Health Check

```
GET /health
```

Returns agent status and system information.

**Response:**
```json
{
  "status": "ok",
  "version": "0.1.0",
  "hostname": "gpu-box-01",
  "uptime": 86400
}
```

### GPU Information

```
GET /gpus
```

Returns information about all GPUs on the machine.

**Response:**
```json
{
  "gpus": [
    {
      "index": 0,
      "name": "NVIDIA A100 80GB",
      "memory_total": 81920,
      "memory_used": 72000,
      "utilization": 85,
      "temperature": 62,
      "power_draw": 285,
      "power_limit": 400
    }
  ]
}
```

### List Services

```
GET /services
```

Returns all running services on this device.

**Response:**
```json
{
  "services": [
    {
      "id": "abc123",
      "name": "vllm-qwen3-32b",
      "type": "vllm",
      "model": "Qwen/Qwen3-32B",
      "status": "running",
      "port": 8080,
      "created_at": "2025-01-15T10:30:00Z",
      "gpu_indices": [0]
    }
  ]
}
```

### Deploy Service

```
POST /services
```

Deploy a new inference service.

**Request Body:**
```json
{
  "type": "vllm",
  "model": "Qwen/Qwen3-32B",
  "port": 8080,
  "gpu_indices": [0],
  "options": {
    "quantization": "awq",
    "max_model_len": 32768,
    "tensor_parallel_size": 1
  }
}
```

**Response:**
```json
{
  "id": "abc123",
  "status": "deploying"
}
```

### Stop Service

```
DELETE /services/:id
```

Stop and remove a running service.

**Response:**
```json
{
  "status": "stopped"
}
```

### Restart Service

```
POST /services/:id/restart
```

Restart a running service.

**Response:**
```json
{
  "status": "restarting"
}
```

### Service Logs

```
GET /services/:id/logs?tail=100
```

Stream or retrieve logs from a service.

**Query Parameters:**

| Parameter | Type   | Default | Description                |
|-----------|--------|---------|----------------------------|
| `tail`    | number | 100     | Number of lines to return  |
| `follow`  | bool   | false   | Stream logs via SSE        |

**Response:**
```json
{
  "logs": "INFO: Started server on 0.0.0.0:8080\nINFO: Loading model...\n"
}
```

### System Metrics

```
GET /metrics
```

Returns Prometheus-formatted metrics for scraping.

```
# HELP gpu_utilization GPU utilization percentage
# TYPE gpu_utilization gauge
gpu_utilization{gpu="0",name="A100"} 85
gpu_memory_used{gpu="0",name="A100"} 72000
gpu_memory_total{gpu="0",name="A100"} 81920
gpu_temperature{gpu="0",name="A100"} 62
gpu_power_draw{gpu="0",name="A100"} 285
```

### Pull Image

```
POST /images/pull
```

Pull a Docker image on the device.

**Request Body:**
```json
{
  "image": "vllm/vllm-openai:latest"
}
```

**Response (streamed):**
```json
{
  "status": "pulling",
  "progress": "45%"
}
```
