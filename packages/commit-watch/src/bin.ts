import { Cli } from 'clipanion'

import { CommitWatchCommand } from './command'

const cli = new Cli({
    binaryLabel: 'commit-watch',
    binaryName: 'yarn commit-watch',
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    binaryVersion: require('../package.json').version,
})
cli.register(CommitWatchCommand)

cli.runExit(process.argv.slice(2))
