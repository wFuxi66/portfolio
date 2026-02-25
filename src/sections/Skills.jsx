import SkillBadge from '../components/SkillBadge';

/**
 * Skills Section - Technical skills organized by category
 */
function Skills() {
    const webSkills = ['React', 'Tailwind CSS', 'Vite', 'JavaScript', 'HTML/CSS'];
    const softwareSkills = ['Python', 'Java', 'C/C++', 'PHP', 'SQL / MySQL'];
    const networkSkills = ['Linux (Debian)', 'Windows', 'Docker', 'TCP/IP & VLAN', 'DNS / DHCP', 'Routage'];
    const toolsSkills = ['Git / GitHub', 'Méthode Agile', 'POO / UML', 'Architecture REST', 'Travail en équipe'];

    return (
        <section id="skills" className="relative bg-dark-900/30">
            <div className="section-container">
                <h2 className="section-title">Compétences Techniques</h2>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Web Development */}
                    <div className="glass-card glow-border p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Développement Web</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {webSkills.map((skill) => (
                                <SkillBadge key={skill} name={skill} category="dev" />
                            ))}
                        </div>
                    </div>

                    {/* Logiciel & Data */}
                    <div className="glass-card glow-border p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-fuchsia-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-fuchsia-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Logiciel & Data</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {softwareSkills.map((skill) => (
                                <SkillBadge key={skill} name={skill} category="dev" />
                            ))}
                        </div>
                    </div>

                    {/* Network/Sys Skills */}
                    <div className="glass-card glow-border p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-emerald-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Réseaux & Systèmes</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {networkSkills.map((skill) => (
                                <SkillBadge key={skill} name={skill} category="network" />
                            ))}
                        </div>
                    </div>

                    {/* Tools and Transverse Skills */}
                    <div className="glass-card glow-border p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-orange-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Outils & Transverse</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {toolsSkills.map((skill) => (
                                <SkillBadge key={skill} name={skill} category="dev" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
