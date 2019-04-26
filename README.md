# commit-utils

<span><img align="right" src="./docs/logo.svg" alt="Logo"></span>

[![CircleCI](https://circleci.com/gh/tophat/commit-utils/tree/master.svg?style=svg)](https://circleci.com/gh/tophat/commit-utils/tree/master)
[![Slack workspace](https://slackinvite.dev.tophat.com/badge.svg)](https://opensource.tophat.com/slack)
[![Maturity badge - level 1](https://img.shields.io/badge/Maturity-Level%201%20--%20New%20Project-yellow.svg)](https://github.com/tophat/getting-started/blob/master/scorecard.md)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0) [![Greenkeeper badge](https://badges.greenkeeper.io/tophat/commit-utils.svg)](https://greenkeeper.io/)


This repository contains a collection of packages used by Top Hat to enforce our commitlint convention and use it to automatically generate changelogs. 

## Packages

The following packages are provided: 

[@tophat/commitlint-config](https://github.com/tophat/commit-utils/tree/master/packages/commitlint-config): A config for commitlint that enforces Top Hat's style guide

[@tophat/commitizen-adapter](https://github.com/tophat/commit-utils/tree/master/packages/commitizen-adapter): An adapter for commitizen that helps you interactively build semantic commit messages

[@tophat/conventional-changelog-config](https://github.com/tophat/commit-utils/tree/master/packages/conventional-changelog-config): A preset for conventional-changelog built on Top Hat's style guide

[@tophat/commit-utils-core](https://github.com/tophat/commit-utils/tree/master/packages/commit-utils-core): A package containing code that is shared between all our config packages. This package is meant for *internal use* only.   


## Commit Convention 

Top Hat uses the following commit types as part of our development flow. Note that some of the commit types are automatically added to the changelog using [@tophat/conventional-changelog-config](https://github.com/tophat/commit-utils/tree/master/packages/conventional-changelog-config)

**wip**: Changes that are part of some work in progress

**feat**: A new feature (**This will be added to the changelog**)

**fix**: A bug fix (**This will be added to the changelog**)

**cr**: Changes resulting from code review

**style**: Changes that don't affect the code's meaning (whitespace, formatting, etc)

**refactor**: Changes that neither fix a bug nor add a feature

**perf**: Changes that improve performance (**This will be added to the changelog**)

**docs**: Changes to documentation only

**test**: Adding missing tests or correcting existing tests

**revert**: Reverts a previous commit

**build**: Changes that affect the build system or external dependencies

**ci**: Changes to our CI configuration files and scripts

**chore**: Other changes that don't modify src or test files


## Contributing
To report bugs, please a create a [new issue](https://github.com/tophat/commit-utils/issues).

### Making changes to the config
This configuration specified in these packages are for Top Hat's open source and internal use, so we generally won't be accepting external contributions.

If you are an external contributor and you have changes that you really feel should be included in our global config, feel free to make a suggestion, but please don't take it personally if we decide not to adopt the rule.
These configs are really easy to extend, so feel free to do exactly that with this one and make your own based off of it!
You can learn more from the commitlint docs for [creating shareable configs](https://eslint.org/docs/developer-guide/shareable-configs).


### Making a release

When the build passes on master, you can create a release by using lerna. This will automatically push the git tags and release a new version of the updated packages:

```
lerna version
```

## Credits

Thanks to [Carol Skelly](https://github.com/iatek) for donating the github organization!

Thanks to [Maryam Pazirandeh](https://github.com/maryampaz) for the awesome logo!
