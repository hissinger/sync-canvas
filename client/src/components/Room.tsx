import { useState } from "react";
import Split from "react-split";
import { BottomController } from "./BottomController";
import { Whiteboard } from "./Whiteboard";
import { EtherpadDrawer } from "./EtherpadDrawer";

interface RoomProps {
  roomId: string;
  userName: string;
}

export function Room({ roomId, userName }: RoomProps) {
  const [showShareNote, setShowShareNote] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
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
  );
}
