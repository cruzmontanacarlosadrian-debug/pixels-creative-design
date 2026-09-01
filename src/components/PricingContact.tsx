import { useEffect, useRef, useState } from "react";
import { PixelLogoTile, PixelHeart } from "./PixelLogo";
import { SectionHead } from "./Services";
import { useReveal, usePrefersReducedMotion } from "../hooks";

/* ══════════ Ventana genérica tipo diálogo de Photoshop ══════════ */
function DialogWindow({
  title,
  children,
  className = "",
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`flex flex-col border border-ps-line2 bg-ps-panel shadow-[10px_10px_0_rgba(0,0,0,0.45)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-ps-line bg-ps-panel2 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 bg-[#5a5a5a]" />
          <i className="h-2.5 w-2.5 bg-[#4a4a4a]" />
          <i className="h-2.5 w-2.5 bg-[#3a3a3a]" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-ps-text">{title}</span>
        <span className={`ml-auto font-mono text-[10px] text-ps-muted ${wide ? "" : "hidden sm:inline"}`}>Adobe® style</span>
      </div>
      {children}
    </div>
  );
}

/* ══════════ Planes ══════════ */
const PLANS = [
  {
    id: "png",
    ext: "PNG",
    name: "BÁSICO",
    price: "USD 89,99",
    color: "#8f8f8f",
    tagline: "Para empezar a verte profesional.",
    features: [
      "1 propuesta de logotipo + 2 variantes",
      "Paleta de color básica",
      "Archivos finales PNG / SVG",
      "1 ronda de ajustes",
      "Entrega en 5 días hábiles",
    ],
    featured: false,
  },
  {
    id: "psd",
    ext: "SGV",
    name: "PROMEDIO",
    price: "USD 289,99",
    color: "#EDB204",
    tagline: "El favorito: marca completa y lista para aplicar.",
    features: [
      "3 propuestas de logotipo",
      "Identidad básica: color + tipografías",
      "Tarjeta de presentación y papelería",
      "Manual de marca (30+ páginas)",
      "Archivos editables incluidos",
      "3 rondas de ajustes",
      "Entrega en 15 días hábiles",
    ],
    featured: true,
  },
  {
    id: "raw",
    ext: "PSD",
    name: "PROFESIONAL",
    price: "USD 859,99",
    color: "#31a8ff",
    tagline: "Todo lo de Estudio, más web y sistema completo.",
    features: [
      "Identidad visual completa",
      "Manual de marca extendido",
      "Página web (con dominio)",
      "Kit de redes sociales + templates",,
      "Ajustes limitados (con cariño)",
    ],
    featured: false,
  },
];

export function Pricing() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="planes" ref={ref} className="relative border-b border-ps-line bg-ps-app">
      <div className="bg-dotgrid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <SectionHead
          tag="Capa 06 · Exportar como…"
          title="ELIGE TU | FORMATO"
          accent="#31a8ff"
          copy="Tres calidades de exportación, un mismo estándar: trabajo que se nota. Precios en USD, IVA no incluido."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* plan destacado */}
          {PLANS.filter((p) => p.featured).map((p) => (
            <DialogWindow key={p.id} title={`exportar_${p.id}_estudio.psb`} className="reveal-left">
              <div className="relative flex flex-1 flex-col p-7 sm:p-9">
                <span className="absolute -top-3 right-6 border border-black/40 bg-ink-yellow px-2.5 py-1 font-pixel text-[8px] text-[#111]">
                  ★ RECOMENDADO
                </span>
                <div className="flex items-center gap-3">
                  <span className="border-2 px-3 py-1.5 font-pixel text-lg" style={{ borderColor: p.color, color: p.color }}>
                    .{p.ext}
                  </span>
                  <div>
                    <h3 className="font-pixel text-sm text-ps-text">{p.name}</h3>
                    <p className="mt-1 font-mono text-[11px] text-ps-muted">{p.tagline}</p>
                  </div>
                </div>
                <p className="mt-7 font-pixel text-[clamp(1.6rem,4vw,2.4rem)] text-white">
                  {p.price} <span className="text-[11px] text-ps-muted">USD</span>
                </p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-[#c4c4c4]">
                      <span className="mt-1 h-2.5 w-2.5 shrink-0" style={{ background: p.color }} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className="btn-pixel mt-9 bg-ps-blue px-6 py-4 text-center text-[11px] text-white">
                  EXPORTAR ESTE PLAN →
                </a>
              </div>
            </DialogWindow>
          ))}

          {/* planes compactos */}
          <div className="flex flex-col gap-8">
            {PLANS.filter((p) => !p.featured).map((p, i) => (
              <DialogWindow key={p.id} title={`exportar_${p.id}.${p.ext.toLowerCase()}`} className={`reveal-right ${i === 1 ? "flex-1" : ""}`}>
                <div className="flex flex-col p-6 sm:p-7" style={{ transitionDelay: "120ms" }}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="border-2 px-2.5 py-1 font-pixel text-sm" style={{ borderColor: p.color, color: p.color }}>
                        .{p.ext}
                      </span>
                      <div>
                        <h3 className="font-pixel text-[12px] text-ps-text">{p.name}</h3>
                        <p className="mt-0.5 hidden font-mono text-[10px] text-ps-muted sm:block">{p.tagline}</p>
                      </div>
                    </div>
                    <p className="font-pixel text-base text-white sm:text-lg">
                      {p.price}
                    </p>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[13.5px] text-[#bdbdbd]">
                        <span className="mt-[7px] h-2 w-2 shrink-0" style={{ background: p.color }} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                    {p.features.length > 4 && (
                      <li className="pl-[18px] font-mono text-[11px] text-ps-muted">+ {p.features.length - 4} más…</li>
                    )}
                  </ul>
                  <a
                    href="#contacto"
                    className="mt-5 border border-ps-line2 py-2.5 text-center font-mono text-[12px] text-ps-text transition-colors hover:border-ps-cyan hover:bg-ps-cyan/10 hover:text-ps-cyan"
                  >
                    Elegir .{p.ext.toLowerCase()} →
                  </a>
                </div>
              </DialogWindow>
            ))}
          </div>
        </div>

        <p className="reveal mt-10 text-center font-mono text-[12px] text-ps-muted">
          ¿Presupuesto distinto? <a href="#contacto" className="text-ps-cyan underline decoration-2 underline-offset-4 hover:text-ink-magenta">Escríbenos</a> y fusionamos un plan a tu medida.
        </p>
      </div>
    </section>
  );
}

/* ══════════ Contacto ══════════ */
const SERVICIOS = ["Branding", "Logotipo", "Página web", "Manual de marca", "Identidad visual", "Diseño gráfico", "Paquete completo"];
const BUDGETS = ["Menos de $3k", "$3k – $8k", "$8k – $15k", "Más de $15k"];

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const reduced = usePrefersReducedMotion();
  const [status, setStatus] = useState<"idle" | "saving" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [budget, setBudget] = useState(BUDGETS[1]);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "saving") return;
    setStatus("saving");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "6ef26321-63a2-41ff-81ee-1ae98c5a7c8b");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message || "Error al enviar");
      })
      .catch((err) => {
        console.error("Error enviando formulario:", err);
      });

    if (reduced) {
      setProgress(100);
      setStatus("done");
      return;
    }
    setProgress(0);
    timer.current = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 14 + 4);
        if (next >= 100 && timer.current) {
          window.clearInterval(timer.current);
          window.setTimeout(() => setStatus("done"), 350);
        }
        return next;
      });
    }, 160);
  };

  return (
    <section id="contacto" ref={ref} className="relative overflow-hidden border-b border-ps-line bg-ps-canvas">
      {/* logo gigante de fondo */}
      <div className="pointer-events-none absolute -left-20 bottom-0 hidden opacity-[0.05] xl:block" aria-hidden="true">
        <PixelLogoTile size={420} className="!border-[3px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_520px] lg:gap-16 lg:px-10 lg:py-28">
        <div>
          <SectionHead
            tag="Capa 07 · Archivo → Guardar como…"
            title="TRABAJA CON | NOSOTROS"
            accent="#ffd400"
            copy="Cuéntanos qué necesitas y en menos de 24 horas recibes una propuesta con alcance, tiempos y precio. Sin compromisos, sin spam."
          />

          <ul className="reveal mt-10 space-y-4">
            {[
              { k: "WhatsApp", v: "+506 70286826", href: "https://wa.link/ray9hz", c: "#00b7eb" },
              { k: "Email", v: "pixelcreativedesing@gmail.com", href: "mailto:pixelcreativedesing@gmail.com", c: "#ffffff" },
              { k: "Instagram", v: "@pixdesing_oficial", href: "https://www.instagram.com/pixdesing_oficial/", c: "#ffd400" },
            ].map((r) => (
              <li key={r.k}>
                <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                  className="group flex items-center gap-4 border border-ps-line bg-ps-panel px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-ps-line2 hover:shadow-[6px_6px_0_rgba(0,0,0,0.4)]">
                  <span className="h-3 w-3 shrink-0" style={{ background: r.c }} aria-hidden="true" />
                  <span className="w-24 font-mono text-[11px] uppercase tracking-wider text-ps-muted">{r.k}</span>
                  <span className="font-mono text-[13px] text-ps-text transition-colors group-hover:text-white sm:text-sm">{r.v}</span>
                  <span className="ml-auto text-ps-muted transition-transform group-hover:translate-x-1 group-hover:text-ps-cyan">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="reveal mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[12px] text-ps-muted">
            <span>◷ Lun – Vie · 9:00 a 18:00 (COL)</span>
            <span>◈ Remoto a todo el mundo</span>
            <span className="flex items-center gap-1.5">Respuesta &lt; 24 h <PixelHeart className="h-2.5 w-3" /></span>
          </div>
        </div>

        {/* diálogo Guardar como */}
        <div className="reveal-right lg:pt-6">
          <DialogWindow title="Guardar como — nuevo_proyecto.psd" wide>
            {status === "done" ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <span className="grid h-14 w-14 place-items-center border-2 border-[#31a8ff]">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#31a8ff" strokeWidth="2.4"><path d="M4 12l6 6L20 6" /></svg>
                </span>
                <h3 className="mt-6 font-pixel text-[13px] text-ps-text">¡PROYECTO GUARDADO!</h3>
                <p className="mt-3 font-mono text-[12px] text-ps-muted">
                  nuevo_proyecto.psd · 100% · RGB/8<br />Te contactamos en menos de 24 horas.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setProgress(0); }}
                  className="btn-pixel mt-8 border-2 border-ps-line2 bg-ps-panel px-5 py-3 text-[9px] text-ps-text hover:border-ps-cyan hover:text-ps-cyan"
                >
                  NUEVO DOCUMENTO
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4 p-6 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[11px] text-ps-muted">Nombre *</span>
                    <input required name="nombre" placeholder="Tu nombre"
                      className="w-full border border-ps-line2 bg-ps-well px-3 py-2.5 font-mono text-[13px] text-ps-text placeholder:text-ps-muted/60 outline-none transition-colors focus:border-ps-cyan" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block font-mono text-[11px] text-ps-muted">Teléfono *</span>
                    <input required type="tel" name="phone" placeholder="xxx-xxx-xxxx"
                      className="w-full border border-ps-line2 bg-ps-well px-3 py-2.5 font-mono text-[13px] text-ps-text placeholder:text-ps-muted/60 outline-none transition-colors focus:border-ps-cyan" />
                  </label>
                </div>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] text-ps-muted">Servicio *</span>
                  <select required defaultValue="" name="servicio"
                    className="w-full border border-ps-line2 bg-ps-well px-3 py-2.5 font-mono text-[13px] text-ps-text outline-none transition-colors focus:border-ps-cyan">
                    <option value="" disabled>Selecciona una capa…</option>
                    {SERVICIOS.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <fieldset>
                  <legend className="mb-1.5 font-mono text-[11px] text-ps-muted">Presupuesto estimado</legend>
                  <div className="flex flex-wrap gap-2">
                    {BUDGETS.map((b) => (
                      <button type="button" key={b} onClick={() => setBudget(b)} aria-pressed={budget === b}
                        className={`border px-3 py-1.5 font-mono text-[11px] transition-all ${
                          budget === b ? "border-ps-cyan bg-ps-blue/25 text-white" : "border-ps-line2 bg-ps-well text-ps-muted hover:text-ps-text"
                        }`}>
                        {b}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <label className="block">
                  <span className="mb-1.5 block font-mono text-[11px] text-ps-muted">Cuéntanos tu idea *</span>
                  <textarea required name="mensaje" rows={4} placeholder="Quiero una marca para…"
                    className="w-full resize-none border border-ps-line2 bg-ps-well px-3 py-2.5 font-mono text-[13px] text-ps-text placeholder:text-ps-muted/60 outline-none transition-colors focus:border-ps-cyan" />
                </label>

                {status === "saving" && (
                  <div aria-live="polite">
                    <p className="mb-1.5 flex justify-between font-mono text-[11px] text-ps-muted">
                      <span>Guardando proyecto…</span>
                      <span className="tabular-nums text-ps-cyan">{Math.round(progress)}%</span>
                    </p>
                    <div className="h-4 border border-ps-line2 bg-ps-well p-[3px]">
                      <div className="progress-stripes h-full bg-ps-blue transition-[width] duration-200" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}

                <button type="submit" disabled={status === "saving"}
                  className="btn-pixel w-full bg-ps-blue px-6 py-4 text-[11px] text-white disabled:cursor-wait disabled:opacity-70">
                  {status === "saving" ? "GUARDANDO…" : "GUARDAR PROYECTO"}
                </button>
                <p className="text-center font-mono text-[10px] text-ps-muted">
                  Al guardar aceptas que te contactemos. Nada de Ctrl+Z: respondemos de verdad.
                </p>
              </form>
            )}
          </DialogWindow>
        </div>
      </div>
    </section>
  );
}
