/* eslint-disable sort-keys */

const FEATURE_TYPE = 'feat'
const { constants } = require('@tophat/commit-utils-core')
const commitTypes = Object.values(constants.COMMIT_TYPES)

const changelogCommitTypes = commitTypes.filter(
    ({ appearsInChangelog }) => appearsInChangelog,
)

module.exports = {
    FEATURE_TYPE,
    commitTypes,
    changelogCommitTypes,
}
