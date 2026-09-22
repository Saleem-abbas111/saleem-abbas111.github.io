export default function Nav({ name }) {
  const links = [
    ["Projects", "#projects"],
    ["Dashboards", "#dashboards"],
    ["Skills", "#skills"],
    ["Certifications", "#certifications"],
    ["Experience", "#experience"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-lg font-semibold text-ink">
          {name}
        </a>
        <nav className="hidden gap-8 text-sm text-subtle md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-ink">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
