import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";

export default function Nav({ profile }) {
  const [open, setOpen] = useState(false);

  const links = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["AI Automation", "#ai-agents"],
    ["Projects", "#projects"],
    ["Dashboards", "#dashboards"],
    ["Websites", "#websites"],
    ["AI Creatives", "#ai-creatives"],
    ["Certifications", "#certifications"],
    ["Contact", "#contact"],
  ];

  /* Close the mobile menu with Escape, and if the window grows to desktop width. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia ? window.matchMedia("(min-width: 1024px)") : null;
    const onChange = (e) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq?.addEventListener?.("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq?.removeEventListener?.("change", onChange);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl font-bold text-ink">
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden gap-3 text-[13px] text-subtle lg:flex xl:gap-6 xl:text-sm">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="whitespace-nowrap transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-4 sm:py-2"
            >
              <Download size={16} /> <span className="hidden sm:inline">Resume</span>
            </a>
          )}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-mist lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-paper lg:hidden">
          <ul className="mx-auto max-w-6xl px-6 py-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-sm font-medium text-ink last:border-b-0 hover:text-accent"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
