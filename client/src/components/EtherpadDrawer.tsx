export function EtherpadDrawer({
  visible,
  roomId,
}: {
  visible: boolean;
  roomId: string;
}) {
  return (
    <div
      className={`absolute left-0 h-full w-full max-w-lg bg-white shadow-lg transform transition-transform duration-300 z-20 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <iframe
        title="etherpad"
        src={`http://localhost/p/${roomId}`}
        className="w-full h-full border-none"
      />
    </div>
  );
}
