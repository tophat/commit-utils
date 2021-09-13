const parserOpts = require('./parser-opts')
const { FEATURE_TYPES, PATCH_TYPES, STRATEGY } = require('./commitTypes')
const { BREAKING_CHANGE } = require('./helpers')

module.exports = {
    parserOpts,

    whatBump: (commits) => {
        const titlePattern = new RegExp('^(\\w+)(\\([^)]+\\))?$', 'g')
        const level = commits.reduce((level, commit) => {
            let intermediateLevel = level

            if (commit.header?.toUpperCase().startsWith(BREAKING_CHANGE)) {
                return STRATEGY.MAJOR
            }

            for (const note of commit.notes) {
                if (note.title.toUpperCase().startsWith(BREAKING_CHANGE)) {
                    return STRATEGY.MAJOR
                }

                const matches = [...note.title.matchAll(titlePattern)]?.[0]
                const type = matches?.[1]

                if (FEATURE_TYPES.includes(type)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.MINOR,
                    )
                    continue
                }
                if (PATCH_TYPES.includes(type)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.PATCH,
                    )
                    continue
                }
            }

            const commitType = commit.type
            if (commitType) {
                if (FEATURE_TYPES.includes(commitType)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.MINOR,
                    )
                }
                if (PATCH_TYPES.includes(commitType)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.PATCH,
                    )
                }
            }

            if (commit.revert) {
                intermediateLevel = Math.min(intermediateLevel, STRATEGY.PATCH)
            }

            return intermediateLevel
        }, STRATEGY.NONE)

        return {
            level: level === STRATEGY.NONE ? null : level,
            reason: '',
        }
    },
}
