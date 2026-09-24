import { ExternalLink } from "lucide-react";

export default function Websites({ websites }) {
  return (
    <section id="websites" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Websites</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          Websites designed and built end-to-end, from layout to launch.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {websites.map((w) => (
            <div key={w.title} className="overflow-hidden rounded-2xl bg-ink shadow-lg">
              {w.image && (
                <div className="border-b border-white/10 bg-black/20 p-3">
                  <img src={w.image} alt={w.title} className="w-full rounded-lg object-cover object-top" />
                </div>
              )}
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold text-white">{w.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{w.description}</p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
