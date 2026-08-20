import { useState } from "react";
import { PixelLogoTile, PixelStar, PixelCursor, PixelGlyph } from "./PixelLogo";
import { MarchingAnts } from "./Chrome";
import { useParallax, useTypewriter, useReveal } from "../hooks";

const EYE = ({ off }: { off?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
    <circle cx="12" cy="12" r="2.6" fill="currentColor" stroke="none" />
    {off && <path d="M4 20L20 4" strokeWidth="2" />}
  </svg>
);

type LayerState = Record<string, boolean>;

export default function Hero() {
  const [layers, setLayers] = useState<LayerState>({
    T_TITULO: true,
    SUBTITULO: true,
    LOGO_PX: true,
    PIXELES_FONDO: true,
    FONDO_GRID: true,
  });
  const [opacity, setOpacity] = useState(100);
  const [selected, setSelected] = useState("T_TITULO");
  const [blend, setBlend] = useState("Normal");
  const parallax = useParallax<HTMLElement>();
  const reveal = useReveal();
  const { out, done } = useTypewriter("PIXELS", 110, 500);

  const toggle = (k: string) => setLayers((s) => ({ ...s, [k]: !s[k] }));

  const LAYER_ROWS: { id: string; kind: string; color: string }[] = [
    { id: "T_TITULO", kind: "T", color: "#ffd400" },
    { id: "SUBTITULO", kind: "SB", color: "#d8d8d8" },
    { id: "LOGO_PX", kind: "▦", color: "#ffd400" },
    { id: "PIXELES_FONDO", kind: "✦", color: "#d8d8d8" },
    { id: "FONDO_GRID", kind: "▩", color: "#ffd400" },
  ];

  return (
    <section id="inicio" ref={parallax} className="relative pt-10">
      {/* pestañas de documento */}
      <div className="flex items-end gap-0 border-b border-ps-line bg-[#262626] pl-2 pt-1.5 lg:pl-3">
        <div className="flex items-center gap-2 border border-b-0 border-ps-line bg-ps-canvas px-4 py-1.5 text-[12px] text-ps-text">
          <span className="h-1.5 w-1.5 bg-[#EDB204]" aria-hidden="true" />
          inicio.psd
          <span className="text-ps-muted transition-colors hover:text-white" title="Cerrar">✕</span>
        </div>
        <div className="flex items-center gap-2 border border-b-0 border-ps-line/60 bg-[#2d2d2d] px-4 py-1.5 text-[12px] text-ps-muted">
          <span className="h-1.5 w-1.5 bg-ps-muted/50" aria-hidden="true" />
          brief_cliente.psd
        </div>
      </div>

      <div className="flex">
        {/* regla vertical */}
        <div className="hidden w-6 shrink-0 border-r border-ps-line bg-ps-panel2 md:block">
          <div className="bg-ruler-v h-full" />
        </div>

        <div className="min-w-0 flex-1">
          {/* regla horizontal */}
          <div className="h-6 border-b border-ps-line bg-ps-panel2">
            <div className="bg-ruler-h h-full" />
          </div>

          {/* ═══ lienzo ═══ */}
          <div ref={reveal} className={`relative overflow-hidden bg-ps-canvas transition-colors duration-500 ${layers.FONDO_GRID ? "bg-checker" : ""}`}>
            {/* marca de agua del logo */}
            {layers.LOGO_PX && (
              <div data-depth="40" className="pointer-events-none absolute -right-10 top-10 hidden opacity-[0.07] md:block lg:-right-4 lg:top-16">
                <PixelLogoTile size={340} className="!border-[3px]" />
              </div>
            )}

            {/* píxeles decorativos con parallax */}
            {layers.PIXELES_FONDO && (
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div data-depth="90" className="absolute left-[6%] top-16"><PixelStar color="#EDB204" className="pixel-float h-8 w-8 opacity-80" /></div>
                <div data-depth="150" className="absolute right-[30%] top-24 hidden md:block"><PixelStar color="#EDB204" className="pixel-float-slow h-5 w-5 opacity-70" /></div>
                <div data-depth="60" className="absolute bottom-28 left-[12%] hidden md:block">
                  <span className="pixel-float block h-3 w-3 bg-ink-yellow/80" />
                </div>
                <div data-depth="120" className="absolute bottom-40 right-[8%] hidden lg:block">
                  <PixelCursor className="pixel-float-slow h-12 w-12 opacity-90" />
                </div>
                <div data-depth="200" className="absolute left-[45%] top-[55%] hidden lg:block">
                  <span className="pixel-float block h-2 w-2 bg-[#EDB204]" />
                </div>
                <div data-depth="100" className="absolute left-[70%] bottom-16 hidden md:block">
                  <PixelGlyph
                    map={["C.C", ".C.", "C.C"]}
                    colors={{ C: "#EDB204" }}
                    className="pixel-float-slow h-6 w-6"
                  />
                </div>
              </div>
            )}

            <div className="relative mx-auto grid min-h-[calc(100vh-9.5rem)] max-w-7xl grid-cols-1 gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-10 lg:py-14">
              {/* ── columna de contenido ── */}
              <div className="flex flex-col justify-center">
                <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ps-muted">
                  <span className="h-2 w-2 bg-[#EDB204]" aria-hidden="true" />
                  Estudio de diseño gráfico · Herramienta: creatividad
                </p>

                {/* título seleccionado con hormigas */}
                {layers.T_TITULO && (
                  <div className="relative inline-block self-start px-4 py-5 sm:px-6" style={{ opacity: opacity / 100, mixBlendMode: blend === "Diferencia" ? "difference" : undefined }}>
                    <MarchingAnts />
                    {/* asas de selección */}
                    {["left-0 top-0 -translate-x-1/2 -translate-y-1/2", "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2", "right-0 top-0 translate-x-1/2 -translate-y-1/2",
                      "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2", "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
                      "left-0 bottom-0 -translate-x-1/2 translate-y-1/2", "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2", "right-0 bottom-0 translate-x-1/2 translate-y-1/2"].map((pos) => (
                      <span key={pos} className={`absolute h-2.5 w-2.5 border border-ps-blue bg-white ${pos}`} aria-hidden="true" />
                    ))}
                    <h1 className="rgb-shift font-pixel text-[clamp(1.9rem,7vw,4.6rem)] leading-[1.25]">
                      <span className="text-[#EDB204]">
                        {out}
                        <span className={`pixel-caret text-white ${done ? "" : ""}`}>▮</span>
                      </span>
                      <br />
                      <span className="text-ps-text">CREATIVE</span>
                      <br />
                      <span className="text-[#EDB204]">DESING</span>
                    </h1>
                  </div>
                )}

                {layers.SUBTITULO && (
                  <>
                    <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#bdbdbd] sm:text-xl">
                      Convertimos ideas en <strong className="text-white">marcas que se ven, se sienten y se recuerdan</strong>:
                      branding, logotipos, páginas web, manuales de marca e identidad visual completa — píxel a píxel.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      <a href="#contacto" className="btn-pixel bg-[#EDB204] px-6 py-4 text-[11px] text-white">
                        ▶ INICIAR PROYECTO
                      </a>
                      <a href="#portafolio" className="btn-pixel border-2 border-ps-line2 bg-ps-panel px-6 py-[14px] text-[11px] text-ps-text hover:border-ps-cyan hover:text-ps-cyan">
                        VER PORTAFOLIO
                      </a>
                    </div>

                    <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
                      {[
                        { n: "+120", l: "proyectos entregados" },
                        { n: "+4", l: "años diseñando" },
                        { n: "+46", l: "marcas activas" },
                      ].map((s) => (
                        <div key={s.l} className="chip-hard flex flex-col border border-ps-line bg-ps-panel/80 px-3 py-3">
                          <dt className="order-2 font-mono text-[10px] uppercase tracking-wide text-ps-muted">{s.l}</dt>
                          <dd className="font-pixel text-sm text-[#EDB204] sm:text-base">{s.n}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}

                <p className="mt-12 hidden animate-bounce font-mono text-[11px] text-ps-muted lg:block">
                  ▼ desplázate para renderizar el resto del documento
                </p>
              </div>

              {/* ── paneles del workspace ── */}
              <div className="flex flex-col gap-4 lg:pt-2">
                {/* Panel Capas */}
                <div className="reveal border border-ps-line bg-ps-panel shadow-[6px_6px_0_rgba(0,0,0,0.35)]">
                  <div className="flex items-center justify-between border-b border-ps-line bg-ps-panel2 px-3 py-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ps-text">Capas</span>
                    <span className="font-mono text-[10px] text-ps-muted">5/5</span>
                  </div>
                  <ul>
                    {LAYER_ROWS.map((row) => (
                      <li key={row.id}>
                        <button
                          onClick={() => { toggle(row.id); setSelected(row.id); }}
                          className={`flex w-full items-center gap-2.5 border-l-2 px-2.5 py-2 text-left transition-colors ${
                            selected === row.id ? "border-ps-blue bg-ps-blue/20" : "border-transparent hover:bg-[#363636]"
                          }`}
                          title="Clic para mostrar / ocultar la capa en el lienzo"
                        >
                          <span className={layers[row.id] ? "text-ps-text" : "text-ps-muted/50"}>
                            <EYE off={!layers[row.id]} />
                          </span>
                          <span
                            className="grid h-7 w-9 shrink-0 place-items-center border border-ps-line2 font-mono text-[10px]"
                            style={{ color: row.color, background: "#242424" }}
                          >
                            {row.kind}
                          </span>
                          <span className={`font-mono text-[12px] ${layers[row.id] ? "text-ps-text" : "text-ps-muted line-through"}`}>
                            {row.id}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Panel Propiedades */}
                <div className="reveal border border-ps-line bg-ps-panel shadow-[6px_6px_0_rgba(0,0,0,0.35)]" style={{ transitionDelay: "120ms" }}>
                  <div className="border-b border-ps-line bg-ps-panel2 px-3 py-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ps-text">Propiedades</span>
                  </div>
                  <div className="space-y-4 px-3 py-4">
                    <label className="block">
                      <span className="mb-1.5 flex justify-between font-mono text-[11px] text-ps-muted">
                        Opacidad del título <span className="text-ps-white">{opacity}%</span>
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={opacity}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                        className="w-full accent-[#EDB204]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block font-mono text-[11px] text-ps-muted">Modo de fusión</span>
                      <select
                        value={blend}
                        onChange={(e) => setBlend(e.target.value)}
                        className="w-full border border-ps-line2 bg-ps-well px-2 py-1.5 font-mono text-[12px] text-ps-text outline-none focus:border-ps-cyan"
                      >
                        {["Normal", "Diferencia"].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </label>
                    <p className="border border-dashed border-ps-line2 bg-ps-well px-2 py-2 font-mono text-[10px] leading-relaxed text-ps-muted">
                      ⌘ Prueba: apaga capas con el icono de ojo y mueve la opacidad. El lienzo responde.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
