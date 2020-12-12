# CommitWatch

<img align="right" width="100px" height="100px" src="./assets/logo.png" alt="Logo">

[![Maturity badge - level 2](https://img.shields.io/badge/Maturity-Level%202%20--%20First%20Release-yellowgreen.svg)](https://github.com/tophat/getting-started/blob/master/scorecard.md) [![GitHub license](https://img.shields.io/github/license/tophat/commit-watch)](https://github.com/tophat/commit-watch/blob/master/LICENSE) [![Slack workspace](https://slackinvite.dev.tophat.com/badge.svg)](https://opensource.tophat.com/slack)

![npm](https://img.shields.io/npm/v/commit-watch) ![node-current](https://img.shields.io/node/v/commit-watch) ![npm](https://img.shields.io/npm/dm/commit-watch)


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

### Environment Variables:

| Name                         | Value                                                | Description                                                                                          |
|------------------------------|------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| COMMITWATCH_GITHUB_TOKEN     | Required                                             | Personal access token with write access to GitHub status checks, and read access to your repository. |
| CI_REPO_OWNER                | Required                                             | The "owner" from https://github.com/\<owner\>/\<name\>.                                              |
| CI_REPO_NAME                 | Required                                             | The "name" from https://github.com/\<owner\>/\<name\>. That is, your repository name.                |
| CI_COMMIT_SHA                | Required                                             | The commit sha to run the linter against.                                                            |
| CI_BASE_BRANCH               | Defaults to `origin/master`.                         | The base branch to compare the commit sha against.                                                   |
| COMMIT_WATCH_OUTPUT_DIR      | Defaults to `./artifacts/test_results/commitwatch/`. | Directory to write the junit report to.                                                              |
| COMMIT_WATCH_OUTPUT_FILENAME | Defaults to `commitwatch.junit.xml`.                 | The name of the junit report.                                                                        |
| VERBOSE                      | Defaults to `0`.                                     | Whether to enable verbose mode.                                                                      |

## Contributing

Ensure you are using the correct version of node. It should match the version specified in `.nvmrc`. You can use a tool such as [nvm](https://github.com/nvm-sh/nvm) to automate this process.

Install packages:

```sh
yarn
```

To install the git hooks:

```sh
yarn husky install
```

To run tests:

```sh
yarn test
```

And watch mode:

```sh
yarn test:watch
```

You can build the package via:

```sh
yarn build
```

Set the `CI=1` env variable to generate a test coverage report.

Feel free to open a PR or GitHub issue. Contributions welcome!

## License

CommitWatch is licensed under [Apache License Version 2.0](https://github.com/tophat/commit-watch/tree/master/LICENSE).
