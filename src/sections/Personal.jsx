import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

/**
 * Personal Section - Languages and Hobbies
 */
function Personal() {
    const languages = [
        { name: 'Français', level: 'Maternel', icon: '🇫🇷' },
        { name: 'Chinois', level: 'Maternel', icon: '🇨🇳' },
        { name: 'Anglais', level: 'B2 - Intermédiaire', icon: '🇬🇧' }
    ];

    const hobbies = [
        { name: 'Badminton', description: 'Compétition & Loisir' },
        { name: 'Musique', description: 'J-Pop / Asiatique' },
        { name: 'Jeux Vidéo', description: 'Technique & Stratégie' },
        { name: 'Lecture', description: 'Light Novel' }
    ];

    return (
        <section id="personal" className="relative py-20 border-t border-white/5 bg-black/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Languages */}
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-8 tracking-tight"
                        >
                            Langues
                        </motion.h2>
                        <div className="space-y-4">
                            {languages.map((lang, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <SpotlightCard className="p-4 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl">{lang.icon}</span>
                                            <h3 className="text-lg font-semibold text-white">{lang.name}</h3>
                                        </div>
                                        <span className="text-slate-300 font-mono text-sm border border-white/10 px-3 py-1 rounded-full bg-white/5">
                                            {lang.level}
                                        </span>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Hobbies */}
                    <div>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-8 tracking-tight"
                        >
                            Centres d'intérêt
                        </motion.h2>
                        <div className="grid grid-cols-2 gap-4">
                            {hobbies.map((hobby, index) => (
                                <motion.div 
                                    key={index} 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group h-full"
                                >
                                    <SpotlightCard className="p-6 h-full">
                                        <h3 className="text-white font-bold mb-2 group-hover:text-slate-300 transition-colors">
                                            {hobby.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm italic">{hobby.description}</p>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Personal;