/**
 * Formation Section - Academic timeline showing educational progression
 */
function Formation() {
    const formations = [
        {
            year: '2024 - 2027',
            title: 'BUT Informatique',
            subtitle: 'Parcours B - Réseaux et Sécurité',
            institution: 'IUT d\'Orsay - Université Paris-Saclay',
            description: 'Formation en 3 ans couvrant le développement logiciel, les bases de données, les réseaux et la sécurité informatique.',
            current: true,
            highlights: ['Développement Full-Stack', 'Administration Systèmes', 'Sécurité Réseaux'],
        },
        {
            year: '2024',
            title: 'Baccalauréat Général',
            subtitle: 'Parcours Général',
            institution: 'Lycée Claude Monet',
            description: 'Baccalauréat général avec spécialités scientifiques.',
            current: false,
            highlights: ['Physique-Chimie', 'Mathématiques'],
        },
    ];

    return (
        <section id="formation" className="relative">
            <div className="section-container">
                <h2 className="section-title">Formation</h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-600 via-cyan-600/50 to-transparent transform md:-translate-x-1/2" />

                    <div className="space-y-8">
                        {formations.map((formation, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 w-4 h-4 transform -translate-x-1/2 md:-translate-x-1/2">
                                    <div className={`w-4 h-4 rounded-full border-2 ${formation.current
                                        ? 'bg-cyan-600 border-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.5)]'
                                        : 'bg-dark-900 border-cyan-600/50'
                                        }`} />
                                </div>

                                {/* Year badge - hidden on mobile, shown as part of card */}
                                <div className={`hidden md:flex md:w-1/2 ${index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
                                    }`}>
                                    <span className="text-cyan-400 font-mono font-bold text-lg">
                                        {formation.year}
                                    </span>
                                </div>

                                {/* Content card */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                                    }`}>
                                    <div className={`glass-card glow-border p-6 ${formation.current ? 'ring-1 ring-cyan-500/30' : ''
                                        }`}>
                                        {/* Mobile year */}
                                        <span className="md:hidden text-cyan-400 font-mono font-bold text-sm mb-2 block">
                                            {formation.year}
                                        </span>

                                        {formation.current && (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-emerald-400 bg-emerald-600/20 rounded-full mb-3">
                                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                                En cours
                                            </span>
                                        )}

                                        <h3 className="text-xl font-bold text-white mb-1">
                                            {formation.title}
                                        </h3>
                                        <p className="text-cyan-400 font-medium text-sm mb-2">
                                            {formation.subtitle}
                                        </p>
                                        <p className="text-gray-400 text-sm mb-3">
                                            {formation.institution}
                                        </p>
                                        <p className="text-gray-300 text-sm mb-4">
                                            {formation.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {formation.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs font-mono text-cyan-300/80 bg-cyan-600/10 rounded border border-cyan-600/20"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Formation;
