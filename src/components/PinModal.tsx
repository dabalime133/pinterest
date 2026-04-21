import { useEffect, useState } from "react";
import type { Pin, Board } from "../data/pins";
import PatternBackground from "./PatternBackground";

type Props = {
  pin: Pin | null;
  boards: Board[];
  savedPins: Set<string>;
  onSave: (pinId: string, boardId: string) => void;
  onUnsave: (pinId: string) => void;
  onClose: () => void;
};

export default function PinModal({
  pin,
  boards,
  savedPins,
  onSave,
  onUnsave,
  onClose,
}: Props) {
  const [showBoardPicker, setShowBoardPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (pin) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [pin]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!pin) return null;

  const isSaved = savedPins.has(pin.id);
  const savedBoard = boards.find((b) => b.pinIds.includes(pin.id));

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left: Pattern */}
        <div className="md:w-2/5 flex-shrink-0 min-h-[240px] md:min-h-0">
          <PatternBackground
            pattern={pin.pattern}
            colors={pin.colors}
            className="h-full min-h-[240px]"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col flex-1 overflow-y-auto p-6">
          {/* Action row */}
          <div className="flex items-center gap-2 mb-5">
            {/* Share */}
            <button
              onClick={handleCopy}
              className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              title="Copy link"
            >
              {copied ? (
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              )}
            </button>

            {/* More */}
            <button className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="1.5" />
                <circle cx="12" cy="12" r="1.5" />
                <circle cx="19" cy="12" r="1.5" />
              </svg>
            </button>

            {/* Save Section */}
            <div className="ml-auto flex items-center gap-2 relative">
              {/* Board selector */}
              <button
                onClick={() => setShowBoardPicker((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <span className="max-w-[100px] truncate">
                  {isSaved && savedBoard ? savedBoard.name : "Choose board"}
                </span>
                <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Board dropdown */}
              {showBoardPicker && (
                <div className="absolute right-24 top-11 w-56 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Save to board
                    </p>
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {boards.map((board) => (
                      <button
                        key={board.id}
                        onClick={() => {
                          onSave(pin.id, board.id);
                          setShowBoardPicker(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                      >
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
                          <svg className="w-3.5 h-3.5 text-gray-300 ml-auto flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Save / Saved button */}
              <button
                onClick={() => (isSaved ? onUnsave(pin.id) : setShowBoardPicker(true))}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all active:scale-95 ${
                  isSaved
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Saves count */}
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span className="font-semibold text-gray-700">{pin.saves.toLocaleString()}</span>
            <span>saves</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
            {pin.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5">
            {pin.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pin.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-xs font-semibold text-gray-600 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
              {pin.authorAvatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{pin.author}</p>
              <p className="text-xs text-gray-400">Creator</p>
            </div>
            <button className="ml-auto px-4 py-1.5 border-2 border-gray-200 rounded-full text-sm font-semibold text-gray-700 hover:border-gray-400 transition-colors">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
