const chalk = require('chalk');
const logSymbols = require('log-symbols');
const webpack = require('webpack');
const merge = require('webpack-merge');
const constants = require('./constants.js');

const { config } = constants;

// Get common config
const { client } = require('./webpack.common.config.js');

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
        host: 'localhost',
        port: config.WEBPACK_PORT,
        publicPath: '/build/',
        proxy: {
            '/': {
                target: constants.LOCALHOST,
            },
        },
        open: true,
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

});
