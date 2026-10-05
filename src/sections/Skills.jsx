import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { skillModules } from '../data/skills';

export default function Skills() {
    return (
        <section id="competences" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeader
                    index="05"
                    title="Compétences"
                    meta={`DOC 05 · ${String(skillModules.length).padStart(2, '0')} MODULES — NOMENCLATURE`}
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {skillModules.map((m, i) => {
                        const last = i === skillModules.length - 1;
                        return (
                            <Reveal
                                key={m.id}
                                delay={Math.min(i, 5) * 0.05}
                                className={`panel flex flex-col p-5 ${
                                    last ? 'sm:col-span-2 lg:col-span-1' : ''
                                } ${m.id === 'transverse' ? 'border-copper-dim' : ''}`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] tracking-[0.24em] text-copper-bright">
                                        {m.code}
                                    </span>
                                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
                                        {String(m.items.length).padStart(2, '0')}
                                    </span>
                                </div>
                                <h3 className="mt-3 font-display text-base font-semibold uppercase tracking-wide text-silk">
                                    {m.label}
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {m.items.map((s) => (
                                        <span key={s} className="pad">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
