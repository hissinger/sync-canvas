import { useConnectionState } from "@livekit/components-react";
import { useSyncRoomContext } from "../contexts/SyncRoomContext";
import { useEffect } from "react";
import type { ChatMessage } from "../types/chat";

export const useChatSendJoinMessage = () => {
  const { userName, send } = useSyncRoomContext();
  const connectionState = useConnectionState();

  useEffect(() => {
    if (connectionState !== "connected") return;
    if (!userName) return;

    const payload: ChatMessage = {
      message: userName,
      type: "joined",
    };

    send(JSON.stringify(payload));
  }, [userName, send, connectionState]);
};
