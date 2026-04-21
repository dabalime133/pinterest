import { useState, useMemo, useCallback } from "react";
import { ALL_PINS, INITIAL_BOARDS } from "./data/pins";
import type { Pin, Board, PatternType } from "./data/pins";
import MasonryGrid from "./components/MasonryGrid";
import PinModal from "./components/PinModal";
import BoardsView from "./components/BoardsView";

const TAGS = ["all", "interior", "food", "art", "nature", "design", "photography", "craft"];

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "boards">("home");
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS);
  const [savedPins, setSavedPins] = useState<Set<string>>(
    new Set(["p1", "p4", "p8"])
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [sortBy, setSortBy] = useState<"default" | "saves" | "recent">("default");

  const handleSave = useCallback((pinId: string, boardId: string) => {
    setSavedPins((prev) => new Set([...prev, pinId]));
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId
          ? { ...b, pinIds: b.pinIds.includes(pinId) ? b.pinIds : [...b.pinIds, pinId] }
          : b
      )
    );
  }, []);

  const handleUnsave = useCallback((pinId: string) => {
    setSavedPins((prev) => {
      const next = new Set(prev);
      next.delete(pinId);
      return next;
    });
    setBoards((prev) =>
      prev.map((b) => ({ ...b, pinIds: b.pinIds.filter((id) => id !== pinId) }))
    );
  }, []);

  const handleCreateBoard = useCallback((name: string) => {
    const patterns: PatternType[] = ["dots", "waves", "circles"];
    const newBoard: Board = {
      id: `b_${Date.now()}`,
      name,
      description: "My new board",
      coverPatterns: patterns,
      coverColors: [
        ["#6c63ff", "#ff6584", "#43e6d5"],
        ["#ff6b35", "#f7931e", "#ffcd3c"],
        ["#2d5a1b", "#5a8a3e", "#a0c878"],
      ],
      pinIds: [],
      isSecret: false,
    };
    setBoards((prev) => [...prev, newBoard]);
  }, []);

  const handleDeleteBoard = useCallback((boardId: string) => {
    setBoards((prev) => prev.filter((b) => b.id !== boardId));
    setSavedPins((prev) => {
      const board = boards.find((b) => b.id === boardId);
      if (!board) return prev;
      const next = new Set(prev);
      board.pinIds.forEach((id) => next.delete(id));
      return next;
    });
  }, [boards]);

  const filteredPins = useMemo(() => {
    let pins = [...ALL_PINS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      pins = pins.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.author.toLowerCase().includes(q)
      );
    }

    if (activeTag !== "all") {
      pins = pins.filter((p) => p.tags.includes(activeTag));
    }

    if (sortBy === "saves") {
      pins.sort((a, b) => b.saves - a.saves);
    } else if (sortBy === "recent") {
      pins.reverse();
    }

    return pins;
  }, [searchQuery, activeTag, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Masonry column CSS variable */}
      <style>{`
        :root {
          --masonry-cols: 2;
        }
        @media (min-width: 640px) {
          :root { --masonry-cols: 3; }
        }
        @media (min-width: 768px) {
          :root { --masonry-cols: 4; }
        }
        @media (min-width: 1024px) {
          :root { --masonry-cols: 5; }
        }
        @media (min-width: 1280px) {
          :root { --masonry-cols: 6; }
        }
      `}</style>

      {/* Header / Nav */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center shadow-md shadow-red-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.568 0-2.389-1.717-4.057-4.168-4.057-2.837 0-4.502 2.128-4.502 4.328 0 .857.33 1.775.741 2.276a.3.3 0 01.069.286c-.076.314-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
              </svg>
            </div>
            <span className="font-black text-xl text-gray-900 tracking-tight hidden sm:block">
              Pinboard
            </span>
          </div>

          {/* Nav tabs */}
          <nav className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeTab === "home"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("boards")}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2 ${
                activeTab === "boards"
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Boards
              {boards.length > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === "boards"
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {boards.length}
                </span>
              )}
            </button>
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-auto">
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pins, boards, tags…"
                className="w-full bg-gray-100 rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-300 focus:bg-white transition-all placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors"
                >
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {activeTab === "home" ? (
          <>
            {/* Tag filters + sort */}
            <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                      activeTag === tag
                        ? "bg-gray-900 text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {tag === "all" ? "All" : `#${tag}`}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-gray-100 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 outline-none cursor-pointer hover:bg-gray-200 transition-colors appearance-none pr-8"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
                >
                  <option value="default">Trending</option>
                  <option value="saves">Most saved</option>
                  <option value="recent">Recent</option>
                </select>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {searchQuery ? (
                  <>
                    <span className="font-semibold text-gray-800">{filteredPins.length}</span>{" "}
                    results for "<span className="text-red-500 font-semibold">{searchQuery}</span>"
                  </>
                ) : (
                  <>
                    Showing <span className="font-semibold text-gray-800">{filteredPins.length}</span> pins
                  </>
                )}
              </p>
              <p className="text-sm text-gray-400">
                <span className="text-red-400 font-semibold">{savedPins.size}</span> saved
              </p>
            </div>

            {/* Masonry Grid */}
            <MasonryGrid
              pins={filteredPins}
              boards={boards}
              savedPins={savedPins}
              onSave={handleSave}
              onUnsave={handleUnsave}
              onClick={setSelectedPin}
            />
          </>
        ) : (
          <BoardsView
            boards={boards}
            allPins={ALL_PINS}
            savedPins={savedPins}
            onSave={handleSave}
            onUnsave={handleUnsave}
            onPinClick={setSelectedPin}
            onCreateBoard={handleCreateBoard}
            onDeleteBoard={handleDeleteBoard}
          />
        )}
      </main>

      {/* Pin Detail Modal */}
      <PinModal
        pin={selectedPin}
        boards={boards}
        savedPins={savedPins}
        onSave={handleSave}
        onUnsave={handleUnsave}
        onClose={() => setSelectedPin(null)}
      />
    </div>
  );
}
