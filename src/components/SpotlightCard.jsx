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
        let { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
        const xPct = (clientX - left) / width;
        const yPct = (clientY - top) / height;
        rotateX.set((yPct - 0.5) * -10); 
        rotateY.set((xPct - 0.5) * 10);  
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
            }}
            className={`group relative bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 overflow-hidden ${containerClassName}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(255, 255, 255, 0.08),
                            transparent 80%
                        )
                    `,
                    transform: "translateZ(0)",
                }}
            />
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
