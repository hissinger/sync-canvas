const HOST_URL = import.meta.env.VITE_HOST_URL + '/ep';

export function EtherpadDrawer({ roomId }: { roomId: string }) {
  return (
    <div className="h-full w-full bg-white shadow-lg overflow-hidden">
      <iframe
        title="etherpad"
        src={`${HOST_URL}/p/${roomId}`}
        className="w-full h-full border-none"
      />
    </div>
  );
}
