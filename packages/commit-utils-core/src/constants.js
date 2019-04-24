/* eslint-disable sort-keys */
const COMMIT_TYPES = {
    wip: {
        description: 'Changes that are part of some work in progress',
        title: 'Work In Progress',
        prefix: 'wip',
        groupTitle: 'Work In Progress',
        appearsInChangelog: false,
    },
    feat: {
        description:
            'A new feature (NOTE: This will be added to the changelog)',
        title: 'Features',
        prefix: 'feat',
        groupTitle: 'Features',
        appearsInChangelog: true,
    },
    fix: {
        description: 'A bug fix (NOTE: This will be added to the changelog)',
        title: 'Bug Fixes',
        prefix: 'fix',
        groupTitle: 'Bug Fixes',
        appearsInChangelog: true,
    },
    cr: {
        description: 'Changes resulting from code review',
        title: 'Code Reviews',
        prefix: 'cr',
        groupTitle: 'Addressing Code Review',
        appearsInChangelog: false,
    },
    style: {
        description:
            "Changes that don't affect the code's meaning (whitespace, formatting, etc)",
        title: 'Styles',
        prefix: 'style',
        groupTitle: 'Styling',
        appearsInChangelog: false,
    },
    refactor: {
        description: 'Changes that neither fix a bug nor add a feature',
        title: 'Code Refactoring',
        prefix: 'refactor',
        groupTitle: 'Refactoring',
        appearsInChangelog: false,
    },
    perf: {
        description:
            'Changes that improve performance (NOTE: This will be added to the changelog)',
        title: 'Performance Improvements',
        prefix: 'perf',
        groupTitle: 'Performance Improvements',
        appearsInChangelog: true,
    },
    docs: {
        description: 'Changes to documentation only',
        title: 'Documentation',
        prefix: 'docs',
        groupTitle: 'Documentation',
        appearsInChangelog: false,
    },
    test: {
        description: 'Adding missing tests or correcting existing tests',
        title: 'Tests',
        prefix: 'test',
        groupTitle: 'Tests',
        appearsInChangelog: false,
    },
    revert: {
        description: 'Reverts a previous commit AHHHH',
        title: 'Reverts',
        prefix: 'revert',
        groupTitle: 'Reverts',
        appearsInChangelog: true,
    },
    build: {
        description:
            'Changes that affect the build system or external dependencies',
        title: 'Builds',
        prefix: 'build',
        groupTitle: 'Build System',
        appearsInChangelog: false,
    },
    ci: {
        description: 'Changes to our CI configuration files and scripts',
        title: 'Continuous Integrations',
        prefix: 'ci',
        groupTitle: 'Continuous Integration',
        appearsInChangelog: false,
    },
    chore: {
        description: "Other changes that don't modify src or test files",
        title: 'Chores',
        prefix: 'chore',
        groupTitle: 'Chores',
        appearsInChangelog: false,
    },
}

module.exports = {
    COMMIT_TYPES,
}
