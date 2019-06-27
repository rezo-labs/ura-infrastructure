/* eslint max-len: ["error", { "code": 100, "comments": 200 }] */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
    collectCoverage: true,
    coverageReporters: [
        'json',
        'html',
    ],
    coverageDirectory: '<rootDir>/coverage/server',

    moduleDirectories: [
        'node_modules',
    ],

    moduleFileExtensions: ['js', 'jsx'],

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/configs/__mocks__/fileMock.js',
        '\\.(css|sass)$': '<rootDir>/configs/__mocks__/styleMock.js',
    },

    rootDir: '../',

    setupFilesAfterEnv: ['<rootDir>/configs/enzyme.setup.js'],

    testEnvironment: 'node',

    testMatch: [
        '**/server/test/**/*.js',
    ],

    transform: {
        '^.+\\.jsx?$': '<rootDir>/configs/jest.transform.js',
    },
};
