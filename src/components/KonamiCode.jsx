import { useEffect, useRef, useState } from 'react';

/**
 * KonamiCode - Easter egg that triggers when the Konami Code is entered
 * ↑ ↑ ↓ ↓ ← → ← → B A
 */
function KonamiCode() {
    const [activated, setActivated] = useState(false);
    const inputSequence = useRef([]);

    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            inputSequence.current = [...inputSequence.current, e.code].slice(-konamiCode.length);

            if (inputSequence.current.length === konamiCode.length &&
                inputSequence.current.every((key, i) => key === konamiCode[i])) {
                setActivated(true);
                inputSequence.current = [];
                setTimeout(() => setActivated(false), 5000);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!activated) return null;

    return (
        <div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center">
            {/* Confetti-like effect */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: ['#00e5ff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`,
                        }}
                    />
                ))}
            </div>

            {/* Message */}
            <div className="glass-card glow-border p-8 text-center animate-bounce">
                <p className="text-4xl mb-2">🎮</p>
                <p className="text-xl font-bold text-cyan-400">Easter Egg Unlocked!</p>
                <p className="text-gray-400 text-sm mt-2">Tu as trouvé le code Konami 🎉</p>
            </div>
        </div>
    );
}

export default KonamiCode;
