/* eslint-disable sort-keys */

/**
 * These legacy types will be removed in a future breaking change.
 */
const LEGACY_COMMIT_TYPES = {
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
    perf: {
        description:
            'Changes that improve performance (NOTE: This will be added to the changelog)',
        title: 'Performance Improvements',
        prefix: 'perf',
        groupTitle: 'Performance Improvements',
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

const COMMIT_TYPES = {
    feat: {
        description: 'A new feature, a new export, new component, utils, etc.',
        title: 'Features',
        prefix: 'feat',
        groupTitle: 'Features',
        appearsInChangelog: true,
    },
    fix: {
        description:
            'A bug fix which does not affect the public API. This includes performance and accessibility fixes.',
        title: 'Bug Fixes',
        prefix: 'fix',
        groupTitle: 'Bug Fixes',
        appearsInChangelog: true,
    },
    deps: {
        description:
            'Dependency updates that affect public consumption of the package (i.e. package.json changes, not devDep changes).',
        title: 'Dependencies',
        prefix: 'deps',
        groupTitle: 'Dependencies',
        appearsInChangelog: true,
    },
    o11y: {
        description: 'Monitoring, observability, and analytics.',
        title: 'Observability & Analytics',
        groupTitle: 'Observability & Analytics',
        prefix: 'o11y',
        appearsInChangelog: true,
    },
    refactor: {
        description:
            "Changes to the internals of a package to make it easier to maintain. No public API. Doesn't affect versions at all.",
        title: 'Code Refactoring',
        prefix: 'refactor',
        groupTitle: 'Refactoring',
        appearsInChangelog: false,
    },
    docs: {
        description:
            'Improvements to documentation, including docstring enhancements.',
        title: 'Documentation',
        prefix: 'docs',
        groupTitle: 'Documentation',
        appearsInChangelog: false,
    },
    test: {
        description:
            'Modifications to test files. No impact to the public API.',
        title: 'Tests',
        prefix: 'test',
        groupTitle: 'Tests',
        appearsInChangelog: false,
    },
    revert: {
        description: 'Reverts a previous commit.',
        title: 'Reverts',
        prefix: 'revert',
        groupTitle: 'Reverts',
        appearsInChangelog: true,
    },
    wip: {
        description:
            'Changes that are part of some work in progress. This sort of message can exist on a feature branch but should not be merged to the main branch.',
        title: 'Work In Progress',
        prefix: 'wip',
        groupTitle: 'Work In Progress',
        appearsInChangelog: false,
    },
    ...LEGACY_COMMIT_TYPES,
}

module.exports = {
    COMMIT_TYPES,
}
