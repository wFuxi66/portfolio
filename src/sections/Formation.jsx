import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

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
            highlights: ['Développement Full Stack', 'Administration Systèmes', 'Sécurité Réseaux'],
        },
        {
            year: '2021 - 2024',
            title: 'Baccalauréat Général',
            subtitle: 'Mention Bien',
            institution: 'Lycée Claude Monet - Paris 13e',
            description: 'Baccalauréat général avec spécialités scientifiques (Mathématiques, Physique-Chimie).',
            current: false,
            highlights: ['Physique-Chimie', 'Mathématiques'],
        },
    ];

    return (
        <section id="formation" className="relative border-t border-white/5 bg-black/20">
            <div className="section-container">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-16 tracking-tight"
                >
                    Formation
                </motion.h2>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 transform md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {formations.map((formation, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 w-3 h-3 transform -translate-x-[5px] md:-translate-x-1/2 mt-6 md:mt-1.5">
                                    <div className={`w-3 h-3 rounded-full border-[2px] ${formation.current
                                        ? 'bg-white border-white'
                                        : 'bg-black border-white/30'
                                        }`} />
                                </div>

                                {/* Year badge - hidden on mobile, shown as part of card */}
                                <div className={`hidden md:flex md:w-1/2 ${index % 2 === 0 ? 'justify-end pr-12' : 'justify-start pl-12'
                                    }`}>
                                    <span className="text-slate-300 font-mono text-sm mt-1">
                                        {formation.year}
                                    </span>
                                </div>

                                {/* Content card */}
                                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                                    }`}>
                                    <SpotlightCard className="p-6">
                                        {/* Mobile year */}
                                        <span className="md:hidden text-slate-300 font-mono text-sm mb-3 block">
                                            {formation.year}
                                        </span>

                                        {formation.current && (
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-white/10 rounded-full mb-4 border border-white/10">
                                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                                En cours
                                            </span>
                                        )}

                                        <h3 className="text-lg font-bold text-white mb-1">
                                            {formation.title}
                                        </h3>
                                        <p className="text-slate-300 font-medium text-sm mb-2">
                                            {formation.subtitle}
                                        </p>
                                        <p className="text-slate-500 text-sm mb-4">
                                            {formation.institution}
                                        </p>
                                        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                                            {formation.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {formation.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs font-mono text-slate-300 bg-white/5 rounded border border-white/10"
                                                >
                                                    {highlight}
                                                </span>
                                            ))}
                                        </div>
                                    </SpotlightCard>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Formation;