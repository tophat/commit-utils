module.exports = {
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/npm', { npmPublish: false }],
        ['@semantic-release/git', {
            assets: ['CHANGELOG.md', 'package.json'],
            message: "chore(release): update changelog for ${nextRelease.version} [skip ci]",
        }],
    ],
    branches: ['master']
}
