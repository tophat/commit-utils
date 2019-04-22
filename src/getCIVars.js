const getCIVars = env => {
    let repo
    let repoOwner
    let repoName

    repoOwner = env.CI_REPO_OWNER
    repoName = env.CI_REPO_NAME
    const commitSha = env.CI_COMMIT_SHA || env.GIT_COMMIT
    repo = env.CI_REPO_NAME

    if (!repo) {
        const gitUrl = env.GIT_URL
        if (gitUrl) {
            const GET_REPO_FROM_STRING = /github\.com[/:](.*).git/
            const repoMatcher = GET_REPO_FROM_STRING.exec(gitUrl)
            repo = repoMatcher[1]
        }
    }

    if (repo) {
        if (!repoOwner) {
            repoOwner = repo.split('/')[0]
        }
        if (!repoName) {
            repoName = repo.split('/')[1]
        }
    }

    const githubAccessToken = env.COMMITWATCH_GITHUB_TOKEN

    return {
        commitSha,
        githubAccessToken,
        repoName,
        repoOwner,
    }
}

module.exports = getCIVars
