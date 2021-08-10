module.exports = {
    git: {
        push: true,
    },
    changesetIgnorePatterns: ['**/*.test.ts', '**/*.test.js'],
    conventionalChangelogConfig: '@tophat/conventional-changelog-config',
    autoCommit: true,
    autoCommitMessage: 'chore: release commit-utils [skip ci]',
    changelogFilename: 'CHANGELOG.md',
    persistVersions: true,
}
