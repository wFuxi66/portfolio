/**
 * Hero Section - Main introduction with name, title, and stage objective
 */
function Hero() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-600/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl"></div>

                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>

            <div className="section-container text-center relative z-10">
                {/* Status badge */}
                <div className="animate-slide-up opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/10 border border-cyan-600/30 rounded-full mb-8">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-sm text-cyan-400 font-medium">Recherche de Stage • Avril - Juillet 2026</span>
                </div>

                {/* Name */}
                <h1 className="animate-slide-up opacity-0 delay-100 text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
                    <span className="text-white">Jimmy</span>
                    {' '}
                    <span className="text-gradient">ZHENG</span>
                </h1>

                {/* Title */}
                <p className="animate-slide-up opacity-0 delay-200 text-lg sm:text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto">
                    <span className="text-cyan-400 font-semibold">
                        Développeur Full-Stack
                    </span>
                </p>

                <p className="animate-slide-up opacity-0 delay-300 text-base sm:text-lg text-gray-500 mb-8 max-w-xl mx-auto">
                    BUT Informatique S4 • Parcours <span className="text-emerald-400 font-medium">Réseaux et Sécurité (B)</span>
                    <br />
                    <span className="text-sm">IUT d'Orsay</span>
                </p>

                {/* CTA Buttons */}
                <div className="animate-slide-up opacity-0 delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-3 bg-cyan-600 text-dark-950 font-semibold rounded-lg hover:bg-cyan-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] w-full sm:w-auto"
                    >
                        Voir mes projets
                    </a>
                    <a
                        href="/CV_Jimmy_ZHENG.pdf"
                        download
                        className="px-8 py-3 border border-cyan-600/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-600/10 transition-all duration-300 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Télécharger CV
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className="animate-slide-up opacity-0 delay-500 absolute bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-cyan-600/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-cyan-600 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
