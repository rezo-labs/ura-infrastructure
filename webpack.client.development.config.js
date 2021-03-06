const chalk = require('chalk');
const logSymbols = require('log-symbols');
const webpack = require('webpack');
const merge = require('webpack-merge');
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
