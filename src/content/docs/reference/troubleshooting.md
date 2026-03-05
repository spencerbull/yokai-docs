---
title: Troubleshooting
description: Common issues and fixes for Yokai.
---

## Device Connection Issues

### Device shows red status indicator

**Cause:** SSH connection failed.

**Fix:**
1. Verify SSH connectivity manually: `ssh user@host`
2. Check that the SSH key path in your config is correct
3. Ensure the target machine's SSH server is running
4. Check firewall rules allow SSH from your machine

### "Agent not responding" error

**Cause:** The Yokai agent isn't running on the remote machine.

**Fix:**
1. SSH into the machine and check if the agent is running:
   ```bash
   ps aux | grep yokai
   ```
2. Restart the agent manually:
   ```bash
   yokai agent
   ```
3. Remove and re-add the device in Yokai to trigger agent reinstallation

### "No GPUs detected" on device

**Cause:** NVIDIA drivers or Container Toolkit not installed.

**Fix:**
1. Verify drivers: `nvidia-smi` should show your GPUs
2. Install NVIDIA Container Toolkit:
   ```bash
   sudo apt-get install -y nvidia-container-toolkit
   sudo systemctl restart docker
   ```
3. Test Docker GPU access:
   ```bash
   docker run --rm --gpus all nvidia/cuda:12.0-base nvidia-smi
   ```

## Deployment Issues

### Model deployment stuck on "pulling"

**Cause:** Large model download or slow network.

**Fix:**
- Check progress with `l` (logs) — the download percentage should be increasing
- Ensure the target machine has sufficient disk space
- For gated models, verify your HuggingFace token is set

### "Out of memory" during deployment

**Cause:** Model too large for available VRAM.

**Fix:**
- Choose a smaller quantization (e.g., Q4_K_M instead of Q8_0)
- Use a device with more VRAM
- For vLLM, reduce `max_model_len`
- Stop other services on the same GPU first

### Service starts then immediately crashes

**Cause:** Configuration mismatch or incompatible model.

**Fix:**
1. Check logs with `l` for the specific error
2. Common causes:
   - Model requires more VRAM than available
   - Unsupported model architecture for the selected runtime
   - Port conflict with another service

## Monitoring Issues

### Grafana won't open

**Cause:** Docker not running on local machine.

**Fix:**
- Ensure Docker is installed and running locally
- Check if port 3000 is already in use: `lsof -i :3000`

### Metrics show stale data

**Cause:** Agent metrics collection interval.

**Fix:**
- Metrics update every 2 seconds by default
- Check agent connectivity (device should show green status)
- Restart the daemon: kill the yokai daemon process and relaunch `yokai`

## General

### Config file corrupted

**Fix:** Delete and regenerate:
```bash
rm ~/.config/yokai/config.json
yokai
```

### Yokai won't start

**Fix:**
1. Check for an existing daemon process: `ps aux | grep yokai`
2. Kill stale processes: `pkill yokai`
3. Remove any lock files: `rm ~/.config/yokai/*.lock`
4. Relaunch: `yokai`

### Upgrade fails

**Fix:** Download manually from [GitHub Releases](https://github.com/spencerbull/Yokai/releases) and replace the binary:
```bash
sudo mv yokai /usr/local/bin/yokai
```
