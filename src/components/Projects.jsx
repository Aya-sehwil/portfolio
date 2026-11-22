import { projects } from "../data/content";
import TiltCard from "./TiltCard";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Selected Projects</h2>
      <p className="mt-3 max-w-lg text-mute">Websites I've designed and built. Hover a card to explore it.</p>

      <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <TiltCard key={p.title} delay={i * 0.8} lift={36}>
            <div className="p-4">
              <img src={p.image} alt={`${p.title} screenshot`} loading="lazy"
                   className="aspect-[16/10] w-full rounded-2xl border border-line object-cover" />
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <div className="mt-5 flex gap-3">
                <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary !py-2">Live Demo</a>
                <a href={p.source} target="_blank" rel="noreferrer" className="btn btn-ghost !py-2">Source Code</a>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
