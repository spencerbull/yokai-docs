---
title: CLI Commands
description: Complete reference for Yokai CLI commands.
---

## yokai

Launch the TUI dashboard.

```bash
yokai
```

This is the primary way to interact with Yokai. It starts the daemon if not already running and opens the interactive terminal interface.

**Flags:**

| Flag          | Description                    |
|--------------|--------------------------------|
| `--config`   | Path to config file            |
| `--log`      | Log level (debug/info/warn/error) |

## yokai agent

Start the Yokai agent on a GPU machine.

```bash
yokai agent [port]
```

The agent runs a REST API server that handles Docker operations and GPU monitoring. Default port is `7474`.

**Arguments:**

| Argument | Default | Description          |
|----------|---------|----------------------|
| `port`   | 7474    | Port to listen on    |

**Example:**

```bash
# Start agent on default port
yokai agent

# Start agent on custom port
yokai agent 8888
```

You typically don't run this manually — Yokai auto-deploys the agent when you add a device.

## yokai daemon

Start the Yokai daemon manually.

```bash
yokai daemon
```

The daemon manages SSH tunnels, metrics aggregation, and service orchestration. It normally starts automatically with the TUI.

**Flags:**

| Flag          | Description                    |
|--------------|--------------------------------|
| `--config`   | Path to config file            |
| `--log`      | Log level                      |

## yokai upgrade

Upgrade Yokai to the latest version.

```bash
yokai upgrade
```

This downloads the latest release binary and replaces the current installation. It also upgrades agents on all connected devices.

## yokai version

Print the current Yokai version.

```bash
yokai version
```

**Output:**

```
yokai v0.1.0 (abc1234) built 2025-01-15
```
