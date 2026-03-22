import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function SpotlightCard({ children, className = "" }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 3D Tilt Values
    const rotateX = useTransform(mouseY, [0, 400], [5, -5]);
    const rotateY = useTransform(mouseX, [0, 400], [-5, 5]);

    const springConfig = { damping: 20, stiffness: 150 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top, width, height } = currentTarget.getBoundingClientRect();
        
        // Spotlight position
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);

        // Tilt values relative to card size
        const xPct = (clientX - left) / width;
        const yPct = (clientY - top) / height;
        
        rotateX.set((yPct - 0.5) * -10); // Tilt up/down
        rotateY.set((xPct - 0.5) * 10);  // Tilt left/right
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
            }}
            className={`group relative bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300 overflow-hidden ${className}`}
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
                    `
                }}
            />
            <div 
                className="relative z-10 h-full w-full"
                style={{ transform: "translateZ(20px)" }}
            >
                {children}
            </div>
        </motion.div>
    );
}
