import { useState } from "react";
import Split from "react-split";
import { BottomController } from "./BottomController";
import { Whiteboard } from "./Whiteboard";
import { EtherpadDrawer } from "./EtherpadDrawer";
import { VideoRoom } from "./VideoRoom";
import { RoomContext } from "@livekit/components-react";
import { Room } from "livekit-client";
import "@livekit/components-styles";
import { useEffect } from "react";
import { AccessToken } from "livekit-server-sdk";
import type { VideoGrant } from "livekit-server-sdk";

const serverUrl = import.meta.env.VITE_LIVEKIT_URL;
const apiKey = import.meta.env.VITE_LIVEKIT_API_KEY;
const apiSecret = import.meta.env.VITE_LIVEKIT_API_SECRET;

// Generate a token for the user to connect to the LiveKit room
const generateToken = async (roomName: string, identity: string) => {
  const at = new AccessToken(apiKey, apiSecret, {
    identity,
  });

  const videoGrant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
  };
  at.addGrant(videoGrant);

  return await at.toJwt();
};
interface RoomProps {
  roomId: string;
  userName: string;
}

export function MainRoom({ roomId, userName }: RoomProps) {
  const [showShareNote, setShowShareNote] = useState(false);
  const [room] = useState(
    () =>
      new Room({
        // Optimize video quality for each participant's screen
        adaptiveStream: true,
        // Enable automatic audio/video quality optimization
        dynacast: true,
      })
  );

  // Connect to room
  useEffect(() => {
    let mounted = true;

    const connect = async () => {
      if (mounted) {
        const token = await generateToken(roomId, userName);
        await room.connect(serverUrl, token);
      }
    };
    connect();

    return () => {
      mounted = false;
      room.disconnect();
    };
  }, [room, roomId, userName]);

  return (
    <RoomContext.Provider value={room}>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          {/* 비디오를 오른쪽 중앙에 배치 */}
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-50">
            <VideoRoom />
          </div>

          <Split
            className="split"
            sizes={showShareNote ? [30, 70] : [0, 100]}
            minSize={showShareNote ? 200 : 0}
            gutterSize={showShareNote ? 8 : 0}
            direction="horizontal"
            style={{ display: "flex", width: "100%", height: "100%" }}
          >
            {/* Left pane: Etherpad */}
            <div
              className={`h-full overflow-hidden transition-all duration-300 ${
                showShareNote ? "block" : "hidden"
              }`}
            >
              {showShareNote && <EtherpadDrawer roomId={roomId} />}
            </div>

            {/* Right pane: Whiteboard */}
            <div className="flex-1 min-w-0 h-full overflow-hidden">
              <Whiteboard roomId={roomId} userName={userName} />
            </div>
          </Split>
        </div>
        <div className="min-h-[50px]">
          <BottomController
            userName={userName}
            showShareNote={setShowShareNote}
          />
        </div>
      </div>
    </RoomContext.Provider>
  );
}
