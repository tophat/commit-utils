import getConfig, { getBaseConfigs } from '../getConfig'

import CONFIG_FILE_CONFIGS from './mock.config'

describe('getBaseConfigs', () => {
    const oldEnv = process.env
    const oldArgv = process.argv

    const ENV_VARIABLE_CONFIGS = {
        COMMITWATCH_GITHUB_TOKEN: 'COMMITWATCH_GITHUB_TOKEN_ENV',
        CI_REPO_OWNER: 'CI_REPO_OWNER_ENV',
        CI_REPO_NAME: 'CI_REPO_NAME_ENV',
        CI_COMMIT_SHA: 'CI_COMMIT_SHA_ENV',
        CI_BASE_BRANCH: 'CI_BASE_BRANCH_ENV',
        COMMIT_WATCH_OUTPUT_DIR: 'COMMIT_WATCH_OUTPUT_DIR_ENV',
        COMMIT_WATCH_OUTPUT_FILENAME: 'COMMIT_WATCH_OUTPUT_FILENAME_ENV',
        VERBOSE: 'VERBOSE_ENV',
    }

    const fileConfigToConfig = fileConfig =>
        Object.keys(fileConfig).reduce(
            (acc, currKey) => ({
                ...acc,
                [currKey.replace(/([A-Z])/g, '_$1').toUpperCase()]: fileConfig[
                    currKey
                ],
            }),
            {},
        )

    beforeAll(() => {
        process.env = ENV_VARIABLE_CONFIGS
    })

    afterEach(() => {
        process.argv = oldArgv
    })

    afterAll(() => {
        process.env = oldEnv
    })

    it('Uses environment variables as config \
		if not provided config file or cli configs', () => {
        expect(getBaseConfigs()).toEqual({
            GITHUB_TOKEN: ENV_VARIABLE_CONFIGS.COMMITWATCH_GITHUB_TOKEN,
            OUTPUT_DIR: ENV_VARIABLE_CONFIGS.COMMIT_WATCH_OUTPUT_DIR,
            OUTPUT_FILENAME: ENV_VARIABLE_CONFIGS.COMMIT_WATCH_OUTPUT_FILENAME,
            VERBOSE: ENV_VARIABLE_CONFIGS.VERBOSE,
            CI_BASE_BRANCH: ENV_VARIABLE_CONFIGS.CI_BASE_BRANCH,
            CI_COMMIT_SHA: ENV_VARIABLE_CONFIGS.CI_COMMIT_SHA,
            CI_REPO_OWNER: ENV_VARIABLE_CONFIGS.CI_REPO_OWNER,
            CI_REPO_NAME: ENV_VARIABLE_CONFIGS.CI_REPO_NAME,
        })
    })

    it('Values from env variables are overwritten when a \
		values from config file are available', () => {
        process.argv = ['_', '_', '--config-file', 'src/tests/mock.config.js']

        expect(getBaseConfigs()).toEqual({
            ...fileConfigToConfig(CONFIG_FILE_CONFIGS),
            GITHUB_TOKEN: ENV_VARIABLE_CONFIGS.COMMITWATCH_GITHUB_TOKEN,
        })
    })

    it('Config values passed in as cli args overwrite\
		values from config file and values from env variables', () => {
        const mockGithubToken = 'MOCK_GITHUB_TOKEN'
        const mockOutputDir = 'MOCK_OUTPUT_DIR'

        process.argv = [
            '_',
            '_',
            '--config-file',
            'src/tests/mock.config.js',
            '--github-token',
            mockGithubToken,
            '--output-dir',
            mockOutputDir,
        ]

        expect(getBaseConfigs()).toEqual({
            ...fileConfigToConfig(CONFIG_FILE_CONFIGS),
            OUTPUT_DIR: mockOutputDir,
            GITHUB_TOKEN: mockGithubToken,
        })
    })

    it('Correctly retrieves the repo name and owner from the GitHub URL if\
        no repo name and owner is given', () => {
        const mockRepoOwner = 'EXAMPLE_CORP'
        const mockRepoName = 'EXAMPLE_REPO'
        const mockRepo = `${mockRepoOwner}/${mockRepoName}`

        process.env = {
            ...ENV_VARIABLE_CONFIGS,
            CI_REPO_OWNER: undefined,
            CI_REPO_NAME: undefined,
            GIT_URL: `git@github.com:${mockRepo}.git`,
        }

        expect(getConfig()).toEqual({
            commitSha: ENV_VARIABLE_CONFIGS.CI_COMMIT_SHA,
            baseBranch: ENV_VARIABLE_CONFIGS.CI_BASE_BRANCH,
            githubAccessToken: ENV_VARIABLE_CONFIGS.COMMITWATCH_GITHUB_TOKEN,
            repoOwner: mockRepoOwner,
            repoName: mockRepoName,
        })
    })
})
