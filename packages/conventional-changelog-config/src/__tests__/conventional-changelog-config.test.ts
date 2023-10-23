import { Readable, type Transform } from 'stream'

import conventionalCommitsParser, {
    type Commit,
} from 'conventional-commits-parser'

import configPromise from '..'
import { STRATEGY } from '../commitTypes'
import recommendedBump from '../conventional-recommended-bump'
import writerOptsConfig from '../writer-opts'

const readStream = <T>(stream: Transform) =>
    new Promise<T[]>((resolve) => {
        const chunks: T[] = []
        stream.on('data', (chunk: T) => chunks.push(chunk))
        stream.on('end', () => resolve(chunks))
    })

const mockContext = {
    host: 'gitstub.com',
    repository: 'test',
    owner: 'tophat',
    repoUrl: '',
}
const mockCommitHash = '84c3ee0ac680287af37940cabbbeb8052e49a7ab'

describe('conventional-changelog-config', () => {
    let config: Awaited<typeof configPromise>

    beforeAll(async () => {
        config = await configPromise
    })

    const getConventionalCommits = async (
        commits: Partial<Commit>[],
    ): Promise<Commit[]> => {
        const commitsStream = Readable.from(
            commits.map(
                (commit) =>
                    `${commit.body}\n-hash-\n${commit.sha || mockCommitHash}`,
            ),
        ).pipe(conventionalCommitsParser(config.parserOpts))
        return await readStream<Commit>(commitsStream)
    }

    describe('what bump', () => {
        it('uses all notes when making a decision', async () => {
            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'feat: orange' },
                        { body: 'BREAKING CHANGE: this is breaking' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MAJOR)

            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'feat: orange' },
                        { body: 'fix: this is breaking' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MINOR)

            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'fix: this is breaking' },
                        { body: 'feat: orange' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MINOR)
        })

        it('only considers breaking changes at the beginning of the message', async () => {
            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'feat: orange' },
                        { body: 'chore: This is not a BREAKING CHANGE.' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MINOR)

            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'feat: this is not a BREAKING CHANGE either' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MINOR)

            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        {
                            body: 'fix: this is not a BREAKING CHANGE\n\n* chore: this is not a BREAKING CHANGE either',
                        },
                    ]),
                ).level,
            ).toEqual(STRATEGY.PATCH)
        })

        it('chooses breaking change over feature', async () => {
            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'feat: orange' },
                        { body: 'BREAKING CHANGE: apple' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MAJOR)

            expect(
                recommendedBump.whatBump(
                    await getConventionalCommits([
                        { body: 'BREAKING CHANGE: apple' },
                        { body: 'feat: orange' },
                    ]),
                ).level,
            ).toEqual(STRATEGY.MAJOR)
        })

        it('chooses breaking change over feature when breaking change is only in header', async () => {
            const commits = await getConventionalCommits([
                {
                    body: 'BREAKING CHANGE: This is a change!\n\n* feat: orange',
                },
            ])

            expect(recommendedBump.whatBump(commits).level).toEqual(
                STRATEGY.MAJOR,
            )
        })

        it('chooses feature over fix', async () => {
            const commits = await getConventionalCommits([
                { body: 'fix: apple' },
                { body: 'feat: orange' },
            ])
            expect(recommendedBump.whatBump(commits).level).toEqual(
                STRATEGY.MINOR,
            )
        })

        it('chooses fix over nothing', async () => {
            const commits = await getConventionalCommits([
                { body: 'fix: apple' },
                { body: 'chore: orange' },
            ])
            expect(recommendedBump.whatBump(commits).level).toEqual(
                STRATEGY.PATCH,
            )
        })

        it('chooses nothing if no fix, feat or breaking', async () => {
            const commits = await getConventionalCommits([
                { body: 'chore: apple' },
                { body: 'chore: orange' },
            ])
            expect(recommendedBump.whatBump(commits).level).toBeNull()
        })

        it('interpets revert as patch', async () => {
            const commits = await getConventionalCommits([
                {
                    body: 'Revert "fix: some commit" (#123)\n\nThis reverts commit abc.',
                },
            ])
            expect(recommendedBump.whatBump(commits).level).toEqual(
                STRATEGY.PATCH,
            )
        })
    })

    describe('writer-opts', () => {
        it('transforms breaking commit notes', async () => {
            const mockText = 'the change is breaking'
            const mockCommit = (
                await getConventionalCommits([
                    {
                        body: `feat: orange\n\n* BREAKING CHANGE: ${mockText}`,
                        sha: mockCommitHash,
                    },
                ])
            )[0]
            const writerOpts = await Promise.resolve(writerOptsConfig)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error transform is always a function
            const transformedCommit = writerOpts.transform?.(
                mockCommit,
                mockContext,
            )
            const note = transformedCommit.notes[0]
            expect(note.text).toEqual(mockText)
            expect(note.title).toBe('Breaking Changes')
            expect(transformedCommit.hash).toEqual(mockCommitHash.substr(0, 7))
        })

        it('transforms revert commit notes', async () => {
            const mockRevertHash = 'n0ba128'
            const mockRevertText = 'please revert me (#123)'
            const mockCommit = (
                await getConventionalCommits([
                    {
                        body: `Revert "${mockRevertText}"\n\nThis reverts commit ${mockRevertHash}.`,
                        sha: mockCommitHash,
                    },
                ])
            )[0]

            const writerOpts = await Promise.resolve(writerOptsConfig)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error transform is always a function
            const transformedCommit = writerOpts.transform(
                mockCommit,
                mockContext,
            )
            const note = transformedCommit.notes[0]
            expect(note.revertHash).toEqual(mockRevertHash)
            expect(note.title).toBe('Reverts')
            expect(note.text).toBe(`"${mockRevertText}"`)
            expect(transformedCommit.hash).toEqual(mockCommitHash.substr(0, 7))
        })

        it('drops commit notes that are not included in the changelog', async () => {
            const mockCommit = (
                await getConventionalCommits([
                    {
                        body:
                            'feat: orange\n\n* wip: text\n\n* chore: text\n\n* cr: text\n\n' +
                            '* style: text\n\n* refactor: text\n\n* docs: text\n\n' +
                            '* test: text\n\n* build: text\n\n* ci: text\n',
                        sha: mockCommitHash,
                    },
                ])
            )[0]
            expect(mockCommit.notes).toHaveLength(9)
            const writerOpts = await Promise.resolve(writerOptsConfig)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error transform is always a function
            const transformedCommit = writerOpts.transform(
                mockCommit,
                mockContext,
            )
            expect(transformedCommit.notes).toHaveLength(1)
        })
    })
})
