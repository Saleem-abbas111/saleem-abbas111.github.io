export default function Hero({ profile }) {
  return (
    <section id="top" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p className="mb-4 text-sm font-medium text-accent">{profile.tagline}</p>
        <h1 className="font-display max-w-2xl text-4xl font-semibold leading-tight text-ink md:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-2 text-xl text-subtle">{profile.title}</p>
        <p className="mt-6 max-w-prose text-base text-subtle">{profile.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              See all projects on GitHub
            </a>
          )}
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              View Resume
            </a>
          )}
        </div>
        <p className="mt-10 text-xs text-subtle">{profile.builtWith}</p>
      </div>
    </section>
  );
}
