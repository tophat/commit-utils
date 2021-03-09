'use strict'
const constants = require('../src/constants')

const { COMMIT_TYPES } = constants

describe('commit-utils-core', () => {
    it.each`
        commitType    | appearsInChangelog
        ${'wip'}      | ${false}
        ${'feat'}     | ${true}
        ${'fix'}      | ${true}
        ${'cr'}       | ${false}
        ${'style'}    | ${false}
        ${'refactor'} | ${false}
        ${'perf'}     | ${true}
        ${'docs'}     | ${false}
        ${'test'}     | ${false}
        ${'revert'}   | ${true}
        ${'build'}    | ${false}
        ${'ci'}       | ${false}
        ${'chore'}    | ${false}
    `(
        'commit type $commitType has the correct appearsInChangelog value of $appearsInChangelog',
        ({ commitType, appearsInChangelog }) => {
            expect(COMMIT_TYPES[commitType].appearsInChangelog).toEqual(
                appearsInChangelog,
            )
            expect(COMMIT_TYPES[commitType].prefix).toEqual(commitType)
        },
    )
})
