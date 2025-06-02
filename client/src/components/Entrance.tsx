import { useState } from "react";
import { useSyncRoomContext } from "../contexts/SyncRoomContext";

export function Entrance() {
  const [textValue, setTextValue] = useState("");
  const { setUserName: setUserName } = useSyncRoomContext();

  const handleEnter = () => {
    if (textValue.trim()) {
      setUserName(textValue.trim());
    } else {
      alert("이름을 입력해주세요.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <section className="bg-white text-black p-8 rounded w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-2">환영합니다</h1>
        <p className="mb-4">입장할 이름을 입력해주세요.</p>
        <input
          type="text"
          className="w-full px-4 py-2 border border-black bg-white text-black rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="이름 입력"
        />
        <button
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          onClick={handleEnter}
        >
          입장
        </button>
      </section>
    </main>
  );
}
