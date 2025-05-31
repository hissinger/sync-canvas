import { Room, VideoPresets } from "livekit-client";

const serverUrl = import.meta.env.VITE_HOST_URL;
const liveKitHostUrl = import.meta.env.VITE_LIVEKIT_URL;

export class LiveKitService {
  private room: Room;

  constructor() {
    this.room = new Room({
      adaptiveStream: true,
      dynacast: true,
      publishDefaults: {
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
      },
    });
  }

  async connect(roomId: string, userName: string): Promise<void> {
    const res = await fetch(
      `${serverUrl}/livekit/token?room=${roomId}&identity=${userName}`
    );
    const { token } = await res.json();
    await this.room.connect(liveKitHostUrl, token);
  }

  disconnect(): void {
    this.room.disconnect();
  }

  getRoom(): Room {
    return this.room;
  }
}
