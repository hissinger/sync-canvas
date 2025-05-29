import { LogOut, StickyNote } from "lucide-react";

interface BottomControllerProps {
  userName: string;
  showShareNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export function BottomController({
  userName,
  showShareNote,
}: BottomControllerProps) {
  const handleShareNote = () => {
    showShareNote((prev) => !prev);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-2 bg-gray-100 border-t border-gray-300">
      <div className="flex justify-between items-center">
        <div className="ml-4 text-gray-700">{userName}</div>
        <div className="text-right">
          <button
            className="mr-2 px-4 py-2 bg-gray-500 text-white border-none rounded-md cursor-pointer hover:bg-gray-800"
            onClick={handleShareNote}
          >
            <StickyNote className="w-5 h-5" />
          </button>
          <button
            className="mr-4 px-4 py-2 bg-red-300 text-white border-none rounded-md cursor-pointer hover:bg-red-500"
            onClick={() => {
              if (window.confirm("정말 나가시겠습니까?")) {
                // Optionally, you can redirect or perform other actions here
                window.location.href = "/"; // Redirect to home or another page
              }
            }}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
