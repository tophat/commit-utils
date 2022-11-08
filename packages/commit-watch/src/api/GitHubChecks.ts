import axios from 'axios'

import * as logger from '../logger'
import { type CommitWatchConfiguration } from '../types'

interface GitHubStatusPayload {
    context: string
    description: string
    state: 'failure' | 'error' | 'pending' | 'success'
    target_url?: string | undefined
}

export class GitHubChecks {
    #config: CommitWatchConfiguration
    #statusUrl?: string
    #lastState?: GitHubStatusPayload['state'] | undefined

    constructor(config: CommitWatchConfiguration) {
        this.#config = config

        const { owner, name } = this.#config.repository ?? {}
        if (owner && name && this.#config.githubToken) {
            this.#statusUrl = `https://api.github.com/repos/${owner}/${name}/statuses/${
                this.#config.commitSha
            }`
        }
    }

    getLastState() {
        return this.#lastState
    }

    // TODO: Should be replaced with Octokit which would let us post commit comments as well
    async #post(data: GitHubStatusPayload): Promise<void> {
        // Silently fail if no properly configured.
        if (!this.#statusUrl) return

        try {
            await axios.post(this.#statusUrl, data, {
                responseType: 'json',
                timeout: 5000,
                headers: {
                    Authorization: `Bearer ${this.#config.githubToken}`,
                },
            })
            this.#lastState = data.state
        } catch (error) {
            if (this.#config.failOnGitHubErrors) {
                if (axios.isAxiosError(error) && error.response) {
                    logger.error(
                        `GitHubService HTTP_${error.response.status} :: ${
                            error.response.data?.message ?? ''
                        }`,
                    )
                }
                throw error
            }
            if (axios.isAxiosError(error) && error.response) {
                logger.error(`GitHubService HTTP_${error.response.status}`)
            }
        }
    }

    async update(payload: Partial<GitHubStatusPayload>): Promise<void> {
        await this.#post({
            context: 'CommitWatch ',
            description: 'Linting commit messages...',
            state: 'pending',
            target_url: 'https://github.com/tophat/commit-utils',
            ...payload,
        })
    }
}
