import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

/**
 * About Section - Presentation highlighting dual expertise with Bento Grid layout
 */
function About() {
    return (
        <section id="about" className="relative">
            <div className="section-container">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-12 tracking-tight"
                >
                    À Propos
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {/* Main Presentation - Span 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 h-full"
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col">
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Étudiant en <span className="text-white font-medium">BUT Informatique</span> à l'IUT d'Orsay,
                                j'ai fait le choix d'une <span className="text-white font-medium">double compétence</span> qui fait ma force :
                                allier le <span className="text-white font-medium">développement d'applications Full Stack</span>{' '}
                                à de vraies connaissances en <span className="text-white font-medium">administration systèmes et réseaux</span>.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Mon parcours B (Réseaux et Sécurité) me permet de concevoir des applications
                                <span className="text-white"> performantes, sécurisées et pensées pour l'infrastructure</span>.
                                Je comprends autant le code que l'environnement dans lequel il s'exécute,
                                une vision complète du développement au déploiement.
                            </p>
                        </SpotlightCard>
                    </motion.div>

                    {/* Quick Info - Span 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="h-full"
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col space-y-6">
                            <h3 className="text-lg font-semibold text-white">Informations</h3>
                            <div className="space-y-5">
                                <div className="flex items-start gap-3">
                                    <span className="text-slate-500 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Formation</p>
                                        <p className="text-white text-sm mt-0.5">BUT Informatique</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-slate-500 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Localisation</p>
                                        <p className="text-white text-sm mt-0.5">IUT d'Orsay</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-slate-500 mt-0.5">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Spécialisation</p>
                                        <p className="text-white text-sm mt-0.5">Parcours B - Réseaux & Sécurité</p>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Stage & Ambitions - Span 2 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 h-full"
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-300 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                                </span>
                                <h3 className="text-lg font-semibold text-white">Recherche de Stage</h3>
                            </div>
                            <p className="text-slate-400 leading-relaxed">
                                Actuellement en S4, je recherche un <span className="text-white font-medium">stage de 10 à 12 semaines</span> entre
                                avril et juillet 2026. Mon objectif à court terme est de m'immerger dans un environnement professionnel pour 
                                valider mon BUT, avec l'ambition à plus long terme de poursuivre en école d'ingénieur pour me spécialiser 
                                dans la <span className="text-white">sécurité logicielle et les infrastructures Cloud</span>.
                            </p>
                        </SpotlightCard>
                    </motion.div>

                    {/* Soft Skills - Span 1 */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="h-full"
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-white mb-6">Qualités</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-white/5 rounded-lg border border-white/10">Adaptabilité</span>
                                <span className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-white/5 rounded-lg border border-white/10">Gestion du temps</span>
                                <span className="px-3 py-1.5 text-sm font-medium text-slate-300 bg-white/5 rounded-lg border border-white/10">Organisation</span>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;