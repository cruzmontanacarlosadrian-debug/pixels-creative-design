import { useState } from "react";
import { PixelLogoTile, PixelHeart } from "./PixelLogo";
import { useScrollProgress } from "../hooks";

/* ══════════ Hormigas marchantes (marco de selección) ══════════ */
export function MarchingAnts({ stroke = "#ffffff", className = "" }: { stroke?: string; className?: string }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} preserveAspectRatio="none" aria-hidden="true">
      <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" className="ants-rect" stroke={stroke}
        style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }} />
    </svg>
  );
}

/* ══════════ Barra de menú superior ══════════ */
const MENU: { label: string; href: string }[] = [
  { label: "Archivo", href: "#inicio" },
  { label: "Edición", href: "#servicios" },
  { label: "Imagen", href: "#portafolio" },
  { label: "Capa", href: "#proceso" },
  { label: "Selección", href: "#planes" },
  { label: "Filtro", href: "#opiniones" },
  { label: "Vista", href: "#inicio" },
  { label: "Ayuda", href: "#contacto" },
];

export function MenuBar() {
  const progress = useScrollProgress();
  const pct = Math.round(progress * 100);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-10 items-stretch border-b border-ps-line bg-ps-panel2 text-[12.5px] text-ps-text">
      <div className="flex items-center gap-2.5 border-r border-ps-line pl-3 pr-4">
        <PixelLogoTile size={24} className="!border" />
        <span className="font-pixel hidden text-[9px] tracking-wider text-[#EDB204] sm:block">PIXELS</span>
      </div>
      <nav className="flex flex-1 items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Secciones">
        {MENU.map((m) => (
          <a
            key={m.label}
            href={m.href}
            className="hidden shrink-0 items-center px-2.5 py-1 transition-colors hover:bg-[#414141] hover:text-white md:flex"
          >
            {m.label}
          </a>
        ))}
        <a href="#inicio" className="flex shrink-0 items-center px-2.5 py-1 transition-colors hover:bg-[#414141] md:hidden">
          Inicio
        </a>
        <a href="#servicios" className="flex shrink-0 items-center px-2.5 py-1 transition-colors hover:bg-[#414141] md:hidden">
          Servicios
        </a>
        <a href="#portafolio" className="flex shrink-0 items-center px-2.5 py-1 transition-colors hover:bg-[#414141] md:hidden">
          Portafolio
        </a>
        <a href="#contacto" className="flex shrink-0 items-center px-2.5 py-1 transition-colors hover:bg-[#414141] md:hidden">
          Contacto
        </a>
      </nav>
      <div className="hidden items-center gap-2 border-l border-ps-line px-3 font-mono text-[11px] text-ps-muted sm:flex">
        <span className="text-ps-text">inicio.psd</span>
        <span aria-hidden="true">—</span>
        <span className="tabular-nums text-ps-cyan">{pct}%</span>
        <span aria-hidden="true">(RGB/8)</span>
      </div>
      <div className="hidden w-24 items-center justify-center border-l border-ps-line font-mono text-[11px] text-ps-muted lg:flex">
        Esenciales
      </div>
    </header>
  );
}

/* ══════════ Progreso de scroll (barra azul superior) ══════════ */
export function ScrollProgress() {
  const p = useScrollProgress();
  return (
    <div className="fixed left-0 top-10 z-50 h-[2px] w-full bg-transparent" aria-hidden="true">
      <div className="h-full bg-ps-blue transition-[width] duration-150 ease-out" style={{ width: `${p * 100}%` }} />
    </div>
  );
}

/* ══════════ Riel de herramientas izquierdo ══════════ */
type Tool = { id: string; label: string; key: string; icon: React.ReactNode };

const ic = (d: string) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square">
    <path d={d} />
  </svg>
);

const TOOLS: Tool[] = [
  { id: "move", label: "Mover", key: "V", icon: ic("M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3") },
  { id: "marquee", label: "Marco rectangular", key: "M", icon: <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeDasharray="3 2.4"><rect x="3.5" y="3.5" width="17" height="17" /></svg> },
  { id: "lasso", label: "Lazo", key: "L", icon: ic("M12 4c5 0 8 2.5 8 6s-3.5 6-8 6c-1.2 0-2.3-.2-3.3-.5L5 19l.6-3.8C4 14 4 12.5 4 10c0-3.5 3-6 8-6z") },
  { id: "crop", label: "Recortar", key: "C", icon: ic("M7 2v15h15M2 7h15v15") },
  { id: "brush", label: "Pincel", key: "B", icon: ic("M20 4c-4 1-9 6-11 9l2 2c3-2 8-7 9-11zM8 14l-4 6 6-4") },
  { id: "eraser", label: "Borrador", key: "E", icon: ic("M15 3l6 6-9 9H7l-4-4 9-9zM6 21h14") },
  { id: "bucket", label: "Bote de pintura", key: "G", icon: ic("M12 3l8 8-6 6-8-8 6-6zM12 3L5 10M21 18c-1 2-2 3-2 3s-1-1-2-3c0-1.4 4-1.4 4 0z") },
  { id: "type", label: "Texto horizontal", key: "T", icon: ic("M5 5V3h14v2M12 3v18M9 21h6") },
  { id: "pen", label: "Pluma", key: "P", icon: ic("M4 20l4-1L20 7l-3-3L5 16l-1 4zM14 6l3 3") },
  { id: "eyedrop", label: "Cuentagotas", key: "I", icon: ic("M20 4a3 3 0 00-4.2 0L14 5.8 18.2 10 20 8.2A3 3 0 0020 4zM14 5.8L4 16l-1 5 5-1L18.2 10") },
  { id: "zoom", label: "Zoom", key: "Z", icon: ic("M10.5 3a7.5 7.5 0 105.3 12.8L21 21l-5.2-5.2A7.5 7.5 0 0010.5 3zM7.5 10.5h6M10.5 7.5v6") },
];

export function ToolRail() {
  const [active, setActive] = useState("brush");
  const [swap, setSwap] = useState(false);
  const fg = swap ? "#EDB204" : "#ffffff";
  const bg = swap ? "#fefefe" : "#EDB204";

  return (
    <aside
      className="fixed bottom-0 left-0 top-10 z-40 hidden w-12 flex-col items-stretch border-r border-ps-line bg-ps-panel py-2 lg:flex"
      aria-label="Herramientas"
    >
      <div className="flex flex-1 flex-col items-stretch gap-0.5 overflow-y-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TOOLS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`group relative flex h-9 items-center justify-center transition-colors ${
              active === t.id ? "bg-[#1f1f1f] text-ps-cyan shadow-[inset_0_0_0_1px_#535353]" : "text-[#b8b8b8] hover:bg-[#3a3a3a] hover:text-white"
            }`}
            aria-label={`${t.label} (${t.key})`}
            aria-pressed={active === t.id}
          >
            {t.icon}
            <span className="pointer-events-none absolute left-full ml-2 hidden whitespace-nowrap border border-ps-line2 bg-[#1f1f1f] px-2 py-1 font-mono text-[11px] text-ps-text group-hover:block">
              {t.label} <span className="text-ps-muted">({t.key})</span>
            </span>
          </button>
        ))}
      </div>
      {/* colores frente / fondo */}
      <button
        onClick={() => setSwap((s) => !s)}
        className="group relative mx-auto mb-2 mt-2 h-9 w-9"
        aria-label="Intercambiar colores frontal y de fondo"
        title="Intercambiar colores (X)"
      >
        <span className="absolute right-1 top-1 h-5 w-5 border border-white/70" style={{ background: bg }} />
        <span className="absolute left-1 top-3 h-5 w-5 border-2 border-[#d8d8d8] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" style={{ background: fg }} />
      </button>
    </aside>
  );
}

/* ══════════ Pie tipo barra de estado ══════════ */
export function StatusBar() {
  return (
    <footer className="relative z-10 border-t border-ps-line bg-ps-panel2 text-ps-muted">
      <div className="flex flex-col gap-3 px-4 py-4 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-16">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-ps-text">100%</span>
          <span>pixels_creative.psd</span>
          <span className="hidden sm:inline">3840 × 2160 px (72 ppp)</span>
          <span className="hidden md:inline">RGB/8</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Hecho con</span>
          <PixelHeart className="h-2.5 w-3" />
          <span>y demasiados <kbd className="border border-ps-line2 bg-ps-well px-1 text-ps-text">Ctrl+Z</kbd></span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="transition-colors hover:text-ps-cyan">Instagram</a>
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="transition-colors hover:text-ps-cyan">Behance</a>
          <a href="https://wa.me/5215512345678" target="_blank" rel="noreferrer" className="transition-colors hover:text-ps-cyan">WhatsApp</a>
          <a href="mailto:hola@pixelscreative.design" className="transition-colors hover:text-ps-cyan">hola@pixelscreative.design</a>
        </div>
      </div>
      <div className="border-t border-ps-line/60 px-4 py-2 text-center font-mono text-[10px] tracking-wide text-ps-muted/70 sm:px-6">
        © 2026 PIXELS CREATIVE DESING — Todos los píxeles reservados · Documento guardado automáticamente ✓
      </div>
    </footer>
  );
}
