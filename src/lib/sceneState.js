// Shared mutable state between the DOM and the WebGL scene.
// Written by DOM event listeners, read inside useFrame — no React re-renders.

export const sceneState = {
    index: 0, // continuous section index (e.g. 2.4 = between section 2 and 3)
    progress: 0, // 0 → 1 over the whole page
    mouseX: 0, // -1 → 1
    mouseY: 0, // -1 → 1
    reducedMotion: false,
};

export function initSceneTracking(ids) {
    if (typeof window === 'undefined') return () => {};

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    sceneState.reducedMotion = mq.matches;
    const onMq = () => {
        sceneState.reducedMotion = mq.matches;
    };
    mq.addEventListener?.('change', onMq);

    let anchors = [];
    const measure = () => {
        anchors = ids.map((id) => {
            const el = document.getElementById(id);
            if (!el) return 0;
            const rect = el.getBoundingClientRect();
            return rect.top + window.scrollY + rect.height / 2;
        });
    };

    let raf = 0;
    const update = () => {
        raf = 0;
        const center = window.scrollY + window.innerHeight / 2;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        sceneState.progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

        if (anchors.length > 1) {
            let i = 0;
            while (i < anchors.length - 2 && center > anchors[i + 1]) i += 1;
            const a = anchors[i];
            const b = anchors[i + 1] ?? a + 1;
            const t = Math.min(1, Math.max(0, (center - a) / Math.max(1, b - a)));
            sceneState.index = i + t;
        }
    };

    const schedule = () => {
        if (!raf) raf = window.requestAnimationFrame(update);
    };

    const onPointer = (e) => {
        sceneState.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        sceneState.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    measure();
    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', () => {
        measure();
        schedule();
    });
    window.addEventListener('pointermove', onPointer, { passive: true });

    // Re-measure once fonts / images have settled and lazy content is mounted.
    const t1 = window.setTimeout(() => {
        measure();
        schedule();
    }, 600);
    const t2 = window.setTimeout(() => {
        measure();
        schedule();
    }, 1800);

    let ro;
    if ('ResizeObserver' in window) {
        ro = new ResizeObserver(() => {
            measure();
            schedule();
        });
        ro.observe(document.body);
    }

    return () => {
        mq.removeEventListener?.('change', onMq);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('pointermove', onPointer);
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        ro?.disconnect();
        if (raf) window.cancelAnimationFrame(raf);
    };
}
