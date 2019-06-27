const logSymbols = require('log-symbols');
const chalk = require('chalk');

const {
    error,
    log,
} = console;

/**
 * @param {string[]} messages - Message of the log
 */
const logHandler = (...messages) => {
    messages.forEach(message => (
        log(logSymbols.info, message)
    ));
};

/**
 * @param {string[]} messages - Message to log
 */
const successHandler = (...messages) => {
    messages.forEach(message => (
        log(logSymbols.success, message)
    ));
};

/**
 * @param {string[]} messages - Message of the error
 */
const errorHandler = (...messages) => {
    messages.forEach(message => (
        error(logSymbols.error, chalk.red(message))
    ));
    error(logSymbols.error, chalk.red('Process failed.'));
    process.exit(0);
};

module.exports = {
    logHandler,
    successHandler,
    errorHandler,
};
