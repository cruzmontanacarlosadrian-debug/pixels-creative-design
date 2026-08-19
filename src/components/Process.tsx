import { PixelGlyph, PixelHeart } from "./PixelLogo";
import { SectionHead } from "./Services";
import { useReveal } from "../hooks";

const STEPS = [
  {
    k: "Ctrl+O",
    title: "Abrir brief.psd",
    desc: "Escuchamos tu idea, objetivos y público. Definimos alcance, tiempos y qué significa éxito para ti.",
    color: "#31a8ff",
    icon: ["..CCCCC", "..C...C", "..C...C", "CCCCCCC", "..C....", "..C...."],
  },
  {
    k: "Ctrl+N",
    title: "Nueva investigación",
    desc: "Analizamos mercado, competencia y referencias. Creamos el lienzo estratégico donde todo tendrá sentido.",
    color: "#00b7eb",
    icon: ["CCCCC..", "C...C..", "C...CCC", "C.....C", "C...CCC", "CCCCC.."],
  },
  {
    k: "B",
    title: "Trazado de conceptos",
    desc: "Bocetos, moodboards y rutas creativas. Exploramos varios caminos antes de quedarnos con el correcto.",
    color: "#ec008c",
    icon: ["...CC..", "..CCCC.", "..CCCC.", "...CC..", "...C...", "..CCC.."],
  },
  {
    k: "Ctrl+T",
    title: "Diseño en alta resolución",
    desc: "Vectorizamos, construimos retícula, elegimos tipografías y paleta. La marca toma su forma final.",
    color: "#ffd400",
    icon: ["CCCCCCC", "...C...", "...C...", "...C...", "...C...", "...C..."],
  },
  {
    k: "Ctrl+Alt+Z",
    title: "Ajustes y revisión",
    desc: "Rondas de feedback contigo. Afinamos cada píxel hasta que digas «es exactamente esto».",
    color: "#ec008c",
    icon: ["..CC...", ".C..C..", "C....C.", "C....C.", ".C..C..", "..CC..."],
  },
  {
    k: "Ctrl+Shift+S",
    title: "Exportar entrega_final.*",
    desc: "Archivos editables, PNG/SVG/PDF, manual de marca y guía de uso. Tu marca lista para el mundo real.",
    color: "#31a8ff",
    icon: ["CCCCCCC", "C.....C", "C.CCC.C", "C.CCC.C", "C.....C", "CCCCCCC"],
  },
];

export default function Process() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="proceso" ref={ref} className="relative border-b border-ps-line bg-ps-canvas">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            tag="Capa 03 · Historial"
            title="CÓMO TRA|BAJAMOS"
            accent="#31a8ff"
            copy="Cada proyecto es un documento nuevo en nuestro historial. Estos son los estados por los que pasa tu marca."
          />
          <p className="reveal hidden shrink-0 border border-ps-line bg-ps-panel px-4 py-3 font-mono text-[11px] text-ps-muted md:block">
            Panel ▸ Historial <span className="text-ps-cyan">(6 estados)</span>
          </p>
        </div>

        <div className="relative mt-14">
          {/* riel */}
          <span className="absolute bottom-4 left-[19px] top-4 w-px bg-ps-line lg:left-1/2" aria-hidden="true" />
          <ol className="space-y-10 lg:space-y-14">
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li key={s.k} className={`relative flex flex-col gap-4 pl-14 lg:w-1/2 lg:pl-0 ${left ? "lg:pr-14 lg:text-right" : "lg:ml-auto lg:pl-14"}`}>
                  {/* nodo */}
                  <span
                    className={`absolute left-0 top-1 grid h-10 w-10 place-items-center border-2 bg-ps-well ${left ? "lg:left-auto lg:-right-5" : "lg:-left-5"}`}
                    style={{ borderColor: s.color }}
                    aria-hidden="true"
                  >
                    <PixelGlyph map={s.icon} colors={{ C: s.color }} className="h-6 w-6" />
                  </span>

                  <div className={`${left ? "reveal-left lg:ml-auto" : "reveal-right"} w-full border border-ps-line bg-ps-panel p-6 transition-colors hover:border-ps-line2 hover:bg-ps-panel2`}>
                    <div className={`flex flex-wrap items-center gap-3 ${left ? "lg:justify-end" : ""}`}>
                      <span className="font-pixel text-[11px]" style={{ color: s.color }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-pixel text-[12px] leading-relaxed text-ps-text sm:text-[13px]">{s.title}</h3>
                      <kbd className="ml-auto border border-ps-line2 bg-ps-well px-2 py-1 font-mono text-[10px] text-ps-muted lg:ml-0" style={{ color: s.color }}>
                        {s.k}
                      </kbd>
                    </div>
                    <p className={`mt-3 max-w-md text-[15px] leading-relaxed text-[#b3b3b3] ${left ? "lg:ml-auto" : ""}`}>{s.desc}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ══════════ Testimonios = comentarios fijados en el lienzo ══════════ */
const QUOTES = [
  {
    quote: "Llegamos con una idea suelta y salimos con una marca que la gente fotografía en la calle. El manual de marca vale oro.",
    name: "Mariana López",
    role: "Fundadora · Café Nodo",
    color: "#00b7eb",
    rot: "-2deg",
  },
  {
    quote: "Rediseñaron nuestro logo y la web completa. Las ventas online subieron 40% el primer trimestre. Todo pixel-perfect.",
    name: "Diego Ramírez",
    role: "CEO · Arcade Fit",
    color: "#ec008c",
    rot: "1.5deg",
  },
  {
    quote: "Entienden de estrategia, no solo de estética. Cada decisión de diseño venía con un porqué. Repetiremos sin duda.",
    name: "Sofía Herrera",
    role: "Dir. Marketing · Lúmina",
    color: "#ffd400",
    rot: "-1deg",
  },
];

export function Testimonials() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="opiniones" ref={ref} className="relative overflow-hidden border-b border-ps-line bg-ps-app">
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <SectionHead
          tag="Capa 04 · Comentarios"
          align="center"
          title="COMENTARIOS | DEL LIENZO"
          accent="#ec008c"
          copy="Comentarios fijados por clientes reales sobre el documento final. Sin filtros, sin capa de ajuste."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3 lg:gap-10">
          {QUOTES.map((q, i) => (
            <figure
              key={q.name}
              className="reveal group relative border border-ps-line bg-ps-panel p-7 shadow-[8px_8px_0_rgba(0,0,0,0.4)] transition-all duration-300 hover:!rotate-0 hover:border-ps-line2 hover:shadow-[10px_10px_0_rgba(0,0,0,0.5)]"
              style={{ rotate: q.rot, transitionDelay: `${i * 120}ms` }}
            >
              {/* pin de comentario */}
              <span className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center border border-black/40" style={{ background: q.color }} aria-hidden="true">
                <span className="h-1.5 w-1.5 bg-black/50" />
              </span>
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill={q.color} aria-hidden="true">
                <path d="M4 5h16v10H10l-6 5V5z" />
              </svg>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[#c9c9c9]">“{q.quote}”</blockquote>
              <figcaption className="mt-6 border-t border-ps-line pt-4">
                <p className="font-pixel text-[10px] text-ps-text">{q.name}</p>
                <p className="mt-1.5 font-mono text-[11px] text-ps-muted">{q.role}</p>
              </figcaption>
              <span className="mt-4 flex items-center gap-1.5 font-mono text-[10px] text-ps-muted">
                Resuelto <PixelHeart className="h-2 w-2.5" color={q.color} /> hace 2 semanas
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
