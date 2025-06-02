import { useSyncRoomContext } from "../contexts/SyncRoomContext";

const HOST_URL = import.meta.env.VITE_HOST_URL + "/ep";

export function EtherpadDrawer() {
  const { roomId, userName, userColor } = useSyncRoomContext();
  const url = `${HOST_URL}/p/${roomId}?userName=${encodeURIComponent(
    userName
  )}&userColor=${encodeURIComponent(userColor)}`;

  return (
    <div className="h-full w-full bg-white shadow-lg overflow-hidden">
      <iframe
        title="etherpad"
        src={url}
        className="w-full h-full border-none"
      />
    </div>
  );
}
