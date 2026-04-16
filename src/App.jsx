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

function App() {
    return (
        <div className="min-h-screen text-slate-200 lg:cursor-none" style={{ backgroundColor: '#03030c' }}>

            {/* ── Depth orbs — give glass cards something to blur ── */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div style={{
                    position: 'absolute', top: '-18%', left: '-12%',
                    width: 700, height: 700, borderRadius: '50%',
                    background: '#1a1a50', filter: 'blur(130px)', opacity: 0.38,
                }} />
                <div style={{
                    position: 'absolute', top: '28%', right: '-18%',
                    width: 560, height: 560, borderRadius: '50%',
                    background: '#0c1e50', filter: 'blur(110px)', opacity: 0.28,
                }} />
                <div style={{
                    position: 'absolute', bottom: '5%', left: '22%',
                    width: 750, height: 550, borderRadius: '50%',
                    background: '#200a40', filter: 'blur(140px)', opacity: 0.32,
                }} />
                <div style={{
                    position: 'absolute', top: '60%', left: '-5%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: '#0a1428', filter: 'blur(90px)', opacity: 0.22,
                }} />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10">
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
                                    href="https://www.linkedin.com/in/jimmy-zheng-4a9073331/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-500 hover:text-white transition-colors text-sm"
                                    aria-label="LinkedIn"
                                >
                                    LinkedIn
                                </a>
                                <a
                                    href="mailto:zhengjimmy66@gmail.com"
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
