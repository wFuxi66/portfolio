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
        { name: 'Musique', description: 'Écoute & Piano' },
        { name: 'Jeux Vidéo', description: 'Technique & Stratégie' },
        { name: 'Lecture', description: 'Littérature & Technique' }
    ];

    return (
        <section id="personal" className="relative bg-dark-900/30">
            <div className="section-container">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Languages */}
                    <div>
                        <h2 className="section-title text-left ml-0 mb-8">Langues</h2>
                        <div className="space-y-4">
                            {languages.map((lang, index) => (
                                <div key={index} className="glass-card glow-border p-4 flex items-center justify-between hover-glow transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl">{lang.icon}</span>
                                        <h3 className="text-lg font-semibold text-white">{lang.name}</h3>
                                    </div>
                                    <span className="text-cyan-400 font-mono text-sm border border-cyan-600/30 px-3 py-1 rounded-full">
                                        {lang.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hobbies */}
                    <div>
                        <h2 className="section-title text-left ml-0 mb-8">Centres d'intérêt</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {hobbies.map((hobby, index) => (
                                <div key={index} className="glass-card glow-border p-6 hover-glow group transition-all duration-300">
                                    <h3 className="text-white font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                        {hobby.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm italic">{hobby.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Personal;
