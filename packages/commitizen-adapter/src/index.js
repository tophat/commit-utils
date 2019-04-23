const {constants} = require('@tophat/commit-utils-core')
const engine = require('./engine')

const { COMMIT_TYPES } = constants
module.exports = engine({
    types: COMMIT_TYPES,
})
