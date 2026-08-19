import Hero from "./components/Hero";
import Services, { Marquee } from "./components/Services";
import Process, { Testimonials } from "./components/Process";
import Portfolio from "./components/Portfolio";
import { Pricing, Contact } from "./components/PricingContact";
import { MenuBar, ToolRail, ScrollProgress, StatusBar } from "./components/Chrome";
import { useScrollProgress } from "./hooks";

function BackToTop() {
  const p = useScrollProgress();
  if (p < 0.06) return null;
  return (
    <a
      href="#inicio"
      aria-label="Volver arriba"
      className="btn-pixel fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center bg-ps-blue text-white"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
        <path d="M12 20V4M5 11l7-7 7 7" />
      </svg>
    </a>
  );
}

export default function App() {
  return (
    <div className="scanlines min-h-screen bg-ps-app font-body text-ps-text antialiased">
      <ScrollProgress />
      <MenuBar />
      <ToolRail />
      <span className="sweep-line" aria-hidden="true" />

      <div className="lg:pl-12">
        <main>
          <Hero />
          <Marquee />
          <Services />
          <Process />
          <Portfolio />
          <Testimonials />
          <Pricing />
          <Contact />
        </main>

        <StatusBar />
      </div>
      <BackToTop />
    </div>
  );
}
