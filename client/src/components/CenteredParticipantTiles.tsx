import { ParticipantTile, type useTracks } from "@livekit/components-react";
import { getColorFromIdentity } from "../utils/color";

export function CenteredParticipantTiles({
  tracks,
}: {
  tracks: ReturnType<typeof useTracks>;
}) {
  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
      {tracks.map((trackRef) => (
        <div
          key={trackRef.participant.sid}
          className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg shadow-gray-500/50"
          style={{
            borderColor: getColorFromIdentity(trackRef.participant.identity),
          }}
        >
          <ParticipantTile
            trackRef={trackRef}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
