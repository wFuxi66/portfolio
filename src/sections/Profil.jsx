import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { profile, languages, hobbies } from '../data/personal';

export default function Profil() {
    return (
        <section id="profil" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeader index="01" title="Profil" meta="DOC 01 · QUI EST DERRIÈRE LA CARTE" />

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                    <Reveal className="panel p-6 md:p-9">
                        <div className="space-y-4 text-[15px] leading-relaxed text-silk/80">
                            {profile.paragraphs.map((p) => (
                                <p key={p.slice(0, 24)}>{p}</p>
                            ))}
                        </div>
                        <dl className="mt-9 grid gap-px border border-line bg-line sm:grid-cols-2">
                            {profile.facts.map((f) => (
                                <div key={f.label} className="bg-panel p-4">
                                    <dt className="silk-label">{f.label}</dt>
                                    <dd className="mt-1.5 font-mono text-[12px] text-silk/90">{f.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>

                    <div className="flex flex-col gap-6">
                        <Reveal delay={0.08} className="panel p-6">
                            <h3 className="silk-label mb-6">Langues</h3>
                            <div className="space-y-5">
                                {languages.map((l) => (
                                    <div key={l.code}>
                                        <div className="flex items-baseline justify-between gap-3">
                                            <span className="flex items-baseline gap-2.5">
                                                <span className="font-mono text-[10px] tracking-[0.18em] text-copper-bright">
                                                    {l.code}
                                                </span>
                                                <span className="text-sm text-silk/85">{l.name}</span>
                                            </span>
                                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                                                {l.level}
                                            </span>
                                        </div>
                                        <div className="mt-2.5 h-[3px] bg-white/5">
                                            <div
                                                className="h-full bg-gradient-to-r from-copper-dim to-copper-bright"
                                                style={{ width: `${l.bar}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        <Reveal delay={0.14} className="panel p-6">
                            <h3 className="silk-label mb-4">Hors code</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {hobbies.map((h) => (
                                    <span key={h.name} className="pad" title={h.description}>
                                        {h.name}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
