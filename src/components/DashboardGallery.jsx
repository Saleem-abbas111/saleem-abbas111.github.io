import { useState } from "react";

export default function DashboardGallery({ dashboards, githubUrl }) {
  const [active, setActive] = useState(null);

  return (
    <section id="dashboards" className="border-b border-line bg-mist/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">Dashboard Gallery</h2>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:underline"
            >
              See all dashboards on GitHub
            </a>
          )}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {dashboards.map((d) => (
            <div key={d.title} className="rounded-lg border border-line bg-paper">
              {d.image && (
                <button
                  type="button"
                  onClick={() => setActive(d)}
                  className="block w-full"
                  aria-label={`Open ${d.title} fullscreen`}
                >
                  <img
                    src={d.image}
                    alt={d.title}
                    className="h-56 w-full object-cover object-top transition-opacity hover:opacity-90"
                    loading="lazy"
                  />
                </button>
              )}
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm text-subtle">{d.description}</p>
                {d.liveUrl && (
                  <a
                    href={d.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                  >
                    View Live Dashboard
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close fullscreen dashboard"
            onClick={() => setActive(null)}
            className="absolute right-6 top-6 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20"
          >
            Close
          </button>
          <img
            src={active.image}
            alt={active.title}
            className="max-h-full max-w-full rounded-md object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
