/**
 * SkillBar - A progress bar component for displaying skill levels
 * @param {string} name - The skill name
 * @param {number} level - Skill level from 1-5
 * @param {string} category - 'dev' or 'network' for styling
 */
function SkillBar({ name, level, category = 'dev' }) {
    const percentage = (level / 5) * 100;

    const getLevelLabel = (lvl) => {
        switch (lvl) {
            case 1: return 'Débutant';
            case 2: return 'Basique';
            case 3: return 'Intermédiaire';
            case 4: return 'Avancé';
            case 5: return 'Expert';
            default: return '';
        }
    };

    const barColor = category === 'dev'
        ? 'from-cyan-500 to-cyan-400'
        : 'from-emerald-500 to-emerald-400';

    const bgColor = category === 'dev'
        ? 'bg-cyan-600/20'
        : 'bg-emerald-600/20';

    return (
        <div className="group">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-200 font-medium text-sm">{name}</span>
                <span className={`text-xs ${category === 'dev' ? 'text-cyan-400' : 'text-emerald-400'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    {getLevelLabel(level)}
                </span>
            </div>
            <div className={`h-2 rounded-full ${bgColor} overflow-hidden`}>
                <div
                    className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default SkillBar;
