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

/**
 * App - Main application component
 */
function App() {
    return (
        <div className="min-h-screen bg-black text-slate-200 lg:cursor-none">
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

            {/* Footer */}
            <footer className="border-t border-white/10 py-8 bg-black">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Jimmy ZHENG. Tous droits réservés.
                    </p>
                    <p className="text-slate-600 text-xs mt-2">
                        Développé avec React & Tailwind CSS
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
