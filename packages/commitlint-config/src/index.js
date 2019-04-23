const { constants } = require('@tophat/commit-utils-core')
const { COMMIT_TYPES } = constants

module.exports = {
    rules: {
        'body-leading-blank': [1, 'always'],
        'footer-leading-blank': [1, 'always'],
        'header-max-length': [2, 'always', 72],
        'subject-empty': [2, 'never'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [
            2,
            'always',
            Object.keys(COMMIT_TYPES),
        ],
    },
}
