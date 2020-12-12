# CommitWatch

<span><img align="right" src="./assets/logo.png" alt="Commit Watch Logo"></span>

CommitWatch checks commit messages and ensures they're formatted based on your config preferences.

## Requirements

Node >= v12

## Getting Started

Install the CommitWatch package:
- NPM: npm install commit-watch --save-dev
- Yarn: yarn add commit-watch --dev

You will need to give CommitWatch access to your GitHub Statuses, which can found by clicking [HERE](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=f87a2407fb0a27350808) and copying the code from the URL.

This will give you your COMMITWATCH_GITHUB_TOKEN. You will need to set this as an environment variable in CI.

## CI Variables Needed by CommitWatch:

The most efficient way to get this running is to ensure that some environment variables are available for CommitWatch to find.

- `COMMITWATCH_GITHUB_TOKEN`
- `CI_REPO_OWNER`
- `CI_REPO_NAME`
- `CI_BRANCH`
- `CI_COMMIT_SHA`

Optional:
- `COMMIT_WATCH_OUTPUT_DIR`, defaults to './artifacts/test_results/commitwatch/'.
- `COMMIT_WATCH_OUTPUT_FILENAME`, defaults to 'commitwatch.junit.xml'.
- `CI_BASE_BRANCH`, defaults to `origin/master`.

In your CI run `npx commit-watch` or `yarn commit-watch`.

## Contributing

Ensure you are using the correct version of node. It should match the version specified in `.nvmrc`. You can use a tool such as [nvm](https://github.com/nvm-sh/nvm) to automate this process.

Install packages:

```shell
yarn
```

To install the git hooks:

```shell
yarn husky install
```

To run tests:

```shell
yarn test
```

And watch mode:

```shell
yarn test:watch
```

You can build the package via:

```
yarn build
```

Set the `CI=1` env variable to generate a test coverage report.
