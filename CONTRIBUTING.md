# Contributing to Commit Watch

Start off by reading through the [Code of Conduct](./CODE_OF_CONDUCT.md) for the project, and make sure you understand the conduct expectations for all contributors.

## Setup

Ensure you are using the correct version of node. It should match the version specified in `.nvmrc`. You can use a tool such as [nvm](https://github.com/nvm-sh/nvm) to automate this process.

```sh
yarn
```

To add the commit hook:

```sh
yarn husky install
```

Make sure all of the tests pass locally:

```sh
yarn test
```

Great! Now you're ready to start contributing.

## Making changes

Have a look through existing issues and pull requests to make sure that you're not completing work that's already been taken care of. If you're unsure whether or not your changes will be valuable to the project, feel free to open an issue first to propose and discuss your changes.

Make sure you add tests for any changes that are made. Also make sure that your code is formatted correctly; you can set up your editor/IDE to report eslint errors, or you can run the following from the command line:

```
yarn lint
```

When everything is ready, commit your changes to your fork (or feature branch) and submit a pull request to the main repository.

GitHub actions will run any required status checks; make sure that they pass.
The project owner or members will review your pull request and possibly request changes.
Once your PR is spick-and-span, it will be approved and merged into the main branch.
If a release needs to be published as a result, the project members will do so, and a new version will automatically be deployed as part of the build to NPM.

## Building

You can build the package via:

```sh
yarn build
```

## Tests

To run tests:

```sh
yarn test
```

And watch mode:

```sh
yarn test:watch
```

Set the `CI=1` env variable to generate a test coverage report.

### Updating contributors

When someone's PR is merged, make sure to follow up and add them to the contributors section in the README by running:

```sh
yarn contrib:add <github-username> <type-of-contribution>
```

For example:

```sh
yarn contrib:add noahnu code
```

---

Feel free to open a PR or GitHub issue. Contributions welcome!
