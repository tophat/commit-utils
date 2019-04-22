module.exports = {
    parserOptions: {
        ecmaVersion: 9,
        sourceType: 'module',
    },
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                printWidth: 80,
                tabWidth: 4,
                semi: false,
                trailingComma: 'all',
                singleQuote: true,
            },
        ],
        camelcase: ['error', { properties: 'never' }],
        'dot-notation': 'error',
        eqeqeq: 'error',
        'no-duplicate-imports': 'error',
        'no-nested-ternary': 'error',
        'no-useless-computed-key': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
    },
}
