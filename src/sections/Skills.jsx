import { motion } from 'framer-motion';
import SkillBadge from '../components/SkillBadge';
import SpotlightCard from '../components/SpotlightCard';

/**
 * Skills Section - Technical skills organized in an asymmetrical 2-1/1-2 Bento Grid
 */
function Skills() {
    const webSkills = ['React', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML/CSS'];
    const softwareSkills = ['Python', 'Java', 'C/C++', 'PHP', 'SQL / MySQL'];
    const networkSkills = ['Linux (Debian)', 'Windows', 'Docker', 'TCP/IP & VLAN', 'DNS / DHCP', 'Routage'];
    const toolsSkills = ['Git / GitHub', 'Méthode Agile', 'POO / UML', 'Architecture REST', 'Travail en équipe'];

    return (
        <section id="skills" className="relative border-t border-white/5 bg-black/20">
            <div className="section-container">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-12 tracking-tight"
                >
                    Compétences Techniques
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Row 1: Web (2) + Software (1) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2"
                    >
                        <SpotlightCard containerClassName="h-full" className="p-6 md:p-8 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">Développement Web</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {webSkills.map((skill) => (
                                    <SkillBadge key={skill} name={skill} />
                                ))}
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-1"
                    >
                        <SpotlightCard containerClassName="h-full" className="p-6 md:p-8 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">Logiciel</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {softwareSkills.map((skill) => (
                                    <SkillBadge key={skill} name={skill} />
                                ))}
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Row 2: Networks (1) + Tools (2) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-1"
                    >
                        <SpotlightCard containerClassName="h-full" className="p-6 md:p-8 h-full flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">Réseaux</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {networkSkills.map((skill) => (
                                    <SkillBadge key={skill} name={skill} />
                                ))}
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2"
                    >
                        <SpotlightCard containerClassName="h-full" className="p-6 md:p-8 h-full flex flex-col justify-center border-white/10 bg-white/[0.01]">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-white">Outils & Transverse</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {toolsSkills.map((skill) => (
                                    <SkillBadge key={skill} name={skill} />
                                ))}
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
