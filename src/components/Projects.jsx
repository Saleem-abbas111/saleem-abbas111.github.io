import { Github } from "lucide-react";

export default function Projects({ projects, githubUrl }) {
  return (
    <section id="projects" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Featured Projects</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mt-6 text-center text-subtle">A selection of my recent data science and analytics work.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <div key={p.title} className="overflow-hidden rounded-2xl bg-ink shadow-lg">
              {p.image && <img src={p.image} alt={p.title} className="h-64 w-full object-cover" />}
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{p.description}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-white/20 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    <Github size={16} /> View Project on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {githubUrl && (
          <p className="mt-10 text-center">
            <a
              href={githubUrl}
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
