export type Pin = {
  id: string;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  pattern: PatternType;
  colors: string[];
  height: number; // grid row span (relative height)
  saves: number;
  link?: string;
};

export type Board = {
  id: string;
  name: string;
  description: string;
  coverPatterns: PatternType[];
  coverColors: string[][];
  pinIds: string[];
  isSecret: boolean;
};

export type PatternType =
  | "dots"
  | "stripes"
  | "chevron"
  | "grid"
  | "circles"
  | "triangles"
  | "diamonds"
  | "waves"
  | "hexagons"
  | "crosshatch"
  | "zigzag"
  | "stars"
  | "bubbles"
  | "plaid"
  | "noise";

export const ALL_PINS: Pin[] = [
  {
    id: "p1",
    title: "Minimalist Living Room Inspo",
    description:
      "Clean lines, neutral tones, and functional furniture that makes a statement without the clutter.",
    author: "Sophie Chen",
    authorAvatar: "SC",
    tags: ["interior", "minimal", "design"],
    pattern: "dots",
    colors: ["#f5f0eb", "#d4b896", "#8b7355"],
    height: 280,
    saves: 2341,
  },
  {
    id: "p2",
    title: "Matcha Latte Art",
    description: "Perfect morning ritual. Ceremonial grade matcha with oat milk.",
    author: "Kai Tanaka",
    authorAvatar: "KT",
    tags: ["food", "drinks", "aesthetic"],
    pattern: "circles",
    colors: ["#4a7c59", "#8db87e", "#d4e8c2"],
    height: 340,
    saves: 891,
  },
  {
    id: "p3",
    title: "Brutalist Architecture",
    description:
      "Raw concrete and bold geometric forms — the misunderstood beauty of brutalism.",
    author: "Marco Valli",
    authorAvatar: "MV",
    tags: ["architecture", "brutalism", "urban"],
    pattern: "grid",
    colors: ["#5c5c5c", "#8c8c8c", "#c8c8c8"],
    height: 240,
    saves: 1567,
  },
  {
    id: "p4",
    title: "Sunset Gradient Sky",
    description:
      "That golden hour magic — when the sky becomes a living canvas.",
    author: "Aria Bloom",
    authorAvatar: "AB",
    tags: ["nature", "sky", "photography"],
    pattern: "waves",
    colors: ["#ff6b35", "#f7931e", "#ffcd3c"],
    height: 320,
    saves: 4782,
  },
  {
    id: "p5",
    title: "Terracotta Ceramics",
    description: "Handthrown vessels with an earthy, organic feel. Form follows function.",
    author: "Lena Moss",
    authorAvatar: "LM",
    tags: ["ceramics", "craft", "handmade"],
    pattern: "noise",
    colors: ["#c1440e", "#d4734a", "#e8a882"],
    height: 260,
    saves: 3120,
  },
  {
    id: "p6",
    title: "Forest Bathing Walk",
    description:
      "Shinrin-yoku — the Japanese practice of immersing yourself in nature for wellbeing.",
    author: "River Oak",
    authorAvatar: "RO",
    tags: ["nature", "wellness", "japan"],
    pattern: "stripes",
    colors: ["#2d5a1b", "#5a8a3e", "#a0c878"],
    height: 380,
    saves: 2890,
  },
  {
    id: "p7",
    title: "Memphis Design Revival",
    description:
      "Bold patterns, clashing colors, postmodern chaos — Memphis Group is back.",
    author: "Jazz Nova",
    authorAvatar: "JN",
    tags: ["design", "retro", "memphis"],
    pattern: "chevron",
    colors: ["#ff3d9a", "#ffda00", "#00c2cb"],
    height: 220,
    saves: 1234,
  },
  {
    id: "p8",
    title: "Cozy Reading Nook",
    description:
      "A window seat piled with cushions, a good book, and the rain outside.",
    author: "Wren Hollis",
    authorAvatar: "WH",
    tags: ["interior", "cozy", "books"],
    pattern: "diamonds",
    colors: ["#8b5e3c", "#d4956a", "#f0d9c3"],
    height: 300,
    saves: 5467,
  },
  {
    id: "p9",
    title: "Neon Tokyo Nights",
    description:
      "Electric streets, vending machine glow, rain reflections on asphalt.",
    author: "Ryu Nakamura",
    authorAvatar: "RN",
    tags: ["photography", "japan", "urban"],
    pattern: "hexagons",
    colors: ["#1a0033", "#cc00ff", "#ff0099"],
    height: 360,
    saves: 6021,
  },
  {
    id: "p10",
    title: "Sourdough Scoring Art",
    description:
      "When bread becomes canvas — intricate scoring patterns on sourdough loaves.",
    author: "Bake & Co.",
    authorAvatar: "BC",
    tags: ["food", "bread", "art"],
    pattern: "triangles",
    colors: ["#c8912a", "#e8b84b", "#f5dfa0"],
    height: 250,
    saves: 3456,
  },
  {
    id: "p11",
    title: "Scandinavian Bedroom",
    description:
      "White, wood, and wool — the holy trinity of Nordic interior design.",
    author: "Astrid Holm",
    authorAvatar: "AH",
    tags: ["interior", "nordic", "bedroom"],
    pattern: "crosshatch",
    colors: ["#f8f4ef", "#d9ccc0", "#a89080"],
    height: 290,
    saves: 4102,
  },
  {
    id: "p12",
    title: "Abstract Acrylic Pour",
    description:
      "Fluid art — letting gravity and chance create something unexpected.",
    author: "Color Spill",
    authorAvatar: "CS",
    tags: ["art", "abstract", "painting"],
    pattern: "bubbles",
    colors: ["#6c63ff", "#ff6584", "#43e6d5"],
    height: 340,
    saves: 2789,
  },
  {
    id: "p13",
    title: "Herb Garden Windowsill",
    description:
      "Basil, rosemary, thyme — a kitchen garden within arm's reach.",
    author: "Garden Notes",
    authorAvatar: "GN",
    tags: ["garden", "plants", "kitchen"],
    pattern: "dots",
    colors: ["#3d6b35", "#6b9e5e", "#b8d4a8"],
    height: 270,
    saves: 1890,
  },
  {
    id: "p14",
    title: "Vintage Polaroid Wall",
    description:
      "Curated chaos — a gallery wall made entirely of polaroid photos.",
    author: "Film & Grain",
    authorAvatar: "FG",
    tags: ["photography", "decor", "vintage"],
    pattern: "plaid",
    colors: ["#f5e6d3", "#e8c9a0", "#c4996e"],
    height: 320,
    saves: 3789,
  },
  {
    id: "p15",
    title: "Cyberpunk Concept Art",
    description:
      "Dystopian megacity — chrome towers piercing acid rain clouds.",
    author: "Digital Reeve",
    authorAvatar: "DR",
    tags: ["art", "cyberpunk", "digital"],
    pattern: "zigzag",
    colors: ["#0d1b2a", "#1b4f72", "#00d4ff"],
    height: 390,
    saves: 5234,
  },
  {
    id: "p16",
    title: "Pressed Wildflower Book",
    description:
      "Botanical preservation — turning meadow walks into lasting art.",
    author: "Flora Press",
    authorAvatar: "FP",
    tags: ["botanical", "art", "nature"],
    pattern: "stars",
    colors: ["#f0e6ff", "#c9a8e8", "#9b6bc4"],
    height: 260,
    saves: 4501,
  },
  {
    id: "p17",
    title: "Espresso Bar Setup",
    description:
      "Home barista dreams — the perfect espresso station with grinder and tamper.",
    author: "Brew Science",
    authorAvatar: "BS",
    tags: ["coffee", "home", "setup"],
    pattern: "grid",
    colors: ["#1a0a00", "#4a2c0a", "#8b6347"],
    height: 230,
    saves: 2156,
  },
  {
    id: "p18",
    title: "Origami Constellation",
    description:
      "Folded paper stars suspended from thread — a ceiling galaxy.",
    author: "Paper Works",
    authorAvatar: "PW",
    tags: ["craft", "origami", "diy"],
    pattern: "triangles",
    colors: ["#1c2951", "#3d5a9e", "#8facd4"],
    height: 310,
    saves: 1678,
  },
  {
    id: "p19",
    title: "Art Deco Typography",
    description:
      "Gold leaf letterforms and geometric precision — the glamour of the 1920s.",
    author: "Type Foundry",
    authorAvatar: "TF",
    tags: ["typography", "design", "artdeco"],
    pattern: "diamonds",
    colors: ["#1a1200", "#b8860b", "#ffd700"],
    height: 280,
    saves: 3892,
  },
  {
    id: "p20",
    title: "Mountain Summit Mist",
    description:
      "Above the clouds — that transcendent feeling of reaching the top.",
    author: "Peak Chaser",
    authorAvatar: "PC",
    tags: ["nature", "hiking", "mountains"],
    pattern: "waves",
    colors: ["#e8eef5", "#b8cce0", "#6890b8"],
    height: 350,
    saves: 7234,
  },
];

export const INITIAL_BOARDS: Board[] = [
  {
    id: "b1",
    name: "Interior Dreams",
    description: "Spaces that inspire and delight",
    coverPatterns: ["dots", "crosshatch", "diamonds"],
    coverColors: [
      ["#f5f0eb", "#d4b896", "#8b7355"],
      ["#f8f4ef", "#d9ccc0", "#a89080"],
      ["#8b5e3c", "#d4956a", "#f0d9c3"],
    ],
    pinIds: ["p1", "p8", "p11"],
    isSecret: false,
  },
  {
    id: "b2",
    name: "Food & Drinks",
    description: "Culinary inspirations",
    coverPatterns: ["circles", "triangles", "grid"],
    coverColors: [
      ["#4a7c59", "#8db87e", "#d4e8c2"],
      ["#c8912a", "#e8b84b", "#f5dfa0"],
      ["#1a0a00", "#4a2c0a", "#8b6347"],
    ],
    pinIds: ["p2", "p10", "p17"],
    isSecret: false,
  },
  {
    id: "b3",
    name: "Art & Design",
    description: "Visual inspiration board",
    coverPatterns: ["chevron", "bubbles", "zigzag"],
    coverColors: [
      ["#ff3d9a", "#ffda00", "#00c2cb"],
      ["#6c63ff", "#ff6584", "#43e6d5"],
      ["#0d1b2a", "#1b4f72", "#00d4ff"],
    ],
    pinIds: ["p7", "p12", "p15", "p19"],
    isSecret: false,
  },
  {
    id: "b4",
    name: "Nature Escapes",
    description: "Wild and wonderful",
    coverPatterns: ["stripes", "waves", "dots"],
    coverColors: [
      ["#2d5a1b", "#5a8a3e", "#a0c878"],
      ["#ff6b35", "#f7931e", "#ffcd3c"],
      ["#e8eef5", "#b8cce0", "#6890b8"],
    ],
    pinIds: ["p4", "p6", "p20"],
    isSecret: false,
  },
  {
    id: "b5",
    name: "Secret Mood",
    description: "Private collection",
    coverPatterns: ["hexagons", "stars", "plaid"],
    coverColors: [
      ["#1a0033", "#cc00ff", "#ff0099"],
      ["#f0e6ff", "#c9a8e8", "#9b6bc4"],
      ["#f5e6d3", "#e8c9a0", "#c4996e"],
    ],
    pinIds: ["p9", "p16", "p14"],
    isSecret: true,
  },
];
