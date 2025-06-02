import { ControlBar } from "@livekit/components-react";
import { LogOut, StickyNote } from "lucide-react";
import { useSyncRoomContext } from "../contexts/SyncRoomContext";

interface BottomControllerProps {
  showShareNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BottomController({ showShareNote }: BottomControllerProps) {
  const { userName } = useSyncRoomContext();

  const handleShareNote = () => {
    showShareNote((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 bg-gray-100 border-t border-gray-300">
      <div className="flex justify-between items-center">
        <div className="ml-4 text-gray-700 font-bold">{userName}</div>
        <ControlBar
          className="h-10 p-0 m-0"
          variation="minimal"
          controls={{
            microphone: true,
            camera: true,
            screenShare: false,
            leave: false,
          }}
        />
        <div className="text-right flex gap-2 items-center">
          <button
            className="w-8 h-8 flex items-center justify-center p-0 bg-transparent border-none hover:bg-gray-200 rounded"
            onClick={handleShareNote}
          >
            <StickyNote className="w-5 h-5 text-gray-700" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center p-0 bg-transparent border-none hover:bg-red-100 rounded"
            onClick={() => {
              if (window.confirm("정말 나가시겠습니까?")) {
                window.location.href = "/";
              }
            }}
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
