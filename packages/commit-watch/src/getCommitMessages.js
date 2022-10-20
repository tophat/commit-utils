import gitRawCommits from 'git-raw-commits'

import getConfig from './getConfig'
import logger from './logger'

const getCommitMessages = async () => {
    const config = getConfig()

    const from = config.baseBranch
    const to = config.commitSha

    return new Promise((resolve, reject) => {
        const data = []
        const readStream = gitRawCommits({ from, to, debug: logger.info })
        readStream.on('data', chunk => data.push(chunk.toString('utf-8')))
        readStream.on('error', reject)
        readStream.on('end', () => resolve(data))
    })
}

export default getCommitMessages
