import React, { createContext, useContext, useEffect } from "react";
import { getColorFromIdentity, generateUserId } from "../utils/color";

type SyncRoomContextType = {
  userId: string;
  userName: string;
  userColor: string;
  roomId: string;
  setUserName: (name: string) => void;
};

const SyncRoomContext = createContext<SyncRoomContextType | undefined>(
  undefined
);

export const SyncRoomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [userColor, setUserColor] = React.useState<string>("");
  const roomId = "test-room"; // This can be dynamic based on your application logic

  useEffect(() => {
    setUserId(generateUserId());
    setUserColor(getColorFromIdentity(userName));
  }, [userName]);

  return (
    <SyncRoomContext.Provider
      value={{
        userId,
        userName,
        userColor,
        roomId,
        setUserName,
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
