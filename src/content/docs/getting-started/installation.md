---
title: Installation
description: How to install Yokai on your system.
---

Yokai ships as a single binary with zero dependencies. Pick your preferred installation method.

## One-Liner (Recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/spencerbull/Yokai/main/install.sh | sh
```

This detects your OS and architecture, downloads the latest release, and installs to `/usr/local/bin/yokai`.

## From GitHub Releases

Download the appropriate binary from the [releases page](https://github.com/spencerbull/Yokai/releases):

| Platform       | Architecture | Binary                        |
|----------------|-------------|-------------------------------|
| Linux          | amd64       | `yokai-linux-amd64`          |
| Linux          | arm64       | `yokai-linux-arm64`          |
| macOS          | amd64       | `yokai-darwin-amd64`         |
| macOS          | arm64       | `yokai-darwin-arm64`         |
| Windows        | amd64       | `yokai-windows-amd64.exe`   |

```bash
# Example: Linux amd64
wget https://github.com/spencerbull/Yokai/releases/latest/download/yokai-linux-amd64
chmod +x yokai-linux-amd64
sudo mv yokai-linux-amd64 /usr/local/bin/yokai
```

## Build from Source

Requires Go 1.21+:

```bash
git clone https://github.com/spencerbull/Yokai.git
cd Yokai
go build -o yokai ./cmd/yokai
sudo mv yokai /usr/local/bin/
```

## Verify Installation

```bash
yokai version
```

## Target Machine Requirements

Yokai itself has zero dependencies. However, your **target GPU machines** need:

- **Linux** (Ubuntu 22.04+ recommended)
- **Docker** installed and running
- **NVIDIA GPU** with drivers installed
- **NVIDIA Container Toolkit** (`nvidia-docker2`)
- **SSH access** from the machine running Yokai
