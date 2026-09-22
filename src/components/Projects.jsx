export default function Projects({ projects }) {
  return (
    <section id="projects" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold text-ink">Featured Projects</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden rounded-lg border border-line"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-48 w-full object-cover object-top"
                  loading="lazy"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm text-subtle">{p.description}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-mist px-3 py-1 text-xs text-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-5 flex gap-4 text-sm font-medium">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      View Project on GitHub
                    </a>
                  )}
                  {p.certificateUrl && (
                    <a
                      href={p.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
