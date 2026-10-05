export default function SectionHeader({ index, title, meta }) {
    return (
        <div className="mb-9 md:mb-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-4">
                <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs tracking-[0.3em] text-copper-bright">{index}</span>
                    <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-silk sm:text-3xl md:text-4xl">
                        {title}
                    </h2>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">{meta}</span>
            </div>
        </div>
    );
}
