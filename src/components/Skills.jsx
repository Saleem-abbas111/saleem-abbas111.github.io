export default function Skills({ skills }) {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold text-ink">Analytics Skills</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-line px-4 py-2 text-sm text-ink"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
