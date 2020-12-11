const CI = process.env.CI === '1'

module.exports = {
    parser: 'babel-eslint',
    extends: ['@tophat/eslint-config/base', '@tophat/eslint-config/jest']
}
