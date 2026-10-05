import { meta } from '../data/meta';

export default function Footer() {
    return (
        <footer className="relative z-10">
            <div className="gold-fingers" aria-hidden="true" />
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {meta.board} · Carte mère — conçue &amp; fabriquée à Paris 13e
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    © {new Date().getFullYear()} {meta.name} · {meta.rev}
                </p>
            </div>
        </footer>
    );
}
