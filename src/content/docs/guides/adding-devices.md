---
title: Adding Devices
description: How to connect GPU machines to your Yokai fleet.
---

Yokai supports three methods for discovering and connecting GPU machines.

## LAN Discovery

Press `d` in the dashboard, then `a` and select **LAN Scan**.

Yokai scans your local network for machines with:
- SSH access (port 22)
- NVIDIA GPUs detected via `nvidia-smi`

Discovered devices appear in a list. Select one or more to add to your fleet.

## Tailscale Discovery

If you use [Tailscale](https://tailscale.com), Yokai can automatically discover GPU machines on your mesh.

1. Enable Tailscale in your config:
   ```json
   {
     "tailscale": {
       "enabled": true,
       "tag_filter": "gpu"
     }
   }
   ```
2. Press `d` then `a` and select **Tailscale**
3. Yokai queries the Tailscale API and lists machines matching your tag filter

## Manual Connection

For machines not on your LAN or Tailscale mesh:

1. Press `d` then `a` and select **Manual**
2. Enter the connection details:
   - **Hostname/IP** — The machine's address
   - **SSH Port** — Default 22
   - **Username** — SSH user with Docker permissions
   - **SSH Key** — Path to your private key

## Agent Installation

When you add a device, Yokai automatically:

1. SSHs into the target machine
2. Copies the Yokai agent binary
3. Starts the agent on port `7474`
4. Verifies GPU access and Docker connectivity
5. Establishes a persistent SSH tunnel

The agent runs as a lightweight REST API server that handles Docker operations and GPU monitoring on the remote machine.

## Verifying Connectivity

After adding a device, it should appear in your dashboard with:
- A green status indicator
- GPU count and model information
- Current VRAM and utilization metrics

If the device shows a red indicator, check the [Troubleshooting](/yokai-docs/reference/troubleshooting/) guide.

## Removing Devices

Press `d` to open the device manager, navigate to the device, and press `x` to remove it. This stops the agent and removes the SSH tunnel.
