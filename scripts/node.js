const path = require('path');
const { fork } = require('child_process');
const constants = require('../constants');

fork(path.resolve(constants.DIST_DIR, 'index.js'));
