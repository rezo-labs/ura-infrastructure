const path = require('path');
const constants = require('../constants.js');

const { config } = constants;

const pathToInlineSvg = path.resolve(__dirname, '../../src/app/components/Icon/svg');


module.exports = ({ config }) => {
    console.log('pathToInlineSvg', pathToInlineSvg);
    const rules = config.module.rules;

    // // modify storybook's file-loader rule to avoid conflicts with svgr
    const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
    console.log('fileLoaderRule', fileLoaderRule);

    fileLoaderRule.exclude = pathToInlineSvg;

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
    config.module.rules.push({
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