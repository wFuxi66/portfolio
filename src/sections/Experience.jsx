/**
 * Experience Section - Professional background (STAR Method)
 */
function Experience() {
    const experiences = [
        {
            company: 'Restaurant CHOKEN',
            role: 'Polyvalent (Service & Gestion)',
            period: 'Depuis Juin 2025',
            location: 'Paris',
            description: "Expérience en milieu exigeant nécessitant une grande réactivité et un sens du service client irréprochable.",
            details: [
                "Situation : Équipe en flux tendu lors des services de pointe.",
                "Tâche : Assurer un service fluide, la prise de commande et la gestion des stocks.",
                "Action : Coordination directe avec la cuisine et optimisation du dressage des tables pour réduire l'attente.",
                "Résultat : Amélioration de la satisfaction client et fluidification des pics d'activité."
            ],
            skills: ['Adaptabilité', 'Travail en équipe', 'Gestion du stress', 'Organisation']
        }
    ];

    return (
        <section id="experience" className="relative">
            <div className="section-container">
                <h2 className="section-title">Expérience Professionnelle</h2>

                <div className="space-y-8 max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <div key={index} className="glass-card glow-border p-6 md:p-8 hover-glow transition-all duration-300">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
                                    <p className="text-cyan-400 font-medium">{exp.role}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-300 font-mono text-sm">{exp.period}</p>
                                    <p className="text-gray-500 text-xs">{exp.location}</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6 italic border-l-2 border-cyan-600/50 pl-4">
                                {exp.description}
                            </p>

                            <ul className="space-y-3 mb-8">
                                {exp.details.map((detail, i) => (
                                    <li key={i} className="text-gray-400 text-sm flex gap-3">
                                        <span className="text-cyan-600 font-bold">•</span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex flex-wrap gap-2 pt-6 border-t border-dark-700/50">
                                {exp.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 text-xs font-mono text-emerald-400 bg-emerald-600/10 rounded-full border border-emerald-600/20">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
