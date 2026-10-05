import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { meta } from '../data/meta';

const channels = [
    { label: 'GitHub', value: meta.githubLabel, href: meta.github, external: true },
    { label: 'LinkedIn', value: meta.linkedinLabel, href: meta.linkedin, external: true },
    { label: 'E-mail', value: meta.email, href: `mailto:${meta.email}` },
    { label: 'Tél.', value: meta.phone, href: meta.phoneHref },
];

export default function Hero() {
    return (
        <section id="hero" className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24">
            <div className="hero-shade" aria-hidden="true" />
            <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
                <Reveal>
                    <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="inline-flex items-center gap-2.5 border border-line px-3 py-1.5">
                            <span className="led" />
                            <span className="silk-label !text-silk/85">
                                {meta.status} · {meta.internshipShort}
                            </span>
                        </span>
                        <span className="silk-label hidden md:inline">{meta.location}</span>
                    </div>
                </Reveal>

                <motion.h1
                    className="hero-name text-[clamp(3.4rem,13vw,10.5rem)]"
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                >
                    Jimmy
                    <br />
                    Zheng
                </motion.h1>
                <div className="hero-trace mt-7" aria-hidden="true" />

                <div className="mt-9 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end">
                    <Reveal delay={0.12}>
                        <p className="max-w-xl text-[15px] leading-relaxed text-silk/75">{meta.heroLine}</p>
                    </Reveal>
                    <Reveal delay={0.2} className="flex flex-wrap gap-3 md:justify-self-end">
                        <a className="btn btn-primary" href="#projets">
                            Voir les projets
                        </a>
                        <a className="btn" href={meta.cvPath} download>
                            CV ↓
                        </a>
                    </Reveal>
                </div>

                <Reveal delay={0.28}>
                    <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
                        {channels.map((c) => (
                            <a
                                key={c.label}
                                href={c.href}
                                target={c.external ? '_blank' : undefined}
                                rel={c.external ? 'noopener noreferrer' : undefined}
                                className="group"
                            >
                                <span className="silk-label mr-2">{c.label}</span>
                                <span className="font-mono text-[12px] text-silk/85 transition-colors group-hover:text-copper-bright">
                                    {c.value}
                                </span>
                            </a>
                        ))}
                    </div>
                </Reveal>
            </div>

            <div className="pointer-events-none absolute bottom-7 right-6 hidden flex-col items-end gap-2.5 md:flex">
                <span className="silk-label">Défilez — le signal se propage</span>
                <span className="scroll-cue" aria-hidden="true">
                    <span />
                </span>
            </div>
        </section>
    );
}
