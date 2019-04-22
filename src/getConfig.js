const lodashMerge = require('lodash.merge')

const getCIVars = require('./getCIVars')
const ensureValid = require('./ensureValid')

const ciVars = getCIVars(process.env)

const defaultConfig = {
    commitSha: ciVars.commitSha,
    githubAccessToken: ciVars.githubAccessToken,
    repoName: ciVars.repoName,
    repoOwner: ciVars.repoOwner,
}

const getConfig = customConfig => {
    const config = lodashMerge({}, defaultConfig, customConfig)
    ensureValid(config)
    return config
}

module.exports = getConfig
