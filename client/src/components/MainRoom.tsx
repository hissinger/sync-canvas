import { useState } from "react";
import Split from "react-split";
import { BottomController } from "./BottomController";
import { Whiteboard } from "./Whiteboard";
import { EtherpadDrawer } from "./EtherpadDrawer";
import { Conference } from "./Conference";
import { RoomContext } from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect } from "react";
import { LiveKitService } from "../services/LiveKitService";

interface RoomProps {
  roomId: string;
  userName: string;
}

export function MainRoom({ roomId, userName }: RoomProps) {
  const [showShareNote, setShowShareNote] = useState(false);
  const [liveKitService] = useState(() => new LiveKitService());

  // Connect to room
  useEffect(() => {
    if (!roomId || !userName) {
      console.error("Room ID and user name are required to connect.");
      return;
    }

    const connect = async () => {
      await liveKitService.connect(roomId, userName);
    };
    connect();

    return () => {
      liveKitService.disconnect();
    };
  }, [liveKitService, roomId, userName]);

  return (
    <RoomContext.Provider value={liveKitService.getRoom()}>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <div className="z-50">
            <Conference />
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
