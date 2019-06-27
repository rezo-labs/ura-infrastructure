module.exports = {
    collectCoverage: true,
    coverageReporters: [
        'json',
        'html',
    ],
    coverageDirectory: '<rootDir>/coverage',

    moduleDirectories: [
        '../node_modules',
    ],

    moduleFileExtensions: ['js', 'jsx'],

    rootDir: './',

    testEnvironment: 'node',

    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
    ],

    transform: {
        '^.+\\.jsx?$': '<rootDir>/jest.transform.js',
    },

};
