const parserOpts = require('./parser-opts')
const { FEATURE_TYPE } = require('./commitTypes')
const { isNoteOfType, BREAKING_CHANGE } = require('./helpers')

const MAJOR = 0
const MINOR = 1
const PATCH = 2

module.exports = {
    parserOpts,

    whatBump: commits => {
        let level = PATCH
        let breakings = 0
        let features = 0

        commits.forEach(commit => {
            commit.notes.forEach(note => {
                if (note.title === BREAKING_CHANGE) {
                    breakings += 1
                    level = MAJOR
                } else if (isNoteOfType(note.title, FEATURE_TYPE)) {
                    features += 1
                    if (level === PATCH) {
                        level = MINOR
                    }
                }
            })

            if (commit.type === FEATURE_TYPE) {
                features += 1
                if (level === PATCH) {
                    level = MINOR
                }
            }
        })

        return {
            level,
            reason: `${BREAKING_CHANGE}s: ${breakings}; features: ${features}`,
        }
    },
}
