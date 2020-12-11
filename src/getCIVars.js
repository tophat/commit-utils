const getRepo = env => {
    if (env.CI_REPO_NAME) {
        return env.CI_REPO_NAME
    }

    const GET_REPO_FROM_STRING = /github\.com[/:](.*).git/
    if (env.GIT_URL) {
        return GET_REPO_FROM_STRING.exec(env.GIT_URL)[1]
    }
    return null
}

const getCIVars = env => {
    const commitSha = env.CI_COMMIT_SHA || env.GIT_COMMIT
    const baseBranch = env.CI_BASE_BRANCH || 'origin/master'
    const githubAccessToken = env.COMMITWATCH_GITHUB_TOKEN

    const repo = getRepo(env)
    const repoOwner = env.CI_REPO_OWNER || repo?.split('/')[0]
    const repoName = env.CI_REPO_NAME || repo?.split('/')[1]

    return {
        baseBranch,
        commitSha,
        githubAccessToken,
        repoName,
        repoOwner,
    }
}

export default getCIVars
