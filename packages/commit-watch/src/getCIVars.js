const getRepo = configs => {
    if (configs.CI_REPO_NAME) {
        return configs.CI_REPO_NAME
    }

    const GET_REPO_FROM_STRING = /github\.com[/:](.*).git/
    if (configs.GIT_URL) {
        return GET_REPO_FROM_STRING.exec(configs.GIT_URL)[1]
    }
    return null
}

const getCIVars = configs => {
    const commitSha = configs.CI_COMMIT_SHA || configs.GIT_COMMIT
    const baseBranch = configs.CI_BASE_BRANCH || 'origin/master'
    const githubAccessToken = configs.GITHUB_TOKEN

    const repo = getRepo(configs)
    const repoOwner = configs.CI_REPO_OWNER || repo?.split('/')[0]
    const repoName = configs.CI_REPO_NAME || repo?.split('/')[1]

    return {
        baseBranch,
        commitSha,
        githubAccessToken,
        repoName,
        repoOwner,
    }
}

export default getCIVars
