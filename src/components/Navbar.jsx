import { profile } from "../data/content";

const links = [["Projects", "#projects"], ["About", "#about"], ["Contact", "#contact"]];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[92%] max-w-5xl items-center justify-between rounded-full border border-line bg-ivory/70 px-5 py-3 backdrop-blur-md">
      <a href="#top" className="text-sm font-bold">{profile.name}</a>
      <nav className="flex gap-5 text-sm text-mute">
        {links.map(([l, h]) => <a key={h} href={h} className="hover:text-ink">{l}</a>)}
      </nav>
    </header>
  );
}
