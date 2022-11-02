import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { runCommitWatch } from '../api'
import * as commits from '../api/commits'

const mockAxios = new MockAdapter(axios)

describe('Integration', () => {
    const origArgs = process.argv
    const origEnv = process.env

    beforeAll(() => {
        process.env = {
            ...process.env,
            COMMITWATCH_GITHUB_TOKEN: undefined,
            CI_REPO_OWNER: undefined,
            CI_REPO_NAME: undefined,
            CI_COMMIT_SHA: undefined,
        }
    })

    afterAll(() => {
        process.env = origEnv
        process.argv = origArgs
    })

    afterEach(() => {
        mockAxios.reset()
        jest.restoreAllMocks()
    })

    describe('Linting', () => {
        it.each([
            'build',
            'chore',
            'ci',
            'cr',
            'docs',
            'feat',
            'fix',
            'perf',
            'refactor',
            'revert',
            'style',
            'test',
            'wip',
        ])('passes for single semantic %s message', async (prefix) => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                `${prefix}: this is a message`,
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).resolves.toBeUndefined()
        })

        it('fails for poorly formatted message', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'missing prefix',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).rejects.toThrow(/Invalid commit/)
        })

        it('passes for multiple messages', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'build(deps): update dependency',
                'wip: some work in progress',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).resolves.toBeUndefined()
        })

        it('fails if any commit messages poorly formatted', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'build(deps): update dependency',
                'missing prefix',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).rejects.toThrow(/Invalid commit/)
        })

        it('allows poorly formatted headers, as long as body is formatted correctly', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                '[TICKET] this is a bad message, but it is a header\n\n* feat: a good message\n\n* fix: another',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).resolves.toBeUndefined()
        })

        it('allows notes in the body', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                '[TICKET] this is a bad message, but it is a header\n\n* feat: a good message\n\nThis is a note.',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).resolves.toBeUndefined()
        })

        it('fails poorly formatted headers if no good body', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                '[TICKET] this is a bad message, but it is a header\n\n* bad: a good message\n\n* bad: another',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).rejects.toThrow(/2 invalid commit messages/)
        })

        it('does not update github if env vars not set', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'missing prefix',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                }),
            ).rejects.toThrow()
            expect(mockAxios.history.post).toHaveLength(0)
        })
    })

    describe('GitHub', () => {
        beforeAll(() => {
            process.env.COMMITWATCH_GITHUB_TOKEN = 'MOCK_GH_TOKEN'
            process.env.CI_REPO_OWNER = 'MOCK_REPO_OWNER'
            process.env.CI_REPO_NAME = 'MOCK_REPO_NAME'
            process.env.CI_COMMIT_SHA = 'MOCK_SHA'
        })

        beforeEach(() => {
            mockAxios.onPost(/.*/).reply(200)
        })

        it('reports failures to github', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'missing prefix',
            ])

            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                    githubToken: 'some-token',
                    repository: {
                        name: 'commit-utils',
                        owner: 'tophat-fake',
                    },
                }),
            ).rejects.toThrow()

            const requests = mockAxios.history.post.map((r) =>
                JSON.parse(r.data),
            )
            expect(requests).toHaveLength(2)
            expect(requests[0].state).toBe('pending')
            expect(requests[1].state).toBe('failure')
        })

        it('reports mutiple commit failures to github with correct message', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'missing prefix',
                'bad commit',
            ])

            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                    githubToken: 'some-token',
                    repository: {
                        name: 'commit-utils',
                        owner: 'tophat-fake',
                    },
                }),
            ).rejects.toThrow()

            const requests = mockAxios.history.post.map((r) =>
                JSON.parse(r.data),
            )

            expect(requests).toHaveLength(2)
            expect(requests[0].state).toBe('pending')
            expect(requests[1].state).toBe('failure')
            expect(requests[1].description).toMatchInlineSnapshot(
                '"2 invalid commit messages found."',
            )
        })

        it('reports success to github', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'chore: good message',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                    githubToken: 'some-token',
                    repository: {
                        name: 'commit-utils',
                        owner: 'tophat-fake',
                    },
                }),
            ).resolves.toBeUndefined()

            const requests = mockAxios.history.post.map((r) =>
                JSON.parse(r.data),
            )
            expect(requests).toHaveLength(2)
            expect(requests[0].state).toBe('pending')
            expect(requests[1].state).toBe('success')
        })

        it('posts to correct url with sha', async () => {
            jest.spyOn(commits, 'getCommitMessages').mockResolvedValue([
                'chore: good message',
            ])
            await expect(
                runCommitWatch({
                    baseRef: 'base-sha',
                    commitSha: 'commit-sha',
                    githubToken: 'some-token',
                    repository: {
                        name: 'commit-utils',
                        owner: 'tophat-fake',
                    },
                }),
            ).resolves.toBeUndefined()

            expect(mockAxios.history.post[0].url).toMatchInlineSnapshot(
                '"https://api.github.com/repos/tophat-fake/commit-utils/statuses/commit-sha"',
            )
        })
    })
})
