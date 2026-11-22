import { createContext, useContext, useEffect, useState } from "react";
import { profile as baseProfile, skills as baseSkills } from "./data/content";

/**
 * LANGUAGES (English / Arabic). Everything translatable lives in THIS file.
 * - Website texts:           STR
 * - About section:           ABOUT   (edit the text so it is exactly about you)
 * - Name / title / tagline:  AR_PROFILE
 * - CV files:                CV      (put the PDFs in /public)
 * - Project texts in Arabic: add an `ar: { title, description }` object to a project in content.js (optional)
 */
export const CV = { en: "/cv.pdf", ar: "/cv-ar.pdf" };

const AR_PROFILE = {
  name: " آية سحويل ",  
  title: "مطوّرة ويب",
  tagline: "أبني مواقع ويب حديثة وسريعة وسهلة الاستخدام، تحوّل فكرتك إلى واقع.",
};

const ABOUT = {
  en: {
    text: "I'm Aya, a front-end developer who turns ideas and designs into modern, interactive, responsive web experiences. With over two years of experience building websites with React and JavaScript, I focus on user experience, site performance, and code quality. I believe a successful website is more than a beautiful look: it combines ease of use with solid performance to serve business goals and give users a great experience.",
    cards: [["Education", "Information Systems, Al-Aqsa University"], ["Role", "Front-end developer & team lead"], ["Works in", "Arabic & English"]],
  },
  ar: {
    text: "أنا آية، مطوّرة واجهات أمامية (Front-End Developer)، أحوّل الأفكار والتصاميم إلى تجارب ويب عصرية وتفاعلية ومتجاوبة. لديّ خبرة تزيد عن عامين في تطوير المواقع باستخدام React وJavaScript، مع اهتمام خاص بتجربة المستخدم وأداء المواقع وجودة الكود. أؤمن أن الموقع الناجح لا يقتصر على المظهر الجميل، بل يجمع بين سهولة الاستخدام والأداء الفعّال ليحقق أهداف العمل ويمنح المستخدم تجربة مميزة.",
    cards: [["التعليم", "نظم المعلومات، جامعة الأقصى"], ["الدور", "مطوّرة واجهات أمامية وقائدة فريق"], ["اللغات", "العربية والإنجليزية"]],
  },
};

const SK_AR = {
  "React & Frontend": ["React وواجهات المستخدم", "بناء المكوّنات وإدارة الحالة والتنقل بين الصفحات."],
  "Figma to Code": ["من Figma إلى كود", "تنفيذ دقيق للتصميم وبشكل متجاوب."],
  "Responsive Design": ["تصميم متجاوب", "مواقع تظهر بشكل صحيح على كل الشاشات."],
  "Performance": ["الأداء", "تحميل سريع وتفاعل سلس."],
  "E-commerce Websites": ["متاجر إلكترونية", "عرض المنتجات وإتمام الطلب بسهولة."],
  "AI-Assisted Development": ["التطوير بمساعدة الذكاء الاصطناعي", "تسليم مشاريع كاملة أسرع بأدوات حديثة."],
  "Full Websites": ["مواقع كاملة", "من الفكرة حتى الإطلاق، مع تصميم أو بدونه."],
  "UI Design": ["تصميم الواجهات", "تخطيطات هادئة وألوان سهلة القراءة."],
  "Node.js & PHP": ["Node.js وPHP", "واجهات برمجية وخلفيات عند الحاجة."],
};

const STR = {
  en: {
    nav: ["Home", "Work", "About", "Skills", "Contact"],
    hi: (n) => `Hi, I'm ${n}.`, view: "View My Work", contact: "Contact Me", cv: "Download CV",
    scroll: "Scroll to move through the space", scrollM: "Scroll to explore",
    aboutTitle: "About Me", skillsTitle: "Skills", skillsSub: "What I use to turn ideas into fast, calm websites.",
    workTitle: "Selected Projects", click: "Click to explore the site", done: "Done", open: "Open full website", source: "Source Code",
    desktop: "Desktop", mobile: "Mobile", prev: "Previous project", next: "Next project",
    contactTitle: "Let's build something calm.", name: "Your name", email: "Your email", msg: "Tell me about your project",
    send: "Send message", sending: "Sending...", sent: "Message sent, thank you!", err: "Something went wrong, try again", wa: "WhatsApp",
  },
  ar: {
    nav: ["الرئيسية", "الأعمال", "نبذة عني", "المهارات", "تواصل"],
    hi: (n) => `أهلاً، أنا ${n}`, view: "تصفّح أعمالي", contact: "تواصل معي", cv: "تحميل السيرة الذاتية",
    scroll: "مرّر للأسفل لتتجوّل في الموقع", scrollM: "مرّر للاستكشاف",
    aboutTitle: "نبذة عني", skillsTitle: "المهارات", skillsSub: "ما أستخدمه لتحويل الأفكار إلى مواقع سريعة وهادئة.",
    workTitle: "أعمال مختارة", click: "اضغط لتصفّح الموقع", done: "تم", open: "افتح الموقع كاملاً", source: "الكود المصدري",
    desktop: "كمبيوتر", mobile: "موبايل", prev: "المشروع السابق", next: "المشروع التالي",
    contactTitle: "لنبنِ شيئاً جميلاً معاً.", name: "اسمك", email: "بريدك الإلكتروني", msg: "حدّثني عن مشروعك",
    send: "إرسال", sending: "جارٍ الإرسال...", sent: "تم الإرسال، شكراً لك!", err: "حدث خطأ، حاول مجدداً", wa: "واتساب",
  },
};

const Ctx = createContext(null);
export const useLang = () => useContext(Ctx);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { const s = localStorage.getItem("lang"); if (s === "ar" || s === "en") return s; } catch {}
    return (navigator.language || "").startsWith("ar") ? "ar" : "en";
  });
  const isAr = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr"; // flips the whole layout
    document.body.style.fontFamily = isAr ? '"Cairo", "Plus Jakarta Sans", sans-serif' : "";
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang, isAr]);

  // Arabic font + rules (letter-spacing breaks Arabic letters, so it is switched off)
  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap";
    const s = document.createElement("style");
    s.textContent = 'html[lang="ar"] *{letter-spacing:0!important} html[lang="ar"] h1,html[lang="ar"] h2{line-height:1.3!important}';
    document.head.append(l, s);
  }, []);

  const localize = (p) => (isAr && p.ar ? { ...p, ...p.ar } : p); // project text in Arabic if provided
  return <Ctx.Provider value={{ lang, isAr, setLang, t: STR[lang], about: ABOUT[lang], localize }}>{children}</Ctx.Provider>;
}

export function useProfile() {
  const { isAr } = useLang();
  return isAr ? { ...baseProfile, ...AR_PROFILE } : baseProfile;
}
export function useSkills() {
  const { isAr } = useLang();
  return baseSkills.map((s) => (isAr && SK_AR[s.name] ? { name: SK_AR[s.name][0], note: SK_AR[s.name][1] } : s));
}

/** True only if the file really exists in /public (so the CV button never links to nothing). */
export function useFileExists(path) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    fetch(path, { method: "HEAD" })
      .then((r) => setOk(r.ok && !(r.headers.get("content-type") || "").includes("text/html")))
      .catch(() => setOk(false));
  }, [path]);
  return ok;
}