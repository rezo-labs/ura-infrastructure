const path = require('path');
const { APP_DIR } = require('../../constants');

/**
 * Check if one is the subpath of the other
 * @param {string} subpath - an absolute path, to be checked whether it is subpath of thePath
 * @param {string} thePath - an absolute path, to be checked whether it contains the subpath
 * @returns {boolean}
 */
const checkSubPath = (subpath, thePath) => {
    const subpathSegments = subpath.split(path.sep);
    const thePathSegments = thePath.split(path.sep);
    if (subpathSegments.every((segment, index) => segment === thePathSegments[index])) {
        return true;
    }
    return false;
};

/**
 * Validate component name
 * @param {string} component - component name
 */
const validateComponent = (component) => {
    const pass = component.match(/^[A-Z][a-zA-Z]*$/);
    if (pass) {
        return true;
    }
    return validateComponent.message;
};
validateComponent.message = 'Please enter a valid name contains only alphabet characters (a-z,A-Z) with the first letter capitalized.';

/**
 * Validate component directory from user input
 * @param {string} directory - component directory, relative to src/app/component directory
 */
const validateDirectory = (directory) => {
    const COM_DIR = path.resolve(APP_DIR, 'components');
    const absDestPath = path.resolve(COM_DIR, directory);
    const pass = checkSubPath(COM_DIR, absDestPath);
    if (pass) {
        return true;
    }
    return validateDirectory.message;
};
validateDirectory.message = 'Invalid relative path.';

module.exports = {
    checkSubPath,
    validateComponent,
    validateDirectory,
};
