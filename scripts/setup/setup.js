const path = require('path');
const fs = require('fs');
const async = require('async');
const rimraf = require('rimraf');
const { spawn } = require('child_process');
const constants = require('../../constants');
const {
    successHandler,
    errorHandler,
} = require('../utils');

const GIT_DIR = path.resolve(constants.WORK_DIR, '.git');
const GIT_IGNORE_FILE = path.resolve(constants.WORK_DIR, '.gitignore');

const removeGit = (callback) => {
    rimraf(GIT_DIR, (error) => {
        if (error) {
            callback([
                'Failed during deleting .git directory.',
                error.name,
                error.message,
                error.stack,
            ]);
            return;
        }
        callback(null);
    });
};

const initializeGit = (callback) => {
    const initProcess = spawn('git', ['init']);
    initProcess.on('exit', (code) => {
        if (code !== null && code !== 0) {
            callback([
                'Failed during Git initialization',
                'Did you install Git properly?',
                `Process exited with code ${code}`,
            ]);
            return;
        }
        successHandler('Git Initialized!');
        callback(null);
    });
};

const updateFiles = (callback) => {
    const gitIgnore = fs.readFileSync(path.resolve(__dirname, './.gitignore'));
    fs.writeFile(GIT_IGNORE_FILE, gitIgnore.toString(), (err) => {
        if (err) {
            callback([
                'Failed during updating files.',
                err.name,
                err.message,
                err.stack,
            ]);
            return;
        }
        successHandler('File updated!');
        callback(null);
    });
};

async.waterfall([
    removeGit,
    initializeGit,
    updateFiles,
], (error) => {
    if (error) {
        errorHandler(...error);
    }
});
