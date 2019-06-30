const { CLIEngine } = require('eslint');
const fs = require('fs');
const path = require('path');
const opn = require('opn');
const {
    errorHandler,
} = require('./utils');

const cli = new CLIEngine({
    configFile: path.resolve(__dirname, '../.eslintrc.js'),
    ignorePath: path.resolve(__dirname, '../.eslintignore'),
    extensions: ['.jsx', '.js'],
});

const report = cli.executeOnFiles(['src/']);
const formatter = cli.getFormatter('html');
const outputPath = path.resolve(__dirname, '../../dist/lint-report.html');

fs.writeFile(outputPath, formatter(report.results), (err) => {
    if (err) {
        errorHandler(err);
        return;
    }
    console.log(`Lint report is at ${outputPath}.`);
    opn(outputPath);
});
