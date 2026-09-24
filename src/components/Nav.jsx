import { Download } from "lucide-react";

export default function Nav({ profile }) {
  const links = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Projects", "#projects"],
    ["Dashboards", "#dashboards"],
    ["Websites", "#websites"],
    ["AI Creatives", "#ai-creatives"],
    ["Certifications", "#certifications"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl font-bold text-ink">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden gap-6 text-sm text-subtle lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        {profile.resumeUrl && (
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Download size={16} /> Resume
          </a>
        )}
      </div>
    </header>
  );
}
