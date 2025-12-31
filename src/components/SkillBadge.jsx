import PropTypes from 'prop-types'

/**
 * SkillBadge - A styled badge component for displaying technical skills
 * @param {string} name - The skill name to display
 * @param {string} category - 'dev' or 'network' to style differently
 */
function SkillBadge({ name, category = 'dev' }) {
    const baseClasses = "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 cursor-default select-none";

    const categoryClasses = category === 'dev'
        ? "bg-cyan-600/10 text-cyan-400 border border-cyan-600/30 hover:bg-cyan-600/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]"
        : "bg-emerald-600/10 text-emerald-400 border border-emerald-600/30 hover:bg-emerald-600/20 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]";

    return (
        <span className={`${baseClasses} ${categoryClasses}`}>
            {name}
        </span>
    );
}

SkillBadge.propTypes = {
    name: (props, propName, componentName) => {
        if (typeof props[propName] !== 'string') {
            return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expected a string.`);
        }
    },
    category: (props, propName, componentName) => {
        if (props[propName] && !['dev', 'network'].includes(props[propName])) {
            return new Error(`Invalid prop ${propName} supplied to ${componentName}. Expected 'dev' or 'network'.`);
        }
    }
};

export default SkillBadge;
