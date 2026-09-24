import { useState } from "react";
import { X, Film, Images } from "lucide-react";

export default function AICreatives({ ads, posts }) {
  const [openPost, setOpenPost] = useState(null);

  return (
    <section id="ai-creatives" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">AI Creatives</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          AI-generated ad campaigns and social posts, from concept storyboard to finished video.
        </p>

        {ads?.length > 0 && (
          <div className="mt-14">
            <div className="mb-6 flex items-center gap-2">
              <Film size={18} className="text-accent" />
              <h3 className="font-display text-lg font-semibold text-ink">Ads</h3>
            </div>
            <div className="space-y-6">
              {ads.map((ad) => (
                <div key={ad.title} className="overflow-hidden rounded-2xl border border-line bg-mist p-4">
                  <p className="mb-3 px-1 text-sm font-medium text-ink">{ad.title}</p>
                  {ad.storyboard ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <img
                        src={ad.storyboard}
                        alt={`${ad.title} storyboard`}
                        className="w-full rounded-xl border border-line object-cover"
                      />
                      <video
                        src={ad.video}
                        controls
                        preload="metadata"
                        className="aspect-video w-full rounded-xl border border-line bg-black"
                      />
                    </div>
                  ) : (
                    <video
                      src={ad.video}
                      controls
                      preload="metadata"
                      className="aspect-video w-full max-w-2xl rounded-xl border border-line bg-black md:mx-auto md:block"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {posts?.length > 0 && (
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-2">
              <Images size={18} className="text-accent" />
              <h3 className="font-display text-lg font-semibold text-ink">Posts</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {posts.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setOpenPost(i)}
                  className="group overflow-hidden rounded-xl border border-line"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {openPost !== null && posts?.[openPost] && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={() => setOpenPost(null)}
        >
          <button
            onClick={() => setOpenPost(null)}
            aria-label="Close post"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={18} />
          </button>
          <img
            src={posts[openPost].image}
            alt={posts[openPost].title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
          <p className="mt-3 text-sm text-white/80">{posts[openPost].title}</p>
        </div>
      )}
    </section>
  );
}
