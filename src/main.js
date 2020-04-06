import path from 'path'

import chalk from 'chalk'
import builder from 'junit-report-builder'
import format from '@commitlint/format'

import logger from './logger'
import { EXIT_FAILURE, EXIT_SUCCESS, STATUSES } from './constants'
import getCommitResults from './getCommitResults'

function buildJunitFile({ lintFailures, outputDir, outputFilename }) {
    const suite = builder.testSuite().name('commitwatch')

    lintFailures.forEach(failure => {
        const lines = [
            `input: ${failure.input}`,
            format(failure, { color: false }),
        ]
        suite.testCase().className('commitlint').failure(lines.join('\n'))
    })

    builder.writeTo(path.join(outputDir, outputFilename))
}

const main = async () => {
    const results = await getCommitResults()

    if (results.status === STATUSES.FAIL) {
        logger.log(chalk.redBright('commitWatch FAIL'))
        logger.log(results.summary)
        logger.log('')
        buildJunitFile({
            lintFailures: results.lintFailures,
            outputDir:
                process.env.COMMIT_WATCH_OUTPUT_DIR ??
                'artifacts/test_results/commitwatch/',
            outputFilename:
                process.env.COMMIT_WATCH_OUTPUT_FILENAME ??
                'commitwatch.junit.xml',
        })
        return EXIT_FAILURE
    }

    if (results.status === STATUSES.WARN) {
        logger.log(chalk.redBright('commitWatch WARN'))
        logger.log(results.summary)
        return EXIT_SUCCESS
    }

    logger.log(chalk.greenBright('commitWatch PASS'))
    logger.log(results.summary)
    return EXIT_SUCCESS
}

const mainSafe = async () => {
    try {
        return await main()
    } catch (error) {
        if (error?.type === 'ValidationError') {
            logger.fatal(error.message)
            return EXIT_FAILURE
        }

        logger.fatal('Uncaught exception', error)
        return 1
    }
}

export default mainSafe
