import lint from '@commitlint/lint'
import { rules } from '@tophat/commitlint-config'

import getConfig from './getConfig'
import { STATUSES } from './constants'
import GitHubService from './gitHubService'
import getCommitMessages from './getCommitMessages'

const getSingleCommitLintFailedMessage = commitResult =>
    `Fix commit lint errors - "${commitResult.input}"`

const getMultipleCommitLintsFailedMessage = () =>
    'Multiple commit lint errors, please ensure your commit messages conform to the conventional commit spec.'

const conventionalCommitSpecLink =
    'https://www.conventionalcommits.org/en/v1.0.0/'

const getCommitLintResults = async () => {
    const messages = await getCommitMessages()
    const lintedMessages = messages.map(m => {
        const lines = m.split('\n').filter(line => line.trim().length)

        // If we detect a GitHub squashed commit detected of the form:
        //
        // Some header from the PR title
        // * fix: some commit
        // * feat: some commit
        //
        // Then we skip the header. It's too late to lint it anyway.
        if (
            lines.length >= 2 &&
            !lines[0]?.startsWith('* ') &&
            lines[1]?.startsWith('* ')
        ) {
            return lines
                .slice(1)
                .filter(line => line.startsWith('* '))
                .map(line => line.substring('* '.length))
                .map(line => lint(line, rules))
        }
        return lint(m, rules)
    })
    return await Promise.all(lintedMessages.flat()).then(reports =>
        reports.flat(),
    )
}

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
                    url: conventionalCommitSpecLink,
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

export default getCommitResults
