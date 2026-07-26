import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the whole page with Lenis (inertia, soft accel/decel on the
 * actual scroll position) and keeps GSAP's ScrollTrigger in sync with
 * it, per Lenis's own recommended wiring:
 *   - lenis.raf() is stepped from gsap.ticker instead of its own rAF,
 *     so both stay on the same clock.
 *   - ScrollTrigger.update() runs on every Lenis "scroll" event so
 *     pinned/scrubbed triggers don't lag behind the smoothed scroll.
 * Framer Motion's useScroll() reads the live scrollY the same as any
 * other consumer, so it stays in sync for free — no extra glue needed.
 *
 * Respects prefers-reduced-motion by not instantiating Lenis at all;
 * the browser's native (instant) scroll takes over in that case.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3), // soft deceleration, no hard stop
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    document.documentElement.classList.add("lenis");
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);
}