import minimist from 'minimist'

import getCIVars from './getCIVars'
import ensureValid from './ensureValid'
import { parseConfigFile } from './parseConfigFile'

const SUPPORTED_CONFIGS_VARS = [
    {
        envVarName: 'COMMITWATCH_GITHUB_TOKEN',
        cliVarName: 'github-token',
        fileVarName: 'githubToken',
        configName: 'GITHUB_TOKEN',
    },
    {
        envVarName: 'CI_REPO_OWNER',
        cliVarName: 'ci-repo-owner',
        fileVarName: 'ciRepoOwner',
        configName: 'CI_REPO_OWNER',
    },
    {
        envVarName: 'CI_REPO_NAME',
        cliVarName: 'ci-repo-name',
        fileVarName: 'ciRepoName',
        configName: 'CI_REPO_NAME',
    },
    {
        envVarName: 'GIT_URL',
        cliVarName: 'git-url',
        fileVarName: 'gitUrl',
        configName: 'GIT_URL',
    },
    {
        envVarName: 'CI_COMMIT_SHA',
        cliVarName: 'ci-commit-sha',
        fileVarName: 'ciCommitSha',
        configName: 'CI_COMMIT_SHA',
    },
    {
        envVarName: 'CI_BASE_BRANCH',
        cliVarName: 'ci-base-branch',
        fileVarName: 'ciBaseBranch',
        configName: 'CI_BASE_BRANCH',
    },
    {
        envVarName: 'COMMIT_WATCH_OUTPUT_DIR',
        cliVarName: 'output-dir',
        fileVarName: 'outputDir',
        configName: 'OUTPUT_DIR',
    },
    {
        envVarName: 'COMMIT_WATCH_OUTPUT_FILENAME',
        cliVarName: 'output-filename',
        fileVarName: 'outputFilename',
        configName: 'OUTPUT_FILENAME',
    },
    {
        envVarName: 'VERBOSE',
        cliVarName: 'verbose',
        fileVarName: 'verbose',
        configName: 'VERBOSE',
    },
]

const getCLIArgs = () => minimist(process.argv.slice(2))

export const getBaseConfigs = () => {
    const filterUndefineds = obj =>
        Object.keys(obj).reduce((acc, currKey) => {
            if (!obj[currKey]) {
                return acc
            }

            return {
                ...acc,
                [currKey]: obj[currKey],
            }
        }, {})

    const cliArgs = getCLIArgs()

    const configFileArgs = cliArgs['config-file']
        ? parseConfigFile(cliArgs['config-file'])
        : {}

    const {
        envConfigs,
        fileConfigs,
        cliConfigs,
    } = SUPPORTED_CONFIGS_VARS.reduce(
        (acc, nextConfig) => ({
            envConfigs: {
                ...acc.envConfigs,
                [nextConfig.configName]: process.env[nextConfig.envVarName],
            },
            fileConfigs: {
                ...acc.fileConfigs,
                [nextConfig.configName]: configFileArgs[nextConfig.fileVarName],
            },
            cliConfigs: {
                ...acc.cliConfigs,
                [nextConfig.configName]: cliArgs[nextConfig.cliVarName],
            },
        }),
        {
            envConfigs: {},
            fileConfigs: {},
            cliConfigs: {},
        },
    )

    return {
        ...filterUndefineds(envConfigs),
        ...filterUndefineds(fileConfigs),
        ...filterUndefineds(cliConfigs),
    }
}

const getConfig = customConfig => {
    const ciVars = getCIVars(getBaseConfigs())

    const config = {
        baseBranch: ciVars.baseBranch,
        commitSha: ciVars.commitSha,
        githubAccessToken: ciVars.githubAccessToken,
        repoName: ciVars.repoName,
        repoOwner: ciVars.repoOwner,
        ...customConfig,
    }
    ensureValid(config)
    return config
}

export default getConfig
