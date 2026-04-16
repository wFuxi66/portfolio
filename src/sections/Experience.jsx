import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';
import { experiences } from '../data/experience';

function CompanyBadge({ name, size = 'lg' }) {
    const initials = name
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
        .toUpperCase();

    if (size === 'lg') {
        return (
            <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                style={{ background: 'rgba(255,255,255,0.05)' }}
            >
                <span className="text-lg font-bold text-white/60 tracking-tight font-mono">{initials}</span>
            </div>
        );
    }
    return (
        <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
            style={{ background: 'rgba(255,255,255,0.04)' }}
        >
            <span className="text-xs font-bold text-white/50 tracking-tight font-mono">{initials}</span>
        </div>
    );
}

function FeaturedCard({ exp }) {
    return (
        <SpotlightCard className="p-7 md:p-9">
            {/* Top row */}
            <div className="flex items-start gap-5 mb-7">
                <CompanyBadge name={exp.company} size="lg" />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-white tracking-tight">{exp.company}</h3>
                        {exp.current && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white bg-white/10 rounded-full border border-white/10">
                                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" aria-hidden="true" />
                                En cours
                            </span>
                        )}
                    </div>
                    <p className="text-slate-400 text-sm font-medium">{exp.role}</p>
                </div>
                <div className="hidden sm:block text-right shrink-0">
                    <p className="text-slate-300 font-mono text-xs">{exp.period}</p>
                    <p className="text-slate-600 text-xs mt-1">{exp.location}</p>
                </div>
            </div>

            {/* Mobile period */}
            <p className="sm:hidden text-slate-500 font-mono text-xs mb-5">{exp.period} · {exp.location}</p>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-white/10 pl-4 mb-6">
                {exp.description}
            </p>

            {/* Details */}
            <ul className="space-y-2.5 mb-7">
                {exp.details.map((detail, i) => (
                    <li key={i} className="text-slate-400 text-sm flex gap-3 leading-relaxed">
                        <span className="text-white/20 mt-1.5 shrink-0">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="1.5" />
                            </svg>
                        </span>
                        {detail}
                    </li>
                ))}
            </ul>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 pt-6 border-t border-white/[0.06]">
                {exp.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 text-xs font-medium text-slate-300 bg-white/5 rounded-full border border-white/10">
                        {skill}
                    </span>
                ))}
            </div>
        </SpotlightCard>
    );
}

function CompactCard({ exp }) {
    return (
        <SpotlightCard className="px-6 py-5">
            <div className="flex items-center gap-4">
                <CompanyBadge name={exp.company} size="sm" />
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <h3 className="text-sm font-semibold text-white">{exp.company}</h3>
                        <span className="text-slate-600 text-xs font-mono hidden sm:inline">{exp.period}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-0.5 truncate">{exp.role}</p>
                </div>
                <div className="shrink-0 text-right hidden sm:block">
                    <p className="text-slate-600 text-xs">{exp.location}</p>
                </div>
            </div>

            {/* Skills inline */}
            <div className="flex flex-wrap gap-1.5 mt-4 pl-[52px]">
                {exp.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 text-[10px] font-medium text-slate-500 bg-white/[0.03] rounded-full border border-white/[0.07]">
                        {skill}
                    </span>
                ))}
            </div>
        </SpotlightCard>
    );
}

function Experience() {
    const [featured, ...secondary] = experiences;

    return (
        <section id="experience" className="relative">
            <div className="section-container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-12 tracking-tight"
                >
                    Expérience Professionnelle
                </motion.h2>

                <div className="space-y-4 max-w-4xl mx-auto">
                    {/* Featured (current role) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <FeaturedCard exp={featured} />
                    </motion.div>

                    {/* Secondary roles */}
                    {secondary.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                        >
                            <CompactCard exp={exp} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
