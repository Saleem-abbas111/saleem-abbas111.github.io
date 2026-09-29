import { ArrowUpRight } from "lucide-react";

/* Coral underlined text CTA, same treatment as the reference ("Download CV"). */
export function Cta({ href, onClick, children, icon: Icon = ArrowUpRight, muted = false }) {
  const cls = `inline-flex items-center gap-2 border-b pb-0.5 font-display text-sm font-medium transition-all hover:gap-3 ${
    muted ? "border-[#8a929a] text-[#5b6470] hover:text-[#22272b]" : "border-coral text-coral"
  }`;
  const inner = (<>{children}<Icon size={15} /></>);
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>{inner}</button>
  );
}

/* Left-aligned section header: coral eyebrow, dark title, grey blurb, optional CTA on the right. */
export function SectionHead({ eyebrow, title, blurb, action }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl">
        <p className="font-display text-sm font-medium text-coral">{eyebrow}</p>
        <h2 className="mt-2 font-display text-3xl font-medium leading-tight text-[#22272b] md:text-4xl">{title}</h2>
        {blurb && <p className="mt-4 font-display text-[15px] leading-relaxed text-[#4b535a]">{blurb}</p>}
      </div>
      {action}
    </div>
  );
}
