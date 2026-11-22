import { useState } from "react";
import { profile } from "../data/content";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Opens the visitor's email app. For a real backend, swap this for a Formspree/EmailJS request.
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio message")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input = "w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-sm outline-none focus:border-sage";

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Contact</h2>
      <p className="mt-3 text-mute">Have a project in mind? Send a message and I'll reply soon.</p>

      <form onSubmit={submit} className="glass mt-10 grid gap-4 p-6 md:p-8">
        <input name="name" required placeholder="Your name" className={input} />
        <input name="email" type="email" required placeholder="Your email" className={input} />
        <textarea name="message" required rows={5} placeholder="Tell me about your project" className={input} />
        <button className="btn btn-primary justify-self-start">{sent ? "Message ready to send" : "Send message"}</button>
      </form>

      <div className="mt-8 flex flex-wrap gap-3">
        <a className="btn btn-ghost" target="_blank" rel="noreferrer" href={`https://wa.me/${profile.whatsapp}`}>WhatsApp</a>
        {profile.socials.map((s) => (
          <a key={s.label} className="btn btn-ghost" target="_blank" rel="noreferrer" href={s.href}>{s.label}</a>
        ))}
      </div>
    </section>
  );
}
