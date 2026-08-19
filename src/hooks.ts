import { useEffect, useRef, useState, useCallback } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Aplica .is-in cuando el elemento entra al viewport (reveal 3D) */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.classList.contains("reveal") || el.classList.contains("reveal-left") || el.classList.contains("reveal-right")
      ? [el]
      : Array.from(el.querySelectorAll<HTMLElement>(".reveal, .reveal-left, .reveal-right"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [threshold]);
  return ref;
}

/** Tilt 3D que sigue al mouse */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxDeg = 10) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el || reduced) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * maxDeg}deg) rotateX(${-py * maxDeg}deg) translateY(-6px)`;
    },
    [maxDeg, reduced]
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0)";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

/** Parallax por scroll: devuelve un ref y aplica translate a los hijos con [data-depth] */
export function useParallax<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = ref.current;
        if (!root) return;
        const r = root.getBoundingClientRect();
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        root.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
          const depth = parseFloat(el.dataset.depth || "0");
          el.style.transform = `translate3d(0, ${(-progress * depth).toFixed(1)}px, 0)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  return ref;
}

/** Progreso de scroll global 0..1 */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? h.scrollTop / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/** Efecto máquina de escribir con caret pixel */
export function useTypewriter(text: string, speed = 70, startDelay = 300) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);
  useEffect(() => {
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    let iv = 0;
    setOut("");
    setDone(false);
    const timeout = window.setTimeout(() => {
      iv = window.setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          window.clearInterval(iv);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(timeout);
      if (iv) window.clearInterval(iv);
    };
  }, [text, speed, startDelay, reduced]);
  return { out, done };
}
