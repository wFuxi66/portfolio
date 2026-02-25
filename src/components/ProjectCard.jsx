/**
 * ProjectCard - A modern card component for displaying project information
 * @param {string} title - Project title
 * @param {string} semester - Semester (e.g., "S1", "S2", "S3", "Perso")
 * @param {string} description - Project description
 * @param {string[]} technologies - List of technologies used
 * @param {string} githubLink - Optional link to GitHub repository
 * @param {string} liveLink - Optional link to live demo
 */
function ProjectCard({ title, semester, description, technologies = [], githubLink, liveLink }) {
    const isPersonal = semester === 'Perso';

    return (
        <article className={`glass-card glow-border hover-glow p-6 rounded-xl group transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${isPersonal ? 'ring-1 ring-cyan-500/30' : ''}`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${isPersonal
                        ? 'text-emerald-400 bg-emerald-600/20'
                        : 'text-cyan-400 bg-cyan-600/20'
                        }`}>
                        {isPersonal ? 'Projet Personnel' : semester}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {title}
                    </h3>
                </div>

                {/* Links */}
                <div className="flex gap-2 ml-4">
                    {liveLink && (
                        <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                            aria-label={`Voir la démo de ${title}`}
                            title="Voir la démo"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    )}
                    {githubLink && (
                        <a
                            href={githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                            aria-label={`Voir le projet ${title} sur GitHub`}
                            title="Voir sur GitHub"
                        >
                            <svg
                                className="w-6 h-6"
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

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
                {description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-700/50">
                {technologies.map((tech, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 text-xs font-mono text-cyan-300/80 bg-cyan-600/10 rounded border border-cyan-600/20"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </article>
    );
}

export default ProjectCard;

