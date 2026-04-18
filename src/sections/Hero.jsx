import Globe from '../components/Globe';
import { StarsBackground } from '../components/StarsBackground';
import { meta } from '../data/meta';

function Hero() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Stars (transparent bg so depth orbs show through) */}
            <div className="absolute inset-0 z-0">
                <StarsBackground
                    starColor="#FFF"
                    className="w-full h-full bg-transparent"
                />
            </div>

            {/* Globe */}
            <div className="relative z-10">
                <Globe />
            </div>

            {/* Copy */}
            <div className="section-container text-center relative z-20 pointer-events-none mt-[-8vh]">

                {/* Status badge */}
                <div className="animate-slide-up opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                    style={{
                        background: 'rgba(255,255,255,0.06)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14)',
                    }}
                >
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                    <span className="text-sm font-medium text-slate-300 tracking-tight">{meta.status}</span>
                </div>

                {/* Name */}
                <h1 className="animate-slide-up opacity-0 delay-100 text-6xl sm:text-7xl md:text-9xl font-bold mb-6 tracking-tight">
                    <span className="text-white text-glow">Jimmy Zheng</span>
                </h1>

                {/* Tagline */}
                <p className="animate-slide-up opacity-0 delay-200 text-xl sm:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Développeur Full Stack & <span className="text-white font-medium">Sécurité Réseaux</span>.<br />
                    Concevoir des architectures robustes et des interfaces modernes.
                </p>

                {/* CTA */}
                <div className="animate-slide-up opacity-0 delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                            document.querySelector('#projects')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
                        }}
                        className="primary-button w-full sm:w-auto"
                        aria-label="Voir mes projets"
                    >
                        Explorer mes projets
                    </a>
                    <a
                        href={`${import.meta.env.BASE_URL}CV_Jimmy_ZHENG.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-button w-full sm:w-auto group"
                        aria-label="Consulter mon CV (PDF)"
                    >
                        <span>Voir mon CV</span>
                        <svg className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#03030c] to-transparent pointer-events-none z-10" />
        </section>
    );
}

export default Hero;
