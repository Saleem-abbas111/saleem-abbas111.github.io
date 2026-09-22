import { Mail, MessageCircle, Linkedin, Github } from "lucide-react";

export default function Footer({ profile }) {
  const contacts = [
    profile.email && { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
    profile.whatsappUrl && { label: "WhatsApp", href: profile.whatsappUrl, icon: MessageCircle },
    profile.linkedinUrl && { label: "LinkedIn", href: profile.linkedinUrl, icon: Linkedin },
    profile.githubUrl && { label: "GitHub", href: profile.githubUrl, icon: Github },
  ].filter(Boolean);

  const quickLinks = [
    ["About", "#about"],
    ["Skills", "#skills"],
    ["Certifications", "#certifications"],
    ["Projects", "#projects"],
    ["Dashboards", "#dashboards"],
    ["Contact", "#contact"],
  ];

  return (
    <>
      <section id="contact" className="border-b border-line">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">{profile.contactHeading}</h2>
          {profile.contactSubtitle && <p className="mt-4 text-subtle">{profile.contactSubtitle}</p>}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {contacts.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="font-display text-lg font-bold">
                {profile.name}
                <span className="text-accent">.</span>
              </p>
              {profile.footerTagline && (
                <p className="mt-3 max-w-xs text-sm text-white/60">{profile.footerTagline}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Quick Links</p>
              <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/60">
                {quickLinks.map(([label, href]) => (
                  <a key={href} href={href} className="transition-colors hover:text-white">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Connect</p>
              <div className="mt-4 flex gap-3">
                {contacts.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-accent"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            {profile.builtWith && <p>{profile.builtWith}</p>}
          </div>
        </div>
      </footer>
    </>
  );
}
