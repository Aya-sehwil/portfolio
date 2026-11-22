import { motion } from "framer-motion";
import { profile } from "../data/content";
import LayerStack from "./LayerStack";

export default function Hero() {
  return (
    <section id="top" className="mx-auto grid min-h-[92vh] max-w-6xl items-center gap-8 px-6 pt-24 md:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <p className="mb-4 text-sm font-medium text-sage">{profile.title}</p>
        <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">Hi, I'm {profile.name}.</h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">{profile.tagline}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-ghost">Contact Me</a>
        </div>
        <p className="mt-6 text-sm text-mute">Hover the stack to look inside.</p>
      </motion.div>
      <LayerStack />
    </section>
  );
}