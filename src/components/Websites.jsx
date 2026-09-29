import { ExternalLink } from "lucide-react";
import { Badge } from "./brands.jsx";

const host = (u = "") => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Websites({ websites }) {
  return (
    <section id="websites" className="border-b border-edge bg-sect">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Websites</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          Websites designed and built end-to-end, from layout to launch.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {websites.map((w) => (
            <article key={w.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b border-edge bg-[#EEF0F2] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4573D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F2B84B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#5BB974]" />
                {w.liveUrl && (
                  <span className="ml-3 truncate rounded-full bg-white px-3 py-0.5 text-xs text-subtle">
                    {host(w.liveUrl)}
                  </span>
                )}
              </div>
              {w.image && (
                <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                  <img src={w.image} alt={w.title} className="h-full w-full object-cover object-top" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-7">
                <h3 className="font-display text-xl font-semibold text-ink">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-subtle">{w.description}</p>
                {w.tools?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tools.map((t) => <Badge key={t} name={t} />)}
                  </div>
                )}
                {w.liveUrl && (
                  <a
                    href={w.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-accent py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={16} /> Visit Website
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
