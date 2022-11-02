# CommitWatch

![npm](https://img.shields.io/npm/v/commit-watch) ![node-current](https://img.shields.io/node/v/commit-watch) ![npm](https://img.shields.io/npm/dm/commit-watch)


## Overview

CommitWatch checks commit messages and ensures they conform to the Top Hat commitlint config (loosely inspired by [conventional commit spec](https://www.conventionalcommits.org/en/v1.0.0/)).

## Getting Started

```sh
yarn dlx commit-watch --help
```

You can configure commit-watch via CLI args or via environment variables.

### Configuration Variables:

| Name                         | Value                                                | Description                                                                                          |
|------------------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| COMMITWATCH_GITHUB_TOKEN     | Required                                             | Personal access token with write access to GitHub status checks, and read access to your repository. |
| CI_REPO_OWNER                | Required                                             | The "owner" from https://github.com/\<owner\>/\<name\>.                                              |
| CI_REPO_NAME                 | Required                                             | The "name" from https://github.com/\<owner\>/\<name\>. That is, your repository name.                |
| CI_COMMIT_SHA                | Required                                             | The commit sha to run the linter against.                                                            |
| CI_BASE_BRANCH               | Defaults to `origin/master`.                         | The base branch to compare the commit sha against.                                                   |
| COMMIT_WATCH_OUTPUT_DIR      | Defaults to `./artifacts/test_results/commitwatch/`. | Directory to write the junit report to.                                                              |
| COMMIT_WATCH_OUTPUT_FILENAME | Defaults to `commitwatch.junit.xml`.                 | The name of the junit report.                                                                        |
| DEBUG                       |  | Set to 'commit-watch' to enable verbose mode. |
