module.exports = {
    root: true,
    extends: ['@tophat', '@tophat/eslint-config/jest'],
    parserOptions: {
        project: './tsconfig.test.json',
    },
}
