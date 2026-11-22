import { skills } from "../data/content";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About & Skills</h2>
      <p className="mt-3 max-w-xl text-mute">
        I build websites that load fast and feel calm to use. Replace this paragraph with your own story.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {skills.map((s) => (
          <div key={s.name} className={`glass p-6 ${s.span || ""}`}>
            <h3 className="font-semibold">{s.name}</h3>
            <p className="mt-2 text-sm text-mute">{s.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
