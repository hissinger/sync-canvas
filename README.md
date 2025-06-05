# Sync Canvas

Sync Canvas is a real-time collaboration web application that integrates:

- **Whiteboard**  
  Collaborative drawing powered by [tldraw](https://tldraw.dev/).

- **Shared Notes**  
  Real-time text collaboration powered by [Etherpad](https://etherpad.org/).

- **Video/Audio Communication**  
  Seamless media interaction powered by [LiveKit](https://livekit.io/).

- **Chat**  
  Real-time messaging powered by [LiveKit](https://livekit.io/).

## Features

- Draw together on an infinite canvas
- Co-edit notes in real-time
- Communicate with voice and video
- Chat with team members
- Fully dockerized for easy setup and deployment

## Deployment Flexibility

This project uses **LiveKit Cloud** for video conferencing and the [simple sync server](https://github.com/tldraw/tldraw/tree/main/templates/simple-server-example) for tldraw synchronization by default.

However, you can replace **LiveKit Cloud** with your own self-hosted [LiveKit](https://livekit.io/) deployment.  
For tldraw synchronization, you can also use [tldraw-sync-cloudflare](https://github.com/tldraw/tldraw-sync-cloudflare), which runs on Cloudflare Workers.


## Screenshot

![Screenshot](images/screenshot.png)