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
          {trackRef.publication && !trackRef.publication.isMuted ? (
            <ParticipantTile
              trackRef={trackRef}
              className="w-full h-full object-cover"
              disableSpeakingIndicator={true}
            />
          ) : (
            <NamePlaceholderTile name={trackRef.participant.name} />
          )}
        </div>
      ))}
    </div>
  );
}

function getInitials(name?: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

function NamePlaceholderTile({ name }: { name?: string }) {
  const initials = getInitials(name);
  return (
    <div className="w-full h-full rounded-full bg-gray-700 text-white flex items-center justify-center text-4xl font-semibold">
      {initials}
    </div>
  );
}
