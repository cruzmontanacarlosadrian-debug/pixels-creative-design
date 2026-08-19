import { useState } from "react";
import { useReveal, useTilt } from "../hooks";
import { SectionHead } from "./Services";
import { MarchingAnts } from "./Chrome";

type Cat = "Todos" | "Branding" | "Logotipo" | "Web" | "Editorial";

const CATS: Cat[] = ["Todos", "Branding", "Logotipo", "Web", "Editorial"];

const PROJECTS: {
  title: string;
  client: string;
  cat: Exclude<Cat, "Todos">;
  year: string;
  img: string;
  tags: string[];
}[] = [
  {
    title: "Identidad que se huele",
    client: "Café Nodo",
    cat: "Branding",
    year: "2025",
    img: "https://image.qwenlm.ai/generated-images/969c7c50-562e-4bb7-9ecb-ab014441a55f/_result.png",
    tags: ["Identidad visual", "Papelería", "Señalética"],
  },
  {
    title: "Marca en modo arcade",
    client: "Arcade Fit",
    cat: "Logotipo",
    year: "2024",
    img: "https://image.qwenlm.ai/generated-images/76748a52-ba57-4655-8b36-78e0b8b2dbf1/_result.png",
    tags: ["Isotipo", "Retícula", "Versiones"],
  },
  {
    title: "Web que convierte",
    client: "Lúmina Studio",
    cat: "Web",
    year: "2025",
    img: "https://image.qwenlm.ai/generated-images/b6af3920-0bea-4c33-b6b8-f78f06941f36/_result.png",
    tags: ["UI/UX", "Desarrollo", "SEO"],
  },
  {
    title: "Reglas claras, marca viva",
    client: "Manual Café Nodo",
    cat: "Editorial",
    year: "2025",
    img: "https://image.qwenlm.ai/generated-images/8b25e958-4ffc-4990-a55e-30a8d771ecb5/_result.png",
    tags: ["Manual de marca", "Editorial", "Guidelines"],
  },
  {
    title: "Snack que grita en anaquel",
    client: "Pixelea Snacks",
    cat: "Branding",
    year: "2024",
    img: "https://image.qwenlm.ai/generated-images/ddc6fa69-b18a-4f80-b4f5-b6308c1939e6/_result.png",
    tags: ["Packaging", "Identidad", "Ilustración"],
  },
  {
    title: "Feed con ritmo visual",
    client: "Neon Records",
    cat: "Logotipo",
    year: "2026",
    img: "https://image.qwenlm.ai/generated-images/b2637caa-0a85-49f2-bc63-541f1d4d7a54/_result.png",
    tags: ["Social kit", "Logotipo", "Templates"],
  },
];

function ProjectCard({ p, i }: { p: (typeof PROJECTS)[number]; i: number }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(9);
  const cardRef = useReveal<HTMLElement>();
  return (
    <article ref={cardRef} className="reveal" style={{ transitionDelay: `${(i % 3) * 110}ms` }}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="tilt-card group relative border border-ps-line bg-ps-panel shadow-[8px_8px_0_rgba(0,0,0,0.4)]"
      >
        {/* visor */}
        <div className="relative m-2.5 mb-0 overflow-hidden border border-ps-line bg-[#242424]">
          <div className="bg-checker-light aspect-[4/3] w-full">
            <img
              src={p.img}
              alt={`${p.client} — ${p.title}`}
              loading="lazy"
              className="pixelated h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
          </div>
          {/* selección al hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <MarchingAnts />
          </div>
          <span className="absolute left-2 top-2 border border-black/40 bg-ink-yellow px-2 py-0.5 font-mono text-[10px] font-semibold text-[#111]">
            {p.cat}
          </span>
          <span className="absolute right-2 top-2 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white backdrop-blur-sm">
            {p.year}
          </span>
        </div>

        <div className="tilt-inner p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-pixel text-[11px] leading-relaxed text-ps-text sm:text-[12px]">{p.title}</h3>
            <span className="shrink-0 font-mono text-[10px] text-ps-muted">#{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="mt-1 font-mono text-[12px] text-ps-cyan">{p.client}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <li key={t} className="border border-ps-line bg-ps-well px-2 py-0.5 font-mono text-[10px] text-ps-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* barra de estado de la tarjeta */}
        <div className="flex items-center justify-between border-t border-ps-line px-5 py-2 font-mono text-[10px] text-ps-muted">
          <span>{p.client.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "_")}.psd</span>
          <span className="text-ps-cyan opacity-0 transition-opacity duration-300 group-hover:opacity-100">▣ ver caso →</span>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const ref = useReveal<HTMLElement>();
  const [cat, setCat] = useState<Cat>("Todos");
  const visible = PROJECTS.filter((p) => cat === "Todos" || p.cat === cat);

  return (
    <section id="portafolio" ref={ref} className="relative border-b border-ps-line bg-ps-canvas">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHead
            tag="Capa 05 · Documento abierto"
            title="PORTA|FOLIO"
            accent="#00b7eb"
            copy="Proyectos exportados en alta resolución. Pasa el cursor: cada pieza reacciona en 3D, como en el lienzo."
          />
          {/* filtro tipo pestañas */}
          <div className="reveal flex flex-wrap gap-2" role="tablist" aria-label="Filtrar portafolio">
            {CATS.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`border px-3.5 py-2 font-mono text-[12px] transition-all ${
                  cat === c
                    ? "border-ps-cyan bg-ps-blue text-white shadow-[3px_3px_0_rgba(0,0,0,0.5)]"
                    : "border-ps-line bg-ps-panel text-ps-muted hover:border-ps-line2 hover:text-ps-text"
                }`}
              >
                {c}
                <span className="ml-1.5 text-[10px] opacity-70">
                  {c === "Todos" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === c).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>

        <div className="reveal mt-12 flex flex-col items-center gap-3">
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer" className="btn-pixel border-2 border-ps-line2 bg-ps-panel px-6 py-3.5 text-[10px] text-ps-text hover:border-ink-cyan hover:text-ink-cyan">
            VER ARCHIVO COMPLETO EN BEHANCE ↗
          </a>
          <p className="font-mono text-[11px] text-ps-muted">Formato soportado: admiración · Resolución: máxima</p>
        </div>
      </div>
    </section>
  );
}
