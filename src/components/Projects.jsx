import { Github } from "lucide-react";
import { Badge } from "./brands.jsx";

export default function Projects({ projects, folderUrl }) {
  return (
    <section id="projects" className="border-b border-edge bg-sect">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Featured Projects</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mt-6 text-center text-subtle">A selection of my recent data science and analytics work.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-card shadow-sm">
              {p.image && (
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-edge bg-white">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover object-top" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-subtle">{p.description}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => <Badge key={t} name={t} />)}
                  </div>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-line py-3 text-sm font-medium text-ink transition-colors hover:bg-mist"
                  >
                    <Github size={16} /> View Project on GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {folderUrl && (
          <p className="mt-10 text-center">
            <a
              href={folderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              See all projects on GitHub →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
