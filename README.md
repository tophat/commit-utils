# CommitWatch

<img align="right" width="100px" height="100px" src="./assets/logo.png" alt="Logo">

[![Maturity badge - level 2](https://img.shields.io/badge/Maturity-Level%202%20--%20First%20Release-yellowgreen.svg)](https://github.com/tophat/getting-started/blob/master/scorecard.md) [![GitHub license](https://img.shields.io/github/license/tophat/commit-watch)](https://github.com/tophat/commit-watch/blob/master/LICENSE) [![Slack workspace](https://slackinvite.dev.tophat.com/badge.svg)](https://opensource.tophat.com/slack) <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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


## Contributors ✨

[See Contributing Guide](./CONTRIBUTING.md) to get started contributing.

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://opensource.tophat.com/"><img src="https://avatars0.githubusercontent.com/u/6020693?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shouvik DCosta</b></sub></a><br /><a href="https://github.com/tophat/commit-watch/commits?author=sdcosta" title="Code">💻</a> <a href="https://github.com/tophat/commit-watch/commits?author=sdcosta" title="Documentation">📖</a> <a href="#ideas-sdcosta" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-sdcosta" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/msrose"><img src="https://avatars3.githubusercontent.com/u/3495264?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Rose</b></sub></a><br /><a href="#infra-msrose" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/tophat/commit-watch/commits?author=msrose" title="Documentation">📖</a> <a href="#tool-msrose" title="Tools">🔧</a> <a href="https://github.com/tophat/commit-watch/issues?q=author%3Amsrose" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/lime-green"><img src="https://avatars0.githubusercontent.com/u/9436142?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Josh</b></sub></a><br /><a href="https://github.com/tophat/commit-watch/issues?q=author%3Alime-green" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://noahnu.com/"><img src="https://avatars0.githubusercontent.com/u/1297096?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Noah</b></sub></a><br /><a href="https://github.com/tophat/commit-watch/issues?q=author%3Anoahnu" title="Bug reports">🐛</a> <a href="#infra-noahnu" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#tool-noahnu" title="Tools">🔧</a> <a href="https://github.com/tophat/commit-watch/commits?author=noahnu" title="Code">💻</a> <a href="https://github.com/tophat/commit-watch/commits?author=noahnu" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/asottile"><img src="https://avatars3.githubusercontent.com/u/1810591?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anthony Sottile</b></sub></a><br /><a href="#security-asottile" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

CommitWatch is licensed under [Apache License Version 2.0](https://github.com/tophat/commit-watch/tree/master/LICENSE).
