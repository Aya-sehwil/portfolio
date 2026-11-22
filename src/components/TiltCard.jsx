import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * CSS 3D tilt card. Children sit lifted in Z-space (parallax depth),
 * with a glare that follows the cursor and a slow idle float.
 * `delay` offsets the float so cards don't move in sync.
 */
export default function TiltCard({ children, className = "", max = 10, lift = 40, delay = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 150, damping: 18 });
  const sy = useSpring(y, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([a, b]) =>
    `radial-gradient(circle at ${a * 100}% ${b * 100}%, rgba(255,255,255,.55), transparent 55%)`);
  const shadowX = useTransform(sx, [0, 1], [18, -18]);
  const shadow = useTransform(shadowX, (v) => `${v}px 30px 50px -25px rgba(31,41,55,.30)`);

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { x.set(0.5); y.set(0.5); };

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      style={{ perspective: 1000 }}
      className={className}
    >
      <motion.div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ rotateX, rotateY, boxShadow: shadow, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl bg-white/70 border border-line will-change-transform"
      >
        <div style={{ transform: `translateZ(${lift}px)`, transformStyle: "preserve-3d" }}>{children}</div>
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 rounded-3xl" />
      </motion.div>
    </motion.div>
  );
}
