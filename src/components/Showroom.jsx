import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "../data/content";
import { useLang } from "../i18n";

/**
 * WORK SHOWROOM: each project is shown inside a laptop / phone. If a project has `embed: true`
 * in content.js, the real website runs inside the device and the visitor can browse it.
 * Otherwise the screenshot is shown and slowly scrolls on hover.
 */
const STAGE_H = 440; // design height of the stage; everything is scaled to fit the real screen
const frame = "border border-line bg-[#F3EEE4] shadow-soft";
const bezel = "#E4DED2";

function useVW() {
  const [w, setW] = useState(() => window.innerWidth);
  useEffect(() => {
    const f = () => setW(window.innerWidth);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return w;
}

/** The screen inside a device: live iframe or screenshot. */
function Screen({ p, w, sc, vh, mode, active, setActive, t }) {
  const live = p.embed && p.live && p.live !== "#";
  const shot = mode === "mobile" ? p.imageMobile || p.image : p.image;
  return (
    <div className="group relative overflow-hidden bg-white" style={{ width: w * sc, height: vh, "--vh": `${vh}px` }}>
      {/* Screenshot is always shown (cheap). The real site loads only AFTER the visitor clicks. */}
      <img src={shot} alt={`${p.title} preview`} decoding="async" className="min-h-full w-full object-cover object-top will-change-transform transition-transform duration-[5000ms] ease-in-out group-hover:[transform:translateY(min(0px,calc(-100%_+_var(--vh))))]" />
      {live && active && (
        <iframe
          title={p.title}
          src={p.live}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{ position: "absolute", top: 0, left: 0, width: w, height: vh / sc, border: 0, background: "#fff", transform: `scale(${sc})`, transformOrigin: "0 0" }}
        />
      )}
      {live && !active && (
        <button type="button" onClick={() => setActive(true)} className="absolute inset-0 grid place-items-center transition hover:bg-ink/10">
          <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold shadow-soft">{t.click}</span>
        </button>
      )}
      {live && active && (
        <button type="button" onClick={() => setActive(false)} className="absolute right-2 top-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold shadow-soft">
          {t.done}
        </button>
      )}
    </div>
  );
}

export function Work({ proj = 0, setProj = () => {} }) {
  const { t, localize } = useLang();
  const vw = useVW();
  const mobile = vw < 768;
  const p = localize(projects[proj] || projects[0]);
  const [mode, setMode] = useState("desktop");
  const [active, setActive] = useState(false);
  useEffect(() => setActive(false), [proj, mode]); // leaving a site returns scroll control to the page

  // gentle 3D tilt that follows the pointer
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [0, 0]), { stiffness: 80, damping: 16 });
  const rotX = useSpring(useTransform(my, [-1, 1], [0, 0]), { stiffness: 80, damping: 16 });
  const onMove = (e) => {
    if (active) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => { mx.set(0); my.set(0); };

  // fit the stage to the available width
  const dw = mobile && mode === "mobile" ? 260 : 700;
  const avail = mobile ? vw - 32 : Math.min(700, vw - 48 - 332);
  const s = Math.min(1, avail / dw);

  const url = p.live && p.live !== "#" ? p.live.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.title.toLowerCase().replace(/\s+/g, "") + ".com";
  const spring = { type: "spring", stiffness: 90, damping: 16 };
  const shown = (on) => ({ pointerEvents: on ? "auto" : "none", backfaceVisibility: "hidden" });

  return (
    <div className="w-full min-w-0 max-w-6xl px-4 md:px-6">
      <div className="grid items-center gap-5 md:grid-cols-[300px_minmax(0,1fr)] md:gap-8">
        {/* Info column (below the devices on phones) */}
        <div className="order-2 text-center md:order-1 md:text-start">
          <h2 className="hidden text-5xl font-bold tracking-tight md:block">{t.workTitle}</h2>
          <div className="mt-6 hidden flex-col gap-2 md:flex">
            {projects.map((q, i) => (
              <button key={q.title} type="button" onClick={() => setProj(i)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-start text-sm transition ${i === proj ? "border-sage bg-white font-semibold shadow-soft" : "border-line bg-white/50 text-mute hover:bg-white"}`}>
                <span className="text-xs text-sage">0{i + 1}</span>{localize(q).title}
              </button>
            ))}
          </div>
          <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-mute">{p.description}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 md:justify-start">{p.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
          <div className="mt-4 inline-flex rounded-full border border-line bg-white/70 p-1">
            {[["desktop", t.desktop], ["mobile", t.mobile]].map(([m, label]) => (
              <button key={m} type="button" onClick={() => setMode(m)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${mode === m ? "bg-ink text-ivory" : "text-mute"}`}>{label}</button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            {p.live && p.live !== "#" && (
              <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary !px-5 !py-2.5 !text-xs">{t.open}</a>
            )}
            {p.source && p.source !== "#" && (
              <a href={p.source} target="_blank" rel="noreferrer" className="btn btn-ghost !px-5 !py-2.5 !text-xs">{t.source}</a>
            )}
          </div>
        </div>

        {/* Device stage */}
        <div className="order-1 md:order-2">
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight md:hidden">{t.workTitle}</h2>
          <div dir="ltr" className="relative mx-auto transition-[width,height] duration-500" style={{ width: dw * s, height: STAGE_H * s, perspective: 1600 }}
               onPointerMove={onMove} onPointerLeave={reset}>
            <div style={{ width: dw, height: STAGE_H, transform: `scale(${s})`, transformOrigin: "0 0" }}>
              <motion.div className="relative h-full w-full" style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}>
                <div className="absolute inset-x-12 bottom-0 h-8" style={{ background: "radial-gradient(closest-side, rgba(31,41,55,.16), transparent)" }} />

                {/* Laptop */}
                <motion.div initial={false} animate={{ rotateY: mode === "desktop" ? 0 : -90, opacity: mode === "desktop" ? 1 : 0 }} transition={spring}
                  className="absolute top-0" style={{ left: (dw - 640) / 2, width: 640, ...shown(mode === "desktop") }}>
                  <div className={`rounded-2xl p-2 ${frame}`}>
                    <div className="mb-1.5 flex h-[26px] items-center gap-1.5 px-1">
                      {["#E8B4A8", "#E5D3A1", "#8FA595"].map((c) => <i key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
                      <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-0.5 text-[10px] text-mute">{url}</span>
                    </div>
                    <div className="overflow-hidden rounded-lg">
                      <Screen p={p} w={1280} sc={624 / 1280} vh={360} mode="desktop" active={active && mode === "desktop"} setActive={setActive} t={t} />
                    </div>
                  </div>
                  <div className="h-3 rounded-b-[18px]" style={{ background: bezel, width: 700, marginLeft: -30 }} />
                </motion.div>

                {/* Phone */}
                <motion.div initial={false} animate={{ rotateY: mode === "mobile" ? 0 : 90, opacity: mode === "mobile" ? 1 : 0 }} transition={spring}
                  className="absolute" style={{ left: (dw - 214) / 2, top: 5, width: 214, ...shown(mode === "mobile") }}>
                  <div className={`relative rounded-[34px] p-2 ${frame}`}>
                    <i className="absolute left-1/2 top-3.5 z-10 h-4 w-16 -translate-x-1/2 rounded-full" style={{ background: bezel }} />
                    <div className="overflow-hidden rounded-[26px]">
                      <Screen p={p} w={390} sc={198 / 390} vh={414} mode="mobile" active={active && mode === "mobile"} setActive={setActive} t={t} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}