var args = process.argv;

if (args[2] === 'postinstall') {
    require('./postinstall.js')();
}
else if (args[2] === 'serve') {
    require('./serve')();
}
