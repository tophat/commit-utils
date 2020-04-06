#!/usr/bin/env bash

echo "Deploying...."

echo '//registry.npmjs.org/:_authToken=${NPM_PUBLISH_TOKEN}' > .npmrc

run "yarn publish ./artifacts/commit-watch-*.tgz --access public"

echo "Deployed!"
