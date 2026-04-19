import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const NAV_LINKS = [
    { href: '#about',      label: 'À Propos' },
    { href: '#formation',  label: 'Formation' },
    { href: '#experience', label: 'Expérience' },
    { href: '#skills',     label: 'Compétences' },
    { href: '#projects',   label: 'Projets' },
    { href: '#contact',    label: 'Contact' },
];

function useActiveSection() {
    const [active, setActive] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActive('#' + entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        );
        NAV_LINKS.forEach(({ href }) => {
            const el = document.getElementById(href.slice(1));
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return active;
}

const pillStyle = {
    background: 'rgba(8, 8, 8, 0.85)',
    backdropFilter: 'blur(40px) saturate(200%)',
    WebkitBackdropFilter: 'blur(40px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.10)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.6)',
};

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const active = useActiveSection();

    const scrollTo = (e, href) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (!el) return;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const headerH = document.querySelector('header')?.offsetHeight ?? 80;
        const target = el.querySelector('h1, h2, h3') ?? el;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 24;
        window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 flex flex-col items-center pt-4 px-4 gap-3 pointer-events-none">

            <div
                className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 rounded-full w-full max-w-3xl"
                style={pillStyle}
            >
                <a
                    href="#"
                    onClick={(e) => scrollTo(e, '#hero')}
                    className="text-sm font-bold text-white tracking-tight mr-2 shrink-0"
                >
                    <span className="text-white/30">&lt;</span>
                    Jimmy
                    <span className="text-white/30">/&gt;</span>
                </a>

                <nav className="hidden md:flex items-center gap-1 flex-1 justify-center" aria-label="Navigation principale">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => scrollTo(e, link.href)}
                            aria-current={active === link.href ? 'location' : undefined}
                            className={clsx(
                                'px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200',
                                active === link.href
                                    ? 'text-white bg-white/10'
                                    : 'text-slate-400 hover:text-white hover:bg-white/[0.08]'
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

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

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden ml-auto text-slate-400 hover:text-white transition-colors"
                    aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        {isMobileMenuOpen
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        }
                    </svg>
                </button>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="pointer-events-auto w-full max-w-3xl rounded-2xl p-4"
                        style={pillStyle}
                    >
                        <nav className="flex flex-col gap-1" aria-label="Navigation mobile">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => scrollTo(e, link.href)}
                                    aria-current={active === link.href ? 'location' : undefined}
                                    className={clsx(
                                        'px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200',
                                        active === link.href
                                            ? 'text-white bg-white/10'
                                            : 'text-slate-300 hover:text-white hover:bg-white/5'
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="border-t border-white/[0.08] mt-2 pt-3">
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
