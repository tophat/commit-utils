'use strict'
const writerOptsConfig = require('../src/writer-opts')
const { BREAKING_CHANGE } = require('../src/helpers')
const { whatBump } = require('../src/conventional-recommended-bump')
const { STRATEGY } = require('../src/commitTypes')

const mockContext = {
    host: 'gitstub.com',
    repository: 'test',
    owner: 'tophat',
    repoUrl: '',
}
const mockCommitHash = '84c3ee0ac680287af37940cabbbeb8052e49a7ab'
const getMockCommit = (notes = []) => ({
    references: [],
    hash: mockCommitHash,
    scope: '',
    notes: [...notes],
    subject: 'this is the commit message',
})

describe('conventional-changelog-config', () => {
    describe('what bump', () => {
        it('chooses breaking change over feature', () => {
            const commits = [
                getMockCommit([{ title: 'BREAKING CHANGE', text: 'apple' }]),
                getMockCommit([{ title: 'feat', text: 'orange' }]),
            ]
            expect(whatBump(commits).level).toEqual(STRATEGY.MAJOR)
        })

        it('chooses breaking change over feature when breaking change is only in header', () => {
            const commits = [
                {
                    ...getMockCommit([{ title: 'feat', text: 'orange' }]),
                    header: 'BREAKING CHANGE: This is a change!',
                },
            ]
            expect(whatBump(commits).level).toEqual(STRATEGY.MAJOR)
        })

        it('chooses feature over fix', () => {
            const commits = [
                getMockCommit([{ title: 'fix', text: 'apple' }]),
                getMockCommit([{ title: 'feat', text: 'orange' }]),
            ]
            expect(whatBump(commits).level).toEqual(STRATEGY.MINOR)
        })

        it('chooses fix over nothing', () => {
            const commits = [
                getMockCommit([{ title: 'fix', text: 'apple' }]),
                getMockCommit([{ title: 'chore', text: 'orange' }]),
            ]
            expect(whatBump(commits).level).toEqual(STRATEGY.PATCH)
        })

        it('chooses nothing if no fix, feat or breaking', () => {
            const commits = [
                getMockCommit([{ title: 'chore', text: 'apple' }]),
                getMockCommit([{ title: 'chore', text: 'orange' }]),
            ]
            expect(whatBump(commits).level).toBeNull()
        })

        it('interpets revert as patch', () => {
            const commits = [
                {
                    ...getMockCommit([{ title: 'chore', text: 'orange' }]),
                    revert: {
                        prefix: 'Revert',
                        header: '"chore: switch back"',
                        hash: 'abc',
                    },
                },
            ]
            expect(whatBump(commits).level).toEqual(STRATEGY.PATCH)
        })
    })

    describe('writer-opts', () => {
        it('transforms breaking commit notes', async () => {
            const mockText = 'the change is breaking'
            const mockCommit = getMockCommit()
            mockCommit.notes = [{ title: BREAKING_CHANGE, text: mockText }]
            const writerOpts = await Promise.resolve(writerOptsConfig)
            const transformedCommit = writerOpts.transform(
                mockCommit,
                mockContext,
            )
            const note = transformedCommit.notes[0]
            expect(note.text).toEqual(mockText)
            expect(note.title).toEqual('Breaking Changes')
            expect(transformedCommit.hash).toEqual(mockCommitHash.substr(0, 7))
        })

        it('transforms revert commit notes', async () => {
            const mockRevertHash = 'n0ba128'
            const mockRevertText = 'please revert me (#123)'
            const mockCommit = getMockCommit()
            mockCommit.notes = [
                {
                    title: 'Revert',
                    text: `Revert "${mockRevertText}"\n\nThis reverts commit ${mockRevertHash}.`,
                },
            ]
            const writerOpts = await Promise.resolve(writerOptsConfig)
            const transformedCommit = writerOpts.transform(
                mockCommit,
                mockContext,
            )
            const note = transformedCommit.notes[0]
            expect(note.revertHash).toEqual(mockRevertHash)
            expect(note.title).toEqual('Reverts')
            expect(note.text).toEqual(`"${mockRevertText}"`)
            expect(transformedCommit.hash).toEqual(mockCommitHash.substr(0, 7))
        })

        it('drops commit notes that are not included in the changelog', async () => {
            const mockCommit = getMockCommit()
            mockCommit.notes = [
                { title: 'wip', text: '' },
                { title: 'chore', text: '' },
                { title: 'cr', text: '' },
                { title: 'style', text: '' },
                { title: 'refactor', text: '' },
                { title: 'docs', text: '' },
                { title: 'test', text: '' },
                { title: 'build', text: '' },
                { title: 'ci', text: '' },
            ]
            const writerOpts = await Promise.resolve(writerOptsConfig)
            const transformedCommit = writerOpts.transform(
                mockCommit,
                mockContext,
            )
            expect(transformedCommit).toBeUndefined()
        })
    })
})
