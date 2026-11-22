// ✏️  All text, links and images live here. Edit this file only.

export const profile = {
  name: "Aya Sehwel",
  title: "Web Developer",
 tagline: "I build modern, fast, and beautiful websites that help your ideas come to life.",
  // Transparent PNG (no background) of you, at /public/profile.png
  image: "/profile.webp",
  // Optional: not used in the current design, you can ignore it.
  formEndpoint: "https://formspree.io/f/xbdpljpo",    
  avatarGlb: null,
  email: "ayasehwel78@gmail.com",        
  whatsapp: "970593272453",         
  socials: [
    { label: "GitHub", href: "https://github.com/Aya-sehwil" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aya-sehwel-10848b35a/" },
    { label: "mostaql", href: "https://mostaql.com/u/aya_sehwel21" },
  ],
};

/**
 * Each project:
 *  - live:        the real website link. Use "#" if it isn't online yet.
 *  - embed:       true  = the real site runs inside the laptop/phone (visitor can browse it)
 *                 false = a screenshot is shown instead (use this if the site blocks embedding,
 *                         or isn't online yet)
 *  - image:       screenshot, used when embed is false (a tall full-page screenshot looks best)
 *  - imageMobile: optional screenshot for the phone view
 */
export const projects = [
  {
    title: "Gaza Gate",
    description: "E-commerce platform with a React storefront, product browsing, and a streamlined checkout.",
    image: "/projects/gaza-gate.svg",
    imageMobile: "/projects/gaza-gate.svg",
    tags: ["React", "Tailwind"],
    live: "https://gazagate.store/",          // ← رابط موقعك الحقيقي
    embed: true,       // ← خليها true لما تحطي الرابط
    source: "https://gazagate.store/",
  },
  {
    title: "Train Flow",
    description: "University training management system with a supervisor dashboard for tracking trainees.",
    image: "/projects/train-flow.svg",
    imageMobile: "/projects/train-flow.svg",
    tags: ["React", "Node.js", "Tailwind"],
    live: "https://train-flow-frontend.vercel.app/",
    embed: true,
    source: "https://train-flow-frontend.vercel.app/",
  },
  {
    title: "EMC-Store",
    description: "A from-scratch online store built for a client, with fast loading and a simple admin flow.",
    image: "/projects/client-store.svg",
    imageMobile: "/projects/client-store.svg",
    tags: ["React", "supabase", "Tailwind"],
    live: "https://emc-store-gamma.vercel.app/",
    embed: true,
    source: "https://emc-store-gamma.vercel.app/",
  },
];

export const skills = [
  { name: "React & Frontend", note: "Component architecture, hooks, routing, state." },
  { name: "Figma to Code", note: "Pixel-accurate, responsive builds." },
  { name: "Responsive Design", note: "Websites that look right on every screen." },
  { name: "E-commerce Websites", note: "Online stores with product browsing and checkout." },
  { name: "AI-Assisted Development", note: "Shipping complete projects faster with modern AI tools." },
];
  
 