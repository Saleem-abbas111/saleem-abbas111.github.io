import { Github } from "lucide-react";
import { Badge } from "./brands.jsx";
import { Cta, SectionHead } from "./ui.jsx";

export default function Projects({ projects, folderUrl }) {
  return (
    <section id="projects" className="border-b border-edge bg-sect">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          eyebrow="Selected work"
          title="Featured Projects"
          blurb="A selection of my recent data science and analytics work."
          action={folderUrl && <Cta href={folderUrl}>See all projects on GitHub</Cta>}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-card shadow-sm">
              {p.image && (
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-edge bg-white">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover object-top" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-medium text-[#22272b]">{p.title}</h3>
                <p className="mt-3 line-clamp-4 font-display text-sm leading-relaxed text-[#4b535a]">{p.description}</p>
                {p.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => <Badge key={t} name={t} />)}
                  </div>
                )}
                {p.githubUrl && (
                  <div className="mt-auto border-t border-edge pt-5">
                    <div className="mt-1"><Cta href={p.githubUrl} icon={Github}>View project on GitHub</Cta></div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
