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

                <footer className="py-10 mt-4">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-block px-6 py-3 rounded-full glass text-center">
                            <p className="text-slate-400 text-sm">
                                © {new Date().getFullYear()} Jimmy ZHENG
                            </p>
                            <p className="text-slate-600 text-xs mt-1">
                                React & Tailwind CSS
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
