# commit-utils

<span><img align="right" src="./website/static/img/commit-utils.svg" alt="Logo"></span>

[![Continuous Integration](https://github.com/tophat/commit-utils/actions/workflows/pull-request.yml/badge.svg)](https://github.com/tophat/commit-utils/actions/workflows/pull-request.yml)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![Discord](https://img.shields.io/discord/809577721751142410)](https://discord.gg/YhK3GFcZrk)
[![Maturity badge - level 1](https://img.shields.io/badge/Maturity-Level%201%20--%20New%20Project-yellow.svg)](https://github.com/tophat/getting-started/blob/main/scorecard.md)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


This repository contains a collection of packages used by Top Hat to enforce our commitlint convention and use it to automatically generate changelogs.

## Packages

The following packages are provided:

[@tophat/commitlint-config](https://github.com/tophat/commit-utils/tree/main/packages/commitlint-config): A config for commitlint that enforces Top Hat's style guide

[@tophat/commitizen-adapter](https://github.com/tophat/commit-utils/tree/main/packages/commitizen-adapter): An adapter for commitizen that helps you interactively build semantic commit messages

[@tophat/conventional-changelog-config](https://github.com/tophat/commit-utils/tree/main/packages/conventional-changelog-config): A preset for conventional-changelog built on Top Hat's style guide

[@tophat/commit-utils-core](https://github.com/tophat/commit-utils/tree/main/packages/commit-utils-core): A package containing code that is shared between all our config packages. This package is meant for *internal use* only.


## Commit Convention

Top Hat uses the following commit types as part of our development flow. Note that some of the commit types are automatically added to the changelog using [@tophat/conventional-changelog-config](https://github.com/tophat/commit-utils/tree/main/packages/conventional-changelog-config)

| Commit Type | Title | Description | Added to changelog? |
| --- | --- | --- | --- |
| wip | Work in Progress | Changes that are part of some work in progress | No
| feat | Features | A new feature | **Yes**
| fix | Bug Fixes | A bugfix | **Yes**
| refactor | Code Refactoring | Changes that neither fix a bug nor add a feature | No
| docs | Documentation | Changes to documentation only | No
| test | Tests | Adding missing tests or correcting existing tests | No
| revert | Reverts | Reverts a previous commit | **Yes**
| o11y | Observability & Analytics | Improvements to o11y | **Yes**
| deps | Dependencies | Dependency updates | **Yes**

### Deprecated Conventions

| Commit Type | Title | Description | Added to changelog? |
| --- | --- | --- | --- |
| style | Styles | Changes that don't affect the code's meaning (whitespace, formatting, etc) | No
| build | Builds | Changes that affect the build system or external dependencies | No
| ci | Continous Integration | Changes to our CI configuration files and scripts | No
| chore | Chores | Other changes that don't modify src or test files | No
| perf | Performance Improvements | Changes that improve performance | **Yes**
| cr | Code Reviews | Changes resulting from code review | No

## Contributing
To report bugs, please a create a [new issue](https://github.com/tophat/commit-utils/issues).

### Making changes to the config
This configuration specified in these packages are for Top Hat's open source and internal use, so we generally won't be accepting external contributions.

If you are an external contributor and you have changes that you really feel should be included in our global config, feel free to make a suggestion, but please don't take it personally if we decide not to adopt the rule.
These configs are really easy to extend, so feel free to do exactly that with this one and make your own based off of it!
You can learn more from the commitlint docs for [creating shareable configs](https://eslint.org/docs/developer-guide/shareable-configs).


## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://msrose.github.io"><img src="https://avatars3.githubusercontent.com/u/3495264?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Rose</b></sub></a><br /><a href="https://github.com/tophat/commit-utils/commits?author=msrose" title="Code">💻</a> <a href="https://github.com/tophat/commit-utils/commits?author=msrose" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/Yuuki-chan"><img src="https://avatars1.githubusercontent.com/u/5069639?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tonia Tong</b></sub></a><br /><a href="https://github.com/tophat/commit-utils/commits?author=Yuuki-chan" title="Code">💻</a> <a href="https://github.com/tophat/commit-utils/commits?author=Yuuki-chan" title="Documentation">📖</a></td>
    <td align="center"><a href="http://www.sanchitgera.ca"><img src="https://avatars0.githubusercontent.com/u/8632167?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sanchit Gera</b></sub></a><br /><a href="https://github.com/tophat/commit-utils/commits?author=sanchitgera" title="Code">💻</a> <a href="https://github.com/tophat/commit-utils/commits?author=sanchitgera" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/JeremySant"><img src="https://avatars1.githubusercontent.com/u/9597842?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jeremysant</b></sub></a><br /><a href="https://github.com/tophat/commit-utils/commits?author=JeremySant" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/maryampaz"><img src="https://avatars1.githubusercontent.com/u/30090413?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maryam Pazirandeh</b></sub></a><br /><a href="#design-maryampaz" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/asottile"><img src="https://avatars3.githubusercontent.com/u/1810591?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Anthony Sottile</b></sub></a><br /><a href="#security-asottile" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Credits

Thanks to [Carol Skelly](https://github.com/iatek) for donating the github organization!

Thanks to [Maryam Pazirandeh](https://github.com/maryampaz) for the awesome logo!

Thanks to [Jason Long](https://twitter.com/jasonlong) for providing design inspiration with the [git logo](https://git-scm.com/downloads/logos).
