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

const serverUrl = import.meta.env.VITE_LIVEKIT_URL;

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
        const res = await fetch(
          `/livekit/token?room=${roomId}&identity=${userName}`
        );
        const { token } = await res.json();
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
