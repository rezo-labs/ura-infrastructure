const path = require('path');
const autoprefixer = require('autoprefixer');
const sass = require('sass');
const constants = require('../constants.js');

const { config, COMPONENTS_DIR } = constants;

const pathToInlineSvg = path.resolve(COMPONENTS_DIR, 'Icon/svg');


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
    }, {
        test: /\.(scss|sass)$/,
        use: [
            {
                loader: 'style-loader',
            },
            {
                loader: 'css-loader',
                options: { minimize: false }
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
    },);

    // Use svgr webpack to import svg as react component
    rules.push({
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                },
            }
        ],
    });

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
};
