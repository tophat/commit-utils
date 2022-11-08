export interface CommitWatchConfiguration {
    /** Directory for junit reports. */
    outputDirectory?: string
    /** Filename for junit report. */
    outputFilename?: string
    /** Token used to set GitHub statuses. */
    githubToken?: string
    /** Repository information used when connecting to GitHub for status checks. */
    repository?: {
        owner?: string
        name?: string
    }
    /** The commit sha to analyze. */
    commitSha: string
    /** The base git ref we're analyzing against. We find messages between baseRef and commitSha. */
    baseRef: string
    /** Whether to fail on GitHub errors. */
    failOnGitHubErrors?: boolean
}
