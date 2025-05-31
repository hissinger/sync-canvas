import React from "react";
import { ParticipantTile, useTracks } from "@livekit/components-react";
import "../styles/livekit-custom.css";
import Draggable from "react-draggable";
import { getColorFromIdentity } from "../utils/color";

export const DraggableParticipantTiles = ({
  tracks,
}: {
  tracks: ReturnType<typeof useTracks>;
}) => {
  const nodeRefs = React.useMemo(
    () => tracks.map(() => React.createRef<HTMLDivElement>()),
    [tracks]
  );

  return (
    <div className="absolute w-full h-screen pr-32 pointer-events-none">
      {tracks.map((trackRef, index) => (
        <Draggable
          key={trackRef.participant.sid}
          bounds="parent"
          nodeRef={nodeRefs[index] as React.RefObject<HTMLDivElement>}
        >
          <div
            ref={nodeRefs[index]}
            className="absolute w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg shadow-gray-500/50"
            style={{
              borderColor: getColorFromIdentity(trackRef.participant.identity),
            }}
          >
            <div className="w-full h-full pointer-events-auto">
              <ParticipantTile
                trackRef={trackRef}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
};
