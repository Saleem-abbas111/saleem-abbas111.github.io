import { useState } from "react";
import { Maximize2, X, Download } from "lucide-react";
import { Badge } from "./brands.jsx";
import { Cta, SectionHead } from "./ui.jsx";

export default function DashboardGallery({ dashboards, folderUrl }) {
  const [openIndex, setOpenIndex] = useState(null);
  const open = openIndex !== null ? dashboards[openIndex] : null;

  return (
    <section id="dashboards" className="border-b border-edge bg-sect2">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          eyebrow="Interactive reports"
          title="Dashboard Gallery"
          blurb="Live Tableau and Power BI reports designed to give immediate, actionable business insights."
          action={folderUrl && <Cta href={folderUrl}>See all dashboards on GitHub</Cta>}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {dashboards.map((d, i) => (
            <article key={d.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-card shadow-sm">
              {d.image && (
                <div className="aspect-[16/10] w-full overflow-hidden border-b border-edge bg-black">
                  <img src={d.image} alt={d.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-medium text-[#22272b]">{d.title}</h3>
                  {d.tool && <Badge name={d.tool} />}
                </div>
                <p className="mt-3 line-clamp-3 font-display text-sm leading-relaxed text-[#4b535a]">{d.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-edge pt-5">
                  {d.embedUrl && <Cta onClick={() => setOpenIndex(i)} icon={Maximize2}>View live dashboard</Cta>}
                  {d.liveUrl && <Cta href={d.liveUrl} icon={Download} muted>Download file</Cta>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 md:p-8">
          <div className="mb-3 flex items-center justify-between text-white">
            <p className="font-display font-medium">{open.title}</p>
            <button
              onClick={() => setOpenIndex(null)}
              aria-label="Close fullscreen dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden rounded-xl bg-white">
            <iframe src={open.embedUrl} title={open.title} className="h-full w-full border-0" allowFullScreen />
          </div>
        </div>
      )}
    </section>
  );
}
