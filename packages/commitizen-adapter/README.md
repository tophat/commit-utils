# `commitizen-adapter`
[![npm version](https://badge.fury.io/js/%40tophat%2Fcommitizen-adapter.svg)](https://badge.fury.io/js/%40tophat%2Fcommitizen-adapter)
[![npm downloads](https://img.shields.io/npm/dm/%40tophat%2Fcommitizen-adapter.svg)](https://npm-stat.com/charts.html?package=%40tophat%2Fcommitizen-adapter)

We are standardizing our commit messages to pave the way for automatic semantic
package versioning, and to do so, we are using Commitizen as an interactive
commit message builder. We've customized the conventional Commitizen adapter to
suit our needs.

## Commit Types

You will see the following commit types when you run the command 
<span style="color: #e60031">`git cz`</span>:

--- 

**wip**: Changes that are part of some work in progress

**feat**: A new feature (NOTE: This will be added to the changelog)

**fix**: A bug fix (NOTE: This will be added to the changelog)

**cr**: Changes resulting from code review

**style**: Changes that don't affect the code's meaning (whitespace, formatting, etc)

**refactor**: Changes that neither fix a bug nor add a feature

**perf**: Changes that improve performance (NOTE: This will be added to the changelog)

**docs**: Changes to documentation only

**test**: Adding missing tests or correcting existing tests

**revert**: Reverts a previous commit

**build**: Changes that affect the build system or external dependencies

**ci**: Changes to our CI configuration files and scripts

**chore**: Other changes that don't modify src or test files

## Maximum Character Limit

There is a maximum character limit of 72 for the header of the commit message 
which is composed of the commit type and subject. 
