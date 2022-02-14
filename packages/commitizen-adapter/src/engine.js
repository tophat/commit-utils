/* eslint-disable sort-keys */

const { compact, map, padEnd } = require('lodash')
const wrap = require('word-wrap')

const maxLineWidth = 72

module.exports = function engine(options) {
    const types = options.types

    const length =
        Object.keys(types).reduce((max, type) => Math.max(max, type.length), 0)
            .length + 1
    const choices = map(types, (type, key) => ({
        name: `${padEnd(`${key}:`, length)} ${type.description}`,
        value: key,
    }))

    return {
        // When a user runs `git cz`, prompter will be executed. We pass you
        // cz, which currently is just an instance of inquirer.js. Using
        // this you can ask questions and get answers. The commit callback
        // should be executed when you're ready to send back a commit template
        // to git. By default, we'll de-indent your commit template and will
        // keep empty lines.
        prompter(cz, commit) {
            // eslint-disable-next-line no-console
            console.log(
                `\nLine 1 will be cropped at ${maxLineWidth} characters. All other lines will be wrapped after ${maxLineWidth} characters.\n`,
            )

            // The following uses inquirer.js to populate the commit template.
            cz.prompt([
                {
                    type: 'list',
                    name: 'type',
                    message: "Select the type of change you're committing:",
                    choices,
                },
                {
                    type: 'input',
                    name: 'subject',
                    message:
                        "Write your commit message - keep it short and use the present imperative tense (e.g. 'Add stuff', not 'Adds' or 'Added'):\n",
                },
                {
                    type: 'input',
                    name: 'body',
                    message:
                        'Provide a longer description of the change: (press enter to skip)\n',
                },
                {
                    type: 'confirm',
                    name: 'isBreaking',
                    message: 'Are there any breaking changes?',
                    default: false,
                },
                {
                    type: 'expand',
                    name: 'isBreakingConfirmed',
                    message:
                        'Are you sure you want to commit breaking changes? ' +
                        'Breaking changes are backwards-incompatible public-API changes that will result in a major version bump. ' +
                        'They should only be made if absolutely necessary. Press y to continue or q to quit',
                    choices: [
                        {
                            key: 'y',
                            name: 'Yes, I want to commit breaking changes.',
                            value: 'yes',
                        },
                        {
                            key: 'q',
                            name: 'Quit',
                            value: 'quit',
                        },
                    ],
                    default: 1,
                    when(answers) {
                        return answers.isBreaking
                    },
                },
                {
                    type: 'input',
                    name: 'breaking',
                    message:
                        'Describe the breaking changes in detail and include any instructions for upgrading packages:\n',
                    when(answers) {
                        return (
                            answers.isBreaking &&
                            answers.isBreakingConfirmed === 'yes'
                        )
                    },
                },
            ]).then((answers) => {
                if (
                    answers.isBreaking &&
                    answers.isBreakingConfirmed === 'quit'
                ) {
                    // eslint-disable-next-line no-console
                    console.log('\nCommit aborted.\n')
                    return
                }

                const wrapOptions = {
                    trim: true,
                    newline: '\n',
                    indent: '',
                    width: maxLineWidth,
                }

                // Hard limit this line
                const head = `${answers.type}: ${answers.subject.trim()}`.slice(
                    0,
                    maxLineWidth,
                )

                // Wrap these lines at maxLineWidth characters
                const body = wrap(answers.body, wrapOptions)

                // Apply breaking change prefix, removing it if already present
                let breaking = answers.breaking ? answers.breaking.trim() : ''
                breaking = breaking
                    ? `BREAKING CHANGE: ${breaking.replace(
                          /^BREAKING CHANGE: /,
                          '',
                      )}`
                    : ''
                breaking = wrap(breaking, wrapOptions)

                const footer = compact([breaking]).join('\n\n')

                commit(`${head}\n\n${body}\n\n${footer}`)
            })
        },
    }
}
