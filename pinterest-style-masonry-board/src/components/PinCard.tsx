import { useState } from "react";
import type { Pin, Board } from "../data/pins";
import PatternBackground from "./PatternBackground";

type Props = {
  pin: Pin;
  boards: Board[];
  savedPins: Set<string>;
  onSave: (pinId: string, boardId: string) => void;
  onUnsave: (pinId: string) => void;
  onClick: (pin: Pin) => void;
};

export default function PinCard({
  pin,
  boards,
  savedPins,
  onSave,
  onUnsave,
  onClick,
}: Props) {
  const [showBoardPicker, setShowBoardPicker] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isSaved = savedPins.has(pin.id);

  const savedBoard = boards.find((b) => b.pinIds.includes(pin.id));

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      onUnsave(pin.id);
    } else {
      setShowBoardPicker((v) => !v);
    }
  };

  const handleBoardSelect = (e: React.MouseEvent, boardId: string) => {
    e.stopPropagation();
    onSave(pin.id, boardId);
    setShowBoardPicker(false);
  };

  return (
    <div
      className="relative group cursor-pointer mb-4 break-inside-avoid"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setShowBoardPicker(false);
      }}
      onClick={() => onClick(pin)}
    >
      {/* Image / Pattern Area */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300">
        <PatternBackground
          pattern={pin.pattern}
          colors={pin.colors}
          height={pin.height}
        />

        {/* Overlay on hover */}
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Save button */}
        <div
          className={`absolute top-3 right-3 transition-opacity duration-200 ${
            hovered || isSaved ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleSaveClick}
            className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-150 active:scale-95 ${
              isSaved
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>

          {/* Board Picker Dropdown */}
          {showBoardPicker && (
            <div
              className="absolute right-0 top-10 w-52 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Save to board
                </p>
              </div>
              <div className="max-h-56 overflow-y-auto">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={(e) => handleBoardSelect(e, board.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                  >
                    {/* Mini board preview */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 grid grid-cols-2 gap-0.5">
                      {board.coverPatterns.slice(0, 2).map((pat, i) => (
                        <PatternBackground
                          key={i}
                          pattern={pat}
                          colors={board.coverColors[i] || board.coverColors[0]}
                          className="!h-full"
                        />
                      ))}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {board.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {board.pinIds.length} pins
                      </p>
                    </div>
                    {board.isSecret && (
                      <span className="ml-auto text-gray-300">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom info on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 transition-opacity duration-200 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-white transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-white transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
              More
            </button>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-1 pt-2 pb-1">
        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{pin.title}</p>
        {savedBoard && isSaved && (
          <p className="text-xs text-gray-400 mt-0.5">
            <span className="text-red-400">♥</span> Saved to {savedBoard.name}
          </p>
        )}
        <div className="flex items-center gap-1.5 mt-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">
            {pin.authorAvatar}
          </div>
          <span className="text-xs text-gray-500">{pin.author}</span>
        </div>
      </div>
    </div>
  );
}
