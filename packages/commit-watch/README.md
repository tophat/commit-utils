# CommitWatch

![npm](https://img.shields.io/npm/v/commit-watch) ![node-current](https://img.shields.io/node/v/commit-watch) ![npm](https://img.shields.io/npm/dm/commit-watch) [![codecov](https://codecov.io/gh/tophat/commit-watch/branch/master/graph/badge.svg?token=eBYKrg0Vaw)](https://codecov.io/gh/tophat/commit-watch)


## Overview

CommitWatch checks commit messages and ensures they conform to the [conventional commit spec](https://www.conventionalcommits.org/en/v1.0.0/).

## Getting Started

You can install the `commit-watch` package from npm as a dev dependency:

```shell
npm i --save-dev commit-watch
```

or

```shell
yarn add -d commit-watch
```

Or just run it directly in CI via `npx commit-watch` or `yarn dlx commit-watch`.

Before running commit-watch, you need to ensure the relevant environment variables are set. For a full list of required and optional environment variables, see the section below.

### Configuration Variables:

| Name                         | Value                                                | Description                                                                                          |
|------------------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| COMMITWATCH_GITHUB_TOKEN     | Required                                             | Personal access token with write access to GitHub status checks, and read access to your repository. |
| CI_REPO_OWNER                | Required                                             | The "owner" from https://github.com/\<owner\>/\<name\>.                                              |
| CI_REPO_NAME                 | Required                                             | The "name" from https://github.com/\<owner\>/\<name\>. That is, your repository name.                |
| GIT_URL                      | Not Required                                         | The full Git URL from git@github.com:\<owner\>/\<name\>.git. That is, the URL you'd use to clone your repository.  |
| CI_COMMIT_SHA                | Required                                             | The commit sha to run the linter against.                                                            |
| CI_BASE_BRANCH               | Defaults to `origin/master`.                         | The base branch to compare the commit sha against.                                                   |
| COMMIT_WATCH_OUTPUT_DIR      | Defaults to `./artifacts/test_results/commitwatch/`. | Directory to write the junit report to.                                                              |
| COMMIT_WATCH_OUTPUT_FILENAME | Defaults to `commitwatch.junit.xml`.                 | The name of the junit report.                                                                        |
| VERBOSE                      | Defaults to `0`.                                     | Whether to enable verbose mode.                                                                      |

These variables can be set in the folowing ways:
1. By having environment variables with matching names.
2. By specifying a .js config file containing the variables when running the command.
3. By specifying the variables in the command line arguments when running the command.

To use specify a config file use the --config-file cli argument to pass in the relative path of the file.

ex. commit-watch --config-file commit-watch.config.js

```javascript
//commit-watch.config.js

module.exports = {
    ciRepoOwner: 'Hans Moleman',
    ciRepoName: 'manahattan-project',
    ciBaseBranch: 'develop',
    outputDir: 'junit_reports',
    outputFilename: 'myreport.juint.xml',
    gitUrl: 'git@github.com:EXAMPLE_ORG/EXAMPLE_REPO.git',
    verbose: true,
}
```



To pass in any specific config parameter as a command line argument use the parameter name as a cli argument.

ex. commit-watch --github-token password123

If config parameters are present from multiple sources they are used in the following order:

1. Configs passed in as cli args
2. Configs from a config file
3. Environment variable configs
