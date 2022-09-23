import recommendedBumpOptsConfig from './conventional-recommended-bump'
import parserOptsConfig from './parser-opts'
import writerOptsConfig from './writer-opts'

// These types can be improved (we're losing most types with the anys)
const config = Promise.all([
    parserOptsConfig as any,
    recommendedBumpOptsConfig as any,
    writerOptsConfig as any,
]).then(([parserOpts, recommendedBumpOpts, writerOpts]) => ({
    conventionalChangelog: { parserOpts, writerOpts },
    parserOpts,
    recommendedBumpOpts,
    writerOpts,
}))

export = config
