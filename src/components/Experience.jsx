export default function Experience({ experience }) {
  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold text-ink">Experience</h2>
        <div className="mt-8 space-y-6">
          {experience.map((e, i) => (
            <div key={i} className="border-l-2 border-line pl-6">
              <p className="text-sm font-medium text-ink">{e.role}</p>
              <p className="text-sm text-subtle">
                {[e.organization, e.period].filter(Boolean).join(" · ")}
              </p>
              {e.description && (
                <p className="mt-2 max-w-prose text-sm text-subtle">{e.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
