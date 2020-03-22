const chalk = require('chalk');
const logSymbols = require('log-symbols');
const webpack = require('webpack');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const constants = require('./constants.js');

// Get common config
const { client } = require('./webpack.common.config.js');

const { config } = constants;
const commonConfig = config.webpack && config.webpack.client && config.webpack.client.common;
const devConfig = config.webpack && config.webpack.client && config.webpack.client.dev;

// Development mode
console.log(logSymbols.info, chalk.red.bold('DEVELOPMENT MODE'));
module.exports = ({ SSR = false }) => merge(client, {

    mode: 'development',

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        port: config.WEBPACK_PORT,
        publicPath: '/build/',
        proxy: {
            '/': {
                target: constants.LOCALHOST,
            },
        },
        stats: 'minimal',
        overlay: true,
    },

    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: { minimize: false }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer({
                                    browsers: config.CSS_PREFIX
                                })]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        },
                    }
                ]
            },
        ]
    },

    plugins: [
        // This makes everything reloaded when you change files
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin(Object.assign({}, constants.GLOBALS, {
            'process.env': {
                SSR: SSR || config.SSR,
            },
        })),
    ],

}, commonConfig, devConfig);
