'use strict'
const constants = require('../src/constants')

const { COMMIT_TYPES } = constants

describe('commit-utils-core', () => {
    it.each`
        commitType    | appearsInChangelog
        ${'wip'}      | ${false}
        ${'feat'}     | ${true}
        ${'fix'}      | ${true}
        ${'refactor'} | ${false}
        ${'docs'}     | ${false}
        ${'test'}     | ${false}
        ${'revert'}   | ${true}
        ${'o11y'}     | ${true}
        ${'deps'}     | ${true}
    `(
        'commit type $commitType has the correct appearsInChangelog value of $appearsInChangelog',
        ({ commitType, appearsInChangelog }) => {
            expect(COMMIT_TYPES[commitType].appearsInChangelog).toEqual(
                appearsInChangelog,
            )
            expect(COMMIT_TYPES[commitType].prefix).toEqual(commitType)
        },
    )

    it.each`
        commitType | appearsInChangelog
        ${'perf'}  | ${true}
        ${'build'} | ${false}
        ${'ci'}    | ${false}
        ${'chore'} | ${false}
    `(
        'LEGACY: commit type $commitType has the correct appearsInChangelog value of $appearsInChangelog',
        ({ commitType, appearsInChangelog }) => {
            expect(COMMIT_TYPES[commitType].appearsInChangelog).toEqual(
                appearsInChangelog,
            )
            expect(COMMIT_TYPES[commitType].prefix).toEqual(commitType)
        },
    )
})
