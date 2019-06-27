const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const async = require('async');
const clientConfig = require('../webpack.client.production.config');
const serverConfig = require('../webpack.server.production.config');
const constants = require('../constants');
const {
    errorHandler,
} = require('./utils');

inquirer
    .prompt([
        {
            type: 'confirm',
            name: 'open',
            message: 'Do you want the bundle analyzer report open automatically?',
            default: false,
        },
        {
            type: 'confirm',
            name: 'noSsr',
            message: 'Disable server-side rendering by default?',
            default: false,
        },
    ])
    .then((answers) => {
        const {
            open,
            noSsr,
        } = answers;

        const clientCompiler = webpack(clientConfig({ SSR: !noSsr, openAnalyzer: open }));
        const serverCompiler = webpack(serverConfig({ SSR: !noSsr }));

        async.series([
            (callback) => {
                clientCompiler.run((err, stats) => {
                    if (err) {
                        callback(err);
                        return;
                    }

                    // Get the hash
                    const onlyHash = {
                        hash: stats.hash,
                    };
                    const filePath = path.resolve(constants.DIST_DIR, 'compilation-stats.json');

                    fs.writeFile(filePath, JSON.stringify(onlyHash), (_err) => {
                        if (_err) {
                            callback(_err);
                            return;
                        }
                        console.log(stats.toString({ colors: true }));
                        callback(null);
                    });
                });
            },
            (callback) => {
                serverCompiler.run((err, stats) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    console.log(stats.toString({ colors: true }));
                    callback(null);
                });
            },
        ], (err) => {
            if (err) {
                errorHandler(err);
            }
        });
    });
