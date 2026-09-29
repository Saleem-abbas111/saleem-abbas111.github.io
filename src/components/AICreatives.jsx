import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "./brands.jsx";
import { SectionHead } from "./ui.jsx";

const Label = ({ children }) => (
  <p className="mb-2 font-display text-xs font-medium uppercase tracking-wider text-[#5b6470]">{children}</p>
);

export default function AICreatives({ ads, posts }) {
  const [openPost, setOpenPost] = useState(null);

  return (
    <section id="ai-creatives" className="border-b border-edge bg-sect2">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHead
          eyebrow="Generative design"
          title="AI Creatives"
          blurb="AI-generated ad campaigns and social posts, from concept storyboard to finished video."
        />

        {ads?.length > 0 && (
          <div className="mt-14">
            <h3 className="font-display text-lg font-medium text-[#22272b]">Ad campaigns</h3>
            <div className="mt-6 space-y-6">
              {ads.map((ad) => (
                <article key={ad.title} className="rounded-2xl border border-edge bg-card p-5 shadow-sm">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h4 className="font-display text-base font-medium text-[#22272b]">{ad.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {ad.tools?.map((t) => <Badge key={t} name={t} />)}
                    </div>
                  </div>
                  {ad.storyboard ? (
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <Label>Storyboard</Label>
                        <img src={ad.storyboard} alt={`${ad.title} storyboard`} className="aspect-video w-full rounded-xl border border-edge object-cover" />
                      </div>
                      <div>
                        <Label>Final ad</Label>
                        <video src={ad.video} controls preload="metadata" className="aspect-video w-full rounded-xl border border-edge bg-black" />
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto max-w-2xl">
                      <Label>Final ad</Label>
                      <video src={ad.video} controls preload="metadata" className="aspect-video w-full rounded-xl border border-edge bg-black" />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {posts?.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-lg font-medium text-[#22272b]">Social posts</h3>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {posts.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setOpenPost(i)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-edge bg-card text-left shadow-sm"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <p className="font-display text-sm font-medium text-[#22272b]">{p.title}</p>
                    {p.tools?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">{p.tools.map((t) => <Badge key={t} name={t} />)}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {openPost !== null && posts?.[openPost] && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 md:p-10" onClick={() => setOpenPost(null)}>
          <button
            onClick={() => setOpenPost(null)}
            aria-label="Close post"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <img src={posts[openPost].image} alt={posts[openPost].title} onClick={(e) => e.stopPropagation()} className="max-h-full max-w-full rounded-lg object-contain" />
          <p className="mt-3 font-display text-sm text-white/80">{posts[openPost].title}</p>
        </div>
      )}
    </section>
  );
}
