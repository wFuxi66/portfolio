import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import StarModal from './StarModal';

function ImagePlaceholder({ title }) {
    const initials = title
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-[#080808]">
            {/* Dot grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />
            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
            {/* Initials */}
            <span className="relative text-2xl font-bold text-white/10 font-mono tracking-widest select-none">
                {initials}
            </span>
        </div>
    );
}

function ProjectCard({ title, semester, description, star, technologies = [], githubLink, liveLink, image }) {
    const [showStar, setShowStar] = useState(false);
    const isPersonal = semester === 'Perso';

    return (
        <>
            <SpotlightCard containerClassName="h-full" className="flex flex-col h-full">
                {/* Image area */}
                <div className="h-44 shrink-0 border-b border-white/5 overflow-hidden">
                    {image
                        ? <img src={image} alt={`Aperçu ${title}`} className="w-full h-full object-cover" />
                        : <ImagePlaceholder title={title} />
                    }
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                    {/* Badge + links row */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 text-xs font-medium rounded-full text-slate-300 bg-white/5 border border-white/10">
                            {isPersonal ? 'Projet Personnel' : semester}
                        </span>
                        <div className="flex gap-3">
                            {liveLink && (
                                <a
                                    href={liveLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-white transition-colors"
                                    aria-label={`Voir la démo de ${title}`}
                                    title="Voir la démo"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                            )}
                            {githubLink && (
                                <a
                                    href={githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-white transition-colors"
                                    aria-label={`Voir ${title} sur GitHub`}
                                    title="Voir sur GitHub"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">{title}</h3>

                    {/* Short description */}
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow mb-4">{description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {technologies.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-white/5 rounded border border-white/10"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* STAR trigger */}
                    {star && (
                        <button
                            onClick={() => setShowStar(true)}
                            className="self-start flex items-center gap-1.5 text-xs text-slate-500 hover:text-white border border-white/5 hover:border-white/20 rounded-full px-3 py-1.5 transition-all duration-200"
                        >
                            Méthode STAR
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}
                </div>
            </SpotlightCard>

            <AnimatePresence>
                {showStar && (
                    <StarModal
                        title={title}
                        star={star}
                        onClose={() => setShowStar(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default ProjectCard;
