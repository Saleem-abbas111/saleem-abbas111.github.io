import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

/* ---------- helpers ---------- */

/* A video "url" can be a YouTube / Vimeo link or a direct video file (local path or full URL). */
function parseVideo(url) {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) {
    return {
      kind: "embed",
      embed: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`,
      poster: `https://i.ytimg.com/vi/${yt[1]}/hqdefault.jpg`,
    };
  }
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { kind: "embed", embed: `https://player.vimeo.com/video/${vm[1]}`, poster: "" };
  return { kind: "file", src: url, poster: "" };
}

/* Turns a project's images[] and videos[] into one ordered list the gallery can walk through. */
export function buildMedia({ images = [], videos = [] } = {}) {
  const imgs = images
    .filter((i) => i && i.src)
    .map((i) => ({
      type: "image",
      src: i.src,
      alt: i.alt || i.caption || "Project screenshot",
      caption: i.caption || "",
    }));
  const vids = videos
    .filter((v) => v && v.url)
    .map((v) => {
      const info = parseVideo(v.url);
      return {
        type: "video",
        ...info,
        poster: v.poster || info.poster,
        title: v.title || "Video demonstration",
        caption: v.title || "",
      };
    });
  return [...imgs, ...vids];
}

/* ---------- thumbnail ---------- */

export function MediaThumb({ item, onClick, className = "" }) {
  const isVideo = item.type === "video";
  const label = isVideo ? `Play video: ${item.title}` : `Open image: ${item.alt}`;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group relative aspect-[16/10] overflow-hidden rounded-lg border border-edge bg-white transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      {!isVideo && (
        <img
          src={item.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      )}

      {isVideo && (
        <>
          {item.poster ? (
            <img src={item.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
          ) : item.kind === "file" ? (
            <video
              src={`${item.src}#t=0.5`}
              preload="metadata"
              muted
              playsInline
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none h-full w-full bg-black object-cover"
            />
          ) : (
            <div className="h-full w-full bg-[#22272b]" />
          )}
          <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ink shadow">
              <Play size={16} className="ml-0.5" fill="currentColor" />
            </span>
          </span>
          <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
            Video
          </span>
        </>
      )}
    </button>
  );
}

/* ---------- lightbox / video modal ---------- */

export function MediaViewer({ media, index, title, onIndex, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const item = media[index];
  const many = media.length > 1;

  const go = (step) => onIndex((index + step + media.length) % media.length);

  /* Lock page scroll, focus the dialog, and give focus back to the opener on close. */
  useEffect(() => {
    const opener = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight" && many) go(1);
      else if (e.key === "ArrowLeft" && many) go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll("button:not([disabled]), video[controls], iframe");
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  if (!item) return null;

  const navBtn =
    "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:h-11 md:w-11";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — media gallery`}
      className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4 md:p-8"
      onClick={onClose}
    >
      <div className="mb-3 flex items-center justify-between gap-4 text-white" onClick={(e) => e.stopPropagation()}>
        <p className="truncate text-sm font-medium">{title}</p>
        <div className="flex items-center gap-3">
          {many && (
            <span className="text-xs text-white/70" aria-live="polite">
              {index + 1} / {media.length}
            </span>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null || !many) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
      >
        {many && (
          <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${navBtn} left-0`}>
            <ChevronLeft size={22} />
          </button>
        )}

        <div className="flex h-full w-full items-center justify-center px-12 md:px-16" onClick={(e) => e.stopPropagation()}>
          {item.type === "image" && (
            <img src={item.src} alt={item.alt} className="max-h-full max-w-full rounded-lg bg-white object-contain" />
          )}

          {item.type === "video" && item.kind === "file" && (
            <video
              key={index}
              src={item.src}
              poster={item.poster || undefined}
              controls
              playsInline
              preload="metadata"
              aria-label={item.title}
              className="max-h-full max-w-full rounded-lg bg-black"
            />
          )}

          {item.type === "video" && item.kind === "embed" && (
            <iframe
              key={index}
              src={item.embed}
              title={item.title}
              allow="fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              className="aspect-video w-full max-w-5xl rounded-lg border-0 bg-black"
              style={{ maxHeight: "100%" }}
            />
          )}
        </div>

        {many && (
          <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1); }} className={`${navBtn} right-0`}>
            <ChevronRight size={22} />
          </button>
        )}
      </div>

      {item.caption && (
        <p className="mt-3 text-center text-sm text-white/80" onClick={(e) => e.stopPropagation()}>
          {item.caption}
        </p>
      )}
    </div>
  );
}
