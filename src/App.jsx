import { GlassFilters } from 'glass-refraction';
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
import About from './sections/About';
import Formation from './sections/Formation';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Personal from './sections/Personal';
import Contact from './sections/Contact';
import { meta } from './data/meta';

function App() {
    return (
        <div className="min-h-screen text-slate-200 lg:cursor-none" style={{ backgroundColor: '#040404' }}>

            {/* ── Monochrome depth field — give glass something to blur ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div style={{
                    position: 'absolute', top: '-10%', left: '-8%',
                    width: 700, height: 700, borderRadius: '50%',
                    background: '#ffffff', filter: 'blur(160px)', opacity: 0.05,
                }} />
                <div style={{
                    position: 'absolute', top: '40%', right: '-12%',
                    width: 520, height: 520, borderRadius: '50%',
                    background: '#ffffff', filter: 'blur(140px)', opacity: 0.04,
                }} />
                <div style={{
                    position: 'absolute', bottom: '8%', left: '18%',
                    width: 700, height: 500, borderRadius: '50%',
                    background: '#ffffff', filter: 'blur(170px)', opacity: 0.035,
                }} />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10">
                <GlassFilters scale={10} strongScale={18} baseFrequency="0.012 0.010" />
                <CustomCursor />
                <Header />

                <main>
                    <Hero />
                    <About />
                    <Formation />
                    <Experience />
                    <Skills />
                    <Projects />
                    <Personal />
                    <Contact />
                </main>

                <footer className="py-12 mt-4 border-t border-white/[0.06]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-3">
                                <span className="text-white font-semibold tracking-tight">Jimmy Zheng</span>
                                <span className="text-white/20">·</span>
                                <span className="text-slate-500 text-sm">Développeur Full Stack</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <a
                                    href={meta.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-white transition-colors text-sm"
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href={`mailto:${meta.email}`}
                                    className="text-slate-500 hover:text-white transition-colors text-sm"
                                    aria-label="Email"
                                >
                                    Email
                                </a>
                                <span className="text-slate-700 text-xs">© {new Date().getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
