# @tophat/commitizen-adapter

[![npm version](https://badge.fury.io/js/%40tophat%2Fcommitizen-adapter.svg)](https://badge.fury.io/js/%40tophat%2Fcommitizen-adapter)
[![npm downloads](https://img.shields.io/npm/dm/%40tophat%2Fcommitizen-adapter.svg)](https://npm-stat.com/charts.html?package=%40tophat%2Fcommitizen-adapter)

A [commitizen](https://github.com/commitizen/cz-cli) adapter that lets you interactively build commit messages using Top Hat's commit convention.

## Installation
First, make sure you have commitizen installed and configured globally

```sh
npm install -g commitizen
```

Then install the Top Hat commitizen adapter:

Using Yarn
```sh
yarn add @tophat/commitizen-adapter --dev
```

or using npm
```sh
npm install @tophat/commitizen-adapter --save-dev
```

Add the following snippet to your package.json file

```js
"config": {
  "commitizen": {
    "path": "./node_modules/@tophat/commitizen-adapter"
  }
}
```

Alternatively, if you're using a `.czrc` file, add this
```js
{
  "path": "@tophat/commitizen-adapter"
}
```

## Usage
Running `git cz` should now bring up an interactive prompt that lets you build commit messages

<span><img align="center" src="../../docs/tophat-cz-screenshot.png" alt="Screenshot"></span>
