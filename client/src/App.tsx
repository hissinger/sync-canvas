import { Entrance } from "./components/Entrance";
import { useState } from "react";
import "./tailwind.css";
import { Room } from "./components/Room";

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
