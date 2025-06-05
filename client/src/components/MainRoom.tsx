import { useCallback, useState } from "react";
import Split from "react-split";
import { BottomController } from "./BottomController";
import { Whiteboard } from "./Whiteboard";
import { EtherpadDrawer } from "./EtherpadDrawer";
import { Conference } from "./Conference";
import { RoomContext } from "@livekit/components-react";
import { useEffect } from "react";
import { LiveKitService } from "../services/LiveKitService";
import { SyncRoomProvider } from "../contexts/SyncRoomContext";
import "@livekit/components-styles";
import { ChatRoom } from "./ChatRoom";
import { generateUserId, getColorFromIdentity } from "../utils/color";
import { useChatSendJoinMessage } from "../hooks/useChatSendJoinMessage";

interface MainRoomProps {
  roomId: string;
  userName: string;
}

export function MainRoom({ roomId, userName }: MainRoomProps) {
  const [liveKitService] = useState(() => new LiveKitService());
  const [userId, setUserId] = useState<string>("");
  const [userColor, setUserColor] = useState<string>("");

  useEffect(() => {
    setUserId(generateUserId());
    setUserColor(getColorFromIdentity(userName));
  }, [userName]);

  useEffect(() => {
    if (!roomId || !userName || !userId) {
      return;
    }

    const connect = async () => {
      await liveKitService.connect(roomId, userId, userName);
    };
    connect();

    return () => {
      liveKitService.disconnect();
    };
  }, [liveKitService, roomId, userId, userName]);

  return (
    <RoomContext.Provider value={liveKitService.getRoom()}>
      <SyncRoomProvider
        userInfo={{
          id: userId,
          name: userName,
          color: userColor,
        }}
      >
        <Content />
      </SyncRoomProvider>
    </RoomContext.Provider>
  );
}

function Content() {
  const [showShareNote, setShowShareNote] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useChatSendJoinMessage();

  const handleToggleShareNote = useCallback(() => {
    setShowShareNote((prev) => {
      const newValue = !prev;
      if (newValue) setShowChat(false);
      return newValue;
    });
  }, []);

  const handleToggleChat = useCallback(() => {
    setShowChat((prev) => {
      const newValue = !prev;
      if (newValue) setShowShareNote(false);
      return newValue;
    });
  }, []);

  const handleCloseChat = useCallback(() => {
    setShowChat(false);
  }, []);

  const showLeftPane = showShareNote || showChat;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {/* Conference component for video/audio */}
        <div className="z-50">
          <Conference />
        </div>

        <Split
          className="split"
          sizes={showLeftPane ? [30, 70] : [0, 100]}
          minSize={showLeftPane ? 200 : 0}
          gutterSize={showLeftPane ? 8 : 0}
          direction="horizontal"
          style={{ display: "flex", width: "100%", height: "100%" }}
        >
          {/* Left pane: Etherpad */}
          <div
            className={`h-full overflow-hidden transition-all duration-300 ${
              showLeftPane ? "block" : "hidden"
            }`}
          >
            {showShareNote && <EtherpadDrawer />}
            {showChat && (
              <ChatRoom isOpen={showChat} onClose={handleCloseChat} />
            )}
          </div>

          {/* Right pane: Whiteboard */}
          <div className="flex-1 min-w-0 h-full overflow-hidden">
            <Whiteboard />
          </div>
        </Split>
      </div>
      <div className="min-h-[50px]">
        <BottomController
          showShareNote={handleToggleShareNote}
          showChat={handleToggleChat}
        />
      </div>
    </div>
  );
}
