import { Maximize2 } from "lucide-react";

export default function DashboardGallery({ dashboards, githubUrl }) {
  return (
    <section id="dashboards" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Dashboard Gallery</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          Interactive visual reports designed to provide immediate, actionable business insights.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {dashboards.map((d) => (
            <div key={d.title} className="overflow-hidden rounded-2xl bg-ink shadow-lg">
              {d.image && <img src={d.image} alt={d.title} className="h-48 w-full object-cover" />}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{d.description}</p>
                {d.liveUrl && (
                  <a
                    href={d.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <Maximize2 size={14} /> View Live Dashboard
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
              See all dashboards on GitHub →
            </a>
          </p>
        )}
      </div>
    </section>
  );
}
