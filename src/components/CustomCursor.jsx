import { useEffect, useState } from 'react';

/**
 * CustomCursor - A custom cursor ring that follows the mouse
 * Only shown on desktop (hidden on touch devices)
 */
function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        // Only enable on non-touch devices
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Detect hovering over interactive elements
        const handleElementHover = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('hover-glow') ||
                target.classList.contains('glass-card');
            setIsHovering(isInteractive);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleElementHover);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleElementHover);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Outer ring */}
            <div
                className="pointer-events-none fixed z-[9999] rounded-full border border-cyan-500/50 transition-transform duration-150 ease-out"
                style={{
                    left: position.x,
                    top: position.y,
                    width: isHovering ? '50px' : '30px',
                    height: isHovering ? '50px' : '30px',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: isHovering ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                }}
            />
            {/* Inner dot */}
            <div
                className="pointer-events-none fixed z-[9999] w-1.5 h-1.5 rounded-full bg-cyan-400"
                style={{
                    left: position.x,
                    top: position.y,
                    transform: 'translate(-50%, -50%)',
                }}
            />
        </>
    );
}

export default CustomCursor;
