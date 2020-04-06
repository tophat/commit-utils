import axios from 'axios'

import logger from './logger'

class GitHubService {
    constructor({ repoOwner, repoName, commitSha, githubAccessToken }) {
        this.repoOwner = repoOwner
        this.repoName = repoName
        this.commitSha = commitSha
        this.githubAccessToken = githubAccessToken
        this.contexts = new Set()
    }

    get repo() {
        return `${this.repoOwner}/${this.repoName}`
    }

    get enabled() {
        return (
            this.githubAccessToken &&
            this.repoOwner &&
            this.repoName &&
            this.commitSha
        )
    }

    async postToGitHub(data) {
        const opts = {
            data,
            headers: {
                Authorization: `token ${this.githubAccessToken}`,
            },
            method: 'POST',
            responseType: 'json',
            timeout: 5000,
            url: `https://api.github.com/repos/${this.repo}/statuses/${this.commitSha}`,
        }

        return axios(opts).catch(error => {
            if (error.response) {
                logger.error(
                    `GitHubService HTTP_${error.response.status} :: ${
                        error.response.data?.message ?? ''
                    }`,
                )
                return
            }
            throw error
        })
    }

    update(message, url, status) {
        if (!this.enabled) {
            return Promise.resolve({})
        }

        const context = 'commitwatch '

        if (!this.contexts.has(context) && this.contexts.size >= 5) {
            logger.warn(
                'Max reported statuses reached, github status will not be reported',
            )
            return Promise.resolve()
        }
        this.contexts.add(context)

        return this.postToGitHub({
            context,
            description: message,
            state: status,
            target_url: url,
        })
    }

    start({ message }) {
        return this.update(message, undefined, 'pending')
    }

    pass({ message, url }) {
        return this.update(message, url, 'success')
    }

    fail({ message, url }) {
        return this.update(message, url, 'failure')
    }

    error({ message }) {
        return this.update(message, undefined, 'error')
    }
}

export default GitHubService
