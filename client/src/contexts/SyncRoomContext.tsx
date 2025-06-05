import React, { createContext, useContext } from "react";
import { useChat, type ReceivedChatMessage } from "@livekit/components-react";
import type { SendTextOptions } from "livekit-client";

type SyncRoomContextType = {
  userId: string;
  userName: string;
  userColor: string;
  roomId: string;
  setUserName: (name: string) => void;
  chatMessages: ReceivedChatMessage[];
  send: (
    message: string,
    options?: SendTextOptions
  ) => Promise<ReceivedChatMessage>;
  isSending?: boolean;
};

interface UserInfo {
  id: string;
  name: string;
  color: string;
}

const SyncRoomContext = createContext<SyncRoomContextType | undefined>(
  undefined
);

export const SyncRoomProvider = ({
  children,
  userInfo,
}: {
  children: React.ReactNode;
  userInfo: UserInfo;
}) => {
  const roomId = "test-room";

  const [userId, setUserId] = React.useState<string>(userInfo.id);
  const [userName, setUserName] = React.useState<string>(userInfo.name);
  const [userColor, setUserColor] = React.useState<string>(userInfo.color);
  const { chatMessages, send, isSending } = useChat();

  React.useEffect(() => {
    setUserId(userInfo.id);
    setUserName(userInfo.name);
    setUserColor(userInfo.color);
  }, [userInfo]);

  return (
    <SyncRoomContext.Provider
      value={{
        userId,
        userName,
        userColor,
        roomId,
        setUserName,
        chatMessages,
        send,
        isSending,
      }}
    >
      {children}
    </SyncRoomContext.Provider>
  );
};

export const useSyncRoomContext = () => {
  const context = useContext(SyncRoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};
