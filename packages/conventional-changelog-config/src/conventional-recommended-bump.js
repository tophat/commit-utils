const parserOpts = require('./parser-opts')
const { FEATURE_TYPES, PATCH_TYPES, STRATEGY } = require('./commitTypes')
const { BREAKING_CHANGE } = require('./helpers')

module.exports = {
    parserOpts,

    whatBump: (commits) => {
        const titlePattern = new RegExp('^(\\w+)(\\([^)]+\\))?$', 'g')
        const level = commits.reduce((level, commit) => {
            for (const note of commit.notes) {
                if (note.title.toUpperCase().includes(BREAKING_CHANGE)) {
                    return STRATEGY.MAJOR
                }

                const matches = [...note.title.matchAll(titlePattern)]?.[0]
                const type = matches?.[1]

                if (FEATURE_TYPES.includes(type)) {
                    return Math.min(level, STRATEGY.MINOR)
                }
                if (PATCH_TYPES.includes(type)) {
                    return Math.min(level, STRATEGY.PATCH)
                }
            }

            if (commit.header?.toUpperCase().includes(BREAKING_CHANGE)) {
                return STRATEGY.MAJOR
            }

            const commitType = commit.type
            if (commitType) {
                if (FEATURE_TYPES.includes(commitType)) {
                    return Math.min(level, STRATEGY.MINOR)
                }
                if (PATCH_TYPES.includes(commitType)) {
                    return Math.min(level, STRATEGY.PATCH)
                }
            }

            if (commit.revert) {
                return Math.min(level, STRATEGY.PATCH)
            }

            return level
        }, STRATEGY.NONE)

        return {
            level: level === STRATEGY.NONE ? null : level,
            reason: '',
        }
    },
}
