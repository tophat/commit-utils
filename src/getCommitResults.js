const lint = require('@commitlint/lint')
const read = require('@commitlint/read')

const getConfig = require('./getConfig')
const { rules: RULES } = require('./rules')
// eslint-disable-next-line import/order
const { STATUSES } = require('./constants')

const getCommitMessages = async () =>
    read({ from: 'origin/master', to: 'HEAD' })

const getSingleCommitLintFailedMessage = commitResult =>
    `Fix commit lint errors - "${commitResult.input}"`

const getMultipleCommitLintsFailedMessage = () =>
    `Multiple commit lint errors, run "make lint-commit-messages" locally`

const getCommitLintResults = async () => {
    const promises = []
    const messages = await getCommitMessages()
    messages.forEach(message => {
        promises.push(lint(message, RULES))
    })
    await Promise.all(promises)
    return promises.reduce((reportAccumulator, promise) => {
        promise.then(report => reportAccumulator.push(report))
        return reportAccumulator
    }, [])
}

const GitHubService = require('./gitHubService')

const getCommitResults = async () => {
    const githubServicePromises = []
    const config = getConfig()
    const githubService = new GitHubService({
        commitSha: config.commitSha,
        githubAccessToken: config.githubAccessToken,
        repoName: config.repoName,
        repoOwner: config.repoOwner,
    })
    await githubService.start({ message: 'Checking CommitWatch...' })
    const results = await getCommitLintResults()
    let status = STATUSES.PASS
    let failSummary = ''
    const passSummary = 'All commit messages look good!'
    const lintFailures = []
    results.forEach(commitResult => {
        if (!commitResult.valid) {
            lintFailures.push(commitResult)
        }
        if (commitResult.errors.length && status === STATUSES.PASS) {
            const commitWatchMessage = getSingleCommitLintFailedMessage(
                commitResult,
            )
            githubServicePromises.push(
                githubService.fail({
                    message: commitWatchMessage,
                }),
            )
            status = STATUSES.FAIL
            failSummary = `${failSummary}, ${commitWatchMessage}`
        } else if (commitResult.errors.length && status === STATUSES.FAIL) {
            githubServicePromises.pop()
            githubServicePromises.push(
                githubService.fail({
                    message: getMultipleCommitLintsFailedMessage(),
                }),
            )
            const commitWatchMessage = getSingleCommitLintFailedMessage(
                commitResult,
            )
            failSummary = `${failSummary}, ${commitWatchMessage}`
        }
    })
    if (status !== STATUSES.FAIL) {
        githubServicePromises.push(
            githubService.pass({
                message: 'Commit messages look good!',
            }),
        )
    }

    await Promise.all(githubServicePromises)
    return {
        lintFailures,
        status,
        summary: failSummary || passSummary,
    }
}

module.exports = getCommitResults
