export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="border-b border-line bg-mist/40">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl font-semibold text-ink">Certifications</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {certifications.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between rounded-lg border border-line bg-paper px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-ink">{c.name}</p>
                {c.issuer && <p className="text-xs text-subtle">{c.issuer}</p>}
              </div>
              {c.certificateUrl && (
                <a
                  href={c.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent hover:underline"
                >
                  View Certificate
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
