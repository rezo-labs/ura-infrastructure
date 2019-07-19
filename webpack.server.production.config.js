const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const constants = require('./constants.js');

// Get common config
const { server } = require('./webpack.common.config.js');

const { config } = constants;
const commonConfig = config.webpack && config.webpack.server && config.webpack.server.common;
const prodConfig = config.webpack && config.webpack.server && config.webpack.server.prod;

// Production mode
module.exports = ({ SSR = true }) => merge(server, {

    mode: 'production',

    devtool: 'source-map',

    plugins: [
        new webpack.DefinePlugin(Object.assign({}, constants.GLOBALS, {
            'process.env.PORT_STATIC': config.PORT,
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.SSR': SSR,
        })),
        new CleanWebpackPlugin([constants.DIST_TEMPLATES_DIR], {
            root: constants.WORK_DIR,
            exclude: ['.gitkeep'],
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(constants.SRC_TEMPLATES_DIR, 'prod'),
            to: constants.DIST_TEMPLATES_DIR,
        }]),
    ],

}, commonConfig, prodConfig);
