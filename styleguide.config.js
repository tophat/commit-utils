'use strict'
const path = require('path')

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    require: [
        'babel-polyfill',
        path.join(__dirname, 'globalScripts.js'),
        path.join(__dirname, 'globalStyles.css'),
    ],
    assetsDir: path.join(__dirname, 'assets'),
    ignore: [
        '**/__tests__/**',
        '**/*.test.js',
        '**/__snapshots__/**',
        '**/components/styleguide/**',
    ],
    pagePerSection: true,
    showCode: true,
    showUsage: true,
    webpackConfig: function () {
        return {
            module: {
                rules: [
                    {
                        test: /\.[jt]sx?$/,
                        include: [
                            path.join(process.cwd(), 'src'),
                            path.resolve(__dirname, './components'),
                        ],
                        use: {
                            loader: 'babel-loader',
                            options: require('../../babel.config'),
                        },
                    },
                    {
                        test: /\.css$/,
                        loaders: ['style-loader', 'css-loader'],
                        include: path.resolve(__dirname, '../../../../'),
                    },
                    {
                        test: /\.(eot|ttf|woff|woff2|png|gif|jpg)?(\?[\w-]+)?$/,
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                        },
                    },
                    {
                        test: (filePath) => {
                            const isSvg = /\.(svg)$/.test(filePath)
                            const isIcon = /\.icon\.svg$/.test(filePath)
                            return isSvg && !isIcon
                        },
                        use: [
                            {
                                loader: 'url-loader',
                                options: {
                                    limit: 10000,
                                    name: '[name]-[hash].[ext]',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.icon\.svg$/,
                        loader: 'svg-sprite-loader',
                        options: {
                            name: 'icon-[name]',
                        },
                    },
                    {
                        test: /\.md$/,
                        loader: 'raw-loader',
                    },
                ],
            },
            plugins: [
                new ForkTsCheckerWebpackPlugin({
                    async: false,
                    checkSyntacticErrors: true,
                    tsconfig: '../../tsconfig.json',
                    watch: 'src',
                }),
            ],
            resolve: {
                extensions: ['.js', '.jsx', '.tx', '.tsx'],
            },
            watch: true,
            watchOptions: {
                poll: 1000,
                ignored: '/node_modules/',
            },
        }
    },
    styleguideDir: 'tmp/styleguide-dist',
    serverPort: 3000,
    title: '@tophat/commit-utils',
}
