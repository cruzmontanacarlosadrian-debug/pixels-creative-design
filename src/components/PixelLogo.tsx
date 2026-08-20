import type { CSSProperties } from "react";
import perfilLogo from "../assets/PERFIL.png";

export type GlyphMap = string[];

/** Dibuja un mapa de píxeles (strings) como SVG cuadriculado */
export function PixelGlyph({
  map,
  colors,
  className = "",
  style,
}: {
  map: GlyphMap;
  colors: Record<string, string>;
  className?: string;
  style?: CSSProperties;
}) {
  const h = map.length;
  const w = map[0]?.length ?? 0;
  const rects: React.ReactNode[] = [];
  map.forEach((row, y) => {
    row.split("").forEach((ch, x) => {
      const fill = colors[ch];
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
    });
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className}
      style={{ shapeRendering: "crispEdges", ...style }}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}

/* ── Logotipo "Px" en píxeles ── */
const PX_MAP: GlyphMap = [
  "................",
  "................",
  "................",
  "................",
  "..PPPP..........",
  "..P...P.........",
  "..P...P..X...X..",
  "..PPPP....X.X...",
  "..P........X....",
  "..P.......X.X...",
  "..P......X...X..",
  "................",
  "...........YY...",
  "............YY..",
  "................",
  "................",
];

const PX_COLORS = {
  P: "#31a8ff",
  X: "#ec008c",
  Y: "#ffd400",
};

/** Baldosa estilo app de Adobe con el monograma Px */
export function PixelLogoTile({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative grid place-items-center border-2 border-[#31a8ff]/70 bg-[#001e36] ${className}`}
      style={{ width: size, height: size, boxShadow: "3px 3px 0 0 rgba(0,0,0,.7)" }}
      title="Pixels Creative Design"
    >
<img src={perfilLogo} alt="Pixels Creative Design" className="h-[82%] w-[82%] object-contain" />
    </div>
  );
}

/* ── Cursor pixel clásico ── */
const CURSOR_MAP: GlyphMap = [
  "W...............",
  "WW..............",
  "WBW.............",
  "WBBW............",
  "WBBBW...........",
  "WBBBBW..........",
  "WBBBBBW.........",
  "WBBBBBBW........",
  "WBBBBBBBW.......",
  "WBBBBBBBBW......",
  "WBBBBBBBBBBW....",
  "WBBBBBBBBBBBBW..",
  "WBBBBBBBBBBWWWW.",
  ".WBBBBBBBW......",
  "..WBBBBBBW......",
  "...WBBW.WW......",
  "....WW...WW.....",
  "..........WW....",
  "...........W....",
  "................",
];

export function PixelCursor({ className = "" }: { className?: string }) {
  return <PixelGlyph map={CURSOR_MAP} colors={{ W: "#000000", B: "#ffffff" }} className={className} />;
}

/* ── estrella / destello pixel ── */
const STAR_MAP: GlyphMap = [
  "...C...",
  "...C...",
  "...C...",
  "CCCCCCC",
  "...C...",
  "...C...",
  "...C...",
];

export function PixelStar({ color = "#31a8ff", className = "" }: { color?: string; className?: string }) {
  return <PixelGlyph map={STAR_MAP} colors={{ C: color }} className={className} />;
}

/* ── corazón pixel (para footer/detalles) ── */
const HEART_MAP: GlyphMap = [
  ".CC.CC.",
  "CCCCCCC",
  "CCCCCCC",
  ".CCCCC.",
  "..CCC..",
  "...C...",
];

export function PixelHeart({ color = "#ec008c", className = "" }: { color?: string; className?: string }) {
  return <PixelGlyph map={HEART_MAP} colors={{ C: color }} className={className} />;
}
