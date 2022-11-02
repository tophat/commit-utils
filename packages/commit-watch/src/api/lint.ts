import lint from '@commitlint/lint'
import { type LintOutcome } from '@commitlint/types'

// TODO: the commitlint config should be configurable
import { rules } from '@tophat/commitlint-config'

export async function lintCommitMessages({
    messages,
}: {
    messages: string[]
}): Promise<LintOutcome[]> {
    return await Promise.all(
        messages
            .map((message) => {
                const lines = message
                    .split('\n')
                    .filter((line) => line.trim().length)

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
                        .filter((line) => line.startsWith('* '))
                        .map((line) => line.substring('* '.length))
                        .map((line) => lint(line, rules))
                }
                return lint(message, rules)
            })
            .flat(),
    ).then((reports) => reports.flat())
}
