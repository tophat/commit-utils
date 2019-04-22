/* eslint-disable sort-keys */

const { commitTypes } = require('./commitTypes')

module.exports = {
    headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
    headerCorrespondence: ['type', 'scope', 'subject'],
    noteKeywords: [
        'BREAKING CHANGE',
        ...commitTypes.map(({ prefix }) => `${prefix}(?:\\(.*\\))?`),
    ],
    revertPattern: /^(revert:|Revert)\s([\s\S]*?)\s*This reverts commit (\w*)\./,
    revertCorrespondence: ['prefix', 'header', 'hash'],
}
