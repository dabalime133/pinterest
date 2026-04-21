import type { Pin, Board } from "../data/pins";
import PinCard from "./PinCard";

type Props = {
  pins: Pin[];
  boards: Board[];
  savedPins: Set<string>;
  onSave: (pinId: string, boardId: string) => void;
  onUnsave: (pinId: string) => void;
  onClick: (pin: Pin) => void;
};

export default function MasonryGrid({
  pins,
  boards,
  savedPins,
  onSave,
  onUnsave,
  onClick,
}: Props) {
  if (pins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-xl font-bold text-gray-700">No pins found</p>
        <p className="text-sm text-gray-400 mt-2">Try a different search or filter</p>
      </div>
    );
  }

  return (
    <div
      style={{
        columns: "var(--masonry-cols, 4)",
        columnGap: "1rem",
      }}
    >
      {pins.map((pin) => (
        <PinCard
          key={pin.id}
          pin={pin}
          boards={boards}
          savedPins={savedPins}
          onSave={onSave}
          onUnsave={onUnsave}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
