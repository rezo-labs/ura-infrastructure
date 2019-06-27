const program = require('commander');
const opn = require('opn');
const {
    errorHandler,
} = require('./utils');

program
    .option('-s, --server', 'Open server-side report')
    .parse(process.argv);

opn(`coverage/${program.server ? 'server' : 'client'}/index.html`)
    .catch(() => {
        errorHandler('Coverage not found! You should run test before calling this command.',
            'If you had run test before, it may be that you had run test:clean. Try running test again.');
    });
