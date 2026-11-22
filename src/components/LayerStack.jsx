 import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { profile } from "../data/content";

/* Each layer = one stage of building a website. Order: back -> front. */
const Line = ({ w, c }) => <div className="h-1.5 rounded-full" style={{ width: w, background: c }} />;

const layers = [
  { name: "Performance", bg: "#E6EEE8", body: (
    <div className="grid h-full place-items-center">
      <div className="grid h-28 w-28 place-items-center rounded-full border-[10px] border-[#B7CDBD] text-3xl font-extrabold text-ink">100</div>
    </div>) },
  { name: "Structure", bg: "#E8ECF2", body: (
    <div className="grid h-full grid-cols-3 grid-rows-4 gap-2">
      <div className="col-span-3 rounded-lg border-2 border-dashed border-slate/40" />
      <div className="row-span-2 rounded-lg border-2 border-dashed border-slate/40" />
      <div className="col-span-2 rounded-lg border-2 border-dashed border-slate/40" />
      <div className="col-span-2 rounded-lg border-2 border-dashed border-slate/40" />
      <div className="col-span-3 rounded-lg border-2 border-dashed border-slate/40" />
    </div>) },
  { name: "Style", bg: "#F3E9E4", body: (
    <div className="flex h-full flex-col justify-between">
      <div className="flex gap-2">{["#8FA595", "#C9B79C", "#9DB0C6", "#E5C7BD"].map((c) => <i key={c} className="h-9 w-9 rounded-full" style={{ background: c }} />)}</div>
      <p className="text-6xl font-extrabold text-ink/80">Aa</p>
      <Line w="70%" c="#D9C9BF" /><Line w="45%" c="#D9C9BF" />
    </div>) },
  { name: "Code", bg: "#EEF0E6", body: (
    <div className="flex h-full flex-col justify-center gap-2.5 font-mono">
      <Line w="40%" c="#9DB0C6" /><Line w="75%" c="#B7CDBD" /><Line w="60%" c="#E5C7BD" />
      <Line w="85%" c="#B7CDBD" /><Line w="30%" c="#9DB0C6" /><Line w="65%" c="#C9B79C" />
    </div>) },
  { name: "Me", bg: "#FAF9F6", photo: true },
];

export default function LayerStack() {
  const [open, setOpen] = useState(false);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(my, { stiffness: 80, damping: 15 });
  const ry = useSpring(mx, { stiffness: 80, damping: 15 });

  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    my.set(-((e.clientY - r.top) / r.height - 0.5) * 20);
  };
  const gap = open ? 95 : 26; // distance between layers in Z-space

  return (
    <div
      className="mx-auto grid h-[480px] w-full max-w-md cursor-pointer place-items-center"
      style={{ perspective: 1400 }}
      onPointerMove={move}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => { setOpen(false); mx.set(0); my.set(0); }}
      onClick={() => setOpen((o) => !o)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-[340px] w-[260px]"
      >
        <motion.div style={{ transformStyle: "preserve-3d", rotateX: 58, rotateZ: -32 }} className="absolute inset-0">
          {layers.map((l, i) => (
            <motion.div
              key={l.name}
              animate={{ z: (i - 2) * gap }}
              transition={{ type: "spring", stiffness: 90, damping: 14 }}
              className="absolute inset-0 rounded-3xl border border-white/80 p-4 shadow-soft"
              style={{ background: l.bg }}
            >
              {l.photo ? (
                <img src={profile.image} alt={profile.name} className="h-full w-full rounded-2xl object-cover" />
              ) : (
                <div className="flex h-full flex-col">
                  <span className="mb-3 text-xs font-semibold text-slate">{l.name}</span>
                  <div className="min-h-0 flex-1">{l.body}</div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}