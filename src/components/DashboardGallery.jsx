import { useState } from "react";
import { Maximize2, X, Download } from "lucide-react";

export default function DashboardGallery({ dashboards, folderUrl }) {
  const [openIndex, setOpenIndex] = useState(null);
  const open = openIndex !== null ? dashboards[openIndex] : null;

  return (
    <section id="dashboards" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Dashboard Gallery</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          Interactive visual reports designed to provide immediate, actionable business insights.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {dashboards.map((d, i) => (
            <div key={d.title} className="overflow-hidden rounded-2xl bg-ink shadow-lg">
              {d.image && <img src={d.image} alt={d.title} className="h-48 w-full object-cover" />}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{d.description}</p>
                {d.embedUrl && (
                  <button
                    onClick={() => setOpenIndex(i)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <Maximize2 size={14} /> View Live Dashboard
                  </button>
                )}
                {d.liveUrl && (
                  <a
                    href={d.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 py-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
                  >
                    <Download size={12} /> Download workbook
                  </a>
                )}
              </div>
            </div>
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
              See all dashboards on GitHub →
            </a>
          </p>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 md:p-8">
          <div className="mb-3 flex items-center justify-between text-white">
            <p className="font-medium">{open.title}</p>
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Close fullscreen dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden rounded-xl bg-white">
            <iframe
              src={open.embedUrl}
              title={open.title}
              className="h-full w-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
