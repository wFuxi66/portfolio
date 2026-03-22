import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

/**
 * Experience Section - Professional background (STAR Method)
 */
function Experience() {
    const experiences = [
        {
            company: 'Restaurant CHOKEN',
            role: 'Polyvalent (Service & Gestion)',
            period: 'Depuis Juin 2025',
            location: 'Pontoise',
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
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-12 tracking-tight"
                >
                    Expérience Professionnelle
                </motion.h2>

                <div className="space-y-6 max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SpotlightCard className="p-6 md:p-8">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{exp.company}</h3>
                                        <p className="text-slate-400 font-medium text-sm mt-1">{exp.role}</p>
                                    </div>
                                    <div className="text-left md:text-right">
                                        <p className="text-slate-300 font-mono text-sm">{exp.period}</p>
                                        <p className="text-slate-500 text-xs mt-1">{exp.location}</p>
                                    </div>
                                </div>

                                <p className="text-slate-400 mb-6 text-sm leading-relaxed border-l-2 border-white/10 pl-4">
                                    {exp.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {exp.details.map((detail, i) => (
                                        <li key={i} className="text-slate-400 text-sm flex gap-3">
                                            <span className="text-slate-600 font-bold">•</span>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                    {exp.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 rounded-full border border-white/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;