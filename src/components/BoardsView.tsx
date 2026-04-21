import { useState } from "react";
import type { Board, Pin } from "../data/pins";
import PatternBackground from "./PatternBackground";
import PinCard from "./PinCard";

type Props = {
  boards: Board[];
  allPins: Pin[];
  savedPins: Set<string>;
  onSave: (pinId: string, boardId: string) => void;
  onUnsave: (pinId: string) => void;
  onPinClick: (pin: Pin) => void;
  onCreateBoard: (name: string) => void;
  onDeleteBoard: (boardId: string) => void;
};

export default function BoardsView({
  boards,
  allPins,
  savedPins,
  onSave,
  onUnsave,
  onPinClick,
  onCreateBoard,
  onDeleteBoard,
}: Props) {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleCreate = () => {
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName.trim());
      setNewBoardName("");
      setShowCreateModal(false);
    }
  };

  if (selectedBoard) {
    const board = boards.find((b) => b.id === selectedBoard.id) ?? selectedBoard;
    const pins = allPins.filter((p) => board.pinIds.includes(p.id));

    return (
      <div>
        {/* Board header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setSelectedBoard(null)}
            className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">{board.name}</h2>
              {board.isSecret && (
                <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secret
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{pins.length} pins · {board.description}</p>
          </div>
          <button
            onClick={() => {
              onDeleteBoard(board.id);
              setSelectedBoard(null);
            }}
            className="ml-auto px-4 py-2 text-sm font-semibold text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            Delete board
          </button>
        </div>

        {pins.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📌</div>
            <p className="text-gray-500 text-lg font-medium">No pins yet</p>
            <p className="text-gray-400 text-sm mt-1">Save pins to see them here</p>
          </div>
        ) : (
          <div
            className="gap-4"
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
                onClick={onPinClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Boards</h2>
          <p className="text-sm text-gray-500 mt-0.5">{boards.length} boards</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New board
        </button>
      </div>

      {/* Boards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {boards.map((board) => {
          const pins = allPins.filter((p) => board.pinIds.includes(p.id));
          return (
            <button
              key={board.id}
              onClick={() => setSelectedBoard(board)}
              className="group text-left"
            >
              {/* Cover mosaic */}
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-2 shadow-sm group-hover:shadow-lg transition-shadow duration-300">
                {board.coverPatterns.length >= 3 ? (
                  <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-0.5">
                    <PatternBackground
                      pattern={board.coverPatterns[0]}
                      colors={board.coverColors[0]}
                      className="row-span-2 !h-full"
                    />
                    <PatternBackground
                      pattern={board.coverPatterns[1]}
                      colors={board.coverColors[1]}
                      className="!h-full"
                    />
                    <PatternBackground
                      pattern={board.coverPatterns[2]}
                      colors={board.coverColors[2]}
                      className="!h-full"
                    />
                  </div>
                ) : (
                  <PatternBackground
                    pattern={board.coverPatterns[0]}
                    colors={board.coverColors[0]}
                    className="!h-full"
                  />
                )}

                {/* Lock badge */}
                {board.isSecret && (
                  <div className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="bg-white rounded-full px-3 py-1.5 text-xs font-bold text-gray-800 shadow-lg">
                    Open
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900 truncate">{board.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {pins.length} {pins.length === 1 ? "pin" : "pins"}
                  {board.isSecret ? " · Secret" : ""}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Create Board Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Create board</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Board name
              </label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="e.g. Travel Inspiration"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400 transition-colors"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 rounded-full text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newBoardName.trim()}
                className="flex-1 py-3 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
