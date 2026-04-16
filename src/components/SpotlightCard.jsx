import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function SpotlightCard({ children, className = "", containerClassName = "" }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
    const rotateY = useTransform(mouseX, [0, 400], [-5, 5]);

    const springConfig = { damping: 25, stiffness: 150 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
        rotateX.set(((clientY - top) / height - 0.5) * -10);
        rotateY.set(((clientX - left) / width - 0.5) * 10);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
                /* Glass material */
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.13), 0 8px 32px rgba(0,0,0,0.45)',
            }}
            className={`group relative rounded-2xl transition-colors duration-300 overflow-hidden ${containerClassName}`}
            whileHover={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 12px 48px rgba(0,0,0,0.55)',
            }}
        >
            {/* Spotlight glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 255, 255, 0.07),
                            transparent 75%
                        )
                    `,
                    transform: "translateZ(0)",
                }}
            />

            {/* Content */}
            <div
                className={`relative z-10 h-full w-full ${className}`}
                style={{
                    transform: "translateZ(1px)",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "antialiased",
                }}
            >
                {children}
            </div>
        </motion.div>
    );
}
