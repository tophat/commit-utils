const { COMMIT_TYPES } = require('./constants')
const engine = require('./engine')

module.exports = engine({
    types: COMMIT_TYPES,
})
