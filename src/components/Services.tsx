import { PixelGlyph, type GlyphMap } from "./PixelLogo";
import { useReveal } from "../hooks";

/* ══════════ Cabecera de sección reutilizable ══════════ */
export function SectionHead({
  tag,
  title,
  accent = "#31a8ff",
  copy,
  align = "left",
}: {
  tag: string;
  title: string;
  accent?: string;
  copy?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`reveal ${align === "center" ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p className="mb-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ps-muted"
        style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
        <span className="h-2 w-2" style={{ background: accent }} aria-hidden="true" />
        {tag}
      </p>
      <h2 className="font-pixel text-[clamp(1.3rem,4vw,2.4rem)] leading-[1.35] text-ps-text">
        {title.split("|").map((part, i) =>
          i % 2 === 1 ? <span key={i} style={{ color: accent }}>{part}</span> : <span key={i}>{part}</span>
        )}
      </h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-[#b3b3b3] sm:text-lg">{copy}</p>}
    </div>
  );
}

/* ══════════ Marquesina ══════════ */
const TICKER = [
  "BRANDING", "LOGOTIPOS", "DISEÑO WEB", "MANUAL DE MARCA",
  "IDENTIDAD VISUAL", "DISEÑO GRÁFICO", "PIXEL PERFECT",
];

export function Marquee() {
  const row = (key: string, hidden = false) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TICKER.map((t) => (
        <span key={t + key} className="flex items-center">
          <span className="px-6 font-pixel text-[13px] text-[#111] sm:text-sm">{t}</span>
          <PixelGlyph map={[".C.", "CCC", ".C."]} colors={{ C: "#111" }} className="h-3 w-3" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 overflow-hidden border-y-2 border-black bg-ink-yellow py-3" role="marquee" aria-label="Servicios de Pixels Creative Design">
      <div className="marquee-track flex w-max">
        {row("a")}
        {row("b", true)}
      </div>
    </div>
  );
}

/* ══════════ Iconos pixel por servicio ══════════ */
const ICONS: Record<string, GlyphMap> = {
  grafico: ["...CC..", "..CCCC.", "..CCCC.", "...CC..", "...CC..", "...C...", "..CCC.."],
  branding: [".CCCCC.", "CCCCCCC", ".CCCCC.", "..CCC..", "...C..."],
  logos: ["...C...", "...C...", "CCCCCCC", "...C...", "...C..."],
  web: ["CCCCCCC", "C.....C", "CCCCCCC", "C.....C", "C..C..C", "C.....C", "CCCCCCC"],
  manual: ["CCCCCCC", "C..C..C", "C..C..C", "C..C..C", "C..C..C", "C..C..C", "CCCCCCC"],
  identidad: ["CCC.CCC", "CCC.CCC", "CCC.CCC", ".......", "CCC.CCC", "CCC.CCC", "CCC.CCC"],
};

const SERVICES = [
  {
    id: "srv-1", icon: "grafico", color: "#00b7eb", blend: "Normal",
    title: "Diseño Gráfico",
    desc: "Piezas digitales e impresas con acabado profesional. Cada arte sale del estudio listo para publicar o mandar a imprenta.",
    chips: ["Social media", "Editorial", "Impresos", "Motion"],
  },
  {
    id: "srv-2", icon: "branding", color: "#ec008c", blend: "Multiplicar",
    title: "Branding",
    desc: "Construcción de marca desde la raíz: estrategia, personalidad, voz y posicionamiento para que tu marca exista con intención.",
    chips: ["Estrategia", "Naming", "Tono de voz", "Arquitectura"],
  },
  {
    id: "srv-3", icon: "logos", color: "#ffd400", blend: "Trama",
    title: "Logotipos",
    desc: "Marcas pixel-perfect construidas sobre retícula: isotipos e imagotipos que funcionan del favicon a la barda gigante.",
    chips: ["Isotipo", "Imagotipo", "Retícula", "Versiones"],
  },
  {
    id: "srv-4", icon: "web", color: "#00b7eb", blend: "Superponer",
    title: "Páginas Web",
    desc: "Sitios rápidos, memorables y a la medida: diseño UI/UX más desarrollo, con tu marca viva en cada scroll.",
    chips: ["Landing pages", "E-commerce", "UI/UX", "SEO"],
  },
  {
    id: "srv-5", icon: "manual", color: "#ec008c", blend: "Luz lineal",
    title: "Manual de Marca",
    desc: "El reglamento oficial de tu identidad: usos correctos, tipografías, paletas y aplicaciones para que nadie la rompa.",
    chips: ["Usos correctos", "Tipografía", "Color", "Papelería"],
  },
  {
    id: "srv-6", icon: "identidad", color: "#ffd400", blend: "Diferencia",
    title: "Identidad Visual",
    desc: "El sistema completo: del logo a la experiencia. Todos los puntos de contacto comunican exactamente lo mismo.",
    chips: ["Sistema visual", "Aplicaciones", "Guidelines", "Templates"],
  },
];

export default function Services() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="servicios" ref={ref} className="relative border-b border-ps-line bg-ps-app">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-16 lg:px-10 lg:py-28">
        {/* columna sticky */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <SectionHead
            tag="Capa 02 · Qué hacemos"
            title="SER|VICIOS"
            accent="#ffd400"
            copy="Seis capas de valor, una sola marca: la tuya. Combínalas como modos de fusión hasta lograr el resultado exacto."
          />
          <ul className="mt-8 hidden space-y-1 border-l border-ps-line lg:block">
            {SERVICES.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group flex items-center gap-3 py-1.5 pl-4 font-mono text-[12px] text-ps-muted transition-colors hover:border-l-2 hover:border-ps-cyan hover:pl-3 hover:text-ps-text">
                  <span className="font-pixel text-[9px] text-ps-line2 group-hover:text-ps-cyan">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className="mt-8 hidden font-pixel text-[10px] text-ps-cyan underline decoration-2 underline-offset-4 transition-colors hover:text-ink-magenta lg:inline-block">
            → PEDIR COTIZACIÓN
          </a>
        </div>

        {/* filas de servicios */}
        <div className="space-y-5">
          {SERVICES.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className={`group relative border border-ps-line bg-ps-panel p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ps-line2 hover:bg-ps-panel2 hover:shadow-[8px_8px_0_rgba(0,0,0,0.45)] sm:p-7 ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`}
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              {/* esquina pixel */}
              <span className="absolute right-0 top-0 h-3 w-3" style={{ background: s.color }} aria-hidden="true" />
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex items-center gap-5 sm:block sm:space-y-4">
                  <span className="block font-pixel text-2xl text-ps-line2 transition-colors duration-300 group-hover:text-ps-text/40 sm:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="grid h-14 w-14 place-items-center border border-ps-line2 bg-ps-well p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  >
                    <PixelGlyph map={ICONS[s.icon]} colors={{ C: s.color }} className="h-full w-full" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-pixel text-[13px] leading-relaxed text-ps-text sm:text-[15px]">{s.title}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ps-muted">
                      modo: <span style={{ color: s.color }}>{s.blend}</span> · 100%
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#b3b3b3]">{s.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.chips.map((c) => (
                      <li key={c} className="border border-ps-line bg-ps-well px-2.5 py-1 font-mono text-[11px] text-ps-muted transition-colors group-hover:border-ps-line2 group-hover:text-ps-text">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}

          <div className="reveal flex flex-wrap items-center justify-between gap-4 border border-dashed border-ps-line2 bg-ps-panel/50 px-6 py-5">
            <p className="font-mono text-[13px] text-ps-muted">
              ¿Necesitas fusionar varias capas? <span className="text-ps-text">Armamos paquetes a la medida.</span>
            </p>
            <a href="#planes" className="btn-pixel bg-ink-magenta px-5 py-3 text-[10px] text-white">VER PLANES</a>
          </div>
        </div>
      </div>
    </section>
  );
}
