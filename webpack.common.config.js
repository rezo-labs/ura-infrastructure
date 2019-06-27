const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const constants = require('./constants.js');

const { config } = constants;

// Common config object
module.exports.client = {

    entry: {
        main: path.resolve(constants.APP_DIR, 'index.jsx'),
    },

    output: {
        path: constants.BUILD_DIR,
        publicPath: '/build/',
    },

    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },

    module: {
        rules: [
            {
                test: /\.(ico|svg|gif|png|jpe?g)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[md5:hash:hex:6].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.jsx?/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: path.resolve(constants.WORK_DIR, 'node_modules/.cache/client/babel-loader'),
                        ...config.babelrc,
                    },
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    plugins: [
        new LoadablePlugin({
            writeToDisk: {
                filename: path.resolve(constants.DIST_DIR),
            },
            outputAsset: false, // prevent creating of 2 files
        }),
    ],

};

module.exports.server = {

    entry: path.resolve(constants.SERVER_DIR, 'server.js'),

    target: 'node',

    output: {
        filename: 'index.js',
        path: constants.DIST_DIR,
        publicPath: '/build/',
    },

    externals: [nodeExternals()],

    node: { __filename: false, __dirname: false },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: path.resolve(constants.WORK_DIR, 'node_modules/.cache/server/babel-loader'),
                    ...config.babelrc,
                },
            },
            {
                type: 'javascript/auto',
                test: /\.json/,
                loader: 'json-loader',
            },
            {
                test: /\.(png|svg|jpe?g|gif|ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[md5:hash:hex:6].[ext]',
                    outputPath: 'images/',
                    emitFile: false,
                },
            },
            {
                test: /\.(s?css|sass)$/,
                loader: 'ignore-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            components: path.resolve(constants.APP_DIR, 'components'),
            reducers: path.resolve(constants.APP_DIR, 'redux/reducers'),
        },
    },

    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],

    stats: {
        modules: false,
        children: false,
    },

};
