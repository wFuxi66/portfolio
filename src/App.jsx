import Header from './components/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Formation from './sections/Formation';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

/**
 * App - Main application component
 */
function App() {
    return (
        <div className="min-h-screen bg-dark-950">
            <Header />

            <main>
                <Hero />
                <About />
                <Formation />
                <Skills />
                <Projects />
                <Contact />
            </main>

            {/* Footer */}
            <footer className="border-t border-dark-800/50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Jimmy ZHENG. Tous droits réservés.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        Développé avec React & Tailwind CSS
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
