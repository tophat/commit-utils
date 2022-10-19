import { constants } from '@tophat/commit-utils-core'

import engine from './engine'

const { COMMIT_TYPES } = constants

const Engine = engine({
    types: COMMIT_TYPES,
})

export = Engine
