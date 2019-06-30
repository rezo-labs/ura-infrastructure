const logSymbols = require('log-symbols');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

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
};

/**
 * Get all of React components inside a directory with the assumption that
 *  the first letter of the name of each component is capitalized and
 *  all non-component directories are lowercase.
 * @param {string} directory - The name of the directory to search for components
 * @returns {string[]} - List of component paths relative to the directory
 */
const getAllComponents = (directory) => {
    const files = fs.readdirSync(directory);
    const componentList = [];
    files.forEach((dir) => {
        if (fs.statSync(path.join(directory, dir)).isDirectory()) {
            if (dir[0].match(/[A-Z]/)) {
                componentList.push(dir);
            }
            else {
                const recursiveDir = path.join(directory, dir);
                console.log(directory);
                componentList.push(...getAllComponents(recursiveDir).map(f => path.join(dir, f)));
            }
        }
    });
    return componentList;
};

module.exports = {
    logHandler,
    successHandler,
    errorHandler,
    getAllComponents,
};
