import {
  Code2, Database, Table2, BarChart3, LayoutDashboard,
  Search, Sigma, PieChart, FlaskConical, Wrench,
  Lightbulb, MessagesSquare, Brain,
} from "lucide-react";

const TECH_ICONS = { python: Code2, sql: Database, excel: Table2, "power bi": BarChart3, tableau: LayoutDashboard };
const ANALYTICS_ICONS = {
  "data cleaning": Wrench,
  "exploratory data analysis": Search,
  "statistical analysis": Sigma,
  "data visualization": PieChart,
  "database management": Database,
  "a/b testing": FlaskConical,
};
const SOFT_ICONS = {
  "problem solving": Lightbulb,
  "effective communication": MessagesSquare,
  "analytical thinking": Brain,
};

function SkillCard({ title, icon: TitleIcon, items, iconMap }) {
  return (
    <div className="rounded-2xl bg-mist p-6">
      <div className="mb-5 flex items-center gap-3">
        <TitleIcon size={20} className="text-accent" />
        <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((label) => {
          const Icon = iconMap[label.toLowerCase()] || Wrench;
          return (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg bg-paper px-4 py-3 text-sm font-medium text-ink shadow-sm"
            >
              <Icon size={16} className="text-accent" />
              {label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-center text-3xl font-bold text-ink md:text-4xl">My Skills</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded bg-accent" />
        <p className="mx-auto mt-6 max-w-2xl text-center text-subtle">
          A diverse toolkit to analyze data, build solutions, and communicate insights effectively.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <SkillCard title="Technical Tools" icon={Database} items={skills.technical || []} iconMap={TECH_ICONS} />
          <SkillCard title="Analytics Skills" icon={PieChart} items={skills.analytics || []} iconMap={ANALYTICS_ICONS} />
          <SkillCard title="Soft Skills" icon={Brain} items={skills.soft || []} iconMap={SOFT_ICONS} />
        </div>
      </div>
    </section>
  );
}
