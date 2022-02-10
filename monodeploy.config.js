module.exports = {
    git: {
        push: true,
    },
    changesetIgnorePatterns: ['**/*.test.ts', '**/*.test.js'],
    conventionalChangelogConfig: '@tophat/conventional-changelog-config',
    autoCommit: true,
    autoCommitMessage: 'chore: release commit-watch [skip ci]',
    changelogFilename: 'CHANGELOG.md',
    persistVersions: true,
    plugins: ['@monodeploy/plugin-github'],
}
