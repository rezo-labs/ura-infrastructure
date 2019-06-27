const { spawn } = require('child_process');

let clientTest = spawn('npm', ['run', 'test:client'], { stdio: 'inherit' });
let serverTest = null;

clientTest.on('exit', (code) => {
    if (code !== null) {
        serverTest = spawn('npm', ['run', 'test:server'], { stdio: 'inherit' });
    }
    clientTest = null;
});

process.on('SIGINT', () => {
    if (clientTest) {
        clientTest.kill('SIGINT');
    }
    if (serverTest) {
        serverTest.kill('SIGINT');
    }
});
