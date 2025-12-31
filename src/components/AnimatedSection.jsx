import useScrollAnimation from '../hooks/useScrollAnimation';

/**
 * AnimatedSection - Wrapper component that animates children when scrolled into view
 * @param {React.ReactNode} children - Content to animate
 * @param {string} className - Additional CSS classes
 * @param {string} animation - Animation type: 'fade-up', 'fade-in', 'slide-left', 'slide-right'
 * @param {number} delay - Animation delay in ms
 */
function AnimatedSection({ children, className = '', animation = 'fade-up', delay = 0 }) {
    const { ref, isVisible } = useScrollAnimation();

    const getAnimationClasses = () => {
        const baseClasses = 'transition-all duration-700 ease-out';

        if (!isVisible) {
            switch (animation) {
                case 'fade-up':
                    return `${baseClasses} opacity-0 translate-y-8`;
                case 'fade-in':
                    return `${baseClasses} opacity-0`;
                case 'slide-left':
                    return `${baseClasses} opacity-0 -translate-x-8`;
                case 'slide-right':
                    return `${baseClasses} opacity-0 translate-x-8`;
                default:
                    return `${baseClasses} opacity-0 translate-y-8`;
            }
        }

        return `${baseClasses} opacity-100 translate-y-0 translate-x-0`;
    };

    return (
        <div
            ref={ref}
            className={`${getAnimationClasses()} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default AnimatedSection;
