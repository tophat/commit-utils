import { constants } from '@tophat/commit-utils-core'

export const commitTypes = Object.values(constants.COMMIT_TYPES)

export const changelogCommitTypes = commitTypes.filter(
    ({ appearsInChangelog }) => appearsInChangelog,
)

// Legacy patch types will be removed in a future breaking change.
const LEGACY_PATCH_TYPES = ['perf']

export const PATCH_TYPES = [
    'fix',
    'docs',
    'deps',
    'o11y',
    ...LEGACY_PATCH_TYPES,
]

export const FEATURE_TYPES = ['feat']

export const STRATEGY = {
    MAJOR: 0,
    MINOR: 1,
    PATCH: 2,
    NONE: 3,
}
