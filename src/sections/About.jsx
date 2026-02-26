/**
 * About Section - Presentation highlighting dual expertise
 */
function About() {
    return (
        <section id="about" className="relative">
            <div className="section-container">
                <h2 className="section-title">À Propos</h2>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Main text */}
                    <div className="md:col-span-2 space-y-6">
                        <p className="text-lg text-gray-300 leading-relaxed">
                            Étudiant en <span className="text-cyan-400 font-semibold">BUT Informatique</span> à l'IUT d'Orsay,
                            j'ai fait le choix d'une <span className="text-white font-medium">double compétence</span> qui fait ma force :
                            allier le <span className="text-cyan-400">développement d'applications Full Stack</span>
                            à de vraies connaissances en <span className="text-emerald-400">administration systèmes et réseaux</span>.
                        </p>

                        <p className="text-gray-400 leading-relaxed">
                            Mon parcours B (Réseaux et Sécurité) me permet de concevoir des applications
                            <span className="text-white"> performantes, sécurisées et pensées pour l'infrastructure</span>.
                            Je comprends autant le code que l'environnement dans lequel il s'exécute,
                            une vision complète du développement au déploiement.
                        </p>

                        <p className="text-gray-400 leading-relaxed">
                            Actuellement en S4, je recherche un <span className="text-cyan-400 font-semibold">stage de 10 à 12 semaines</span> entre
                            avril et juillet 2026 pour m'impliquer techniquement sur vos projets et consolider mes acquis.
                        </p>
                    </div>

                    {/* Quick info card */}
                    <div className="glass-card glow-border p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-white mb-4">Informations</h3>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="text-cyan-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm text-gray-400">Formation</p>
                                    <p className="text-white text-sm">BUT Informatique</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-cyan-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm text-gray-400">Localisation</p>
                                    <p className="text-white text-sm">IUT d'Orsay</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-cyan-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm text-gray-400">Spécialisation</p>
                                    <p className="text-emerald-400 text-sm">Parcours B - Réseaux & Sécurité</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-cyan-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm text-gray-400">Stage recherché</p>
                                    <p className="text-cyan-400 text-sm font-medium">Avril - Juillet 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
