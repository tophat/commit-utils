const { constants } = require('@tophat/commit-utils-core')

const engine = require('./engine')

const { COMMIT_TYPES, MAX_HEADER_LENGTH } = constants
module.exports = engine({
    types: COMMIT_TYPES,
    maxHeaderLength: MAX_HEADER_LENGTH,
})
