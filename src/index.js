const chalk = require('chalk')
const builder = require('junit-report-builder')

const logger = require('./logger')
const { STATUSES } = require('./constants')
const getCommitResults = require('./getCommitResults')

const format = require('@commitlint/format')

function buildJunitFile(lintFailures) {
    const suite = builder.testSuite().name('commitwatch')

    lintFailures.forEach(failure => {
        const lines = [
            `input: ${failure.input}`,
            ...format(failure, { color: false }),
        ]
        suite
            .testCase()
            .className('commitlint')
            .failure(lines.join('\n'))
    })

    builder.writeTo('artifacts/test_results/commitwatch/commitwatch.junit.xml')
}

const main = async () => {
    const results = await getCommitResults()

    if (results.status === STATUSES.FAIL) {
        logger.log(chalk.redBright(`commitWatch FAIL`))
        logger.log(results.summary)
        logger.log('')
        buildJunitFile(results.lintFailures)
        return 1
    }

    if (results.status === STATUSES.WARN) {
        logger.log(chalk.redBright(`commitWatch WARN`))
        logger.log(results.summary)
        return 0
    }

    logger.log(chalk.greenBright(`commitWatch PASS`))
    logger.log(results.summary)
    return 0
}

const mainSafe = async () => {
    try {
        const errorCode = await main()
        return errorCode
    } catch (error) {
        if (error.type === 'ValidationError') {
            logger.fatal(error.message)
            return 1
        }

        logger.fatal(`Uncaught exception`, error)
        return 1
    }
}

mainSafe().then(errorCode => {
    process.exitCode = errorCode
})
