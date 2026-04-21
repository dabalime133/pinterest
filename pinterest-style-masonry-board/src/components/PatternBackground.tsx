import React from "react";
import type { PatternType } from "../data/pins";

type Props = {
  pattern: PatternType;
  colors: string[];
  height?: number;
  className?: string;
};

export default function PatternBackground({
  pattern,
  colors,
  height,
  className = "",
}: Props) {
  const [c1, c2, c3 = c1] = colors;

  const getPattern = (): React.CSSProperties => {
    switch (pattern) {
      case "dots":
        return {
          backgroundColor: c1,
          backgroundImage: `radial-gradient(circle, ${c2} 2px, transparent 2px)`,
          backgroundSize: "24px 24px",
        };
      case "stripes":
        return {
          backgroundColor: c1,
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${c2} 0px,
            ${c2} 4px,
            transparent 4px,
            transparent 20px
          )`,
        };
      case "chevron":
        return {
          backgroundColor: c1,
          backgroundImage: `
            linear-gradient(135deg, ${c2} 25%, transparent 25%) -20px 0,
            linear-gradient(225deg, ${c2} 25%, transparent 25%) -20px 0,
            linear-gradient(315deg, ${c2} 25%, transparent 25%),
            linear-gradient(45deg, ${c2} 25%, transparent 25%)
          `,
          backgroundSize: "40px 40px",
        };
      case "grid":
        return {
          backgroundColor: c1,
          backgroundImage: `
            linear-gradient(${c2}40 1px, transparent 1px),
            linear-gradient(90deg, ${c2}40 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        };
      case "circles":
        return {
          backgroundColor: c1,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${c2}60 0%, ${c2}60 30%, transparent 31%),
            radial-gradient(circle at 0% 50%, ${c3}40 0%, ${c3}40 20%, transparent 21%),
            radial-gradient(circle at 100% 50%, ${c3}40 0%, ${c3}40 20%, transparent 21%)
          `,
          backgroundSize: "50px 50px",
        };
      case "triangles":
        return {
          backgroundColor: c1,
          backgroundImage: `
            linear-gradient(120deg, ${c2} 33.33%, transparent 33.33%),
            linear-gradient(240deg, ${c3} 33.33%, transparent 33.33%),
            linear-gradient(0deg, ${c2}80 33.33%, transparent 33.33%)
          `,
          backgroundSize: "30px 52px",
        };
      case "diamonds":
        return {
          backgroundColor: c2,
          backgroundImage: `
            linear-gradient(45deg, ${c1} 25%, transparent 25%, transparent 75%, ${c1} 75%),
            linear-gradient(45deg, ${c1} 25%, transparent 25%, transparent 75%, ${c1} 75%)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",
        };
      case "waves":
        return {
          backgroundColor: c1,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              ${c2}50 18px,
              ${c2}50 20px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 18px,
              ${c3}30 18px,
              ${c3}30 20px
            )
          `,
        };
      case "hexagons":
        return {
          backgroundColor: c1,
          backgroundImage: `
            radial-gradient(circle farthest-side at 0% 50%, ${c2}00 23.5%, ${c2}20 24%, ${c2}20 28%, ${c2}00 28.5%),
            radial-gradient(circle farthest-side at 0% 50%, ${c3}00 23.5%, ${c3}20 24%, ${c3}20 28%, ${c3}00 28.5%),
            repeating-linear-gradient(${c2}30 0%, ${c2}30 5%, transparent 5%, transparent 10%),
            repeating-linear-gradient(60deg, ${c2}20 0%, ${c2}20 5%, transparent 5%, transparent 10%),
            repeating-linear-gradient(120deg, ${c3}20 0%, ${c3}20 5%, transparent 5%, transparent 10%)
          `,
          backgroundSize: "40px 70px",
        };
      case "crosshatch":
        return {
          backgroundColor: c1,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              ${c2}60 0px,
              ${c2}60 1px,
              transparent 1px,
              transparent 12px
            ),
            repeating-linear-gradient(
              -45deg,
              ${c2}60 0px,
              ${c2}60 1px,
              transparent 1px,
              transparent 12px
            )
          `,
        };
      case "zigzag":
        return {
          backgroundColor: c1,
          backgroundImage: `
            linear-gradient(135deg, ${c2} 25%, transparent 25%) -20px 0,
            linear-gradient(225deg, ${c2} 25%, transparent 25%) -20px 0,
            linear-gradient(315deg, ${c2} 25%, transparent 25%),
            linear-gradient(45deg, ${c2} 25%, transparent 25%),
            linear-gradient(135deg, ${c3}60 25%, transparent 25%) -20px 20px,
            linear-gradient(225deg, ${c3}60 25%, transparent 25%) -20px 20px,
            linear-gradient(315deg, ${c3}60 25%, transparent 25%) 0px 20px,
            linear-gradient(45deg, ${c3}60 25%, transparent 25%) 0px 20px
          `,
          backgroundSize: "40px 40px",
        };
      case "stars":
        return {
          backgroundColor: c1,
          backgroundImage: `
            radial-gradient(circle, ${c2} 1px, transparent 1px),
            radial-gradient(circle, ${c3} 1px, transparent 1px),
            radial-gradient(circle, ${c2}80 2px, transparent 2px)
          `,
          backgroundSize: "30px 30px, 60px 60px, 20px 20px",
          backgroundPosition: "0 0, 15px 15px, 5px 5px",
        };
      case "bubbles":
        return {
          backgroundColor: c1,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${c2}50 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, ${c3}50 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, ${c2}30 0%, transparent 30%),
            radial-gradient(circle at 70% 20%, ${c3}40 0%, transparent 35%)
          `,
        };
      case "plaid":
        return {
          backgroundColor: c1,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 14px,
              ${c2}80 14px,
              ${c2}80 16px,
              transparent 16px,
              transparent 30px,
              ${c3}50 30px,
              ${c3}50 32px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 14px,
              ${c2}80 14px,
              ${c2}80 16px,
              transparent 16px,
              transparent 30px,
              ${c3}50 30px,
              ${c3}50 32px
            )
          `,
        };
      case "noise":
        return {
          background: `
            radial-gradient(ellipse at 20% 20%, ${c3}80 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${c2}80 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${c1} 0%, ${c1} 100%)
          `,
        };
      default:
        return { backgroundColor: c1 };
    }
  };

  return (
    <div
      className={`w-full ${className}`}
      style={{
        height: height ? `${height}px` : "100%",
        ...getPattern(),
      }}
    />
  );
}
