const path = require('path');
const constants = require('../constants.js');

const { config } = constants;

module.exports = ({ config }) => {
    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: require.resolve('awesome-typescript-loader'),
                options: {
                    configFileName: path.resolve(constants.CONFIGS_DIR, 'tsconfig.json'),
                }
            },
        ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};