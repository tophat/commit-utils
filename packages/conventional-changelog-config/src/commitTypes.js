/* eslint-disable sort-keys */

const FEATURE_TYPE = 'feat'

const commitTypes = [
    { prefix: 'build', groupTitle: 'Build System', appearsInChangelog: false },
    { prefix: 'chore', groupTitle: 'Chores', appearsInChangelog: false },
    {
        prefix: 'ci',
        groupTitle: 'Continuous Integration',
        appearsInChangelog: false,
    },
    {
        prefix: 'cr',
        groupTitle: 'Addressing Code Review',
        appearsInChangelog: false,
    },
    { prefix: 'docs', groupTitle: 'Documentation', appearsInChangelog: false },
    {
        prefix: FEATURE_TYPE,
        groupTitle: 'Features',
        appearsInChangelog: true,
    },
    { prefix: 'fix', groupTitle: 'Bug Fixes', appearsInChangelog: true },
    {
        prefix: 'perf',
        groupTitle: 'Performance Improvements',
        appearsInChangelog: true,
    },
    {
        prefix: 'refactor',
        groupTitle: 'Refactoring',
        appearsInChangelog: false,
    },
    { prefix: 'revert', groupTitle: 'Reverts', appearsInChangelog: true },
    { prefix: 'style', groupTitle: 'Styling', appearsInChangelog: false },
    { prefix: 'test', groupTitle: 'Tests', appearsInChangelog: false },
    {
        prefix: 'wip',
        groupTitle: 'Work In Progress',
        appearsInChangelog: false,
    },
]

const changelogCommitTypes = commitTypes.filter(
    ({ appearsInChangelog }) => appearsInChangelog,
)

module.exports = {
    FEATURE_TYPE,
    commitTypes,
    changelogCommitTypes,
}
