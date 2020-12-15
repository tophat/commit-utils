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
        const mockBreakingMessage = 'We\'ve patched her rents, stopped her vents'

        const cz = { prompt : jest.fn(() => Promise.resolve(mockAnswer))}
        const getMockCz = mockAnswer => ({
            prompt: jest.fn(() => Promise.resolve(mockAnswer))
        })

        it('calls commit callback', async () => {
            const mockAnswer = {
                body: mockCommitBody,
                type: mockCommitType,
                subject: mockCommitSubject,
                isBreaking: false,
            }
            const cz = getMockCz(mockAnswer)
            const commitCallback = jest.fn()
            await testEngine.prompter(cz, commitCallback)
            expect(commitCallback).toHaveBeenCalledWith(
                `${mockCommitType}: ${mockCommitSubject}\n\n${mockCommitBody}\n\n`,
            )
        })

        it('calls commit callback on breaking change(s)', async () => {
            const mockAnswer = {
                body: mockCommitBody,
                type: mockCommitType,
                subject: mockCommitSubject,
                breaking: mockBreakingMessage,
                isBreaking: true,
                isBreakingConfirmed: 'yes',
            }
            const cz = getMockCz(mockAnswer)
            const commitCallback = jest.fn()
            await testEngine.prompter(cz, commitCallback)
            expect(commitCallback).toHaveBeenCalledWith(
                `${mockCommitType}: ${mockCommitSubject}\n\n${mockCommitBody}\n\nBREAKING CHANGE: ${mockBreakingMessage}`,
            )
        })

        it('aborts if author does not want to commit breaking change(s)', async () => {
            const mockAnswer = {
                body: mockCommitBody,
                type: mockCommitType,
                subject: mockCommitSubject,
                breaking: mockBreakingMessage,
                isBreaking: true,
                isBreakingConfirmed: 'quit',
            }
            const cz = getMockCz(mockAnswer)
            const commitCallback = jest.fn()
            await testEngine.prompter(cz, commitCallback)
            expect(commitCallback).not.toHaveBeenCalled()
        })
    })
})
