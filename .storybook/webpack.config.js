const path = require('path');
const constants = require('../constants.js');

const { config, APP_DIR } = constants;

const pathToInlineSvg = path.resolve(APP_DIR, 'components/Icon/svg');


module.exports = ({ config }) => {
    const rules = config.module.rules;

    // modify storybook's file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));

    fileLoaderRule.exclude = pathToInlineSvg;

    rules.push({
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

    // Use svgr webpack to import svg as react component
    rules.push({
        test: /\.svg$/,
        use: [{
        loader: '@svgr/webpack',
        options: {
            icon: true,
        },
        }],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};