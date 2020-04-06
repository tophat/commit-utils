import getCIVars from './getCIVars'
import ensureValid from './ensureValid'

const getConfig = customConfig => {
    const ciVars = getCIVars(process.env)

    const config = {
        commitSha: ciVars.commitSha,
        githubAccessToken: ciVars.githubAccessToken,
        repoName: ciVars.repoName,
        repoOwner: ciVars.repoOwner,
        ...customConfig,
    }
    ensureValid(config)
    return config
}

export default getConfig
