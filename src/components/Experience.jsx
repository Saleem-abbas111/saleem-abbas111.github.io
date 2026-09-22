import { GraduationCap, Briefcase, Code2, Database, Table2, BarChart3, LayoutDashboard } from "lucide-react";

const TIMELINE_ICON = { education: GraduationCap, work: Briefcase };

const TOOL_ICONS = {
  python: Code2,
  sql: Database,
  excel: Table2,
  "power bi": BarChart3,
  tableau: LayoutDashboard,
};

export default function Experience({ profile, experience }) {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">About Me</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />

        <p className="mt-8 text-center text-subtle">{profile.aboutText1}</p>
        <p className="mt-4 text-center text-subtle">{profile.aboutText2}</p>

        {profile.coreTools?.length > 0 && (
          <div className="mt-12 border-t border-line pt-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-subtle">Core Tools</p>
            <div className="mt-5 flex flex-wrap justify-center gap-4">
              {profile.coreTools.map((tool) => {
                const Icon = TOOL_ICONS[tool.toLowerCase()] || Code2;
                return (
                  <div
                    key={tool}
                    className="flex w-24 flex-col items-center gap-2 rounded-xl border border-line px-3 py-4"
                  >
                    <Icon size={20} className="text-accent" />
                    <span className="text-xs font-medium text-ink">{tool}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="bg-mist py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">My Journey</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />

          <div className="mt-14 space-y-10 border-l-2 border-line pl-8">
            {experience.map((item, i) => {
              const Icon = TIMELINE_ICON[item.type] || Briefcase;
              return (
                <div key={i} className="relative rounded-xl border border-line bg-paper p-6 shadow-sm">
                  <span className="absolute -left-[41px] top-6 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-paper">
                    <Icon size={12} className="text-accent" />
                  </span>
                  {item.period && <p className="text-sm font-medium text-accent">{item.period}</p>}
                  <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
                  {item.organization && <p className="text-sm text-subtle">{item.organization}</p>}
                  {item.courses && (
                    <p className="mt-3 text-sm text-subtle">
                      <span className="font-medium text-ink">Relevant Courses: </span>
                      {item.courses}
                    </p>
                  )}
                  {item.bullets?.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-subtle">
                      {item.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
