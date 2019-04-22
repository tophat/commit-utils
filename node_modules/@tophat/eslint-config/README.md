# @tophat/eslint-config

[![npm](https://img.shields.io/npm/v/@tophat/eslint-config.svg)](https://www.npmjs.com/package/@tophat/eslint-config)
[![CircleCI build](https://img.shields.io/circleci/project/github/tophat/eslint-config/master.svg)](https://circleci.com/gh/tophat/eslint-config)
[![npm downloads](https://img.shields.io/npm/dm/@tophat/eslint-config.svg)](https://npm-stat.com/charts.html?package=%40tophat%2Feslint-config)
[![Greenkeeper badge](https://badges.greenkeeper.io/tophat/eslint-config.svg)](https://greenkeeper.io/)

:shark: Top Hat's shareable eslint configuration

## Usage

### Base config

```
yarn add --dev @tophat/eslint-config eslint prettier eslint-config-prettier eslint-plugin-prettier
```

or

```
npm install --save-dev @tophat/eslint-config eslint prettier eslint-config-prettier eslint-plugin-prettier
```

In your eslint config (for example .eslintrc.js):

```javascript
module.exports = {
    extends: '@tophat'
}
```

### React config

If you are using React in your project, you can install the relevant plugins:

```
yarn add --dev eslint-plugin-react eslint-plugin-jsx-a11y # or npm install --save-dev ...
```

and extend the React configuration as well:

```javascript
module.exports = {
    extends: ['@tophat', '@tophat/eslint-config/react']
}
```

### Jest config

Similarly for jest, you can install the relevant plugins:

```
yarn add --dev eslint-plugin-jest # or npm install --save-dev ...
```

and extend the Jest configuration:

```javascript
module.exports = {
    extends: ['@tophat', '@tophat/eslint-config/jest']
}
```

## Making changes to this config

This eslint config is for Top Hat's open source and internal use, so we won't be accepting external contributions.
Nevertheless, feel free to extend this config and make your own based off of it!
You can view the eslint docs for [creating shareable configs](https://eslint.org/docs/developer-guide/shareable-configs).

### Semantic versioning

It's very important to be cognizant of [semantic versioning](https://semver.org/) when creating a shared eslint config.
Almost any change (in particular adding or changing lint rules) will likely cause builds to fail for those using the config, so most changes will be considered _breaking_, requiring a major version bump.
That's okay --- just make sure you are appropriately incrementing the version number when making a release.

### Adding new rules

First, open an issue in this repo and mark it as an RFC (request for comments).
Within the issue, outline the rule you would like to add, why you would like to add it, and the expected impact the rule will have on Top Hat open source and internal projects.
Ask members of the Top Hat organization to give any feedback on the rule, voting with :thumbsup: or :thumbsdown: on the issue, indicating whether or not they would like to enable it.
In the event that the rule is non-controversial and has majority approval :thumbsup:, create a pull request to enable it (linking to the original RFC), get it reviewed, and merge it in.

### Making a release

When the build passes on master, you can cut a release by using yarn and pushing the git tag it creates:

```
yarn version --major|--minor|--patch # choose the appropriate semver increment
git push --tags origin master
```

CircleCI will run the build on the tag and deploy a new version.
