import { Badge } from "./brands.jsx";
import { Cta, SectionHead } from "./ui.jsx";

const host = (u = "") => u.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function Websites({ websites }) {
  return (
    <section id="websites" className="border-b border-edge bg-sect">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          eyebrow="Web design & development"
          title="Websites"
          blurb="Websites designed and built end to end, from layout to launch."
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {websites.map((w) => (
            <article key={w.title} className="flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b border-edge bg-[#EEF0F2] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E4573D]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#F2B84B]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#5BB974]" />
                {w.liveUrl && (
                  <span className="ml-3 truncate rounded-full bg-white px-3 py-0.5 font-display text-xs text-[#5b6470]">
                    {host(w.liveUrl)}
                  </span>
                )}
              </div>
              {w.image && (
                <div className="aspect-[16/10] w-full overflow-hidden bg-white">
                  <img src={w.image} alt={w.title} className="h-full w-full object-cover object-top" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-medium text-[#22272b]">{w.title}</h3>
                <p className="mt-3 line-clamp-3 font-display text-sm leading-relaxed text-[#4b535a]">{w.description}</p>
                {w.tools?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {w.tools.map((t) => <Badge key={t} name={t} />)}
                  </div>
                )}
                {w.liveUrl && (
                  <div className="mt-auto border-t border-edge pt-5">
                    <div className="mt-1"><Cta href={w.liveUrl}>Visit website</Cta></div>
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
