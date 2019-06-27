/* eslint max-len: ["error", { "code": 100, "comments": 200 }] */
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
    collectCoverage: true,
    coverageReporters: [
        'json',
        'html',
    ],
    coverageDirectory: '<rootDir>/coverage/client',

    moduleDirectories: [
        'node_modules',
        '<rootDir>/src/app',
    ],

    moduleFileExtensions: ['js', 'jsx'],

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/configs/__mocks__/fileMock.js',
        '\\.(css|sass)$': '<rootDir>/configs/__mocks__/styleMock.js',
    },

    rootDir: '../',

    setupFilesAfterEnv: ['<rootDir>/configs/enzyme.setup.js'],

    testMatch: [
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)+(spec|test).js?(x)',
    ],

    testPathIgnorePatterns: [
        '/node_modules/',
        '/configs/',
    ],

    transform: {
        '^.+\\.jsx?$': '<rootDir>/configs/jest.transform.js',
    },
};
