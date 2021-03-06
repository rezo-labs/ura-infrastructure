const path = require('path');
const config = require('../config.js');

// Declare paths
// level 0
const WORK_DIR = path.resolve(__dirname, '..');
// level 1
const APP_DIR = path.resolve(WORK_DIR, 'src', 'app');
const SERVER_DIR = path.resolve(WORK_DIR, 'src', 'server');
const DIST_DIR = path.resolve(WORK_DIR, 'dist');
const STATIC_DIR = path.resolve(WORK_DIR, 'static');
const CONFIGS_DIR = path.resolve(WORK_DIR, 'configs');
// level 2
const COMPONENTS_DIR = path.resolve(APP_DIR, 'components');
const SRC_TEMPLATES_DIR = path.resolve(SERVER_DIR, 'templates');
const DIST_TEMPLATES_DIR = path.resolve(DIST_DIR, 'templates');
const PUBLIC_DIR = path.resolve(DIST_DIR, 'public');
// level 3
const BUILD_DIR = path.resolve(PUBLIC_DIR, 'build');

const LOCALHOST = `http://localhost:${config.PORT}`;
const WEBPACK_LOCALHOST = `http://localhost:${config.WEBPACK_PORT}`;

const DEV_GLOBALS = config.globals.dev;
const PROD_GLOBALS = config.globals.prod;

Object.keys(DEV_GLOBALS).forEach((key) => {
    DEV_GLOBALS[key] = JSON.stringify(DEV_GLOBALS[key]);
});
Object.keys(PROD_GLOBALS).forEach((key) => {
    PROD_GLOBALS[key] = JSON.stringify(PROD_GLOBALS[key]);
});

module.exports = {
    config,
    WORK_DIR,
    APP_DIR,
    SERVER_DIR,
    DIST_DIR,
    STATIC_DIR,
    CONFIGS_DIR,
    COMPONENTS_DIR,
    SRC_TEMPLATES_DIR,
    DIST_TEMPLATES_DIR,
    PUBLIC_DIR,
    BUILD_DIR,
    LOCALHOST,
    WEBPACK_LOCALHOST,
    DEV_GLOBALS,
    PROD_GLOBALS,
};
