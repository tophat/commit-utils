const recommendedBumpOptsConfig = require('./conventional-recommended-bump')
const parserOptsConfig = require('./parser-opts')
const writerOptsConfig = require('./writer-opts')

// This NEEDS to be module.exports
module.exports = Promise.all([
    parserOptsConfig,
    recommendedBumpOptsConfig,
    writerOptsConfig,
]).then(([parserOpts, recommendedBumpOpts, writerOpts]) => ({
    conventionalChangelog: { parserOpts, writerOpts },
    parserOpts,
    recommendedBumpOpts,
    writerOpts,
}))
