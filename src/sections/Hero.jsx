import Globe from '../components/Globe';
import { StarsBackground } from '../components/StarsBackground';

function Hero() {
    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Twinkling Stars Background with exact requested gradient */}
            <StarsBackground 
                starColor="#FFF" 
                className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_bottom,_#262626_0%,_#000_100%)]" 
            />

            {/* The Huge Premium Globe */}
            <Globe />

            <div className="section-container text-center relative z-20 pointer-events-none mt-[-10vh]">
                {/* Status badge - Clean Apple Style */}
                <div className="animate-slide-up opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                    <span className="text-sm font-medium text-slate-300">Recherche de Stage • Avril - Juillet 2026</span>
                </div>

                {/* Name */}
                <h1 className="animate-slide-up opacity-0 delay-100 text-6xl sm:text-7xl md:text-9xl font-semibold mb-6 tracking-tight">
                    <span className="text-white text-glow">Jimmy Zheng</span>
                </h1>

                {/* Title */}
                <p className="animate-slide-up opacity-0 delay-200 text-xl sm:text-2xl text-slate-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                    Développeur Full Stack & <span className="text-white">Sécurité Réseaux</span>.<br />
                    Concevoir des architectures robustes et des interfaces modernes.
                </p>

                {/* CTA Buttons */}
                <div className="animate-slide-up opacity-0 delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center pointer-events-auto">
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="primary-button w-full sm:w-auto"
                    >
                        Explorer mes projets
                    </a>
                    <a
                        href={`${import.meta.env.BASE_URL}CV_Jimmy_ZHENG.pdf`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-button w-full sm:w-auto group"
                    >
                        <span>Voir mon CV</span>
                        <svg className="w-4 h-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
            
            {/* Subtle Gradient Overlay at bottom to blend into the next section */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>
        </section>
    );
}

export default Hero;
