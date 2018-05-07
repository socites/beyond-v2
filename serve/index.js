module.exports = function () {
    "use strict";

    // check if server.json file exists
    let fs = require('fs'),
        path = require('path'),
        root = process.cwd();

    let file = path.join(root, 'server.json');
    let config;
    if (fs.existsSync(file)) {
        config = 'server.json';
    }
    else {

        config = {};

        // check if application configuration exists
        // in this case, beyond will not serve other applications, or any library
        file = path.join(root, 'application.json');
        if (fs.existsSync(file)) {
            config = {'application': 'application.json'};
        }
        else {

            config.applications = {
                'application': {
                    "version": "1.0",
                    "port": "3010"
                }
            }

        }

    }

    console.log(config);

};
