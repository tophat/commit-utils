/* eslint-disable sort-keys */

const COMMIT_TYPES = {
    wip: {
        description: 'Changes that are part of some work in progress',
        title: 'Work In Progress',
    },
    feat: {
        description:
            'A new feature (NOTE: This will be added to the changelog)',
        title: 'Features',
    },
    fix: {
        description: 'A bug fix (NOTE: This will be added to the changelog)',
        title: 'Bug Fixes',
    },
    cr: {
        description: 'Changes resulting from code review',
        title: 'Code Reviews',
    },
    style: {
        description:
            "Changes that don't affect the code's meaning (whitespace, formatting, etc)",
        title: 'Styles',
    },
    refactor: {
        description: 'Changes that neither fix a bug nor add a feature',
        title: 'Code Refactoring',
    },
    perf: {
        description:
            'Changes that improve performance (NOTE: This will be added to the changelog)',
        title: 'Performance Improvements',
    },
    docs: {
        description: 'Changes to documentation only',
        title: 'Documentation',
    },
    test: {
        description: 'Adding missing tests or correcting existing tests',
        title: 'Tests',
    },
    revert: {
        description: 'Reverts a previous commit',
        title: 'Reverts',
    },
    build: {
        description:
            'Changes that affect the build system or external dependencies',
        title: 'Builds',
    },
    ci: {
        description: 'Changes to our CI configuration files and scripts',
        title: 'Continuous Integrations',
    },
    chore: {
        description: "Other changes that don't modify src or test files",
        title: 'Chores',
    },
}

module.exports = {
    COMMIT_TYPES,
}
