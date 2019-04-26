# CommitWatch

<span><img align="right" src="./docs/logo.png" alt="Logo"></span>

CommitWatch checks commit messages and ensures they're formatted based on your config preferences.

## Getting Started
Install the CommitWatch package:
- NPM: npm install commit-watch --save-dev
- Yarn: yarn add commit-watch --dev

You will need to give CommitWatch access to your GitHub Statuses, which can by clicking [HERE](https://github.com/login/oauth/authorize?scope=repo%3Astatus&client_id=f87a2407fb0a27350808) and copying the code from the URL.

This will give you your COMMITWATCH_GITHUB_TOKEN. You will need to set this as an environment variable in CI.

## CI Variables Needed by CommitWatch:
The most efficient way to get this running is to ensure that some environment variables are available for CommitWatch to find.
- `COMMITWATCH_GITHUB_TOKEN`
- `CI_REPO_OWNER`
- `CI_REPO_NAME`
- `CI_BRANCH`
- `CI_COMMIT_SHA`

In your CI run node ./node_modules/.bin/commit-watch
