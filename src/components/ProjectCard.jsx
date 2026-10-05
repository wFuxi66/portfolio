const CATEGORY_LABELS = {
    pro: 'Pro',
    perso: 'Perso',
    academique: 'Académique',
};

function ModuleCover({ label }) {
    return (
        <div className="cover-module flex h-full flex-col items-center justify-center gap-5">
            <svg width="160" height="104" viewBox="0 0 160 104" fill="none" aria-hidden="true">
                <rect
                    x="42"
                    y="22"
                    width="76"
                    height="60"
                    rx="4"
                    fill="rgba(21,24,29,0.92)"
                    stroke="#c07a3e"
                    strokeWidth="1.6"
                />
                {[0, 1, 2, 3].map((i) => (
                    <rect key={`t${i}`} x={58 + i * 15} y="12" width="6" height="10" rx="1.5" fill="#d8b06a" opacity="0.85" />
                ))}
                {[0, 1, 2, 3].map((i) => (
                    <rect key={`b${i}`} x={58 + i * 15} y="82" width="6" height="10" rx="1.5" fill="#d8b06a" opacity="0.85" />
                ))}
                {[0, 1, 2, 3].map((i) => (
                    <rect key={`l${i}`} x="32" y={34 + i * 12} width="10" height="6" rx="1.5" fill="#d8b06a" opacity="0.85" />
                ))}
                {[0, 1, 2, 3].map((i) => (
                    <rect key={`r${i}`} x="118" y={34 + i * 12} width="10" height="6" rx="1.5" fill="#d8b06a" opacity="0.85" />
                ))}
                <circle cx="52" cy="32" r="3" fill="#e2a862" />
            </svg>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">{label}</span>
        </div>
    );
}

export default function ProjectCard({ project }) {
    const { mod, title, tagline, period, category, image, imageFit, tech = [], github, live, note } = project;

    return (
        <article className="panel group flex h-full flex-col overflow-hidden hover:-translate-y-0.5 hover:border-copper-dim">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-[10px] tracking-[0.24em] text-copper-bright">{mod}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{period}</span>
            </div>

            <div className="relative h-44 overflow-hidden border-b border-line bg-[#0d1014]">
                {image ? (
                    <img
                        src={image}
                        alt={`Aperçu du projet ${title}`}
                        loading="lazy"
                        className={
                            imageFit === 'contain'
                                ? 'h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]'
                                : 'h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]'
                        }
                    />
                ) : (
                    <ModuleCover label={note ?? 'Module en cours d\'assemblage'} />
                )}
                <span className="absolute left-3 top-3 border border-line bg-ink/85 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    {CATEGORY_LABELS[category] ?? category}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold tracking-tight text-silk">{title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-silk/70">{tagline}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                    {tech.map((t) => (
                        <span key={t} className="pad">
                            {t}
                        </span>
                    ))}
                </div>

                {(github || live || note) && (
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5">
                        {github && (
                            <a className="card-link" href={github} target="_blank" rel="noopener noreferrer">
                                Code ↗
                            </a>
                        )}
                        {live && (
                            <a className="card-link" href={live} target="_blank" rel="noopener noreferrer">
                                Démo ↗
                            </a>
                        )}
                        {note && image && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted/70">{note}</span>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}
