import { Entrance } from "./components/Entrance";
import { useState } from "react";
import { Room } from "./components/Room";
import "./tailwind.css";

const roomId = "test-room";

function App() {
  const [userName, setUserName] = useState("");

  return userName ? (
    <Room userName={userName} roomId={roomId} />
  ) : (
    <Entrance onSubmit={setUserName} />
  );
}

export default App;
