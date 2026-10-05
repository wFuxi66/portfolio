import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { formations } from '../data/formation';

export default function Formation() {
    return (
        <section id="formation" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeader index="02" title="Formation" meta="DOC 02 · SCHÉMA DE MONTAGE" />

                <Reveal className="panel divide-y divide-white/[0.07]">
                    {formations.map((f) => (
                        <div key={f.title} className="grid gap-6 p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-9">
                            <div>
                                <div className="font-mono text-sm tracking-[0.12em] text-copper-bright">{f.year}</div>
                                {f.current && (
                                    <div className="mt-3 inline-flex items-center gap-2.5 border border-line px-2.5 py-1.5">
                                        <span className="led" />
                                        <span className="silk-label !text-silk/80">En cours</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight text-silk md:text-2xl">
                                    {f.title}
                                    <span className="ml-3 font-sans text-sm font-normal text-muted">{f.subtitle}</span>
                                </h3>
                                <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                                    {f.institution}
                                </div>
                                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-silk/75">{f.description}</p>
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {f.tags.map((t) => (
                                        <span key={t} className="pad">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
