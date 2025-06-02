import { Entrance } from "./components/Entrance";
import { MainRoom } from "./components/MainRoom";
import {
  SyncRoomProvider,
  useSyncRoomContext,
} from "./contexts/SyncRoomContext";
import "./tailwind.css";

function App() {
  return (
    <SyncRoomProvider>
      <Content />
    </SyncRoomProvider>
  );
}

function Content() {
  const { userName } = useSyncRoomContext();
  return <>{userName ? <MainRoom /> : <Entrance />}</>;
}

export default App;
