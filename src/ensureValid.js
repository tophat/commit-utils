const logger = require('./logger')

const ensureValid = config => {
    const requiredOptionsToConnectToBuild = [
        'githubAccessToken',
        'repoOwner',
        'repoName',
        'commitSha',
    ]
    const missingOptions = requiredOptionsToConnectToBuild.reduce(
        (optionAccumulator, option) => {
            if (!config[option]) {
                optionAccumulator.push(option)
            }
            return optionAccumulator
        },
        [],
    )

    if (missingOptions.length !== 0) {
        logger.warn(`Some CI configuration options were not found (${missingOptions.join(
            ', ',
        )}):
        `)
    }
}

module.exports = ensureValid
