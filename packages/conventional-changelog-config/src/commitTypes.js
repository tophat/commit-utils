/* eslint-disable sort-keys */

const { constants } = require('@tophat/commit-utils-core')

const commitTypes = Object.values(constants.COMMIT_TYPES)

const changelogCommitTypes = commitTypes.filter(
    ({ appearsInChangelog }) => appearsInChangelog,
)

const PATCH_TYPES = ['fix', 'perf']
const FEATURE_TYPES = ['feat']

const STRATEGY = {
    MAJOR: 0,
    MINOR: 1,
    PATCH: 2,
    NONE: 3,
}

module.exports = {
    STRATEGY,
    PATCH_TYPES,
    FEATURE_TYPES,
    commitTypes,
    changelogCommitTypes,
}
