import SpotlightCard from './SpotlightCard';

/**
 * ProjectCard - Component to showcase a project with STAR methodology support
 */
function ProjectCard({ title, semester, description, star, technologies = [], githubLink, liveLink }) {
    const isPersonal = semester === 'Perso';

    return (
        <SpotlightCard className="flex flex-col h-full p-6" containerClassName="h-full">
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 text-slate-300 bg-white/5 border border-white/10">
                            {isPersonal ? 'Projet Personnel' : semester}
                        </span>
                        <h3 className="text-xl font-bold text-white transition-colors duration-300">
                            {title}
                        </h3>
                    </div>

                    <div className="flex gap-2 ml-4">
                        {liveLink && (
                            <a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors duration-300 relative z-20"
                                aria-label={`Voir la démo de ${title}`}
                                title="Voir la démo"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> 
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        )}
                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-white transition-colors duration-300 relative z-20"
                                aria-label={`Voir le projet ${title} sur GitHub`}
                                title="Voir sur GitHub"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                <div className="flex-grow mb-6">
                    {star ? (
                        <div className="space-y-2.5">
                            <p className="text-sm leading-relaxed"><span className="text-white font-bold mr-2">S</span><span className="text-slate-400">{star.s}</span></p>
                            <p className="text-sm leading-relaxed"><span className="text-white font-bold mr-2">T</span><span className="text-slate-400">{star.t}</span></p>
                            <p className="text-sm leading-relaxed"><span className="text-white font-bold mr-2">A</span><span className="text-slate-400">{star.a}</span></p>
                            <p className="text-sm leading-relaxed"><span className="text-white font-bold mr-2">R</span><span className="text-slate-400">{star.r}</span></p>
                        </div>
                    ) : (
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs font-mono text-slate-300 bg-white/5 rounded border border-white/10"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </SpotlightCard>
    );
}

export default ProjectCard;
