import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { experiences } from '../data/experience';

export default function Experience() {
    const [main, ...rest] = experiences;

    return (
        <section id="experience" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeader index="03" title="Expérience" meta="DOC 03 · ÉTAGE EN PRODUCTION" />

                <div className="flex flex-col gap-6">
                    <Reveal className="panel p-6 md:p-9">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div className="silk-label text-copper-bright">{main.contract}</div>
                                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-silk md:text-3xl">
                                    {main.company}
                                </h3>
                                <div className="mt-1.5 text-sm text-muted">
                                    {main.role} · {main.kind}
                                </div>
                            </div>
                            <div className="text-right font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                                <div>{main.period}</div>
                                <div className="mt-1">{main.location}</div>
                            </div>
                        </div>

                        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-silk/80">{main.summary}</p>

                        <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {main.points.map((p) => (
                                <li key={p} className="flex gap-3 text-sm leading-relaxed text-silk/75">
                                    <span className="pad-dot" aria-hidden="true" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-7 flex flex-wrap gap-1.5">
                            {main.tech.map((t) => (
                                <span key={t} className="pad">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </Reveal>

                    {rest.map((exp, i) => (
                        <Reveal key={exp.id} delay={0.06 * (i + 1)} className="panel p-6">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                    <h3 className="font-display text-lg font-semibold tracking-tight text-silk">
                                        {exp.company}
                                    </h3>
                                    <span className="font-mono text-[11px] text-muted">{exp.role}</span>
                                </div>
                                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                                    {exp.period} · {exp.location}
                                </span>
                            </div>
                            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-silk/70">{exp.summary}</p>
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {exp.tech.map((t) => (
                                    <span key={t} className="pad">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
