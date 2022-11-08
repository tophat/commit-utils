import { Command, Option } from 'clipanion'
import * as t from 'typanion'

import { runCommitWatch } from './api'
import { type CommitWatchConfiguration } from './types'

export class CommitWatchCommand extends Command {
    outputDirectory = Option.String('--output-dir', {
        validator: t.isString(),
        description: 'Directory for JUnit reports.',
        required: false,
    })

    outputFilename = Option.String('--output-filename', {
        validator: t.isString(),
        description: 'Filename for JUnit report.',
        required: false,
    })

    githubToken = Option.String('--github-token', {
        validator: t.isString(),
        description: 'GitHub token for status checks.',
        required: false,
    })

    commitSha = Option.String('--commit-sha', {
        validator: t.isString(),
        description: 'The commit sha to analyze.',
        required: false,
    })

    baseRef = Option.String('--base-ref', {
        validator: t.isString(),
        description:
            'Base ref for analysis. All commits between base ref and commit sha are analyzed.',
        required: false,
    })

    repositoryOwner = Option.String('--repo-owner', {
        validator: t.isString(),
        description: 'Repository owner.',
        required: false,
    })

    repositoryName = Option.String('--repo-name', {
        validator: t.isString(),
        description: 'Repository name.',
        required: false,
    })

    failOnGitHubErrors = Option.Boolean('--fail-on-github-errors', false, {
        description: 'Whether to fail on GitHub errors.',
    })

    async execute(): Promise<number | void> {
        const commitSha =
            this.commitSha || process.env.CI_COMMIT_SHA || undefined
        const baseRef =
            this.baseRef ||
            process.env.CI_BRANCH ||
            process.env.CI_BASE_BRANCH ||
            undefined

        if (!commitSha || !baseRef) {
            throw new Error('Both a commit sha and base ref are required.')
        }

        const config: CommitWatchConfiguration = {
            outputDirectory:
                this.outputDirectory ||
                process.env.COMMIT_WATCH_OUTPUT_DIR ||
                undefined,
            outputFilename:
                this.outputFilename ||
                process.env.COMMIT_WATCH_OUTPUT_FILENAME ||
                'commitwatch.junit.xml',
            githubToken:
                this.githubToken ||
                process.env.COMMITWATCH_GITHUB_TOKEN ||
                undefined,
            repository: {
                owner:
                    this.repositoryOwner ||
                    process.env.CI_REPO_OWNER ||
                    undefined,
                name:
                    this.repositoryName ||
                    process.env.CI_REPO_NAME ||
                    undefined,
            },
            commitSha,
            baseRef,
            failOnGitHubErrors: this.failOnGitHubErrors || false,
        }

        try {
            await runCommitWatch(config)
            return 0
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)
            return 1
        }
    }
}
