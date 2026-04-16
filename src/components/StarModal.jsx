import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

function StarModal({ title, semester, details, technologies = [], githubLink, liveLink, onClose }) {
    const isPersonal = semester === 'Perso';
    const badgeLabel = isPersonal ? 'Projet Personnel' : `Semestre ${semester}`;
    const closeButtonRef = useRef(null);

    useEffect(() => {
        closeButtonRef.current?.focus();
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

            {/* Panel */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="relative w-full sm:max-w-2xl sm:rounded-2xl overflow-hidden rounded-t-2xl"
                style={{
                    background: 'linear-gradient(160deg, rgba(18,18,24,0.97), rgba(10,10,16,0.98))',
                    backdropFilter: 'blur(48px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(48px) saturate(200%)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 40px 80px rgba(0,0,0,0.7)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top specular line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Header */}
                <div className="relative px-6 pt-6 pb-5 border-b border-white/[0.07]">
                    {/* Subtle ambient glow behind title */}
                    <div className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', transform: 'translate(-30%, -30%)' }}
                    />

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 rounded-full mb-3">
                                {badgeLabel}
                            </span>
                            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight truncate">
                                {title}
                            </h2>
                        </div>
                        <button
                            ref={closeButtonRef}
                            onClick={onClose}
                            className="shrink-0 mt-0.5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200 border border-white/10"
                            aria-label="Fermer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <div className="px-6 py-6 max-h-[50vh] overflow-y-auto overscroll-contain">
                    <p className="text-slate-300 text-sm leading-[1.8] mb-6">{details}</p>

                    {/* Tech stack */}
                    {technologies.length > 0 && (
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600 mb-3">Stack</p>
                            <div className="flex flex-wrap gap-2">
                                {technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 text-xs font-mono text-slate-300 bg-white/[0.06] rounded-full border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer actions */}
                {(liveLink || githubLink) && (
                    <div className="px-6 pb-6 pt-5 flex flex-wrap gap-3 border-t border-white/[0.07]">
                        {liveLink && (
                            <a
                                href={liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors duration-200"
                                aria-label={`Voir la démo de ${title}`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Voir la démo
                            </a>
                        )}
                        {githubLink && (
                            <a
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 text-slate-300 text-sm font-medium rounded-full hover:bg-white/10 hover:text-white border border-white/10 transition-all duration-200"
                                aria-label={`Voir ${title} sur GitHub`}
                            >
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </a>
                        )}
                    </div>
                )}
            </motion.div>
        </motion.div>,
        document.body
    );
}

export default StarModal;
