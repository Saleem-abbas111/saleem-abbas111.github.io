import {
  SiPython, SiFigma, SiGoogle, SiDatacamp, SiCoursera, SiSqlite, SiR, SiPandas,
  SiScipy, SiGooglesheets, SiReact, SiTailwindcss, SiCloudflare, SiGoogleanalytics,
  SiMysql, SiWordpress, SiGooglegemini, SiNumpy, SiJupyter, SiVite, SiHtml5,
} from "react-icons/si";
import { Database, Sparkles } from "lucide-react";

/* Hand-drawn simple marks for brands the icon library does not ship. */
const Canva = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="12" fill="#00C4CC" />
    <path d="M15.6 15.1c-.9 1.5-2.2 2.3-3.7 2.3-2.4 0-4.1-2-4.1-4.8 0-3 1.9-5.5 4.5-5.5 1.1 0 1.9.5 1.9 1.3 0 .6-.4 1-.9 1-.4 0-.6-.2-.6-.5 0-.3.1-.4.1-.6 0-.2-.2-.3-.5-.3-1.6 0-2.9 1.9-2.9 4 0 1.8 1 3 2.4 3 1 0 1.8-.6 2.4-1.7.1-.2.3-.3.5-.2.2.1.2.3.9.5Z" fill="#fff" />
  </svg>
);
const Tableau = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <g fill="#E97627"><rect x="11" y="2" width="2" height="7" /><rect x="11" y="15" width="2" height="7" /></g>
    <g fill="#1F447E"><rect x="5" y="5" width="2" height="5" /><rect x="5" y="14" width="2" height="5" /><rect x="17" y="5" width="2" height="5" /><rect x="17" y="14" width="2" height="5" /></g>
    <g fill="#5B879B"><rect x="2" y="11" width="6" height="2" /><rect x="16" y="11" width="6" height="2" /></g>
    <g fill="#C8252D"><rect x="8" y="8" width="2" height="8" opacity=".0" /></g>
  </svg>
);
const PowerBI = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="15" y="2" width="6" height="20" rx="2" fill="#F2C811" />
    <rect x="9" y="7" width="6" height="15" rx="2" fill="#E8A800" />
    <rect x="3" y="12" width="6" height="10" rx="2" fill="#C88A00" />
  </svg>
);
const Excel = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <rect x="1" y="3" width="22" height="18" rx="3" fill="#217346" />
    <path d="M7 8l4 8m0-8l-4 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 9h6M14 12h6M14 15h6" stroke="#fff" strokeWidth="1.2" opacity=".7" />
  </svg>
);
const SqlServer = (p) => (
  <svg viewBox="0 0 24 24" {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" fill="#CC2927" />
    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5c0 1.7-3.6 3-8 3S4 6.7 4 5Z" fill="#E15B59" />
    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6c0 1.7-3.6 3-8 3s-8-1.3-8-3Z" fill="#CC2927" />
  </svg>
);
const Gen = (p) => <Sparkles {...p} color="#7C3AED" />;
const Db = (p) => <Database {...p} color="#336791" />;

/* key (lowercase) -> [label, Icon, brand colour] */
export const BRANDS = {
  canva: ["Canva", Canva, "#00C4CC"],
  figma: ["Figma", SiFigma, "#F24E1E"],
  google: ["Google", SiGoogle, "#4285F4"],
  "google analytics": ["Google Analytics", SiGoogleanalytics, "#E37400"],
  "google sheets": ["Google Sheets", SiGooglesheets, "#34A853"],
  gemini: ["Gemini", SiGooglegemini, "#8E75B2"],
  datacamp: ["DataCamp", SiDatacamp, "#03A662"],
  coursera: ["Coursera", SiCoursera, "#0056D2"],
  python: ["Python", SiPython, "#3776AB"],
  r: ["R", SiR, "#276DC3"],
  pandas: ["Pandas", SiPandas, "#150458"],
  numpy: ["NumPy", SiNumpy, "#4DABCF"],
  scipy: ["SciPy", SiScipy, "#8CAAE6"],
  jupyter: ["Jupyter", SiJupyter, "#F37626"],
  sql: ["SQL", Db, "#336791"],
  mysql: ["MySQL", SiMysql, "#4479A1"],
  sqlite: ["SQLite", SiSqlite, "#003B57"],
  "sql server": ["SQL Server", SqlServer, "#CC2927"],
  excel: ["Excel", Excel, "#217346"],
  "power bi": ["Power BI", PowerBI, "#C88A00"],
  tableau: ["Tableau", Tableau, "#1F447E"],
  react: ["React", SiReact, "#149ECA"],
  tailwind: ["Tailwind CSS", SiTailwindcss, "#06B6D4"],
  vite: ["Vite", SiVite, "#646CFF"],
  html: ["HTML", SiHtml5, "#E34F26"],
  cloudflare: ["Cloudflare", SiCloudflare, "#F38020"],
  wordpress: ["WordPress", SiWordpress, "#21759B"],
  "ai video": ["AI Video", Gen, "#7C3AED"],
};

/* Match free-text tags such as "Excel (EDA)" or "SQL (SQLite)" to a brand. */
export function findBrand(text = "") {
  const t = text.toLowerCase().trim();
  if (BRANDS[t]) return BRANDS[t];
  const keys = Object.keys(BRANDS).sort((a, b) => b.length - a.length);
  const hit = keys.find((k) => (k.length <= 2 ? t === k : t.includes(k)));
  return hit ? BRANDS[hit] : null;
}

export function BrandIcon({ name, size = 18, className = "" }) {
  const b = findBrand(name);
  if (!b) return null;
  const [, Icon, color] = b;
  return <Icon size={size} width={size} height={size} color={color} className={className} aria-hidden="true" />;
}

/* Pill: brand icon + label on a soft tint of the brand colour. */
export function Badge({ name }) {
  const b = findBrand(name);
  const [label, Icon, color] = b || [name, null, "#5b6470"];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium text-[#22272b]"
      style={{ backgroundColor: `${color}14`, borderColor: `${color}40` }}
    >
      {Icon && <Icon size={13} width={13} height={13} color={color} aria-hidden="true" />}
      {b ? label : name}
    </span>
  );
}
