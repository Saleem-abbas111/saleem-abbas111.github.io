import { useMemo, useState } from "react";
import { ExternalLink, Github, Images, Star, ArrowRight } from "lucide-react";
import { Badge } from "./brands.jsx";
import { MediaThumb, MediaViewer, buildMedia } from "./MediaViewer.jsx";

const host = (u = "") => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* Large preview: first screenshot (or `cover`) inside a browser-style frame.
   With no screenshots yet it shows the project's technology pipeline instead. */
function Preview({ project, media, onOpen }) {
  const cover = project.cover || media.find((m) => m.type === "image")?.src;
  const videoPoster = !cover ? media.find((m) => m.type === "video" && m.poster)?.poster : "";
  const image = cover || videoPoster;

  return (
    <div className="overflow-hidden rounded-xl border border-edge bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-edge bg-[#EEF0F2] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E4573D]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#F2B84B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5BB974]" />
        {project.liveDemo && (
          <span className="ml-3 truncate rounded-full bg-white px-3 py-0.5 text-xs text-subtle">
            {host(project.liveDemo)}
          </span>
        )}
      </div>

      {image ? (
        <button
          type="button"
          onClick={() => media.length && onOpen(0)}
          disabled={!media.length}
          aria-label={media.length ? `Open ${project.title} media gallery` : undefined}
          className="block aspect-[16/10] w-full bg-white disabled:cursor-default"
        >
          <img src={image} alt={`${project.title} preview`} loading="lazy" decoding="async" className="h-full w-full object-contain" />
        </button>
      ) : (
        <div className="bg-grid flex aspect-[16/10] w-full flex-col items-center justify-center gap-5 bg-white p-6">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
            {project.technologies?.map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                <Badge name={t} />
                {i < project.technologies.length - 1 && <ArrowRight size={14} className="text-subtle" aria-hidden="true" />}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Actions({ project, mediaCount, onExplore, pin = false }) {
  return (
    <div className={`${pin ? "mt-auto pt-6" : "mt-6"} flex flex-wrap gap-3`}>
      {project.liveDemo && (
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-edge bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-mist"
        >
          <Github size={16} /> GitHub
        </a>
      )}
      {mediaCount > 0 && (
        <button
          type="button"
          onClick={onExplore}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-white/70"
        >
          <Images size={16} /> Screenshots &amp; videos ({mediaCount})
        </button>
      )}
    </div>
  );
}

function ProjectCard({ project, featured, onOpen }) {
  const media = useMemo(() => buildMedia(project), [project]);
  const open = (i) => onOpen(project.title, media, i);

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-edge bg-card shadow-sm ${
        featured ? "grid gap-8 p-5 md:p-8 lg:grid-cols-5 lg:gap-10" : "flex h-full flex-col gap-6 p-5 md:p-6"
      }`}
    >
      <div className={featured ? "min-w-0 lg:col-span-3" : "min-w-0"}>
        <Preview project={project} media={media} onOpen={open} />

        {media.length > 0 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2" role="list" aria-label={`${project.title} screenshots and videos`}>
            {media.map((m, i) => (
              <div role="listitem" key={`${m.type}-${i}`} className="w-32 shrink-0 sm:w-36">
                <MediaThumb item={m} onClick={() => open(i)} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`flex min-w-0 flex-col ${featured ? "justify-center lg:col-span-2" : "flex-1"}`}>
        {featured && (
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Star size={13} fill="currentColor" aria-hidden="true" /> Featured Project
          </span>
        )}
        {project.category && (
          <p className="text-xs font-semibold uppercase tracking-wide text-subtle">{project.category}</p>
        )}
        <h3 className={`mt-2 font-display font-semibold text-ink ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-subtle">{project.description}</p>

        {project.technologies?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge key={t} name={t} />
            ))}
          </div>
        )}

        <Actions project={project} mediaCount={media.length} onExplore={() => open(0)} pin={!featured} />
      </div>
    </article>
  );
}

export default function AIProjects({ projects = [] }) {
  const [viewer, setViewer] = useState(null); // { title, media, index }

  const flagged = projects.filter((p) => p.featured);
  const featured = flagged.length ? flagged : projects.slice(0, 1);
  const others = projects.filter((p) => !featured.includes(p));

  const onOpen = (title, media, index) => setViewer({ title, media, index });

  return (
    <section id="ai-agents" className="border-b border-edge bg-sect2">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">AI, Agents &amp; Automation</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          AI-powered applications, intelligent agents, and automated workflows, built end to end.
        </p>

        <div className="mt-12 space-y-8">
          {featured.map((p) => (
            <ProjectCard key={p.title} project={p} featured onOpen={onOpen} />
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {others.map((p) => (
              <ProjectCard key={p.title} project={p} onOpen={onOpen} />
            ))}
          </div>
        )}
      </div>

      {viewer && (
        <MediaViewer
          media={viewer.media}
          index={viewer.index}
          title={viewer.title}
          onIndex={(index) => setViewer((v) => ({ ...v, index }))}
          onClose={() => setViewer(null)}
        />
      )}
    </section>
  );
}
