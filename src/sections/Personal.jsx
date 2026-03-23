import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

function Personal() {
    const languages = [
        { name: 'Français', level: 'Maternel', code: 'FR' },
        { name: 'Chinois', level: 'Maternel', code: 'CN' },
        { name: 'Anglais', level: 'B2 - Intermédiaire', code: 'EN' }
    ];

    const hobbies = [
        { name: 'Badminton', description: 'Compétition & Loisir' },
        { name: 'Musique', description: 'J-Pop & Musique Asiatique' },
        { name: 'Jeux Vidéo', description: 'Technique & Stratégie' },
        { name: 'Lecture', description: 'Light Novel & Manga' }
    ];

    return (
        <section id="personal" className="relative py-20 border-t border-white/5 bg-black/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Langues */}
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
                                    <SpotlightCard className="p-5 group">
                                        <div className="flex flex-row items-center justify-between w-full">
                                            <div className="flex items-center gap-5">
                                                <span className="text-[10px] font-bold text-slate-500 border border-white/10 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 group-hover:text-white group-hover:border-white/20 transition-all duration-300 flex-shrink-0 uppercase">
                                                    {lang.code}
                                                </span>
                                                <h3 className="text-lg font-semibold text-white tracking-tight whitespace-nowrap">
                                                    {lang.name}
                                                </h3>
                                            </div>
                                            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.1em] px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] whitespace-nowrap ml-4">
                                                {lang.level}
                                            </span>
                                        </div>
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Centres d'intérêt */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-8 tracking-tight"
                        >
                            Centres d'intérêt
                        </motion.h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {hobbies.map((hobby, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group h-full"
                                >
                                    <SpotlightCard className="p-5 sm:p-6 h-full" containerClassName="h-full">
                                        <h3 className="text-white font-bold mb-2 group-hover:text-slate-300 transition-colors">
                                            {hobby.name}
                                        </h3>
                                        <p className="text-slate-400 text-sm italic">{hobby.description}</p>    
                                    </SpotlightCard>
                                </motion.div>
                            ))}
                        </div>                    </div>
                </div>
            </div>
        </section>
    );
}

export default Personal;
