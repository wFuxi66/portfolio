import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import BoardCanvas from './three/BoardCanvas';
import Hud from './components/Hud';
import Crosshair from './components/Crosshair';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Profil from './sections/Profil';
import Formation from './sections/Formation';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import { initSceneTracking } from './lib/sceneState';
import { sectionIds } from './data/sections';

export default function App() {
    useEffect(() => initSceneTracking(sectionIds), []);

    // Deep links: the browser resolves #anchors before React mounts, so scroll again.
    useEffect(() => {
        const { hash } = window.location;
        if (!hash) return undefined;
        const timer = window.setTimeout(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 350);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <MotionConfig reducedMotion="user">
            <div className="relative min-h-screen">
                <a href="#main" className="skip-link">
                    Aller au contenu principal
                </a>

                <BoardCanvas />
                <Crosshair />
                <Hud />

                <main id="main" className="relative z-10">
                    <Hero />
                    <Profil />
                    <Formation />
                    <Experience />
                    <Projects />
                    <Skills />
                    <Contact />
                </main>

                <Footer />
            </div>
        </MotionConfig>
    );
}
