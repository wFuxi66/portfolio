import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: '#about',      label: 'À Propos' },
        { href: '#formation',  label: 'Formation' },
        { href: '#skills',     label: 'Compétences' },
        { href: '#projects',   label: 'Projets' },
        { href: '#contact',    label: 'Contact' },
    ];

    const scrollTo = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    const pillStyle = {
        background: 'rgba(8, 8, 8, 0.85)',
        backdropFilter: 'blur(40px) saturate(200%)',
        WebkitBackdropFilter: 'blur(40px) saturate(200%)',
        border: '1px solid rgba(255, 255, 255, 0.10)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.6)',
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center pt-4 px-4 gap-3 pointer-events-none">

            {/* ── Pill nav ── */}
            <div
                className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full w-full max-w-2xl"
                style={pillStyle}
            >
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => scrollTo(e, '#hero')}
                    className="text-sm font-bold text-white tracking-tight mr-2 shrink-0"
                >
                    <span className="text-white/30">&lt;</span>
                    Jimmy
                    <span className="text-white/30">/&gt;</span>
                </a>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollTo(e, link.href)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CV link (desktop) */}
                <a
                    href={`${import.meta.env.BASE_URL}CV_Jimmy_ZHENG.pdf`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-black bg-white hover:bg-slate-100 transition-all duration-200 shrink-0"
                    aria-label="Voir mon CV"
                >
                    CV
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden ml-auto text-slate-400 hover:text-white transition-colors"
                    aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isMobileMenuOpen}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {isMobileMenuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>
            </div>

            {/* ── Mobile menu panel ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-auto w-full max-w-2xl rounded-2xl p-4"
                        style={pillStyle}
                    >
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollTo(e, link.href)}
                                    className="px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="border-t border-white/8 mt-2 pt-3">
                                <a
                                    href={`${import.meta.env.BASE_URL}CV_Jimmy_ZHENG.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black bg-white hover:bg-slate-100 transition-all duration-200"
                                >
                                    Voir mon CV
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Header;
