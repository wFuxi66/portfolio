import PropTypes from 'prop-types'

/**
 * SkillBadge - A styled badge component for displaying technical skills
 * @param {string} name - The skill name to display
 */
function SkillBadge({ name }) {
    return (
        <span className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 cursor-default select-none bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white">
            {name}
        </span>
    );
}

SkillBadge.propTypes = {
    name: PropTypes.string.isRequired
};

export default SkillBadge;
