import { useState } from "react";
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
      <div
        className={`grid flex-1 overflow-hidden transition-all duration-300 ${
          showShareNote ? "grid-cols-3 gap-x-1" : "grid-cols-1"
        }`}
      >
        {showShareNote && (
          <div className="col-span-1 overflow-hidden relative">
            <EtherpadDrawer visible={showShareNote} roomId={roomId} />
          </div>
        )}
        <div
          className={`${
            showShareNote ? "col-span-2" : "col-span-1"
          } overflow-hidden relative`}
        >
          <Whiteboard roomId={roomId} userName={userName} />
        </div>
      </div>

      <div className="min-h-[58px]">
        <BottomController
          userName={userName}
          showShareNote={setShowShareNote}
        />
      </div>
    </div>
  );
}
