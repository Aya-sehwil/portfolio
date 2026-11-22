import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile as baseProfile } from "../data/content";
import { useLang, useProfile, useSkills, useFileExists, CV } from "../i18n";

const PASTELS = ["#CFE0D3", "#EADFCB", "#CBD8E8", "#F2D9D0", "#DDD6EC"];
const surface = "rounded-3xl border border-line bg-white/85 shadow-soft";

function useMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const f = () => setM(window.innerWidth < 768);
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return m;
}

/** CV button: shows only if the PDF exists in /public (cv.pdf, and optionally cv-ar.pdf). */
function CvButton() {
  const { lang, t } = useLang();
  const en = useFileExists(CV.en), ar = useFileExists(CV.ar);
  const href = lang === "ar" && ar ? CV.ar : en ? CV.en : null;
  if (!href) return null;
  return <a href={href} download className="btn btn-ghost">{t.cv}</a>;
}

/* ---------- HOME ---------- */
// floating skill pills around the portrait: [label, left, top]
const pills = [["React", "2%", "30%"], ["Tailwind", "72%", "14%"], ["JavaScript", "0%", "62%"], ["Performance", "68%", "58%"]];

export function Hero({ go }) {
  const { t } = useLang();
  const profile = useProfile();
  return (
    <div className="grid w-full max-w-7xl items-center gap-4 px-6 md:grid-cols-2 md:gap-6">
      <div className="text-center md:text-start">
        <p className="mb-2 text-sm font-medium text-sage md:mb-4">{profile.title}</p>
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">{t.hi(profile.name)}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-mute md:mx-0 md:mt-6 md:text-lg">{profile.tagline}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3 md:mt-8 md:justify-start">
          <button onClick={() => go(1)} className="btn btn-primary">{t.view}</button>
          <button onClick={() => go(4)} className="btn btn-ghost">{t.contact}</button>
          <CvButton />
        </div>
      </div>

      <div dir="ltr" className="relative order-first mx-auto h-[290px] w-[290px] md:order-none md:aspect-square md:h-auto md:w-full md:max-w-[640px]" style={{ perspective: 1200 }}>
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(-8deg)" }}>
          <img
            src={profile.image}
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-contain object-bottom"
            style={{ transform: "translateZ(30px)", WebkitMaskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)" }}
          />
          {pills.map(([c, x, y], i) => (
            <motion.span
              key={c}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full bg-white px-3 py-1 text-[10px] font-semibold shadow-soft md:px-4 md:py-1.5 md:text-xs"
              style={{ left: x, top: y, z: 70 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- ABOUT ---------- */
export function About() {
  const { t, about } = useLang();
  return (
    <div className="w-full max-w-3xl px-6 text-center md:text-start">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{t.aboutTitle}</h2>
      <p className="mt-4 text-base leading-relaxed text-mute md:mt-6 md:text-lg">{about.text}</p>
      <div className="mt-6 grid gap-3 text-start sm:grid-cols-3 md:mt-8">
        {about.cards.map(([k, v]) => (
          <div key={k} className={`p-4 ${surface}`}>
            <p className="text-xs font-semibold text-sage">{k}</p>
            <p className="mt-1 text-sm font-semibold">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center md:justify-start"><CvButton /></div>
    </div>
  );
}

/* ---------- SKILLS ---------- */
const sizes = [220, 200, 230, 200, 215, 210];
const sizesMobile = [135, 120, 140, 120, 130, 125];

export function Skills() {
  const mobile = useMobile();
  const { t } = useLang();
  const skills = useSkills();
  return (
    <div className="w-full max-w-5xl px-6 text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{t.skillsTitle}</h2>
      <p className="mt-2 text-sm text-mute md:mt-3 md:text-base">{t.skillsSub}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:mt-10 md:gap-4" style={{ perspective: 1200 }}>
        {skills.map((s, i) => {
          const d = (mobile ? sizesMobile : sizes)[i % 6];
          return (
            <motion.div
              key={s.name}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08 }}
              className="grid place-items-center rounded-full p-4 md:p-8"
              style={{
                width: d, height: d, z: (i % 3) * (mobile ? 30 : 60),
                background: `radial-gradient(circle at 30% 28%, #fff, ${PASTELS[i % 5]} 62%)`,
                boxShadow: "inset -10px -14px 30px rgba(31,41,55,.07), 0 24px 40px -24px rgba(31,41,55,.25)",
              }}
            >
              <div>
                <h3 className="text-xs font-bold md:text-sm">{s.name}</h3>
                <p className="mt-1 hidden text-[11px] leading-snug text-mute md:block">{s.note}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- CONTACT ---------- */
export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const profile = baseProfile;

  const submit = async (e) => {
    e.preventDefault();
    const form = e.target, f = new FormData(form);
    // No form service set up: fall back to opening the visitor's email app
    if (!profile.formEndpoint) {
      const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent("Portfolio message")}&body=${encodeURIComponent(body)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(profile.formEndpoint, { method: "POST", body: f, headers: { Accept: "application/json" } });
      if (res.ok) { setStatus("sent"); form.reset(); } else setStatus("error");
    } catch { setStatus("error"); }
  };

  const label = { idle: t.send, sending: t.sending, sent: t.sent, error: t.err }[status];
  const input = "w-full rounded-xl border border-line bg-ivory px-4 py-2.5 text-sm outline-none focus:border-sage md:py-3";
  return (
    <div className="w-full max-w-xl px-6">
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{t.contactTitle}</h2>
      <form onSubmit={submit} className={`mt-5 grid gap-2 p-4 md:mt-8 md:gap-3 md:p-6 ${surface}`}>
        <input name="name" required placeholder={t.name} className={input} />
        <input name="email" type="email" required placeholder={t.email} className={input} />
        <textarea name="message" required rows={3} placeholder={t.msg} className={input} />
        <button disabled={status === "sending"} className="btn btn-primary justify-self-start disabled:opacity-60">{label}</button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2 md:mt-5">
        <a className="btn btn-ghost" target="_blank" rel="noreferrer" href={`https://wa.me/${profile.whatsapp}`}>{t.wa}</a>
        {profile.socials.map((s) => <a key={s.label} className="btn btn-ghost" target="_blank" rel="noreferrer" href={s.href}>{s.label}</a>)}
      </div>
    </div>
  );
}