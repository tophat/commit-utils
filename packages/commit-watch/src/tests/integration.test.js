import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { EXIT_FAILURE, EXIT_SUCCESS } from '../constants'
import mainSafe from '../main'
import * as getCommitMessageFns from '../getCommitMessages'

const mockAxios = new MockAdapter(axios)
jest.mock('../logger')

function mockMessages(messages) {
    jest.spyOn(getCommitMessageFns, 'default').mockReturnValue(
        Promise.resolve(messages ?? []),
    )
}

function getRequestData(request) {
    try {
        return JSON.parse(request.data)
    } catch {
        return {}
    }
}

describe('Integration', () => {
    const oldEnv = process.env
    beforeAll(() => {
        process.env = {
            ...process.env,
            COMMITWATCH_GITHUB_TOKEN: null,
            CI_REPO_OWNER: null,
            CI_REPO_NAME: null,
            CI_COMMIT_SHA: null,
        }
    })

    afterAll(() => {
        process.env = oldEnv
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
        ])('passes for single semantic %s message', async prefix => {
            mockMessages([`${prefix}: this is a message`])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_SUCCESS)
        })

        it('fails for poorly formatted message', async () => {
            mockMessages(['missing prefix'])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_FAILURE)
        })

        it('passes for multiple messages', async () => {
            mockMessages([
                'build(deps): update dependency',
                'wip: some work in progress',
            ])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_SUCCESS)
        })

        it('fails if any commit messages poorly formatted', async () => {
            mockMessages(['build(deps): update dependency', 'missing prefix'])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_FAILURE)
        })

        it('allows poorly formatted headers, as long as body is formatted correctly', async () => {
            mockMessages([
                '[TICKET] this is a bad message, but it is a header\n\n* feat: a good message\n\n* fix: another',
            ])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_SUCCESS)
        })

        it('allows notes in the body', async () => {
            mockMessages([
                '[TICKET] this is a bad message, but it is a header\n\n* feat: a good message\n\nThis is a note.',
            ])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_SUCCESS)
        })

        it('fails poorly formatted headers if no good body', async () => {
            mockMessages([
                '[TICKET] this is a bad message, but it is a header\n\n* bad: a good message\n\n* bad: another',
            ])
            const exitCode = await mainSafe()
            expect(exitCode).toBe(EXIT_FAILURE)
        })

        it('does not update github if env vars not set', async () => {
            mockMessages(['missing prefix'])
            await mainSafe()
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

        it('reports failures to github', async () => {
            mockMessages(['missing prefix'])
            await mainSafe()

            const requests = mockAxios.history.post.map(r => getRequestData(r))
            expect(requests).toHaveLength(2)
            expect(requests[0].state).toEqual('pending')
            expect(requests[1].state).toEqual('failure')
        })

        it('reports mutiple commit failures to github with correct message', async () => {
            mockMessages(['missing prefix', 'bad commit'])
            await mainSafe()

            const requests = mockAxios.history.post.map(r => getRequestData(r))
            expect(requests).toHaveLength(3)
            expect(requests[0].state).toEqual('pending')
            expect(requests[1].state).toEqual('failure')
            expect(requests[2].state).toEqual('failure')
            expect(requests[2].description).toEqual(
                'Multiple commit lint errors, please ensure your commit messages conform to the conventional commit spec.',
            )
            expect(requests[2].target_url).toEqual(
                'https://www.conventionalcommits.org/en/v1.0.0/',
            )
        })

        it('reports success to github', async () => {
            mockMessages(['chore: good message'])
            await mainSafe()

            const requests = mockAxios.history.post.map(r => getRequestData(r))
            expect(requests).toHaveLength(2)
            expect(requests[0].state).toEqual('pending')
            expect(requests[1].state).toEqual('success')
        })

        it('posts to correct url with sha', async () => {
            mockMessages(['chore: good message'])
            await mainSafe()
            expect(mockAxios.history.post[0].url).toMatchInlineSnapshot(
                '"https://api.github.com/repos/MOCK_REPO_OWNER/MOCK_REPO_NAME/statuses/MOCK_SHA"',
            )
        })
    })
})
