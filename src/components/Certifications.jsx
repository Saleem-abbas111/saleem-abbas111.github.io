export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="border-b border-line bg-mist">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">Certifications</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <div key={c.name} className="rounded-2xl border border-line bg-paper p-6 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-lg font-bold text-accent">
                {(c.issuer || c.name).charAt(0).toUpperCase()}
              </div>
              <h3 className="text-sm font-semibold text-ink">{c.name}</h3>
              {c.issuer && <p className="mt-1 text-xs text-subtle">{c.issuer}</p>}
              {c.issuedDate && (
                <span className="mt-3 inline-block rounded-full bg-mist px-3 py-1 text-xs text-subtle">
                  {c.issuedDate}
                </span>
              )}
              {c.certificateUrl && (
                <a
                  href={c.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-xs font-medium text-accent hover:underline"
                >
                  View Certificate ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
