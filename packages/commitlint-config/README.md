# @tophat/commitlint-config

[![npm version](https://badge.fury.io/js/%40tophat%2Fcommitlint-config.svg)](https://badge.fury.io/js/%40tophat%2Fcommitlint-config)
[![npm downloads](https://img.shields.io/npm/dm/%40tophat%2Fcommitlint-config.svg)](https://npm-stat.com/charts.html?package=%40tophat%2Fcommitlint-config)

Top Hat's shareable configuration for [commitlint](https://github.com/conventional-changelog/commitlint)

## Installation

Using Yarn:

`yarn add @tophat/commitlint-config --dev`

Or using npm:

`npm install @tophat/commitlint-config --save-dev`

## Usage

Make sure you have [commitlint](https://github.com/conventional-changelog/commitlint#getting-started) setup in your repo

Create a file called `commitlint.config.js` and add the following snippet to it:
```
module.exports = {
    extends: ['@tophat/commitlint-config']
}
```

[Optional] Create a pre commit hook using [husky](https://github.com/typicode/husky) to enforce automatic linting for every commit by adding this to your `package.json` file

```
{
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

Git hooks can get parameters via command-line arguments and stdin. Husky makes them accessible to commitlint via HUSKY_GIT_PARAMS.

## Rules
### Problems

The following rules are considered problems for `@tophat/commitlint-config` and will yield a non-zero exit code when not met.

#### type-enum
* **condition**: `type` is found in value
* **rule**: `always`
* **value**

  ```js
  [
    'wip',
    'feat',
    'fix',
    'cr',
    'style',
    'refactor',
    'perf',
    'docs',
    'test'
    'revert',
    'build',
    'ci',
    'chore',
  ]
  ```

Examples
```sh
echo "foo: some message" # fails
echo "fix: some message" # passes
```

#### header-max-length
* **condition**: `header` has `value` or less characters
* **rule**: `always`
* **value**
```js
  72
```

Examples
```sh
echo "fix: some message that is way too long and breaks the line max-length by several characters" # fails
echo "fix: some message" # passes
```

#### subject-empty
* **condition**: `subject` is empty
* **rule**: `never`

Examples
```sh
echo "fix:" # fails
echo "fix: some message" # passes
```


#### type-case
* **condition**: `type` is in case `value`
* **rule**: `always`
```js
  'lower-case'
```

Examples
```sh
echo "FIX(scope): some message" # fails
echo "fix(scope): some message" # passes
```

#### type-empty
* **condition**: `type` is empty
* **rule**: `never`

Examples
```sh
echo ": some message" # fails
echo "fix: some message" # passes
```

### Warnings
The following rules are considered warnings for `@tophat/commitlint-config`. Commitlint will pass but generate warnings if these conditions are not met.

#### body-leading-blank
* **condition**: `body` begins with blank line
* **rule**: `always`

#### footer-leading-blank
* **condition**: `footer` begins with blank line
* **rule**: `always`

