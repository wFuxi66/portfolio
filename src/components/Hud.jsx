import { useEffect, useState } from 'react';
import { meta } from '../data/meta';
import { sections } from '../data/sections';

export default function Hud() {
    const [active, setActive] = useState('hero');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const probe = window.scrollY + window.innerHeight * 0.38;
            let current = sections[0].id;
            sections.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= probe) current = id;
            });
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflow = open ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    return (
        <header className="hud">
            <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
                <a href="#hero" className="flex shrink-0 items-center gap-3" aria-label="Haut de page">
                    <span className="monogram">JZ</span>
                    <span className="hidden flex-col leading-none sm:flex">
                        <span className="whitespace-nowrap font-display text-[13px] font-semibold tracking-[0.08em] text-silk">
                            JIMMY ZHENG
                        </span>
                        <span className="mt-1 whitespace-nowrap font-mono text-[10px] tracking-[0.22em] text-muted">
                            {meta.board} · FULL-STACK
                        </span>
                    </span>
                </a>

                <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
                    {sections.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className="hud-link whitespace-nowrap"
                            data-active={active === s.id}
                        >
                            <span className="mr-1 text-copper-dim">{s.index}</span>
                            {s.label}
                        </a>
                    ))}
                </nav>

                <div className="flex shrink-0 items-center gap-3">
                    <a href={meta.cvPath} download className="btn hidden !px-4 !py-2 sm:inline-flex">
                        CV
                    </a>
                    <button
                        type="button"
                        className="btn !px-3 !py-2 lg:hidden"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                    >
                        {open ? 'Fermer' : 'Menu'}
                    </button>
                </div>
            </div>

            {open && (
                <div id="mobile-menu" className="border-t border-line bg-[#090a0e] px-5 pb-8 pt-6 lg:hidden">
                    <nav className="flex flex-col gap-5" aria-label="Navigation mobile">
                        {sections.map((s) => (
                            <a
                                key={s.id}
                                href={`#${s.id}`}
                                className="hud-link !text-sm"
                                data-active={active === s.id}
                                onClick={() => setOpen(false)}
                            >
                                <span className="mr-2 text-copper-dim">{s.index}</span>
                                {s.label}
                            </a>
                        ))}
                    </nav>
                    <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                        <a className="btn btn-primary" href={`mailto:${meta.email}`}>
                            Écrire un e-mail
                        </a>
                        <a className="btn" href={meta.cvPath} download>
                            CV
                        </a>
                    </div>
                    <div className="mt-6 flex flex-col gap-2 font-mono text-[11px] tracking-[0.1em] text-muted">
                        <span>{meta.email}</span>
                        <span>{meta.phone}</span>
                        <span>{meta.location}</span>
                    </div>
                </div>
            )}
        </header>
    );
}
