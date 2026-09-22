import { ArrowRight, Github, Linkedin, CheckCircle2 } from "lucide-react";

export default function Hero({ profile }) {
  return (
    <section id="top" className="bg-grid relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <span className="mb-4 inline-block rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-accent">
            {profile.tagline}
          </span>
          <h1 className="font-display mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl">
            Hi, I'm <span className="text-accent">{profile.name}</span>
          </h1>
          <p className="mt-3 text-xl text-subtle">{profile.title}</p>
          <p className="mt-6 max-w-prose text-base text-subtle">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              View Projects <ArrowRight size={16} />
            </a>
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={18} />
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="relative mx-auto flex justify-center">
          {profile.photoUrl && (
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-8 border-paper shadow-xl md:h-96 md:w-96">
              <img src={profile.photoUrl} alt={profile.name} className="h-full w-full object-cover" />
            </div>
          )}
          {profile.projectsCount && (
            <div className="absolute -bottom-4 right-0 rounded-xl border border-line bg-paper px-5 py-3 shadow-lg md:right-6">
              <p className="text-xs font-medium uppercase tracking-wide text-subtle">Projects</p>
              <p className="flex items-center gap-1 text-2xl font-bold text-ink">
                {profile.projectsCount} <CheckCircle2 size={18} className="text-accent" />
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
