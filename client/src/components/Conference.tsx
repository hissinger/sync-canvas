import { RoomAudioRenderer, useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import "../styles/livekit-custom.css";
import { CenteredParticipantTiles } from "./CenteredParticipantTiles";

export function Conference() {
  return (
    <div>
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
    </div>
  );
}

function MyVideoConference() {
  const tracks = useTracks([Track.Source.Camera], { onlySubscribed: false });

  if (tracks.length === 0) {
    return null;
  }

  return <CenteredParticipantTiles tracks={tracks} />;
}
