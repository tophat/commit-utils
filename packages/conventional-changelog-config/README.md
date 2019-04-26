# `conventional-changelog-config`
[![npm version](https://badge.fury.io/js/%40tophat%2Fconventional-changelog-config.svg)](https://badge.fury.io/js/%40tophat%2Fconventional-changelog-config)
[![npm downloads](https://img.shields.io/npm/dm/%40tophat%2Fconventional-changelog-config.svg)](https://npm-stat.com/charts.html?package=%40tophat%2Fconventional-changelog-config)

Top Hat's shareable configuration for [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)

## Installation

Using Yarn:

`yarn add @tophat/conventional-changelog-config --dev`

Or using npm:

`npm install @tophat/conventional-changelog-config --save-dev`


## Usage

Using [Lerna](https://github.com/lerna/lerna):

`lerna publish --skip-git --conventional-commits --changelog-preset 
@tophat/conventional-changelog-config --yes`

Note: The `lerna` above should be the path to your Lerna executable if 
Lerna is not installed globally.

## Convention

The changelog uses the commit message format from the 
[Angular Convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular#commit-message-format).

### Included Commit Types

The full list of commit types are listed [here](https://github.com/tophat/commit-utils/blob/master/packages/commit-utils-core/src/constants.js).
However, only the following types will be included in the changelog generation.
 
#### feat:

This commit is a new feature.

Example:
```
feat: add bold and italics options to formatting toolbar
```

#### fix

This commit is a bug fix.

Example:
```
fix: adjust page preview height
```

#### perf

This commit makes performance improvements.

Example:
```
perf: reduce number of re-renders in the preview
```
   
### revert

This commit reverts a specified commit.

Example:
```
revert: // add revert message
```
    
### Breaking Changes
