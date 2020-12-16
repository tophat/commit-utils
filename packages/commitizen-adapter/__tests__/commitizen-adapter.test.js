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

        const getMockCz = mockAnswer => ({
            prompt: jest.fn(() => Promise.resolve(mockAnswer)),
        })

        const getMockAnswer = ({
            isBreaking = false,
            isBreakingConfirmed = false,
        } = {}) => ({
            body: mockCommitBody,
            breaking: isBreaking ? mockBreakingMessage : undefined,
            type: mockCommitType,
            subject: mockCommitSubject,
            isBreaking,
            isBreakingConfirmed: isBreakingConfirmed ? 'yes' : 'quit',
        })

        it('calls commit callback', async () => {
            const mockAnswer = getMockAnswer()
            const cz = getMockCz(mockAnswer)
            const commitCallback = jest.fn()
            await testEngine.prompter(cz, commitCallback)
            expect(commitCallback).toHaveBeenCalledWith(
                `${mockCommitType}: ${mockCommitSubject}\n\n${mockCommitBody}\n\n`,
            )
        })

        it('calls commit callback on breaking change(s)', async () => {
            const mockAnswer = getMockAnswer({
                isBreaking: true,
                isBreakingConfirmed: true,
            })
            const cz = getMockCz(mockAnswer)
            const commitCallback = jest.fn()
            await testEngine.prompter(cz, commitCallback)
            expect(commitCallback).toHaveBeenCalledWith(
                `${mockCommitType}: ${mockCommitSubject}\n\n${mockCommitBody}\n\nBREAKING CHANGE: ${mockBreakingMessage}`,
            )
        })

        it('aborts if author does not want to commit breaking change(s)', async () => {
            const mockAnswer = getMockAnswer({
                isBreaking: true,
                isBreakingConfirmed: false,
            })
            const cz = getMockCz(mockAnswer)
            const commitCallback = jest.fn()
            await testEngine.prompter(cz, commitCallback)
            expect(commitCallback).not.toHaveBeenCalled()
        })
    })
})
