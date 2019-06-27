/**
 * This plugin exists because when we use a css or a sass file as an entry in Webpack configuration,
 * Webpack generates a properly extracted css file and a useless Javascript file.
 * We don't need that useless thing so we write this plugin to auto detect and eliminate them.
 */

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint class-methods-use-this: 0 */
const { config } = require('../../constants.js');

const { CSS_ENTRIES } = config;

module.exports = class MiniCssExtractPluginCleanup {
    constructor(params) {
        this.production = params.production;
    }

    apply(compiler) {
        // Remove useless js file
        compiler.hooks.emit.tapAsync('CssCleanupPlugin', (compilation, callback) => {
            const assets = Object.keys(compilation.assets);
            assets
                .filter(asset => Object.keys(CSS_ENTRIES).some((key) => {
                    // The key is the chunk's name
                    const matchBundle = new RegExp(`${key}\\.bundle`);
                    const matchExtension = new RegExp(/\.js(\.map)?/);
                    return asset.match(matchBundle) && asset.match(matchExtension);
                }))
                .forEach((asset) => {
                    delete compilation.assets[asset];
                });

            callback();
        });
    }
};
