import { useState } from 'react';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { projects, projectFilters } from '../data/projects';

export default function Projects() {
    const [filter, setFilter] = useState('all');
    const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projets" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeader
                    index="04"
                    title="Projets"
                    meta={`DOC 04 · ${String(projects.length).padStart(2, '0')} MODULES MONTÉS`}
                />

                <Reveal className="mb-7 flex flex-wrap items-center gap-2">
                    {projectFilters.map((f) => (
                        <button
                            key={f.id}
                            type="button"
                            onClick={() => setFilter(f.id)}
                            className={`btn !px-4 !py-2 ${filter === f.id ? 'btn-primary' : ''}`}
                            aria-pressed={filter === f.id}
                        >
                            {f.label}
                        </button>
                    ))}
                    <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
                        {String(list.length).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} affichés
                    </span>
                </Reveal>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((p, i) => (
                        <Reveal key={p.id} delay={Math.min(i, 5) * 0.05} className="h-full">
                            <ProjectCard project={p} />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
