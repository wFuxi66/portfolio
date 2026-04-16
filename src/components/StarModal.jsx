import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const LABELS = { s: 'Situation', t: 'Tâche', a: 'Action', r: 'Résultat' };

function StarModal({ title, star, onClose }) {
    useEffect(() => {
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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 8 }}
                transition={{ duration: 0.2 }}
                className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-start justify-between mb-7">
                    <div>
                        <p className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest mb-1">Méthode STAR</p>
                        <h3 className="text-lg font-bold text-white">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-600 hover:text-white transition-colors ml-4 mt-0.5 shrink-0"
                        aria-label="Fermer"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* STAR entries */}
                <div className="space-y-5">
                    {Object.entries(star).map(([key, value]) => (
                        <div key={key} className="flex gap-4">
                            <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                <span className="text-[11px] font-bold text-white uppercase">{key}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{LABELS[key]}</p>
                                <p className="text-sm text-slate-300 leading-relaxed">{value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

export default StarModal;
