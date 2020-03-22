const chalk = require('chalk');
const logSymbols = require('log-symbols');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const constants = require('./constants.js');

// Get common config
const { client } = require('./webpack.common.config.js');

const { config } = constants;
const commonConfig = config.webpack && config.webpack.client && config.webpack.client.common;
const prodConfig = config.webpack && config.webpack.client && config.webpack.client.prod;

// Production mode
console.log(logSymbols.info, chalk.green.bold('PRODUCTION MODE'));
module.exports = ({ SSR = true, openAnalyzer = false }) => merge(client, {

    mode: 'production',

    output: {
        filename: '[name].bundle.[hash].js',
        chunkFilename: '[name].bundle.[hash].js',
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: { minimize: true }
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
        new webpack.DefinePlugin(Object.assign({}, constants.GLOBALS, {
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                SSR,
            },
        })),
        new UglifyJSPlugin(),
        new CleanWebpackPlugin([constants.PUBLIC_DIR], {
            root: constants.WORK_DIR,
            exclude: ['.gitkeep'],
        }),
        new MiniCssExtractPlugin({
            filename: 'style.min.css',
            chunkFilename: '[id].css'
        }),
        new CopyWebpackPlugin([{
            from: constants.STATIC_DIR,
            to: constants.PUBLIC_DIR,
            ignore: ['*.development.*', 'README.md'],
        }]),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer,
            reportFilename: path.resolve(constants.DIST_DIR, 'bundle-report.html'),
        }),
    ],

}, commonConfig, prodConfig);
