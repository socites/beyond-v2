var args = process.argv;

let action = args[2];

let environment = (args[3]) ? args[3] : 'development';
environment = (typeof environment === 'string') ? environment : 'development';
environment = {'environment': environment};

if (action === 'postinstall') {
    require('./postinstall.js')();
}
else if (action === 'serve') {
    require('./serve')(environment);
}
