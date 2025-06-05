import { useState } from "react";
import { Entrance } from "./components/Entrance";
import { MainRoom } from "./components/MainRoom";
import "./tailwind.css";

function App() {
  const [roomId] = useState<string>("test-room");
  const [userName, setUserName] = useState<string>("");

  return (
    <>
      {userName ? (
        <MainRoom roomId={roomId} userName={userName} />
      ) : (
        <Entrance onEnter={setUserName} />
      )}
    </>
  );
}

export default App;
