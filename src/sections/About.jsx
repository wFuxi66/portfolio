import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2"
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col justify-center">
                            <p className="text-lg text-slate-400 leading-relaxed mb-6">
                                Étudiant en <span className="text-white font-medium">BUT Informatique</span> à l'IUT d'Orsay,
                                j'ai fait le choix d'une <span className="text-white font-medium">double compétence</span> :
                                allier le <span className="text-white font-medium">développement Full Stack</span>{' '}
                                à une expertise en <span className="text-white font-medium">systèmes et réseaux</span>.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Mon parcours Réseaux et Sécurité me permet de concevoir des architectures
                                <span className="text-white font-medium"> performantes et sécurisées</span>.
                                Je comprends autant le code que l'infrastructure, une vision complète indispensable au développement moderne.
                            </p>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col">
                            <h3 className="text-lg font-semibold text-white mb-6">Objectifs & Ambitions</h3>
                            <div className="space-y-4 text-sm text-slate-400">
                                <div>
                                    <p className="text-white font-medium mb-1 tracking-wide uppercase text-[10px]">Court terme</p>
                                    <p>Valider mon BUT2 par un stage technique de 10-12 semaines (Avril 2026).</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1 tracking-wide uppercase text-[10px]">Moyen terme</p>
                                    <p>Obtention du diplôme et poursuite d'études en école d'ingénieur ou Master.</p>
                                </div>
                                <div>
                                    <p className="text-white font-medium mb-1 tracking-wide uppercase text-[10px]">Long terme</p>
                                    <p>Devenir <span className="text-white">Software Developer</span> ou <span className="text-white">Ingénieur en Informatique</span>.</p>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1"
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
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Spécialité</p>
                                        <p className="text-white text-sm mt-0.5">Réseaux & Sécurité</p>
                                    </div>
                                </div>
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 h-full"
                    >
                        <SpotlightCard className="p-8 h-full flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-white mb-4 italic">"Incarner la tech avec élégance et sécurité."</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Passionné par la culture japonaise et les nouvelles technologies, je m'efforce de créer des solutions qui sont non seulement fonctionnelles, mais aussi visuellement marquantes. Mon approche du développement est guidée par la rigueur de la cybersécurité et la créativité du design moderne.
                            </p>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default About;
