import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import { projects } from "../data/content";
import { useLang, useProfile } from "../i18n";
import { Hero, About, Skills, Contact } from "./panels";
import { Work } from "./Showroom";

/**
 * THE IDEA: the whole site is one 3D space. Each section floats at its own depth (Z),
 * and scrolling flies the camera forward through them. The mouse gently steers the view.
 */
const D = 1500; // distance between sections in 3D space
const screens = [Hero, Work, About, Skills, Contact]; // names come from the language file (t.nav)
const N = screens.length;
const PASTELS = ["#CFE0D3", "#EADFCB", "#CBD8E8", "#F2D9D0", "#DDD6EC"];

/** Tracks the window size so the layout can adapt (phones, tablets, rotation). */
function useViewport() {
  const [v, setV] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const f = () => setV({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return v;
}

// Soft shapes floating in space that you fly past. Smaller and closer to the edges on phones.
const makeShapes = (w) => {
  const mobile = w < 768;
  const count = mobile ? 7 : 11; // fewer shapes = lighter page
  return Array.from({ length: count }, (_, i) => ({
    x: (i % 2 ? 1 : -1) * (mobile ? w * 0.4 + ((i * 53) % 90) : 520 + ((i * 53) % 300)),
    y: ((i * 97) % 520) - 260,
    z: 300 - i * ((N * D) / count),
    size: (70 + ((i * 37) % 150)) * (mobile ? 0.6 : 1),
    color: PASTELS[i % 5],
    ring: i % 4 === 0,
  }));
};

/** One section placed in space. `fit` shrinks it on short screens so nothing gets cut off. */
function Layer({ i, p, fit, children }) {
  const s = 1 / (N - 1), c = i * s;
  const opacity = useTransform(p, [c - s * 0.55, c - s * 0.2, c + s * 0.2, c + s * 0.55], [0, 1, 1, 0]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.6 ? "auto" : "none"));
  const visibility = useTransform(opacity, (v) => (v > 0.01 ? "visible" : "hidden"));
  // Keep a section mounted only while it is (almost) visible: hidden sections cost nothing.
  const [show, setShow] = useState(() => opacity.get() > 0.01);
  useMotionValueEvent(opacity, "change", (v) => setShow(v > 0.01));
  return (
    <motion.section className="absolute inset-0 grid grid-cols-[minmax(0,1fr)] place-items-center" style={{ z: -i * D, opacity, pointerEvents, visibility, scale: fit, willChange: "transform, opacity" }}>
      {show ? children : null}
    </motion.section>
  );
}

/** Small globe icon for the language button (inline SVG, inherits the text color). */
function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function World() {
  const { w, h } = useViewport();
  const { t, isAr, setLang } = useLang();
  const profile = useProfile();
  const mobile = w < 768;
  const fit = Math.min(1, h / 780); // short screens (small phones, landscape) scale content down
  const shapes = useMemo(() => makeShapes(w), [w]);

  // Which project the phone slider shows. Lives here so its buttons can sit OUTSIDE the 3D scene.
  const [proj, setProj] = useState(0);
  const lastProj = projects.length - 1;
  const step = (n) => setProj((v) => Math.max(0, Math.min(lastProj, v + n)));

  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.6 });
  const z = useTransform(p, [0, 1], [0, (N - 1) * D]); // camera flies forward
  // Background gets a little deeper (same soft green family) as you move from Home to Contact
  const bgColor = useTransform(p, [0, 0.25, 0.5, 0.75, 1], ["#FAF9F6", "#F3F3EC", "#ECEFE7", "#E4EAE2", "#DCE4DD"]);
  useMotionValueEvent(p, "change", (v) => setActive(Math.round(v * (N - 1))));

  // Mouse steers the camera slightly (no effect on touch screens)
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-5, 5]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);
  const onMove = (e) => {
    // no camera tilt on the Work section: keeps the devices crisp and the buttons responsive
    if (active === 1) { mx.set(0); my.set(0); return; }
    mx.set((e.clientX / window.innerWidth) * 2 - 1); my.set((e.clientY / window.innerHeight) * 2 - 1);
  };

  const go = (i) => window.scrollTo({ top: (i / (N - 1)) * (document.documentElement.scrollHeight - window.innerHeight), behavior: "smooth" });

  const arrow = "absolute top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-xl shadow-soft disabled:opacity-30";

  return (
    <>
      <div style={{ height: `${N * (mobile ? 140 : 170)}vh` }} /> {/* gives the page its scroll length */}
      <motion.div
        className="fixed inset-0 overflow-hidden"
        style={{
          perspective: 1000,
          backgroundImage: "radial-gradient(60% 50% at 20% 25%, #E6EFE8 0%, transparent 70%), radial-gradient(50% 50% at 85% 75%, #E9E4F2 0%, transparent 70%)",
          backgroundColor: bgColor,
        }}
        onPointerMove={onMove}
      >
        <motion.div className="absolute inset-0" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
          <motion.div className="absolute inset-0" style={{ z, transformStyle: "preserve-3d" }}>
            {shapes.map((s, i) => (
              <motion.i
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 rounded-full"
                style={{
                  opacity: 0.6, width: s.size, height: s.size, marginLeft: s.x - s.size / 2, marginTop: s.y - s.size / 2, z: s.z,
                  ...(s.ring
                    ? { border: `${s.size / 9}px solid ${s.color}`, rotateX: 60 }
                    : { background: `radial-gradient(circle at 30% 28%, #fff, ${s.color} 55%)`, boxShadow: "inset -8px -10px 24px rgba(31,41,55,.07)" }),
                }}
              />
            ))}
            {screens.map((Screen, i) => (
              <Layer key={i} i={i} p={p} fit={fit}><Screen go={go} proj={proj} setProj={setProj} /></Layer>
            ))}
          </motion.div>
        </motion.div>

        {/* Fixed interface: compact on phones */}
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:px-6 md:py-5">
          <button onClick={() => go(0)} className="hidden text-sm font-bold min-[480px]:block">{profile.name}</button>
          <nav className="flex gap-3 text-xs text-mute md:gap-6 md:text-sm">
            {t.nav.map((n, i) => (
              <button key={n} onClick={() => go(i)} className={active === i ? "font-semibold text-ink" : "hover:text-ink"}>{n}</button>
            ))}
          </nav>
          <button onClick={() => setLang(isAr ? "en" : "ar")} aria-label={isAr ? "English" : "العربية"}
            className="flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-soft transition hover:bg-ink hover:text-ivory">
            <GlobeIcon />{isAr ? "EN" : "عربي"}
          </button>
        </header>
        {/* side dots only on larger screens, so they never cover content on phones */}
        <div className="absolute right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
          {t.nav.map((n, i) => (
            <button key={n} aria-label={n} onClick={() => go(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${active === i ? "scale-125 bg-ink" : "bg-ink/25"}`} />
          ))}
        </div>
        {active === 0 && (
          <p className="absolute inset-x-0 bottom-4 z-50 text-center text-xs text-mute md:bottom-6 md:text-sm">
            {mobile ? t.scrollM : t.scroll}
          </p>
        )}

        {/* Phone slider controls: drawn outside the 3D scene so they always respond to taps */}
        {mobile && active === 1 && (
          <>
            <button type="button" aria-label={t.prev} onClick={() => step(-1)} disabled={proj === 0} className={`${arrow} left-2`}>‹</button>
            <button type="button" aria-label={t.next} onClick={() => step(1)} disabled={proj === lastProj} className={`${arrow} right-2`}>›</button>
            <div className="absolute inset-x-0 bottom-5 z-50 flex justify-center gap-2">
              {projects.map((p, i) => (
                <button key={p.title} type="button" aria-label={p.title} onClick={() => setProj(i)}
                  className={`h-2 rounded-full transition-all ${i === proj ? "w-6 bg-ink" : "w-2 bg-ink/25"}`} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}