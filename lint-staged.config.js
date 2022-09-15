module.exports = {
    '{yarn.lock,package.json}': ['yarn dedupe'],
    'packages/**/*.test.{js,ts}': ['yarn test'],
    'packages/**/*.{js,ts}': ['yarn lint'],
}
