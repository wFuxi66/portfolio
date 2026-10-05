import { useEffect, useRef } from 'react';

export default function Crosshair() {
    const hRef = useRef(null);
    const vRef = useRef(null);
    const tagRef = useRef(null);
    const raf = useRef(0);

    useEffect(() => {
        const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!fine) return undefined;

        const move = (e) => {
            if (raf.current) return;
            raf.current = window.requestAnimationFrame(() => {
                raf.current = 0;
                const x = e.clientX;
                const y = e.clientY;
                if (hRef.current) hRef.current.style.transform = `translateY(${y}px)`;
                if (vRef.current) vRef.current.style.transform = `translateX(${x}px)`;
                if (tagRef.current) {
                    tagRef.current.style.transform = `translate(${x + 16}px, ${y + 14}px)`;
                    tagRef.current.textContent = `${String(Math.round(x)).padStart(4, '0')} · ${String(Math.round(y)).padStart(4, '0')}`;
                }
            });
        };

        window.addEventListener('pointermove', move, { passive: true });
        return () => window.removeEventListener('pointermove', move);
    }, []);

    return (
        <div className="crosshair" aria-hidden="true">
            <div className="crosshair-h" ref={hRef} />
            <div className="crosshair-v" ref={vRef} />
            <div className="crosshair-tag" ref={tagRef}>
                0000 · 0000
            </div>
        </div>
    );
}
