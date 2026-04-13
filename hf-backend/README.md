---
title: DesiOS PocketBase Backend
emoji: 💎
colorFrom: red
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# DesiOS PocketBase Backend
This is the dedicated backend for Desi Digital Prints, hosted on Hugging Face Spaces.

### Files in this repository:
- `Dockerfile`: Sets up the PocketBase server.
- `pb_data/`: (Will be created automatically) This is where your booklets and images are stored.

### Deployment Instructions:
1. Create a new Space on [Hugging Face](https://huggingface.co/new-space).
2. Select **Docker** as the SDK.
3. Upload the `Dockerfile` and this `README.md`.
4. Go to **Settings** > **Variables and secrets** and ensure port `7860` is open.
5. For persistent data, enable a **Persistent Storage** tier in your Space settings.
