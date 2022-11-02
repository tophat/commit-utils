import path from 'path'

import { formatResult } from '@commitlint/format'
import builder from 'junit-report-builder'

import { type CommitWatchConfiguration } from '../types'

import { GitHubChecks } from './GitHubChecks'
import { getCommitMessages } from './commits'
import { lintCommitMessages } from './lint'

export async function runCommitWatch(
    config: CommitWatchConfiguration,
): Promise<void> {
    const checks = new GitHubChecks(config)
    await checks.update({
        description: 'Linting commit messages...',
        state: 'pending',
    })

    try {
        const messages = await getCommitMessages(config)
        const lintResults = await lintCommitMessages({ messages })

        const failures = lintResults.filter(
            (result) => !result.valid || result.errors.length,
        )

        if (!messages.length) {
            throw new Error('No commit messages found.')
        }

        if (failures.length) {
            await checks.update({
                description:
                    failures.length > 1
                        ? `${failures.length} invalid commit messages found.`
                        : `Invalid commit: "${failures[0].input}"`,
                state: 'failure',
            })
        } else {
            await checks.update({
                description: `${messages.length} commit${
                    messages.length === 1 ? '' : 's'
                } linted. All valid.`,
                state: 'success',
            })
        }

        if (config.outputDirectory && config.outputFilename) {
            const suite = builder.testSuite().name('Commit Watch')

            for (const failure of failures) {
                suite
                    .testCase()
                    .className('commitlint')
                    .failure(
                        [
                            `input: ${failure.input}`,
                            formatResult(failure, { color: false }),
                        ].join('\n'),
                    )
            }

            builder.writeTo(
                path.resolve(config.outputDirectory, config.outputFilename),
            )
        }

        if (failures.length) {
            throw new Error(
                failures.length > 1
                    ? `${failures.length} invalid commit messages found.`
                    : `Invalid commit: "${failures[0].input}"`,
            )
        }
    } catch (error) {
        if (checks.getLastState() === 'pending') {
            checks.update({
                description: 'Something went wrong. See stderr.',
                state: 'error',
            })
        }
        throw error
    }
}
