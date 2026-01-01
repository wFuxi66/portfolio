import { useState, useEffect } from 'react';

/**
 * TypeWriter - Animated typing effect component
 * @param {string[]} words - Array of words to cycle through
 * @param {number} typingSpeed - Speed of typing in ms
 * @param {number} deletingSpeed - Speed of deleting in ms
 * @param {number} pauseTime - Pause time between words in ms
 */
function TypeWriter({ words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[currentWordIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (currentText.length < currentWord.length) {
                    setCurrentText(currentWord.slice(0, currentText.length + 1));
                } else {
                    // Finished typing, pause then delete
                    setTimeout(() => setIsDeleting(true), pauseTime);
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    // Finished deleting, move to next word
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                }
            }
        }, isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

    return (
        <span className="inline-block">
            {currentText}
            <span className="animate-pulse text-cyan-400">|</span>
        </span>
    );
}

export default TypeWriter;
