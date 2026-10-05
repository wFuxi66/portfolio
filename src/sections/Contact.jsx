import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { meta } from '../data/meta';

const channels = [
    { label: 'E-mail', value: meta.email, href: `mailto:${meta.email}` },
    { label: 'Téléphone', value: meta.phone, href: meta.phoneHref },
    { label: 'GitHub', value: meta.githubLabel, href: meta.github, external: true },
    { label: 'LinkedIn', value: 'in/jimmy-zheng', href: meta.linkedin, external: true },
    { label: 'Localisation', value: meta.location, href: null },
];

export default function Contact() {
    return (
        <section id="contact" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeader index="06" title="Contact" meta="DOC 06 · CONNEXION" />

                <Reveal className="panel p-6 md:p-12">
                    <div className="grid gap-10 lg:grid-cols-2">
                        <div>
                            <h3 className="font-display text-3xl font-semibold uppercase leading-[1.05] tracking-tight text-silk md:text-4xl lg:text-5xl">
                                Un stage à confier&nbsp;?
                                <br />
                                <span className="text-copper-bright">Discutons-en.</span>
                            </h3>
                            <p className="mt-6 max-w-md text-sm leading-relaxed text-silk/75">
                                Disponible du 18 janvier au 14 mai 2027, à temps plein, à Paris ou en Île-de-France.
                                Je réponds vite, avec des projets qui tournent déjà en production.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a className="btn btn-primary" href={`mailto:${meta.email}`}>
                                    Écrire un e-mail
                                </a>
                                <a className="btn" href={meta.cvPath} download>
                                    Télécharger le CV
                                </a>
                            </div>

                            <div className="mt-9 inline-flex items-center gap-3 border border-line px-4 py-3">
                                <span className="led" />
                                <span className="silk-label !text-silk/85">
                                    {meta.status} · {meta.internship}
                                </span>
                            </div>
                        </div>

                        <div className="grid content-start gap-px self-start border border-line bg-line">
                            {channels.map((c) =>
                                c.href ? (
                                    <a
                                        key={c.label}
                                        href={c.href}
                                        target={c.external ? '_blank' : undefined}
                                        rel={c.external ? 'noopener noreferrer' : undefined}
                                        className="group flex items-center justify-between gap-4 bg-panel px-5 py-4 transition-colors hover:bg-white/[0.03]"
                                    >
                                        <span className="silk-label">{c.label}</span>
                                        <span className="font-mono text-[12px] text-silk/85 transition-colors group-hover:text-copper-bright">
                                            {c.value} <span className="text-copper-bright">↗</span>
                                        </span>
                                    </a>
                                ) : (
                                    <div
                                        key={c.label}
                                        className="flex items-center justify-between gap-4 bg-panel px-5 py-4"
                                    >
                                        <span className="silk-label">{c.label}</span>
                                        <span className="font-mono text-[12px] text-silk/85">{c.value}</span>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
