import SkillBadge from '../components/SkillBadge';

/**
 * Skills Section - Technical skills organized by category
 */
function Skills() {
    const devSkills = [
        'HTML/CSS',
        'JavaScript',
        'React',
        'Python',
        'Java',
        'C/C++',
        'SQL',
        'PHP',
        'Git',
    ];

    const networkSkills = [
        'Administration Linux',
        'TCP/IP & Réseaux',
        'Shell/Bash',
        'Sécurité',
        'Routage & Commutation',
    ];

    const softSkills = [
        'Gestion de Projet Agile',
        'POO / UML',
        'Travail en équipe',
        'Documentation',
    ];

    return (
        <section id="skills" className="relative bg-dark-900/30">
            <div className="section-container">
                <h2 className="section-title">Compétences Techniques</h2>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Development Skills */}
                    <div className="glass-card glow-border p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white">Développement</h3>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {devSkills.map((skill) => (
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
                </div>

                {/* Soft Skills */}
                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-300 mb-4">Compétences transversales</h3>
                    <div className="flex flex-wrap gap-3">
                        {softSkills.map((skill) => (
                            <SkillBadge key={skill} name={skill} category="dev" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Skills;
