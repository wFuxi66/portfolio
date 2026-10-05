import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, y = 18, className = '', as = 'div' }) {
    const Comp = motion[as] ?? motion.div;
    return (
        <Comp
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -6% 0px' }}
            transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Comp>
    );
}
