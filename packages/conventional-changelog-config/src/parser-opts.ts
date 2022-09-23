import { commitTypes } from './commitTypes'

import type { Options } from 'conventional-commits-parser'

const config: Options = {
    headerPattern: /^(\w*)(?:\((.*)\))?: (.*)$/,
    headerCorrespondence: ['type', 'scope', 'subject'],
    noteKeywords: [
        'BREAKING CHANGE',
        ...commitTypes.map(({ prefix }) => `${prefix}(?:\\(.*\\))?`),
    ],
    revertPattern:
        /^(revert:|Revert)\s([\s\S]*?)\s*This reverts commit (\w*)\./,
    revertCorrespondence: ['prefix', 'header', 'hash'],
}

export default config
