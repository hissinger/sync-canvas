import { Entrance } from "./components/Entrance";
import { useState } from "react";
import { MainRoom } from "./components/MainRoom";
import "./tailwind.css";

const roomId = "test-room";

function App() {
  const [userName, setUserName] = useState("");

  return userName ? (
    <MainRoom userName={userName} roomId={roomId} />
  ) : (
    <Entrance onSubmit={setUserName} />
  );
}

export default App;
