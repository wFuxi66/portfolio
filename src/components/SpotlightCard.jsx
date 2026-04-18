import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

export default function SpotlightCard({ children, className = "", containerClassName = "" }) {
    const prefersReducedMotion = useReducedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springRotateX = useSpring(useTransform(mouseY, [0, 400], [5, -5]), springConfig);
    const springRotateY = useSpring(useTransform(mouseX, [0, 400], [-5, 5]), springConfig);

    const spotlightBg = useMotionTemplate`
        radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 255, 255, 0.06),
            transparent 75%
        )
    `;

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        if (prefersReducedMotion) return;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
        springRotateX.set(((clientY - top) / height - 0.5) * -10);
        springRotateY.set(((clientX - left) / width - 0.5) * 10);
    }

    function handleMouseLeave() {
        springRotateX.set(0);
        springRotateY.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: prefersReducedMotion ? 0 : springRotateX,
                rotateY: prefersReducedMotion ? 0 : springRotateY,
                transformStyle: "preserve-3d",
            }}
            className={`spotlight-card group relative rounded-2xl overflow-hidden ${containerClassName}`}
        >
            <div className="specular-line" aria-hidden="true" />
            <div className="shimmer-layer" aria-hidden="true" />

            {!prefersReducedMotion && (
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: spotlightBg,
                        transform: "translateZ(0)",
                        zIndex: 2,
                    }}
                />
            )}

            <div
                className={`relative h-full w-full ${className}`}
                style={{
                    transform: "translateZ(1px)",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "antialiased",
                    zIndex: 10,
                    position: 'relative',
                }}
            >
                {children}
            </div>
        </motion.div>
    );
}
