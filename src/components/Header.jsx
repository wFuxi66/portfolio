import { useState, useEffect } from 'react';

/**
 * Header - Fixed navigation header with smooth scroll links
 */
function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: 'À Propos' },
        { href: '#formation', label: 'Formation' },
        { href: '#skills', label: 'Compétences' },
        { href: '#projects', label: 'Projets' },
        { href: '#contact', label: 'Contact' },
    ];

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-dark-950/90 backdrop-blur-md shadow-lg shadow-dark-950/50'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo / Name */}
                    <a
                        href="#"
                        className="text-xl md:text-2xl font-bold text-white hover:text-cyan-400 transition-colors duration-300"
                        onClick={(e) => scrollToSection(e, '#hero')}
                    >
                        <span className="text-cyan-600">&lt;</span>
                        Jimmy
                        <span className="text-cyan-600">/&gt;</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
                        }`}
                >
                    <div className="flex flex-col space-y-4 pt-4 border-t border-dark-800/50">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
