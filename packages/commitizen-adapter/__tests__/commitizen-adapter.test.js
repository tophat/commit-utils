'use strict'
const { constants } = require('@tophat/commit-utils-core')
const { COMMIT_TYPES } = constants
const engine = require('../src/engine')

describe('conventional-changelog-config', () => {
    describe('engine', () => {
        const testEngine = engine({ types: COMMIT_TYPES })
        const mockCommitBody = 'Mary Ellen Carter, rise again!'
        const mockCommitType = COMMIT_TYPES.fix.prefix
        const mockCommitSubject = 'Put cables to her fore and aft'
        const mockBreakingMessage = "We've patched her rents, stopped her vents"

        it('calls commit callback', async () => {
            const mockAnswer = {
                body: mockCommitBody,
                type: mockCommitType,
                subject: mockCommitSubject,
                isBreaking: false,
            }
            const cz = { prompt: jest.fn(() => Promise.resolve(mockAnswer)) }
            const commit = jest.fn()
            await testEngine.prompter(cz, commit)
            expect(commit).toHaveBeenCalledWith(
                `${mockCommitType}: ${mockCommitSubject}\n\n${mockCommitBody}\n\n`,
            )
        })

        it('calls commit callback on breaking change', async () => {
            const mockAnswer = {
                body: mockCommitBody,
                type: mockCommitType,
                subject: mockCommitSubject,
                breaking: mockBreakingMessage,
                isBreaking: true,
                isBreakingConfirmed: 'yes',
            }
            const cz = { prompt: jest.fn(() => Promise.resolve(mockAnswer)) }
            const commit = jest.fn()
            await testEngine.prompter(cz, commit)
            expect(commit).toHaveBeenCalledWith(
                `${mockCommitType}: ${mockCommitSubject}\n\n${mockCommitBody}\n\nBREAKING CHANGE: ${mockBreakingMessage}`,
            )
        })

        it('aborts if author does not want to commit breaking change', async () => {
            const mockAnswer = {
                body: mockCommitBody,
                type: mockCommitType,
                subject: mockCommitSubject,
                breaking: mockBreakingMessage,
                isBreaking: true,
                isBreakingConfirmed: 'quit',
            }
            const cz = { prompt: jest.fn(() => Promise.resolve(mockAnswer)) }
            const commit = jest.fn()
            await testEngine.prompter(cz, commit)
            expect(commit).not.toHaveBeenCalled()
        })
    })
})
