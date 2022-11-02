import gitRawCommits from 'git-raw-commits'

import * as logger from '../logger'
import { type CommitWatchConfiguration } from '../types'

export async function getCommitMessages(
    config: CommitWatchConfiguration,
): Promise<string[]> {
    return new Promise((resolve, reject) => {
        const data: string[] = []
        gitRawCommits({
            from: config.baseRef,
            to: config.commitSha,
            debug: logger.debug,
        })
            .on('data', (chunk) => data.push(chunk.toString('utf-8')))
            .on('error', reject)
            .on('end', () => resolve(data))
    })
}
