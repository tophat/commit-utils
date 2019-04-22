module.exports = {
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'jsx-a11y'],
    extends: ['plugin:react/recommended', 'prettier/react'],
    rules: {
        'jsx-a11y/aria-props': 'error',
        'jsx-a11y/label-has-for': 'error',
        'jsx-a11y/mouse-events-have-key-events': 'error',
        'jsx-a11y/role-has-required-aria-props': 'error',
        'jsx-a11y/role-supports-aria-props': 'error',
        'react/default-props-match-prop-types': 'error',
        'react/require-default-props': 'error',
        'react/display-name': 'off',
    },
    settings: {
        react: {
            version: '16.0',
        },
    },
}
